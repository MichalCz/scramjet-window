const WindowStream = require("../window-stream");
const scramjet = require('scramjet');

module.exports = {
    average: (WindowClass, options) => new WindowStream(Object.assign({
        window: new WindowClass(require("./moving-average")(options))
    }, options)).pipe(new scramjet.DataStream()),
    topn: (WindowClass, options) => new WindowStream(Object.assign({
        window: new WindowClass(require("./moving-topn")(options))
    }, options)).pipe(new scramjet.DataStream()),
};
