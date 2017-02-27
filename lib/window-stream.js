const scramjet = require('scramjet');
const MovingWindow = require('./window');

module.exports = class WindowStream extends scramjet.DataStream {

    constructor(options) {
        options = Object.assign({
            window: null,
            updateInterval: 200,
            tickFunction: Date.now,
            push: null,
            shift: null,
            change: null
        }, options);

        options.parallelTransform = (chunk) => {
            const tick = options.tickFunction(chunk);
            this.window.push(chunk, tick);

            if (this.nextUpdate < tick) {
                this.nextUpdate = tick + options.updateInterval;
                return this.window.run(tick).value;
            } else {
                return scramjet.DataStream.filter;
            }
        };

        super(options);

        this.nextUpdate = 0;

        if (!(options.window instanceof MovingWindow)) {
            throw new Error("An instance of MovingWindow must be passed");
        }
    }

};
