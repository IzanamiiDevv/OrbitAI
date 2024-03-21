const texts = document.querySelector(".texts");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

recognition.addEventListener("result", (e) => {
  const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  console.log(text)
  if (e.results[0].isFinal) {
    if (text.includes("how are you")) {
      console.log("Okay")
    }
    if (
      text.includes("what's your name") ||
      text.includes("what is your name")
    ) {
      console.log("Nigga")
    }
    if (text.includes("open my YouTube")) {
      console.log("Okay")
      console.log("opening youtube");
      window.open("https://www.youtube.com/channel/UCdxaLo9ALJgXgOUDURRPGiQ");
    }
    p = document.createElement("p");
  }
});

recognition.addEventListener("end", () => {
  recognition.start();
});

recognition.start();
