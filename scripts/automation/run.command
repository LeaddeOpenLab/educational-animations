#!/bin/zsh
set -e
cd "$(dirname "$0")/../.."
set -a
source .env
set +a
set +e
python3 scripts/automation/incremental_agent.py run
run_exit=$?
set -e
python3 scripts/automation/incremental_agent.py report
echo ""
echo "已完成增量扫描。请打开 .workbuddy/incremental-agent/latest-summary.md 查看逐条状态。"
exit $run_exit
