console.log("Loaded extension");
let block = false;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var safesite = true;
  chrome.storage.sync.get(['nowState'], function(data) {
    block = data['nowState'];
  });
  if (changeInfo.status == "loading" && block === true) {
    let check = tab.url;
    console.log(tab.url);
      if(check.search(/reddit|facebook|youtube|pornhub|porn|instagram|twitter/i)>=0){
        safesite = false;
      }
      if (!safesite) {
          chrome.tabs.update(tabId, { url: 'splash.html' });
      }
  }
});

function blockRequest(details) {
  return { cancel: true };
}

var status = false;

window.addEventListener("DOMContentLoaded", contentLoaded(), false);
console.log("1");



function contentLoaded() {
  console.log("2");

  var chars = [],
    container = document.getElementById("container");

  window.addEventListener(
    "keypress",
    function(e) {
      if (e.keyCode !== 13) {
        chars.push(e.key);
        checkPage();
      }
      console.log("-=--=--=-");
    },
    false
  );

  window.addEventListener(
    "keyup",
    function(e) {
      if (e.keyCode === 13) {
        container.textContent = chars.join("");
        chars = [];
        checkPage();
      }
    },
    false
  );
}

function updateFilters(urls) {
  console.log("3");

  if (chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) checkPage();
  chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
  chrome.webRequest.onBeforeRequest.addListener(
    blockRequest,
    {
      urls: [
        "*://*.facebook.com/*",
        "*://*.facebook.net/*",
        "*://*.youtube.com/*"
      ]
    },
    ["blocking"]
  );
}

//updateFilters();


function checkPage() {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
    var url = tabs.url;
    if (
      urlToStr(url).includes("youtube") ||
      urlToStr(url).includes("facebook")
    ) {
      xhrSend(url);
    } else {
      console.log("no youtube");
    }
  });
}

function urlToStr(uri) {
  var uri_enc = encodeURIComponent(uri);
  var uri_dec = decodeURIComponent(uri_enc);
  // var res = "Encoded URI: " + uri_enc + "<br>" + "Decoded URI: " + uri_dec;
  return uri_dec;
}
