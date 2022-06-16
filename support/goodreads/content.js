let s = document.createElement('script');

s.src = chrome.runtime.getURL('support/goodreads/script.js');

document.head.appendChild(s);