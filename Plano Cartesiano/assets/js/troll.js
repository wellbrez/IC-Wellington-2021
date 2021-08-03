var audio = new Audio("trollaudio.mp3");

audio.loop = true;

audio.onended = function(){
audio.play();
}
function playaudio()
{
    troll = document.getElementById("troll");
    troll.style.maxWidth="300px";
    audio.play();
}