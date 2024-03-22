
//Declaration
let disp = document.getElementById("display");
const texts = document.querySelector(".texts");
let status = document.getElementById('status');

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
      } else {
        // If no match found or if the match doesn't have the expected structure
        console.log("Cant Alocate the Query")
      }
    }
    if(text.includes("what is your name"))console.log(AI);
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
}

function searchCMD(text){
  function extractSearchQuery(input) {
    // Regular expression to match the search query
    const regex = /search\s+(.+)/i; // Matches "search" followed by one or more characters
  
    // Execute the regular expression on the input string
    const match = input.match(regex);
  
    if (match && match.length > 1) {
      // Extract the search query from the matched groups
      const searchQuery = match[1].trim(); // Extracted search query

      window.open(`https://www.google.com/search?q=${searchQuery}&rlz=1C1JZAP_enUS994US995&oq=izanamii&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgkIARAuGAoYgAQyCQgCEAAYChiABDIJCAMQLhgKGIAEMgkIBBAAGAoYgAQyCQgFEAAYChiABDIJCAYQABgKGIAEMgwIBxAuGAoY1AIYgAQyDAgIEC4YChjUAhiABNIBCDM1MDBqMGo5qAIAsAIA&sourceid=chrome&ie=UTF-8#cobssid=s`);
    } else {
      // If no match found or if the match doesn't have the expected structure
      console.log("Cant Alocate the Query")
    }
  }
  extractSearchQuery(text)
}