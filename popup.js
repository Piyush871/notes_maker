document.getElementById('inject').addEventListener('click', function() {
    let url = document.getElementById('url').value;
    if (url === '') {
    url = "https://chat.openai.com/?model=gpt-4"
    }
    let topics = document.getElementById('topics').value.split(',');
  
    // Send a message to the background script
    chrome.runtime.sendMessage({
      action: "inject",
      url: url,
      topics: topics
    });
  });
  