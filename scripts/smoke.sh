#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
fail() { echo "✗ $1" >&2; exit 1; }
ok() { echo "✓ $1"; }

[[ -f server_office_interactive.html ]] || fail "缺少演示 HTML"
[[ -f api/index.php ]] || fail "缺少 api/index.php"
[[ -f frontend/my-app/package.json ]] || fail "缺少 React 工程"
[[ -f .env.example ]] || fail "缺少 .env.example"
ok "核心文件齐全"

command -v php >/dev/null || fail "需要 PHP"
php -l api/index.php >/dev/null
ok "api PHP lint OK"

PORT="${SMOKE_PORT:-18082}"
php -S "127.0.0.1:${PORT}" -t "$ROOT" >/tmp/ai-employee-smoke.log 2>&1 &
PID=$!
cleanup() { kill "$PID" 2>/dev/null || true; }
trap cleanup EXIT
for i in $(seq 1 30); do curl -sf "http://127.0.0.1:${PORT}/server_office_interactive.html" >/dev/null 2>&1 && break; sleep 0.15; done

curl -sf "http://127.0.0.1:${PORT}/server_office_interactive.html" | grep -qi 'desk-unit\|html' || fail "演示页失败"
ok "演示页 200"

echo ""; echo "smoke: ok"
