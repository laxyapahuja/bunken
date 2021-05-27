let s = document.createElement('script');

s.src = chrome.runtime.getURL('support/goodreads/script.js');

s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);