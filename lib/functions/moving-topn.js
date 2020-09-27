module.exports = (options, self) => (self = {
    counts: {},
    value: [],
    changed: []
}) && (options = Object.assign({
    n: 10,
    entry: a => ["" + a, 1],
    push: (chunks) => {

        for (const chunk of chunks) {
            const entry = options.entry(chunk);

            if (self.changed.indexOf(entry[0]) === -1)
                self.changed.push(entry[0]);

            self.counts[entry[0]] = (self.counts[entry[0]] || 0) + entry[1];
        }
    },
    shift: (chunks) => {

        for (const chunk of chunks) {
            const entry = options.entry(chunk);

            if (self.changed.indexOf(entry[0]) === -1)
                self.changed.push(entry[0]);

            if (self.counts[entry[0]] < 2) {
                delete self.counts[entry[0]];
            } else {
                self.counts[entry[0]] = self.counts[entry[0]] - entry[1];
            }
        }
    },
    change: () => {

        if (self.value.length > options.n) {
            for (let i = 0; i <= self.value.length; i++) {
                if (self.changed.indexOf(self.value) > -1)
                    break;

                // no changes, no need to recheck the list again
                if (i === self.value.length)
                    return (self.changed.length = 0) || self.value;
            }
        }

        self.changed.length = 0;

        return Object.keys(self.counts)
            .map((k) => [k, self.counts[k]])
            .sort((a, b) => b[1] - a[1])
            .slice(0, options.n);
    }
}, options));
