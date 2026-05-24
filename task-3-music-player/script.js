const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('#progress');
const progressContainer = document.querySelector('#progress-container');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const cover = document.querySelector('#cover');
const currentTimeEl = document.querySelector('#current-time');
const durationEl = document.querySelector('#duration');

const songs = [
  {
    name: "Sample Song 1",
    artist: "Artist 1",
    path: "assets/songs/sample1.mp3",
    img: "assets/images/cover1.jpg"
  },
  {
    name: "Sample Song 2", 
    artist: "Artist 2",
    path: "assets/songs/sample2.mp3",
    img: "assets/images/cover2.jpg"
  },
  {
    name: "Sample Song 3",
    artist: "Artist 3", 
    path: "assets/songs/sample3.mp3",
    img: "assets/images/cover3.jpg"
  }
];

let songIndex = 0;

function loadSong(song) {
  title.innerText = song.name;
  artist.innerText = song.artist;
  audio.src = song.path;
  cover.src = song.img;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  
  // Time
  const durationMinutes = Math.floor(duration / 60) || 0;
  let durationSeconds = Math.floor(duration % 60) || 0;
  if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
  durationEl.innerText = `${durationMinutes}:${durationSeconds}`;
  
  const currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
  currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  isPlaying? pauseSong() : playSong();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

// Init
loadSong(songs[songIndex]);
