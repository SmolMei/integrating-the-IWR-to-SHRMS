const { spawn } = require('child_process');
const path = require('path');

const IWR_DIR = path.resolve(__dirname, '../../iwr');
const VENV_PYTHON = path.resolve(IWR_DIR, '.venv', 'Scripts', 'python.exe');
const PYTHON_PATH = process.env.PYTHON_PATH || VENV_PYTHON;
const TIMEOUT_MS = 30000;

/**
 * Spawns a Python process to run iwr/runner.py with the given payload.
 * @param {string} action - "route_ipcr" or "route_leave"
 * @param {object} payload - The routing request data
 * @returns {Promise<object>} - The IWR routing result
 */
function runPython(action, payload) {
    return new Promise((resolve, reject) => {
        const child = spawn(PYTHON_PATH, ['runner.py'], {
            cwd: IWR_DIR,
            timeout: TIMEOUT_MS,
            stdio: ['pipe', 'pipe', 'pipe'],
        });

        const input = JSON.stringify({ action, payload });
        let stdout = '';
        let stderr = '';

        child.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        child.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        child.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Python exited with code ${code}: ${stderr || stdout}`));
                return;
            }
            try {
                const result = JSON.parse(stdout.trim());
                resolve(result);
            } catch (e) {
                reject(new Error(`Failed to parse Python output: ${stdout}`));
            }
        });

        child.on('error', (err) => {
            reject(new Error(`Failed to spawn Python: ${err.message}`));
        });

        child.stdin.write(input);
        child.stdin.end();
    });
}

module.exports = { runPython };
