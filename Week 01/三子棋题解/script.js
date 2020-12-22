let currentPlayer = "👨‍🎓";
let board = ["", "", "", "", "", "", "", "", ""];
let turnCount = 0;
let emptySpace = 9;
function switchPlayer() {
  currentPlayer = currentPlayer === "👨‍🎓" ? "🤖" : "👨‍🎓";
}

document.querySelectorAll(".box").forEach((cell) => {
  cell.addEventListener("click", () => {
    move(parseInt(cell.id));
    if (emptySpace === 0) {alert("Game over")}
    computerMove();
    searchBestNext();
  });
});

function move(id) {
  let element = document.getElementById(`${id}`);
  emptySpace--
  element.value = currentPlayer;
  board[id] = currentPlayer;
  let res = checkWinner(`${id}`);
  if (res) showWinner();
  switchPlayer();
}

function computerMove() {
    let best = searchBestNext();
    if (best !== -1) {
      move(best);
      return;
    }
    else{
      let oppBest = defence();
      if (oppBest !== -1){
        move(oppBest)
        return
      }
      else{
        doWhatEver()
      }
    }
}

function doWhatEver(){
  for (let i = 0; i < 9; i++) {
    if (board[i] !== "") continue;
    else {
      move(i);
      return;
    }
  }
}

function defence(){
  switchPlayer()
  let best = searchBestNext();
  switchPlayer()
  return best
}

function searchBestNext() {
  for (let i = 0; i < 9; i++) {
    if (board[i] !== "") continue;
    board[i] = currentPlayer;
    let res = checkWinner(`${i}`);
    if (res) {
      board[i] = "";
      return i;
    }
    board[i] = "";
  }
  return -1;
}

function showWinner() {
  if (currentPlayer === "👨‍🎓") alert("Congratulation， You win!");
  else alert("Sorry, you lose!");
}

function checkWinner(id) {
  if (id === "0") return checkRow0() | checkColumn0() | checkBiased0();
  if (id === "1") return checkRow0() | checkColumn1();
  if (id === "2") return checkRow0() | checkColumn2() | checkBiased1();
  if (id === "3") return checkRow1() | checkColumn0();
  if (id === "4")
    return checkRow1() | checkColumn1() | checkBiased0() | checkBiased1();
  if (id === "5") return checkRow1() | checkColumn2();
  if (id === "6") return checkRow2() | checkColumn0() | checkBiased1();
  if (id === "7") return checkRow2() | checkColumn1();
  if (id === "8") return checkRow2() | checkColumn2() | checkBiased0();
}

function checkRow0() {
  if (
    board[0] === currentPlayer &&
    board[1] === currentPlayer &&
    board[2] === currentPlayer
  )
    return true;
  else return false;
}

function checkRow1() {
  if (
    board[3] === currentPlayer &&
    board[4] === currentPlayer &&
    board[5] === currentPlayer
  )
    return true;
  else return false;
}

function checkRow2() {
  if (
    board[6] === currentPlayer &&
    board[7] === currentPlayer &&
    board[8] === currentPlayer
  )
    return true;
  else return false;
}

function checkColumn0() {
  if (
    board[0] === currentPlayer &&
    board[3] === currentPlayer &&
    board[6] === currentPlayer
  )
    return true;
  else return false;
}

function checkColumn1() {
  if (
    board[1] === currentPlayer &&
    board[4] === currentPlayer &&
    board[7] === currentPlayer
  )
    return true;
  else return false;
}

function checkColumn2() {
  if (
    board[2] === currentPlayer &&
    board[5] === currentPlayer &&
    board[8] === currentPlayer
  )
    return true;
  else return false;
}

function checkBiased0() {
  if (
    board[0] === currentPlayer &&
    board[4] === currentPlayer &&
    board[8] === currentPlayer
  )
    return true;
  else return false;
}

function checkBiased1() {
  if (
    board[2] === currentPlayer &&
    board[4] === currentPlayer &&
    board[6] === currentPlayer
  )
    return true;
  else return false;
}
