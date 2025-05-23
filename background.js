chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
  try {
    const url = new URL(downloadItem.finalUrl || downloadItem.url);
    const domain = url.hostname.replace(/^www\./, '').replace(/\./g, '_');
    const filenameParts = downloadItem.filename.split('/');
    const originalName = filenameParts.pop();
    const taggedName = originalName.replace(/(.*)(\.[^.]*)$/, `$1_${domain}$2`);
    suggest({ filename: [...filenameParts, taggedName].join('/') });
  } catch (e) {
    suggest();
  }
});