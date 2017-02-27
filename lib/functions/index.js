module.exports = (WindowClass) => ({
    average: (options) => new WindowClass(require("./moving-average")(options)),
    topn: (options) => new WindowClass(require("./moving-topn")(options)),
});
