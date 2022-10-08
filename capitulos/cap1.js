//const textarea = document.querySelector("textarea"),
const p1 = document.getElementById("p1").innerHTML.trim(), //toma el elemento parrafo por el id
p2 = document.getElementById("p2").innerHTML.trim(),
p3 = document.getElementById("p3").innerHTML.trim(),
p4 = document.getElementById("p4").innerHTML.trim(),
p5 = document.getElementById("p5").innerHTML.trim(),
p6 = document.getElementById("p6").innerHTML.trim(),
p7 = document.getElementById("p7").innerHTML.trim(),
p8 = document.getElementById("p8").innerHTML.trim(),
p9 = document.getElementById("p9").innerHTML.trim(),
p10 = document.getElementById("p10").innerHTML.trim(),
p11= document.getElementById("p11").innerHTML.trim(),
voiceList = document.querySelector("select");
speechBtn = document.querySelector("button");

let synth = speechSynthesis,
isSpeaking = true;



const textarea = p1 + p2 + p3 + p4 +p5 +p6+p7+p8+p9+p10+p11;
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