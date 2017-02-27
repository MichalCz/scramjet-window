module.exports = class FixedTimeWindow {

    constructor(options) {
        super(Object.assign({
            span: 3600e3,
            stamp: () => Date.now,
            cmp: (a, b) => a - b
        }, options));
    }

    _reference(ref) {
        return this.options.stamp(ref);
    }

    _activeRange(ref) {
        let pos = this.refs.length;
        const span = this.options.span;
        let offs = 0;
        while((pos = Math.ceil(pos / 2)) > 1) {
            let res = this.options.cmp(ref - span, this.refs[offs + pos]);
            if (res >= 0) {
                offs += pos;
            }
        }
    }

};
