import { playersTemplate } from "../../data/players.js";

let eventListenerActive = false;
let currentListeningID = -1;
let currentListeningSide = "left";
let eventListener = null;
let selectedGameMode = "arcade";
let keyList = [];

/**
 * Starts listening for key inputs for the specified player ID.
 * @param id - The ID of the player to listen for.
 */
function initializeKeyListener(id) {
  currentListeningSide = "left";
  eventListenerActive = true;
  currentListeningID = id;
  setKeyInputLabel(currentListeningID, "left", "Press left key");
}

/**
 * Updates the text content of the key element for the specified player and side.
 * @param id - The ID of the player.
 * @param side - The side of the key ("left" or "right").
 * @param text - The text to display.
 */
function setKeyInputLabel(id, side, text) {
  document.getElementById(`${side}Key-${id}`).innerText = text;
}

/**
 * Clears the key bindings for the specified player ID.
 * @param id - The ID of the player.
 */
function removeKeyAssignments(id) {
  keyList = keyList.filter(
    (key) =>
      key !== document.getElementById(`leftKey-${id}`).innerText &&
      key !== document.getElementById(`rightKey-${id}`).innerText
  );
  setKeyInputLabel(id, "left", "");
  setKeyInputLabel(id, "right", "");
}

/**
 * Handles the checkbox change event for enabling/disabling key listening for a player.
 * @param id - The ID of the player.
 */
export function handleCheckbox(id) {
  const checkbox = document.getElementById(`check-${id}`);
  if (checkbox.checked) {
    if (currentListeningID !== -1) {
      removeKeyAssignments(currentListeningID);
      document.getElementById(`check-${currentListeningID}`).checked = false;
    }
    initializeKeyListener(id);
  } else {
    eventListenerActive = false;
    currentListeningID = -1;
    currentListeningSide = "left";
    removeKeyAssignments(id);
  }
}

/**
 * Saves the current settings to session storage and navigates to the game session.
 */
export function savePlayerPreferences() {
  if (currentListeningID !== -1) return;
  let players = playersTemplate.map((player) => ({
    name: player.name,
    color: player.color,
    leftKey: "",
    rightKey: "",
  }));

  const result = players.filter((_, index) => {
    const checkbox = document.getElementById(`check-${index}`);
    if (checkbox.checked) {
      players[index].leftKey = document.getElementById(
        `leftKey-${index}`
      ).innerText;
      players[index].rightKey = document.getElementById(
        `rightKey-${index}`
      ).innerText;
      return true;
    }
    return false;
  });

  if (result.length < 1) return;

  sessionStorage.setItem("adkplayers", JSON.stringify(result));
  //   window.location.href = `${window.location.origin}/src/html/game.html`;
}

/**
 * Handles the keydown event to capture key inputs for player controls.
 * @param e - The keyboard event.
 */
function processKeyInput(e) {
  if (!eventListenerActive) return;

  const validKey =
    /^[a-zA-Z0-9]$/.test(e.key) ||
    /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(e.key);
  const arrowKey = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
    e.key
  );
  const key = !arrowKey ? e.key.toUpperCase() : e.key;

  if ((validKey || arrowKey) && !keyList.includes(key)) {
    setKeyInputLabel(currentListeningID, currentListeningSide, key);
    keyList.push(key);

    if (currentListeningSide === "left") {
      currentListeningSide = "right";
      setKeyInputLabel(currentListeningID, "right", "Press right key");
    } else {
      eventListenerActive = false;
      currentListeningID = -1;
      currentListeningSide = "left";
    }
  }
}

// export default onStart = () => {
document.addEventListener("DOMContentLoaded", () => {
  eventListener = document.addEventListener("keydown", processKeyInput);
});

window.addEventListener("beforeunload", () => {
  eventListenerActive = false;
  currentListeningID = -1;
  currentListeningSide = "left";
});
// };
