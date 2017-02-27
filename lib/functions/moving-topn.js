module.exports = (options, self) => (self = {
        counts: new Map(),
        value: [],
        changed: []
    }) && (options = Object.assign({
        n: 10,
        key: a => a.name,
        push: (chunks) => {

            for (const chunk of chunks) {
                const key = options.key(chunk);

                if (self.changed.indexOf(key) === -1)
                    self.changed.push(key);

                self.counts[key] = (self.counts[key] || 0) + 1;
            }
        },
        shift: (chunks) => {

            for (const chunk of chunks) {
                const key = options.key(chunk);

                if (self.changed.indexOf(key) === -1)
                    self.changed.push(key);

                if (self.counts[key] < 2) {
                    delete self.counts[key];
                } else {
                    self.counts[key] = self.counts[key] - 1;
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
                .sort((a, b) => a[1] - b[1])
                .slice(0, options.n);
        }
    }, options));
