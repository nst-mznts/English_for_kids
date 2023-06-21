import { playAudio } from "../index.js";
import { handleCardClick } from "./game.js";
import { shuffle } from "./game.js";

export let arrayOfIndex = [];

export function check() {
  if (document.querySelector(".toggle").checked) {
    changeGameMode(false, "#ADACAC", "#87C159");
    document.querySelector("footer").style.height = "0";
    document.querySelector(".start").style.display = "none";
    document.querySelectorAll(".play-title").forEach((element) => {
      element.style.display = "flex";
    });
    document.querySelectorAll(".play-card").forEach((card) => {
      card.addEventListener("click", playAudio);
    });
    document.querySelectorAll(".main-title").forEach((element) => {
      element.style.marginTop = "25px";
    });
    document.querySelectorAll(".play-image").forEach((img) => {
        img.removeEventListener("click", handleCardClick);
    });
    document.querySelectorAll(".play-mode").forEach((element) => {
      element.style.display = "none";
    });
  } else {
    changeGameMode(true, "#F3C301", "#ADACAC");
    if (document.querySelector(".main-link.active")) {
      document.querySelector("footer").style.height = "0";
      document.querySelector(".start").style.display = "none";
    } else {
      document.querySelector("footer").style.height = "60px";
      document.querySelector(".start").style.display = "flex";
    }
    document.querySelectorAll(".play-mode").forEach((element) => {
      element.style.display = "block";
    });
    document.querySelectorAll(".main-title").forEach((element) => {
      element.style.marginTop = "1px";
    });
    document.querySelectorAll(".play-title").forEach((element) => {
      element.style.display = "none";
    });
    document.querySelectorAll(".play-card").forEach((card) => {
      card.removeEventListener("click", playAudio);
    });
    document.querySelectorAll(".play-image").forEach((img) => {
        img.addEventListener("click", handleCardClick);
    });
    arrayOfIndex = shuffle(document.querySelectorAll(".play-card").length);
  }
}

function changeGameMode(boolean, playColor, trainColor) {
  document.querySelector(".toggle").checked = boolean;
  document.querySelector(".play").style.color = playColor;
  document.querySelector(".train").style.color = trainColor;
}