//const textarea = document.querySelector("textarea"),
const text = document.getElementById("content").innerHTML.trim(), //toma el elemento parrafo por el id

voiceList = document.querySelector("select");
speechBtn = document.querySelector("button");

let synth = speechSynthesis,
isSpeaking = true;


const textarea = text.replace( /(<([^>]+)>)/ig, '');
console.log(textarea)

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
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea !== ""){
        if(!synth.speaking){
            textToSpeech(textarea);
        }
        
        if(textarea.length > 80){
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Comenzar a escuchar";
                }else{
                }
            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pausar";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Reproducir";
            }
        }else{
            speechBtn.innerText = "Comenzar a escuchar";
        }
    }
});