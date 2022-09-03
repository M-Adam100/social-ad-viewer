try {

  // On Installed version
  chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed")
  });
  //ON page change
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log(tab);
    if (
      (tab.url.includes("https://www.facebook.com/")) &&
      changeInfo.status == "complete"
    ) {

      chrome.scripting.executeScript({
        files: ["scripts/show-ads.js"],
        target: { tabId: tab.id },
      });
    }
  });
} catch (e) {
  console.log(e);
}
