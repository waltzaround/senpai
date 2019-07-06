function xhrSend(url) {
  var xhr = new XMLHttpRequest();

  try {
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
      if (xhr.statusText.includes("ERR_BLOCKED_BY_CLIENT")) {
        window.open("splash.html");
      } else {
        document.write("======================");
        console.log("+========+++++");
      }
      // if (xhr.readyState === 4) {
      //     if (xhr.status === 200) {
      //     console.log(xhr.responseText)
      //     } else {
      //     console.log("Error", xhr.statusText);
      //     }
      // }
    };

    xhr.send();
  } catch (error) {
    console.log("ConsoleLog \n " + JSON.stringify(xhr));
    console.log("Error Catched" + error);
  }
}
