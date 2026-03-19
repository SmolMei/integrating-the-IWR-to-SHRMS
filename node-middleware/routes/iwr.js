const express = require('express');
const { runPython } = require('../services/pythonRunner');

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Route IPCR submission
router.post('/ipcr', async (req, res) => {
    try {
        const result = await runPython('route_ipcr', req.body);
        res.json(result);
    } catch (error) {
        console.error('IPCR routing error:', error.message);
        res.status(500).json({
            status: 'error',
            notification: error.message,
        });
    }
});

// Route leave application
router.post('/leave', async (req, res) => {
    try {
        const result = await runPython('route_leave', req.body);
        res.json(result);
    } catch (error) {
        console.error('Leave routing error:', error.message);
        res.status(500).json({
            status: 'error',
            notification: error.message,
        });
    }
});

module.exports = router;
