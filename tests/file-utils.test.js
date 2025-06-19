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
