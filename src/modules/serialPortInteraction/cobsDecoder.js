/**
 * Upgraded COBS data decoding class.
 * It allows you to decode data with any separator character and overhead bytes in the range of 2-255.
 */
export class CobsDecoder {
    #codeDepth = 255
    #delimiter = 10

    /**
     * Buffer depth to the next overhead byte. **The default is 255**. The value must be synchronized on both sides.
     * `Range: 2 <= value <= 255`.
     * @param {number} value
     */
    setCodeDepth(value) {
        if (!Number.isInteger(value)) throw TypeError("Code depth is not an integer!")
        if (value < 2 || value > 255) throw RangeError(`Code depth out of range 2-255. Value: ${value}`)
        this.#codeDepth = value
    }

    /**
     * The value of the packet separator character in `integer type`.
     * A character match can be determined from the `character ASCII table`.
     * **The default is a line break character (\n - 10)**.
     * @param {number} value
     */
    setDelimiter(value) {
        if (!Number.isInteger(value))
            throw TypeError("Delimiter is not an integer! You must use the numeric value of the ASCII character table separator.")
        if (value < 0 || value > 255) throw RangeError(`Delimiter depth out of range 2-255. Value: ${value}`)
        this.#delimiter = value
    }

    /**
     * Returns the current packet separator in integer type.
     * A character match can be determined from the `character ASCII table`.
     * @returns {number}
     */
    getDelimiter() {
        return this.#delimiter
    }

    /**
     * Decodes
     * Uint8Array of `COBS encoded` data. In case of successful decoding, it returns the `decoded Uint8Array`.
     * In case of conversion errors with `invalid data`, the method returns `undefined`.
     * @param {Uint8Array} buffer
     * @returns {Uint8Array || undefined}
     */
    decode(buffer) {
        let dest = []
        for (let i = 0; i < buffer.length;) {
            let code = buffer[i++]
            if (code === undefined) return undefined
            if (code === this.#delimiter) break
            if (this.#delimiter !== 0 && code === 0) code = this.#delimiter
            for (let j = 1; j < code; j++) {
                let byte = buffer[i++]
                if (byte === undefined) return undefined
                dest.push(byte)
            }
            if (code < this.#codeDepth && i < buffer.length - 1) dest.push(this.#delimiter)
        }
        return new Uint8Array(dest)
    }
}

export const cobsDecoder = new CobsDecoder()



