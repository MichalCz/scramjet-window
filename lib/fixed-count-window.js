module.exports = class StaticCountWindow {

    constructor(options) {
        super(Object.assign({
            length: 1024
        }, options));

    }

    _activeRange() {
        return this.items.length - this.options.length;
    }

};
