Stage, commit, and push changes to origin/main.

Steps:
1. Run `git status` to see what changed
2. Run `git diff --stat` to summarise the changes
3. Stage only the relevant changed files (never `git add -A` blindly — check for accidentals)
4. Write a concise commit message that describes WHAT changed and WHY. Use conventional commit style if the change is clear. Always end with:
   `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`
5. Commit using a HEREDOC to avoid shell escaping issues
6. Push to `origin main`
7. Confirm push succeeded and show the commit hash

If the user provided a message after the slash command, use that as the commit message subject line: $ARGUMENTS
