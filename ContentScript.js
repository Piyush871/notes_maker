

function searchQuery(query) {
  try {
      document.querySelector('button[data-state="closed"]').click();
  } catch (e) {
      console.log(e);
  }
  
  var textarea = document.getElementById("prompt-textarea");
  textarea.value = query;

  var event = new Event("input", { bubbles: true });
  textarea.dispatchEvent(event);

  var enterEvent = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      keyCode: 13,
  });
  textarea.dispatchEvent(enterEvent);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'injectTopics') {
      const topics = message.topics;  
      console.log(topics);
      setTimeout(() => {
      searchQuery(topics[0])
      }, 20000);
      
      for (var i = 1; i < topics.length; i++) {
        topics[i] = topics[i].trim();
        console.log(topics[i]);
        (function(index) {
            setTimeout(() => {
                searchQuery(topics[index])
            }, 80000 * index);
        })(i);
    }
    
  }
});
