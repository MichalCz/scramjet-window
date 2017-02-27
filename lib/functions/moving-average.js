module.exports = (options, self) => (self = {sum: 0, count: 0}) && Object.assign({
    value: a => +a,
    push: (chunks) => {
        for (const chunk of chunks)
            self.sum += self.value(chunk);

        self.count += chunks.length;
    },
    shift: (chunks) => {
        for (const chunk of chunks)
            self.sum -= self.value(chunk);

        self.count -= chunks.length;
    },
    change: () => {
        return self.count > 0 ? self.sum / self.count : NaN;
    }
}, options);
