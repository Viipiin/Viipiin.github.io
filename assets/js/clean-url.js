(function applyCleanUrl() {
  const browserWindow = globalThis.window;
  if (!browserWindow?.history?.replaceState) {
    return;
  }

  const path = browserWindow.location.pathname;
  let cleanedPath = path;

  if (cleanedPath.endsWith('/index.html')) {
    cleanedPath = cleanedPath.slice(0, -10) || '/';
  } else if (cleanedPath.endsWith('.html')) {
    cleanedPath = cleanedPath.slice(0, -5);
  }

  if (cleanedPath !== path) {
    browserWindow.history.replaceState(
      browserWindow.history.state,
      '',
      cleanedPath + browserWindow.location.search + browserWindow.location.hash
    );
  }
})();
