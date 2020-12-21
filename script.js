"use strict";
const playerContainer = document.querySelector(".player-container");
const playButton = playerContainer.querySelector(".play");
const outline = playerContainer.querySelector(".moving-outline circle");
const timeDisplay = playerContainer.querySelector(".time-display");
const song = document.querySelector(".sound");
const video = document.querySelector(".video-container video");
const soundsButton = document.querySelector(".sound-picker");
const timeSelect = document.querySelector(".time-select");

const outlineLength = outline.getTotalLength();
let fakeDuration = 60;
outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

timeSelect.addEventListener("click", (event) => {
  const timeButton = e.target.closest("button");
  if (timaButton && timeButton.dataset.time) {
    selectedTime(event.target);
  }
});
soundsButton.addEventListener("click", (event) => {
  const selectedButton = event.target.closest("button");
  if (selectedButton && selectedButton.dataset.sound) {
    selectSongMeditation(selectedButton);
  }
});

playerContainer.addEventListener("click", (event) => {
  if(event.target.classList.contains("play")) {
    checkPlaying();
  }
    
});
function checkPlaying() {
  if (song.paused) {
    song.play();
    video.play();
    playButton.src = "Image/svg/pause.svg";
  } else {
    song.pause();
    video.pause();
    playButton.src = "Image/svg/play.svg";
  }
}

song.ontimeupdate = () => {
  const currentTime = song.currentTime;
  const elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;
  timeDisplay.textContent = `${checkZeroInTime(minutes)}:${checkZeroInTime(seconds)}`;
  if (currentTime >= fakeDuration) {
    song.pause();
    video.pause();
    song.currentTime = 0;
    playButton.src = "Image/svg/play.svg";
  }
};

function selectSongMeditation(elem) {
  video.src = elem.dataset.video;
  song.src = elem.dataset.sound;
  checkPlaying();
}
function selectedTime(elem) {
  fakeDuration = elem.dataset.time;
  const seconds = Math.floor(fakeDuration % 60);
  const minutes = Math.floor(fakeDuration / 60);
  timeDisplay.textContent = `${checkZeroInTime(minutes)}:${checkZeroInTime(seconds)}`;
  song.currentTime = 0;
}

function checkZeroInTime(time) {
    if(time < 10) {
        return `0${time}`;
    } 
    return time;
}
