u(() => {
  
  const board = u(".board");
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      const squareContainer = u(document.createElement("div"));
      squareContainer.addClass("square-container");
      const square = u(document.createElement("div"));
      square.addClass(`c${i}${j}`);
      square.attr("x", i);
      square.attr("y", j);
      square.addClass("square");
      if (Math.floor(Math.random()*2)) {
        square.addClass("flipped");
      }
      squareContainer.append(square);
      board.append(squareContainer);
    }
  }
  
  board.children().children().on("click", flipMainSquare);
  
  const instructionsContainer = u(document.createElement("div"));
  instructionsContainer.addClass("instructions-container");
  board.append(instructionsContainer);
  showInstructions();
  
  u(".instructions-button").on("click", () => {
    showInstructions();
  });
});

function showInstructions() {
  const instructionsContainer = u(".instructions-container");
  const instructions = u(document.createElement("div"));
  instructions.addClass("instructions-message");
  const board = u(".board");
  instructions.append("Welcome to DOMU-Tiles! <br />");
  instructions.append("Click on a square to flip the square and its neighbors. <br />");
  instructions.append("Turn the whole board one color to win! <br />");
  instructions.append("Click to get started! <br />");
  instructionsContainer.append(instructions);
  instructionsContainer.on("click", () => {
    u(".instructions-container").empty();
  });
}

const ADJACENT = [
  [0, 0],
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1]
];

const flipMainSquare = (e) => {
  const x = u(e.currentTarget).attr("x");
  const y = u(e.currentTarget).attr("y");
  
  ADJACENT.forEach((coords) => {
    flipSquare(parseInt(x) + coords[0], parseInt(y) + coords[1]);
  });
  setTimeout(function () {
    checkWin();
  }, 210);
};

const flipSquare = (x, y) => {
  const board = u(".board");
  const square = board.children().find(`.c${x}${y}`);
  square.addClass("flip-in");
  setTimeout(function () {
    square.removeClass("flip-in");
    square.addClass("flip-out");
    setTimeout(function () {
      square.removeClass("flip-out");
      square.toggleClass("flipped");
      
    }, 100);
  }, 100);
};

const checkWin = () => {
  let flipped = 0;
  u(".square").each((square) => {
    if (u(square).attr("class").includes("flipped")) {
      flipped += 1;
    }
  });
  if (flipped === 25 || flipped === 0) {
    
    const board = u(".board");
    board.children().children().off("click");
    const winMessage = u(document.createElement("div"));
    winMessage.addClass("win-message");
    winMessage.append("You win! Congrats!");
    board.append(winMessage);
  }
  
  
};
