import { playAudio } from "../index.js";
import { handleCardClick } from "./game.js";
import { shuffle } from "./game.js";

export let arrayOfIndex = [];

export function check() {
  if (document.querySelector(".toggle").checked) {
    document.querySelector(".toggle").checked = false;
    document.querySelector(".play").style.color = "#ADACAC";
    document.querySelector(".train").style.color = "#87C159";
    document.querySelector("footer").style.height = "0";
    document.querySelector(".start").style.display = "none";
    document.querySelectorAll(".play-title").forEach((element) => {
      element.style.display = "flex";
    });
    document.querySelectorAll(".play-card").forEach((card) => {
      card.addEventListener("click", playAudio);
    });
    document.querySelectorAll(".play-image").forEach((img) => {
        img.removeEventListener("click", handleCardClick);
    });
  } else {
    document.querySelector(".toggle").checked = true;
    document.querySelector(".play").style.color = "#F3C301";
    document.querySelector(".train").style.color = "#ADACAC";
    document.querySelector("footer").style.height = "60px";
    document.querySelector(".start").style.display = "flex";
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