const Cell = require("../js/utils/cell");
global.Cell = Cell;
const Game = require("../js/game");

describe("Game.toggleCell", () => {
  test("toggles cell state", () => {
    const game = new Game();
    game.toggleCell(1, 1);
    expect(game.isAlive(new Cell(1, 1))).toBe(true);
    game.toggleCell(1, 1);
    expect(game.isAlive(new Cell(1, 1))).toBe(false);
  });
});

describe("Game.step rules", () => {
  test("underpopulation: single cell dies", () => {
    const game = new Game();
    game.born(new Cell(0, 0));
    game.step();
    expect(game.isAlive(new Cell(0, 0))).toBe(false);
  });

  test("survival with two neighbors", () => {
    const game = new Game();
    game.born(new Cell(0, 0));
    game.born(new Cell(0, 1));
    game.born(new Cell(1, 0));
    game.step();
    expect(game.isAlive(new Cell(0, 0))).toBe(true);
  });

  test("overpopulation kills cell", () => {
    const game = new Game();
    const cells = [
      new Cell(0, 0),
      new Cell(0, 1),
      new Cell(1, 0),
      new Cell(1, 1),
      new Cell(0, -1)
    ];
    cells.forEach(c => game.born(c));
    game.step();
    expect(game.isAlive(new Cell(0, 0))).toBe(false);
  });

  test("reproduction makes new cell alive", () => {
    const game = new Game();
    [new Cell(0, 0), new Cell(1, 0), new Cell(2, 0)].forEach(c => game.born(c));
    game.step();
    expect(game.isAlive(new Cell(1, -1))).toBe(true);
    expect(game.isAlive(new Cell(1, 1))).toBe(true);
  });
});

describe("movement methods", () => {
  test("moveUp", () => {
    const game = new Game();
    game.born(new Cell(1, 1));
    game.moveUp();
    expect(game.isAlive(new Cell(0, 1))).toBe(true);
    expect(game.isAlive(new Cell(1, 1))).toBe(false);
  });

  test("moveDown", () => {
    const game = new Game();
    game.born(new Cell(0, 0));
    game.moveDown();
    expect(game.isAlive(new Cell(1, 0))).toBe(true);
  });

  test("moveLeft", () => {
    const game = new Game();
    game.born(new Cell(0, 0));
    game.moveLeft();
    expect(game.isAlive(new Cell(0, -1))).toBe(true);
  });

  test("moveRight", () => {
    const game = new Game();
    game.born(new Cell(0, 0));
    game.moveRight();
    expect(game.isAlive(new Cell(0, 1))).toBe(true);
  });
});
