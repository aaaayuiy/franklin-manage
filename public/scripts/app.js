(function() {
  "use strict";

  window.onload = function() {
    let content =
      localStorage.getItem("qrCodeMessage") || "QR Codes are great!";
    //$("#qrCodeMessage").val(content);
    $("#qrcode").qrcode(content);
  };

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").then(function() {
      console.log("Service Worker Registered");
    });
  }
})();

// helper functions ----------

function logResult(result) {
  console.log(result);
  const message = document.getElementById("message");
  message.textContent = JSON.stringify(result["body"][0]);

  qrMessage = JSON.stringify(result["body"][0]);
  localStorage.setItem("qrCodeMessage", qrMessage);
  $("#qrcode").html("");
  $("#qrcode").qrcode(qrMessage);
}

function logError(error) {
  console.log("Looks like there was a problem:", error);
}

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function readResponseAsJSON(response) {
  return response.json();
}

// Fetch JSON ----------

function fetchJSON() {
  fetch(
    "https://dr0539s4c6.execute-api.us-east-1.amazonaws.com/getTest/parking-sessions/"
  )
    .then(validateResponse)
    .then(readResponseAsJSON)
    .then(logResult)
    .catch(logError);
}
const jsonButton = document.getElementById("buttonGenerate");
jsonButton.addEventListener("click", fetchJSON);
