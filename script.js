var tileImages = [];
var tileArray = [];
var tileFlippedOver = [];
var cardFlipped = -1;
var timer = '';
var playLockout = false;
var gamePlay = false;
var startButton = document.getElementById('start');
var gameBoard = document.getElementById('gameboard');
var message = document.getElementById('message');


//Event Listeners
startButton.addEventListener('click', startGame);

//Functions

function gameOver() {
  startButton.style.display = 'block';
  message.innerHTML = "Click to start new game";
  gamePlay = false;
  tileImages = [];
  tileFlippedOver = [];
}

function startGame() {
  cardFlipped = -1;
  playLockout = false;
  startButton.style.display = 'none';
  if (!gamePlay) {
    gamePlay = true;
    buildArray();
    tileArray = tileImages.concat(tileImages); // add arrays to itself
    shuffleArray(tileArray); //call the shuffleArray function
    buildBoard();
    message.innerHTML = "Click any tile";
  }

}

function buildBoard() {
  var html = "";
  for (var x = 0; x <= (tileArray.length - 1); x++) {
    html += '<div class="gameTile"><div class="gameTile">';
    html += '<img id="cardz' + x + '" src="images/backCard.jpg" onclick="pickCard(' + x + ',this)" class="flipImage"></div></div>';
  }
  gameBoard.innerHTML = html;
}

function isInArray(v, array) {
  return array.indexOf(v) > -1;
}

function cardFlip(t, ti) {
  t.src = "images/" + tileArray[ti];
  tileFlippedOver.push(t.id);
}


function hideCard() {
  for (var x = 0; x < 2; x++) {
    var vid = tileFlippedOver.pop();
    document.getElementById(vid).src = "images/backCard.jpg";
  }
  clearInterval(timer);
  playLockout = false;
  cardFlipped = -1;
  message.innerHTML = "Click any tile";
}

function checkSrc(v) {
  var v = document.getElementById(v).src;
  return v;
}

function pickCard(tileIndex, t) {
  // check if it's already flipped
  if (!isInArray(t.id, tileFlippedOver) && !playLockout) {
    if (cardFlipped >= 0) {
      cardFlip(t, tileIndex);
      playLockout = true;
      if (checkSrc(tileFlippedOver[tileFlippedOver.length - 1]) == checkSrc(tileFlippedOver[tileFlippedOver.length - 2])) {
        //match
        message.innerHTML = "Match Found - Click more tiles";
        playLockout = false;
        cardFlipped = -1;
        //Check if game is over
        if (tileFlippedOver.length == tileArray.length) {
          gameOver();
        }
      } else {
        //no match
        message.innerHTML = "No Match";
        timer = setInterval(hideCard, 2000);
      }
    } else {
      //first cardFlipped
      cardFlipped = tileIndex;
      cardFlip(t, tileIndex);
    }
  } else {
    message.innerHTML = "Already Clicked";
  }
}

function buildArray() {
  for (var x = 1; x < 7; x++) {
    tileImages.push(x + '.jpg');
  }
}

function shuffleArray(array) {
  for (var x = array.length - 1; x > 0; x--) {
    var holder = Math.floor(Math.random() * (x + 1));
    var itemValue = array[x];
    array[x] = array[holder];
    array[holder] = itemValue;
    console.log(itemValue);
  }
  return array;
}
