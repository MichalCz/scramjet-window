const WindowStream = require("../window-stream");

module.exports = {
    average: (WindowClass, options) => new WindowStream(Object.assign({
        window: new WindowClass(require("./moving-average")(options))
    }, options)),
    topn: (WindowClass, options) => new WindowStream(Object.assign({
        window: new WindowClass(require("./moving-topn")(options))
    }, options)),
};
