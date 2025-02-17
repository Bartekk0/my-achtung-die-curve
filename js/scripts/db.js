// save score to sql database

// into table players (id, name, color)
function createPlayer(id, name, color) {}

// into table scores (player_id, score, wins)
function saveScore(id, score, wins) {}

// from table scores load first 5 best scores then from table players load names and colors
function loadScores() {}

export { createPlayer, saveScore, loadScores };
