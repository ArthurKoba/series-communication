export class CobsDecoder {
    #codeDepth = 255
    #delimiter = 10

    setCodeDepth(value) {
        if (!Number.isInteger(value)) throw TypeError("Code depth is not an integer!")
        if (value < 2 || value > 255) throw RangeError(`Code depth out of range 2-255. Value: ${value}`)
        this.#codeDepth = value
    }

    setDelimiter(value) {
        if (!Number.isInteger(value)) throw TypeError("Delimiter is not an integer! You must use the numeric value of the ASCII character table separator.")
        if (value < 0 || value > 255) throw RangeError(`Delimiter depth out of range 2-255. Value: ${value}`)
        this.#delimiter = value
    }

    getDelimiter() {
        return this.#delimiter
    }

    decode(buffer) {
        let dest = []
        for (let i = 0; i < buffer.length;) {
            let code = buffer[i++]
            if (code === undefined) return []
            if (code === this.#delimiter) return dest
            if (this.#delimiter !== 0 && code === 0) code = this.#delimiter
            for (let j = 1; j < code; j++) {
                let byte = buffer[i++]
                if (byte === undefined) return []
                dest.push(byte)
            }
            if (code < this.#codeDepth && i < buffer.length - 1) dest.push(this.#delimiter)
        }
        return dest
    }

}

export const cobsDecoder = new CobsDecoder()



