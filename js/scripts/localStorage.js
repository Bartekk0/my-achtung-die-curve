// saves only players used last time

function savePlayers(players) {
  localStorage.setItem("achtungPlayers", JSON.stringify(players));
}

function loadPlayers() {
  return JSON.parse(localStorage.getItem("achtungPlayers"));
}

export { savePlayers, loadPlayers };
