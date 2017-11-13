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
});

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
  }
  
  
};
