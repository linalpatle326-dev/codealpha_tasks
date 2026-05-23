const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const progressArea = document.querySelector(".progress-area");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const coverImg = document.getElementById("cover");
const songName = document.getElementById("song-name");
const artistName = document.getElementById("artist");
const volumeSlider = document.getElementById("volume");

let songIndex = 0;
let isPlaying = false;

const songs = [
  {
    name: "Summer Vibes",
    artist: "AudioCoffee",
    path: "assets/songs/song1.mp3",
    cover: "assets/images/cover1.jpg"
  },
  {
    name: "Chill Night",
    artist: "FASSounds",
    path: "assets/songs/song2.mp3",
    cover: "assets/images/cover2.jpg"
  },
  {
    name: "Upbeat Morning",
    artist: "ComaStudio",
    path: "assets/songs/song3.mp3",
    cover: "assets/images/cover3.jpg"
  }
];

function loadSong(song) {
  songName.textContent = song.name;
  artistName.textContent = song.artist;
  audio.src = song.path;
  coverImg.src = song.cover;
}

function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  audio.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  audio.pause();
}

playBtn.addEventListener("click", () => {
  isPlaying? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener("timeupdate", (e) => {
  const { currentTime, duration } = e.srcElement;
  let progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) currentSec = `0${currentSec}`;
  currentTimeEl.textContent = `${currentMin}:${currentSec}`;
});

audio.addEventListener("loadeddata", () => {
  let durationMin = Math.floor(audio.duration / 60);
  let durationSec = Math.floor(audio.duration % 60);
  if (durationSec < 10) durationSec = `0${durationSec}`;
  durationEl.textContent = `${durationMin}:${durationSec}`;
});

progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = audio.duration;
  audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playSong();
});

volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});

loadSong(songs[songIndex]);
audio.volume = 0.7;