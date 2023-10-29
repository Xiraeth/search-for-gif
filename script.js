"use strict";

const searchBtn = document.querySelector("#searchBtn");
const regenerateBtn = document.querySelector("#regenerateBtn");
const image = document.querySelector("img");
const input = document.querySelector("input");

let previousTerm = "";
let searchTerm;
let isSearching = false;

async function generateGif(search) {
  const url = `https://api.giphy.com/v1/gifs/translate?key=yICt0YuVB4S9m0Bd3iozdCuVoWZRgFn5&s=${search}`;
  const request = await fetch(url);
  const response = await request.json();

  if (response.data.length == 0) return;
  else image.src = response.data.images.downsized_large.url;
}

input.addEventListener("focus", (e) => {
  isSearching = true;
});

input.addEventListener("blur", (e) => {
  isSearching = false;
});

searchBtn.addEventListener("click", (e) => {
  searchTerm = input.value;
  previousTerm = searchTerm;
  if (!searchTerm) {
    image.src = "images/notFound.gif";
  } else {
    generateGif(searchTerm);
  }
});

window.addEventListener("keydown", (e) => {
  if (!isSearching) return;
  if (e.key == "Enter") {
    searchTerm = input.value;
    previousTerm = searchTerm;
    if (!searchTerm) {
      image.src = "images/notFound.gif";
    } else {
      generateGif(searchTerm);
    }
  }
});

regenerateBtn.addEventListener("click", function (e) {
  if (previousTerm == "") return;
  generateGif(previousTerm);
});
