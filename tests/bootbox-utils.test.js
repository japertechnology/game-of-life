const BootBoxUtils = require("../js/utils/bootbox-utils");

describe("BootBoxUtils.confirm", () => {
  test("resolves true when user confirms", () => {
    global.bootbox = {
      setDefaults: () => {},
      confirm: ({ callback }) => callback(true)
    };
    return expect(BootBoxUtils.confirm("msg")).resolves.toBe(true);
  });

  test("resolves false when user cancels", () => {
    global.bootbox = {
      setDefaults: () => {},
      confirm: ({ callback }) => callback(false)
    };
    return expect(BootBoxUtils.confirm("msg")).resolves.toBe(false);
  });
});
