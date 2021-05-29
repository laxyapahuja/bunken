let s = document.createElement('script');

// s.src = chrome.runtime.getURL('support/goodreads/script.js'); //Uncomment this and comment the next line if you don't want auto-updates otherwise leave it as is
s.src = 'https://api.bunken.tk/support/goodreads.js'

s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);