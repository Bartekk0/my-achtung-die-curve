import { playersTemplate } from "../data/players.js";
import ensureVisibleColor from "./scripts/adjustColor.js";
import {
  handleCheckbox,
  savePlayerPreferences,
} from "./scripts/uiFunctions.js";

const playersContainer = document.getElementById("playersContainer");

playersTemplate.forEach((player, i) => {
  const playerDiv = document.createElement("div");
  playerDiv.className = "player";

  const idInput = document.createElement("input");
  idInput.type = "text";
  idInput.style.color = player.color ?? "#ffffff";
  idInput.value = `${i + 1}`;
  idInput.maxLength = 2;
  idInput.addEventListener("input", (event) => {
    const value = event.target.value;
    event.target.value = value.replace(/\D/g, ""); // Remove non-digit characters
  });
  playerDiv.appendChild(idInput);

  const colorPicker = document.createElement("input");
  colorPicker.type = "color";
  colorPicker.value = player.color ?? "#ffffff";
  colorPicker.id = `color-${i}`;
  colorPicker.onblur = () => {
    console.log(ensureVisibleColor(colorPicker.value));

    colorPicker.value = ensureVisibleColor(colorPicker.value);
    colorPicker.oninput();
  };

  playerDiv.appendChild(colorPicker);

  const inputName = document.createElement("input");
  inputName.type = "text";
  inputName.value = player.name;
  inputName.spellcheck = false;
  inputName.maxLength = 15;
  inputName.style.color = player.color ?? "#ffffff";
  inputName.id = `name-${i}`;
  playerDiv.appendChild(inputName);

  const inputCheckbox = document.createElement("input");
  inputCheckbox.type = "checkbox";
  inputCheckbox.name = "playersCheckBox";
  inputCheckbox.id = `check-${i}`;
  //   inputCheckbox.oninput = () => checked(i);
  inputCheckbox.style.color = player.color ?? "#ffffff";
  inputCheckbox.addEventListener("change", () => handleCheckbox(i));
  playerDiv.appendChild(inputCheckbox);

  const leftKeySpan = document.createElement("span");
  leftKeySpan.id = `leftKey-${i}`;
  leftKeySpan.style.color = player.color ?? "#ffffff";
  playerDiv.appendChild(leftKeySpan);

  const rightKeySpan = document.createElement("span");
  rightKeySpan.id = `rightKey-${i}`;
  rightKeySpan.style.color = player.color ?? "#ffffff";
  playerDiv.appendChild(rightKeySpan);

  colorPicker.oninput = () => {
    idInput.style.color = colorPicker.value;
    inputName.style.color = colorPicker.value;
    inputCheckbox.style.color = colorPicker.value;
    leftKeySpan.style.color = colorPicker.value;
    rightKeySpan.style.color = colorPicker.value;
  };

  colorPicker.ondblclick = () => {
    colorPicker.value = player.color;
    idInput.style.color = colorPicker.value;
    inputName.style.color = colorPicker.value;
    inputCheckbox.style.color = colorPicker.value;
    leftKeySpan.style.color = colorPicker.value;
    rightKeySpan.style.color = colorPicker.value;
  };

  playersContainer.appendChild(playerDiv);
});

const startButton = document.createElement("button");
// startButton.addEventListener("click", saveSettings);
startButton.classList.add("start");
startButton.textContent = "START";
document.querySelector("main").appendChild(startButton);
