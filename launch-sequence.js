// First, register the service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );
      console.log("ServiceWorker registration successful:", registration.scope);
    } catch (error) {
      console.error("ServiceWorker registration failed:", error);
    }
  });
}

// async function so that we can use the await keyword
async function submitCode() {
  try {
    // Your investigation code should go here
    // Leave your lines of code in when you find something out, so that you can always come back to it and see how you got there
    //When “Unexpected end of JSON input” is raised, your code is probably parsing: An empty string. An empty array. Or an incomplete (a.k.a malformed) JSON data.6 Feb 2023
    const response = await fetch("/api/logs");
    const data = await response.json();
    // console.log(response);
    //console.log(data);
    const chris = await fetch("/api/personnel/8");
    const chrisJsn = await chris.json();
    // console.log(chrisJsn);
    const chrisMessages = await fetch("/api/messages?to=8.message");
    const chrisMessagesJsn = await chrisMessages.json();
    //console.log(chrisMessagesJsn);
    //"Why oh why did you change the launch codes to that? You can't just have them as your name, silly. I've changed it to the ship's dog's name because he'll never talk. Slightly better if you ask me... which you never do :("
    const dogGet = await fetch("/api/personnel/11");
    const dogData = await dogGet.json();
    // console.log(dogData); // Rover

    const submitResponse = await fetch("/api/codes", {
      method: "POST",
      body: JSON.stringify({
        enter: dogData.name.toUpperCase(),
      }),
    });
    const sendData = await submitResponse.json();
    console.log(sendData);

    const img = document.getElementById("launch");
    img.src = "success.gif";

    // const getHint = await fetch("api/hint");
    // const myHint = await getHint.json();
    // console.log(myHint);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

// Wait for service worker to be ready before making requests
navigator.serviceWorker.ready
  .then(() => {
    submitCode(); // calls the function above to run your code
  })
  .catch((error) => {
    console.error("Service Worker not ready:", error);
  });

//GET:
// const searchForObjectAt = await fetch('/urlItsAt/${placeToLookDeeper}');
// const giveMeObjectFound = await searchForAt.json();
// console.log(giveMeObjectFound);

//????????  //POST:
// const sendReply = await fetch('/urlItsAt/${placeToLookDeeper}', {
// method : "POST",
// body: JSON.stringify({
//    enter: itemToSend.deeper,
//})
//});
// const sendYourStuff = await sendReply.json();
// console.log(sendYourStuff);

("Why oh why did you change the launch codes to that? You can't just have them as your name, silly. I've changed it to the ship's dog's name because he'll never talk. Slightly better if you ask me... which you never do :(");
