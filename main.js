const texts = document.querySelector(".texts");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.querySelector(".texts p");

const commands = [];

recognition.addEventListener("result", (e) => {
  let p = document.querySelector(".texts p");
  const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("").toLowerCase();
    console.log(text);
    p.innerText = text;
  if (e.results[0].isFinal) {
    console.log("Aba Ewan",text);
    p.innerText = text;
    commands.push(text);
    if (text.includes("give me the array")) {
        console.log(commands)
      p.innerText = "I am fine";
    }
    if (
      text.includes("what's your name") ||
      text.includes("what is your name")
    ) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "My Name is Cifar";
      texts.appendChild(p);
    }
    if (text.includes("open my youtube")) {
      p = document.createElement("p");
      p.classList.add("replay");
      p.innerText = "opening youtube channel";
      texts.appendChild(p);
      console.log("opening youtube");
      window.open("https://www.youtube.com");
    }
    p = document.createElement("p");
  }
});

recognition.addEventListener("end", () => {
  recognition.start();
});

recognition.start();
