const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

let isPlaying = false;

// Play Pause
playBtn.addEventListener("click", () => {
    if(isPlaying){
        audio.pause();
        playBtn.innerHTML = "▶";
    } else {
        audio.play();
        playBtn.innerHTML = "⏸";
    }

    isPlaying = !isPlaying;
});

// Progress Bar
audio.addEventListener("timeupdate", () => {
    progress.max = audio.duration;
    progress.value = audio.currentTime;
});

progress.addEventListener("input", () => {
    audio.currentTime = progress.value;
});

// Volume Control
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});