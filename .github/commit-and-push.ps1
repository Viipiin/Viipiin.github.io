#!/usr/bin/env pwsh
# commit-and-push.ps1
# Run from the repo root: .\.github\commit-and-push.ps1
# Shows pending changes, prompts for confirmation, then commits and pushes.

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ── 1. Ensure we are in the repo root ──────────────────────────────────────────
$repoRoot = git rev-parse --show-toplevel 2>$null
if (-not $repoRoot) {
    Write-Error "Not inside a git repository. Run this script from the repo root."
    exit 1
}
Set-Location $repoRoot

# ── 2. Show current branch ────────────────────────────────────────────────────
$branch = git rev-parse --abbrev-ref HEAD
Write-Host ""
Write-Host "Branch : $branch" -ForegroundColor Cyan

# ── 3. Show status ────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "─── Unstaged / untracked changes ───────────────────────────────────" -ForegroundColor DarkGray
git status --short
Write-Host ""

$hasChanges = (git status --porcelain).Trim()
if (-not $hasChanges) {
    Write-Host "Nothing to commit — working tree is clean." -ForegroundColor Green
    exit 0
}

# ── 4. Stage all changes (git add -A) ────────────────────────────────────────
Write-Host "─── Files that will be committed (after git add -A) ────────────────" -ForegroundColor DarkGray
git add -A
git diff --cached --stat
Write-Host ""

# ── 5. Prompt for commit message ─────────────────────────────────────────────
do {
    $commitMsg = Read-Host "Enter commit message (leave blank to abort)"
    if (-not $commitMsg) {
        Write-Host "Aborted — no commit message provided." -ForegroundColor Yellow
        git reset HEAD  # unstage everything
        exit 0
    }
} while (-not $commitMsg.Trim())

# Append Co-authored-by trailer (project convention)
$fullMsg = "$commitMsg`n`nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

# ── 6. Confirm before committing ─────────────────────────────────────────────
Write-Host ""
Write-Host "─── Commit preview ──────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host $fullMsg -ForegroundColor White
Write-Host ""
$confirm = Read-Host "Commit and push to '$branch'? [y/N]"

if ($confirm -notin @("y", "Y", "yes", "Yes", "YES")) {
    Write-Host "Aborted by user." -ForegroundColor Yellow
    git reset HEAD  # unstage everything
    exit 0
}

# ── 7. Commit ─────────────────────────────────────────────────────────────────
git commit -m $fullMsg
if ($LASTEXITCODE -ne 0) {
    Write-Error "git commit failed."
    exit 1
}

# ── 8. Push ───────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "Pushing to origin/$branch ..." -ForegroundColor Cyan
git push origin $branch
if ($LASTEXITCODE -ne 0) {
    Write-Error "git push failed."
    exit 1
}

Write-Host ""
Write-Host "Done! Changes pushed to origin/$branch." -ForegroundColor Green
