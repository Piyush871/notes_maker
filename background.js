chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'inject') {
      // Open the URL in a new tab
      chrome.tabs.create({ url: message.url }, (tab) => {
        // Wait for the tab to be fully loaded
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (info.status === 'complete' && tabId === tab.id) {
            // Remove the listener to avoid unnecessary executions
            chrome.tabs.onUpdated.removeListener(listener);
  
            // Execute the content script
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              files: ['contentScript.js']
            }, () => {
              chrome.tabs.sendMessage(tab.id, {
                action: 'injectTopics',
                topics: message.topics
              });
            });
          }
        });
      });
    }
  });
  