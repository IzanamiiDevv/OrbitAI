
//Declaration
let disp = document.getElementById("display");
const texts = document.querySelector(".texts");
let status = document.getElementById('status');
let response = document.getElementById('response');

let AI = "orbit";

//Cache
const chache = [];

//Api Initial
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

//EventListner For Recording The Speech
recognition.addEventListener("result", (e) => {
  const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  console.log(text);
  status.innerText = "Listening..."
  disp.innerText = text;
  if (e.results[0].isFinal) {
    status.innerText = "Say Something...";
    disp.innerText = text;
    chache.push(text);
    if(isCommand(text,AI)){
      command(text)
    }
    if(text.includes("can i call you")){
      const regex = /you\s+(.+)/i;
      const match = text.match(regex);
      if (match && match.length > 1) {
        // Extract the search query from the matched groups
        const newName = match[1].trim(); // Extracted search query
  
        AI = newName;
        response.innerHTML = `Sure!, now you can Call me <b>${newName}</b>`
      } else {
        response.innerHTML = "Sorry Something went Wrong";
        console.log("Cant Alocate the Query");
      }
    }
    if(text.includes("what is your name")){
      response.innerHTML = `Hi my Name is <b>${AI}</b>`
    };
  }
});

recognition.addEventListener("end", () => {
  recognition.start();
});

recognition.start();


function isCommand(command,prefix){
  const cmd = command.split(' ');
  return cmd[0] == prefix;
}

function command(text){
  if(text.includes("search")){searchCMD(text)}
  if(text.includes("what is")){mathCMD(text)}
}

function searchCMD(text){
  function extractSearchQuery(input) {
    // Regular expression to match the search query
    const regex = /search\s+(.*?)\s+on\s+/i; // Matches "search" followed by one or more characters
    // Execute the regular expression on the input string
    const match = input.match(regex);

    let searchQuery;

  
    if (match && match.length > 1 && input.includes("on new tab")) {
      // Extract the search query from the matched groups
      searchQuery = match[1].trim(); // Extracted search query

      window.open(`https://www.google.com/search?q=${searchQuery}&rlz=1C1JZAP_enUS994US995&oq=izanamii&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgkIARAuGAoYgAQyCQgCEAAYChiABDIJCAMQLhgKGIAEMgkIBBAAGAoYgAQyCQgFEAAYChiABDIJCAYQABgKGIAEMgwIBxAuGAoY1AIYgAQyDAgIEC4YChjUAhiABNIBCDM1MDBqMGo5qAIAsAIA&sourceid=chrome&ie=UTF-8#cobssid=s`);
    } else {
      window.location.href = "#web"
    }
    if(match && match.length > 1 && input.includes("on new tab ang go to image")){
      searchQuery = match[1].trim();
      window.open(`https://www.google.com/search?sca_esv=ff48bec18c46a1e3&rlz=1C1JZAP_enUS994US995&sxsrf=ACQVn0-9CspMToKIdkT8gazL7nx0EIknbQ:1711107050501&q=${searchQuery}&uds=AMwkrPsrDfxfgTr36wdxCAEhRxQNB5MQLH7fYdE9QiqXnGjv3-FFMq76dgvyEag4ac3AONMMS6MrBfOBNHpDK9HelGYWeBJIb66T-J9gYEvleerGlBABHmJADacacywv2xH6M82V4CSt1UPSmlPSk9gqTv1RHyehVNT1RQWGrQvmuxTH2_r6q_dF4U3NITZxNhuBeIXArt-BxR4xlyFABaNoiDjGZ6MBZGZtpMYOcmSi9FqEL3AA2GQvRV35MQZpGDOa2HidZFA2CwYKisRco2y4YzHPRwmNaVOncnHD-bRA2RwJzSm5Nqz_-bPnu629CY3XFTgoPK10&udm=2&prmd=vinsmbtz&sa=X&ved=2ahUKEwjzmau_4oeFAxW-Z_UHHeilAmsQtKgLegQIDRAB&biw=1366&bih=679&dpr=1`);
    }
  }
  extractSearchQuery(text)
}

function mathCMD(text){
  const regex = /is\s+(.+)/i; 
    const match = text.match(regex);
    let evaluate = match[1].trim();
    function isMath(query){
      return true;
    }
  
    if (match && match.length > 1 && isMath(evaluate)){ // Extracted search query
      response.innerHTML = `The Answer is ${eval(evaluate)}`
    } else {
      // If no match found or if the match doesn't have the expected structure
      console.log("Cant Alocate the Query")
    }
}