// Declaration
let disp = document.getElementById("display");
const texts = document.querySelector(".texts");
let status = document.getElementById('status');
let response = document.getElementById('response');
const voiceList = document.querySelector("select");

let synth = speechSynthesis,
isSpeaking = true,
isRecognitionPaused = false; // Add a flag to track if recognition is paused

let AI = "orbit";

// Cache
const chache = [];

// API Initialization
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
    console.log(synth.speaking);
}

// Event Listener For Recording The Speech
recognition.addEventListener("result", (e) => {
    // Check if recognition is paused, if it is, return early
    if (synth.speaking) {
      console.log('test')
      response.innerText = "";
      return
    };

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

        if(response.innerText !== ""){
            if(!synth.speaking){
                if(isCommand(text,AI)){
                    command(text)
                }
                if(text.includes("can i call you")){
                    const regex = /you\s+(.+)/i;
                    const match = text.match(regex);
                    if (match && match.length > 1) {
                        const newName = match[1].trim(); 
                        AI = newName;
                        console.log(AI);
                        response.innerHTML = `Sure!, now you can Call me <b>${newName}</b>`
                    } else {
                        response.innerHTML = "Sorry Something went Wrong";
                        console.log("Can't Allocate the Query");
                    }
                }
                if(text.includes("what is your name")){
                  console.log(AI)
                    response.innerHTML = `Hi my Name is <b>${AI}</b>`
                };
                synth.resume();
                textToSpeech(response.innerText);
            }
        }
    }
});


// Event listener to track when synth is speaking
synth.addEventListener('start', () => {
    // Pause recognition when synth starts speaking
    recognition.stop();
    isRecognitionPaused = true;
});

synth.addEventListener('end', () => {
    // Resume recognition when synth finishes speaking
    setInterval(()=>{
      recognition.start();
      isRecognitionPaused = false;
      console.log("Hi")
    },1000)
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