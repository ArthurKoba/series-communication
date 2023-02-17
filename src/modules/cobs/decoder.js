export function cobsDecode (buffer)
{
    let dest = [];
    for (let i = 0; i < buffer.length; ) {
        let code = buffer[i++];
        for (let j = 1; j < code; j++) {
            dest.push(buffer[i++]);
        }
        if (code < 0xFF && i < buffer.length) {
            dest.push(0);
        }
    }
    return dest
}



