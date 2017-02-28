module.exports = class MovingWindow {

    constructor(options) {

        options = Object.assign({},  options);

        this.items = [];
        this.refs = [];

        if (options.change)
            this._change = options.change;

        if (options.push)
            this._push = options.push;

        if (options.shift)
            this._shift = options.shift;


        this.options = options;

        this._pushed = 0;

        if (!this._activeRange) {
            throw new Error("Method _activeRange must be implemented in MovingWindow derived classes");
        }

        if (options.initialize) {
            options.initialize.call(this);
        }

    }

    _reference() {
        return 0;
    }

    push(chunk) {
        this._pushed++;
        this.items.push(chunk);
        this.refs.push(this._reference(chunk));
    }

    run(ref) {

        const pos = this._activeRange(ref);

        let removed = null;

        if (pos > 0) {
            removed = this.items.splice(0, pos);

            if (this._shift)
                this._shift(
                    removed,
                    this.refs.splice(0, pos)
                );
        }

        if (this._pushed && this._push)
            this._push(
                this.items.slice(this.items.length - this._pushed),
                this.refs.slice(this.refs.length - this._pushed)
            );

        if (this._pushed || removed) {
            this._pushed = 0;
            const prev = this._value;
            this._value = this._change(this.items);
            return prev !== this._value;
        } else {
            this._pushed = 0;
            return false;
        }
    }

    get value() {
        return this._value;
    }

};
