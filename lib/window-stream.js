const scramjet = require("scramjet");
const MovingWindow = require("./moving-window");

module.exports = class WindowStream extends scramjet.DataStream {

    /**
     * @param {import("scramjet").DataStreamOptions} options 
     */
    constructor(passedOptions) {
        const options = {
            window: null,
            updateInterval: 1e3,
            tickFunction: Date.now,
            push: null,
            shift: null,
            change: null,
            ...passedOptions,
            promiseTransform(chunk) {
                const tick = options.tickFunction(chunk);
                this.window.push(chunk, tick);
    
                if (this.nextUpdate < tick) {
                    this.nextUpdate = tick + options.updateInterval;
                    return this.window.run(tick) ? this.window.value : scramjet.DataStream.filter;
                } else {
                    return scramjet.DataStream.filter;
                }
            }
        };

        super(options);

        this.nextUpdate = 0;

        if (!(options.window instanceof MovingWindow)) {
            throw new Error("An instance of MovingWindow must be passed");
        }

        this.window = options.window;
    }

};
