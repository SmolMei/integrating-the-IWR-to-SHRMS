# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Smart HRMS (SHRMS) with Intelligent Workflow Routing (IWR) — a Laravel 12 HR management system that uses a Python ML-based routing engine to automatically route IPCR evaluations and leave applications through approval chains.

**3-tier architecture:** Laravel backend → Node.js Express middleware (port 3000) → Python IWR engine (scikit-learn decision trees + rule engine).

## Development Commands

```bash
# Full dev environment (Laravel + Queue + Logs + Vite)
composer run dev

# Individual services
npm run dev                    # Vite dev server
cd node-middleware && npm start # IWR middleware on port 3000

# Build
npm run build                  # Production frontend assets

# Lint & format
composer run lint              # Laravel Pint (PHP)
npm run lint                   # ESLint
npm run format                 # Prettier
npm run types                  # TypeScript type check

# Test
composer run test              # PHPUnit/Pest
python iwr/tests.py            # Python IWR tests (after setup)

# One-time IWR setup
cd iwr && python setup.py      # Generates training data + trains decision trees
```

**Site runs via Laravel Herd** at `http://integrating-the-iwr-to-shrms.test`. The `public/hot` file must NOT exist when using built assets (only present when Vite dev server is running).

**PHP binary location** (Herd on Windows): `C:/Users/delos/.config/herd/bin/php84/php.exe`

## Architecture

### Request Flow: IWR Routing

```
Controller (e.g. IwrController::saveEvaluation)
  → IwrService::routeIpcr() / routeLeave()     [HTTP POST to localhost:3000]
    → Node middleware (node-middleware/routes/iwr.js)
      → pythonRunner spawns: iwr/runner.py       [stdin JSON → stdout JSON]
        → WorkflowRouter → RuleEngine (compliance) + DecisionTree (ML routing)
      → Returns routing result
  → Controller updates model with routing metadata
  → NotificationService creates notifications for affected users
```

### IWR Document Routing Logic

**IPCR (performance evaluations):**
- New submission → routed to assigned evaluator (department head)
- Rating ≥ 2.5 → completed
- Rating < 2.5 without remarks → returned to evaluator for remarks
- Rating < 2.5 with remarks → completed

**Leave applications:**
- Submitted → routed to department head
- DH approves → routed to HR for final approval
- DH/HR rejects → completed with rejection reason
- IWR returns `approver_id: "HR"` (string literal, not an employee ID) when routing to HR stage

### Data Flow: Inertia.js

Controllers pass data via `Inertia::render('page-name', $props)`. React pages receive props automatically. User actions POST back to controllers via `router.post()` or `useForm().post()`.

### Key Relationships

- `User` → belongs to `Employee` (via `employee_id`). A User may not have an Employee record.
- `Employee` → has many `IpcrSubmission`, `LeaveApplication`
- `LeaveRequest` (legacy form data) → linked to `LeaveApplication` (IWR routing) via `leave_request_id` foreign key. Each LeaveRequest must have its own LeaveApplication.
- `IpcrSubmission` tracks both form data and IWR routing metadata (status, stage, routing_action, confidence_pct)

### User Roles

- `employee` — submits IPCR and leave requests
- `evaluator` — department head; reviews IPCR, first-stage leave approval
- `hr-personnel` — admin dashboard, final leave approval, analytics

Routes use role middleware: `role:employee|evaluator|hr-personnel`

## Important Patterns

### Eloquent `create()` Gotcha
`Model::create()` returns an instance with only the provided fields — DB column defaults are NOT reflected on the returned model. Always explicitly pass fields needed downstream (e.g., `dh_decision => 0` even if DB default is 0).

### Inertia `with()` Partial Loading
When using `with('user:id,name')`, include ALL columns needed by the frontend. Missing columns cause related lookups to silently return null.

### NotificationService HR Fallback
When IWR returns `approver_id: "HR"`, NotificationService finds the HR user by `role: hr-personnel` instead of looking up by `employee_id`.

## Configuration

- `IWR_MIDDLEWARE_URL` in `.env` (default: `http://localhost:3000`) — configured in `config/services.php` under `services.iwr.url`
- Database: MySQL (`DB_DATABASE=shrms-db(new)`)
- Python venv at `iwr/.venv/` — Node middleware uses `iwr/.venv/Scripts/python.exe` on Windows
- Seeded account password: `Password1!`

## Key Files

| File | Purpose |
|------|---------|
| `app/Http/Controllers/IwrController.php` | IPCR submission, evaluation, leave approve/reject |
| `app/Services/IwrService.php` | HTTP client to Node.js middleware |
| `app/Services/NotificationService.php` | Creates notifications from IWR routing results |
| `app/Http/Controllers/PaginationController.php` | Paginated data for document mgmt, leave mgmt, attendance, employee directory |
| `node-middleware/services/pythonRunner.js` | Spawns Python IWR processes |
| `iwr/workflow_router.py` | Main IWR orchestrator (rule engine + decision tree) |
| `iwr/runner.py` | stdin/stdout JSON bridge for Node.js |
| `routes/web.php` | All route definitions |
