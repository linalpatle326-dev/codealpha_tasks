
const songs = [
{
    title: "Pehla Nasha",
    artist: "Udit Narayan",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
},
{
    title: "Tip Tip Barsa Pani",
    artist: "Alka Yagnik",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
},
{
    title: "Chura Ke Dil Mera",
    artist: "Kumar Sanu",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
},
{
    title: "Tu Cheez Badi Hai Mast",
    artist: "Udit Narayan",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
},
{
    title: "Ole Ole",
    artist: "Abhijeet",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
}
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

let songIndex = 0;
let isPlaying = false;

loadSong(songs[songIndex]);

function loadSong(song){
    title.innerHTML = song.title;
    artist.innerHTML = song.artist;
    audio.src = song.src;
}

playBtn.addEventListener("click", () => {

    if(isPlaying){
        audio.pause();
        playBtn.innerHTML = "▶";
    }
    else{
        audio.play();
        playBtn.innerHTML = "⏸";
    }

    isPlaying = !isPlaying;
});

nextBtn.addEventListener("click", () => {

    songIndex++;

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    audio.play();
    playBtn.innerHTML = "⏸";
    isPlaying = true;
});

prevBtn.addEventListener("click", () => {

    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    audio.play();
    playBtn.innerHTML = "⏸";
    isPlaying = true;
});

audio.addEventListener("timeupdate", () => {

    progress.max = audio.duration;
    progress.value = audio.currentTime;
});

progress.addEventListener("input", () => {

    audio.currentTime = progress.value;
});

volume.addEventListener("input", () => {

    audio.volume = volume.value;
});