const Cell = require("../js/utils/cell");

describe("Cell", () => {
  test("toString returns coordinates", () => {
    const c = new Cell(2, 3);
    expect(c.toString()).toBe("2,3");
  });

  test("getNeighbors returns eight surrounding cells", () => {
    const c = new Cell(0, 0);
    const neighborStrings = c.getNeighbors().map(n => n.toString());
    expect(neighborStrings).toHaveLength(8);
    expect(neighborStrings).toEqual(
      expect.arrayContaining([
        "-1,-1",
        "-1,0",
        "-1,1",
        "0,-1",
        "0,1",
        "1,-1",
        "1,0",
        "1,1"
      ])
    );
  });
});
