u(() => {
  
  const board = u(".board");
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      const div = u(document.createElement("div"));
      div.addClass(`c${i}${j}`);
      div.attr("x", i);
      div.attr("y", j);
      div.addClass("square");
      if (Math.floor(Math.random()*2)) {
        div.addClass("flipped");
      }
      board.append(div);
    }
  }
  
  board.children().on("click", flipMainSquare);
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
};

const flipSquare = (x, y) => {
  const board = u(".board");
  const square = board.find(`.c${x}${y}`);
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
