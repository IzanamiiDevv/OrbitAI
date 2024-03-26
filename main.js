
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
  disp.style.border = '2px solid lawngreen'
  status.innerText = "Listening..."
  disp.innerText = text;
  if (e.results[0].isFinal) {
    disp.style.border = 'none';
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
    const regex = /search\s+(.+)/i; // Matches "search" followed by one or more characters
    // Execute the regular expression on the input string
    const match = input.match(regex);

    let searchQuery;

  
    if (match && match.length > 1) {
      // Extract the search query from the matched groups
      searchQuery = match[1].trim(); // Extracted search query

      window.open(`https://www.google.com/search?q=${searchQuery}&rlz=1C1JZAP_enUS994US995&oq=hello&gs_lcrp=EgZjaHJvbWUqDQgAEAAY4wIYsQMYgAQyDQgAEAAY4wIYsQMYgAQyCggBEC4YsQMYgAQyCggCEC4YsQMYgAQyDQgDEAAYsQMYgAQYigUyCggEEC4YsQMYgAQyBggFEEUYPTIGCAYQRRg8MgYIBxBFGDzSAQg1MzYxajBqNKgCALACAA&sourceid=chrome&ie=UTF-8`);
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