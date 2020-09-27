const MovingWindow = require("./moving-window");

module.exports = class FixedCountWindow extends MovingWindow {

    constructor(options) {
        super(Object.assign({
            length: 1024
        }, options));

    }

    _activeRange() {
        return this.items.length - this.options.length;
    }

};
