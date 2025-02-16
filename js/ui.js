import { playersTemplate } from "../data/players.js";

const playersContainer = document.getElementById("playersContainer");

playersTemplate.forEach((player, i) => {
  const playerDiv = document.createElement("div");
  playerDiv.className = "player";

  const span = document.createElement("input");
  span.style.color = player.color ?? "#ffffff";
  span.value = `${i + 1}`;
  playerDiv.appendChild(span);

  const colorPicker = document.createElement("input");
  colorPicker.type = "color";
  colorPicker.value = player.color ?? "#ffffff";

  playerDiv.appendChild(colorPicker);

  const inputName = document.createElement("input");
  inputName.type = "text";
  inputName.value = player.name;
  inputName.spellcheck = false;
  inputName.maxLength = 15;
  inputName.style.color = player.color ?? "#ffffff";
  playerDiv.appendChild(inputName);

  const inputCheckbox = document.createElement("input");
  inputCheckbox.type = "checkbox";
  inputCheckbox.name = "playersCheckBox";
  inputCheckbox.id = `checkID${i}`;
  //   inputCheckbox.oninput = () => checked(i);
  inputCheckbox.style.color = player.color ?? "#ffffff";
  playerDiv.appendChild(inputCheckbox);

  const leftKeySpan = document.createElement("span");
  leftKeySpan.id = `leftKeyID${i}`;
  leftKeySpan.style.color = player.color ?? "#ffffff";
  playerDiv.appendChild(leftKeySpan);

  const rightKeySpan = document.createElement("span");
  rightKeySpan.id = `rightKeyID${i}`;
  rightKeySpan.style.color = player.color ?? "#ffffff";
  playerDiv.appendChild(rightKeySpan);

  colorPicker.oninput = () => {
    span.style.color = colorPicker.value;
    inputName.style.color = colorPicker.value;
    inputCheckbox.style.color = colorPicker.value;
    leftKeySpan.style.color = colorPicker.value;
    rightKeySpan.style.color = colorPicker.value;
  };

  colorPicker.ondblclick = () => {
    colorPicker.value = player.color;
    span.style.color = colorPicker.value;
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
