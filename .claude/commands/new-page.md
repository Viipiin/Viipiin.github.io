Scaffold a new vault-protected HTML page in the pages/ directory.

Arguments (required): $ARGUMENTS — provide the page filename (kebab-case, no .html) and a one-line description of the page topic.

Steps:
1. Confirm the filename does not already exist in pages/
2. Ask the user for the page's design intent if not provided in $ARGUMENTS (colour scheme, layout type, audience)
3. Create the file at `pages/<filename>.html` using PowerShell Set-Content with this exact head structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="../js/vault.js"></script>
  <link rel="stylesheet" href="../css/base.css">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PAGE TITLE HERE</title>
  <style>
    /* Page-specific styles go here */
  </style>
</head>
<body>
  <!-- CONTENT HERE -->
</body>
</html>
```

4. Add a vault entry to `index.html` in the correct group — use the format from CLAUDE.md
5. Report the file path and confirm the head structure is correct

Remember: vault.js MUST be first, base.css MUST be second — no exceptions.
