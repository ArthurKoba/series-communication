export function cobsDecode (buffer) {
    const delimiter = 10
    const debt = 15
    let dest = []
    for (let i = 0; i < buffer.length;) {
        let code = buffer[i++]
        if (code === undefined) return []
        if (code === delimiter) return dest
        if (delimiter !== 0 && code === 0) code = delimiter
        for (let j = 1; j < code; j++) dest.push(buffer[i++])
        if (buffer[buffer.length-1] === undefined) return []
        if (code < debt && i < buffer.length - 1) dest.push(delimiter)
    }
    return dest
}



