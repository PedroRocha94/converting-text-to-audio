let textarea = document.querySelector('#textarea');
let voices = document.querySelector('#voices');
let button = document.querySelector('#button');
let selectedVoice = 0;

window.speechSynthesis.addEventListener('voiceschanged', () => {
  let voiceList = window.speechSynthesis.getVoices();
  console.log(voiceList)
  for(let voice in voiceList) {
    let optionElem = document.createElement('option');
    optionElem.setAttribute('value', voice);
    optionElem.innerText = voiceList[voice].name;
    voices.appendChild(optionElem);
  }
});

button.addEventListener('click', () => {
  if(textarea.value !== '') {
    let voiceList = window.speechSynthesis.getVoices();
    let ut = new SpeechSynthesisUtterance(textarea.value);
    ut.voice = voiceList[selectedVoice];
    window.speechSynthesis.speak(ut);
  }
});

voices.addEventListener('change', () => {
  selectedVoice = parseInt(voices.value);
});

function updateStatus() {
  if(window.speechSynthesis.speaking) {
    voices.setAttribute('disabled', 'disabled');
    button.setAttribute('disabled', 'disabled');
  } else {
    voices.removeAttribute('disabled');
    button.removeAttribute('disabled');
  }
};

setInterval(updateStatus, 100);