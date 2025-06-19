const FileUtils = require("../js/utils/file-utils");

describe("FileUtils.parseContent", () => {
  test("parses CSV without header", () => {
    const csv = "1,2\n3,4";
    expect(FileUtils.parseContent(csv)).toEqual([
      { i: 1, j: 2 },
      { i: 3, j: 4 }
    ]);
  });

  test("parses CSV with header", () => {
    const csv = "i,j\n5,6\n7,8";
    expect(FileUtils.parseContent(csv, true)).toEqual([
      { i: 5, j: 6 },
      { i: 7, j: 8 }
    ]);
  });
});

describe("FileUtils.parseContent handling blanks", () => {
  test("ignores blank lines", () => {
    const csv = "1,1\n\n2,2";
    expect(FileUtils.parseContent(csv)).toEqual([
      { i: 1, j: 1 },
      { i: 2, j: 2 }
    ]);
  });

  test("ignores invalid lines", () => {
    const csv = "1,1\ninvalid\n2,2";
    expect(FileUtils.parseContent(csv)).toEqual([
      { i: 1, j: 1 },
      { i: 2, j: 2 }
    ]);
  });
});

describe("FileUtils.readCSV", () => {
  test("calls callback with parsed data", done => {
    class MockFileReader {
      readAsText(file) {
        this.onload({ target: { result: file } });
      }
    }
    global.FileReader = MockFileReader;
    const csv = "3,4";
    FileUtils.readCSV(csv, false, data => {
      expect(data).toEqual([{ i: 3, j: 4 }]);
      done();
    });
  });
});

describe("FileUtils.exportToCSV", () => {
  test("creates file and invokes saveAs", () => {
    const saveAsMock = jest.fn();
    global.saveAs = saveAsMock;
    global.File = function(parts, name, opts) {
      this.parts = parts;
      this.name = name;
      this.opts = opts;
    };
    const cells = new Map();
    cells.set("1,1", { toString: () => "1,1" });
    cells.set("2,2", { toString: () => "2,2" });
    FileUtils.exportToCSV(cells, "out.csv");
    expect(saveAsMock).toHaveBeenCalled();
    const file = saveAsMock.mock.calls[0][0];
    expect(file.parts[0]).toBe("1,1\n2,2\n");
    expect(file.name).toBe("out.csv");
    expect(file.opts.type).toBe("text/csv;charset=utf-8");
  });
});
