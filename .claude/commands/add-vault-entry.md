Add a new entry card to the vault in index.html.

Arguments: $ARGUMENTS — provide: page path (e.g. pages/my-page.html), card colour (blue/purple/green/orange/teal), emoji icon, title, and description.

Steps:
1. Read index.html around line 1370–1420 to find the correct insertion group
2. Identify the right section by matching the page topic to an existing group heading
3. Insert the card using this format:

```html
<a href="pages/PAGE-NAME.html" class="vk-a vk-COLOUR" target="_blank" rel="noopener noreferrer">
  <div class="vk-ico">EMOJI</div>
  <div class="vk-txt">
    <span class="vk-t">TITLE</span>
    <span class="vk-d">DESCRIPTION · key topics</span>
  </div>
  <span class="vk-arr">→</span>
</a>
```

4. Insert AFTER the last card in the matching group, BEFORE the group's closing `</div>`
5. Confirm the entry was added and show the surrounding 5 lines for verification

Available colours: vk-blue · vk-purple · vk-green · vk-orange · vk-teal
