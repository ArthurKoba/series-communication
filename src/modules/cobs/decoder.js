export function cobsDecode (buffer) {
    const delimiter = 10;
    const debt = 255-1;
    let dest = [];
    let i = delimiter === 0? 1 : 0
    while (true) {
        let code = buffer[i++];
        if (code === delimiter) break
        else if (code === undefined) return []
        if (delimiter !== 0 && code >= delimiter-1) code++;
        for (let j = 0; j < code; j++) dest.push(buffer[i++]);
        if (code < debt && i+1 !== buffer.length) dest.push(delimiter);
    }
    return dest
}



