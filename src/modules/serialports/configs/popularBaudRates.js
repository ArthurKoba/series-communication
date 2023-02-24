/**
 * List of popular serial port speeds.
 * @type {number[]}
 */
export const popularBaudRates = [
    50, 75, 110, 134, 150, 300, 600, 750, 1200, 2400,
    4800, 9600, 19200, 28800, 31250, 38400, 57600, 74880,
    76800, 115200, 230400, 250000, 460800, 500000, 576000,
    921600, 1000000, 2000000
]

/**
 * Minimum Serial Port Speed
 * @type {number}
 */
export const minBaudRate = Math.min(...popularBaudRates)

/**
 * Maximum Serial Port Speed
 * @type {number}
 */
export const maxBaudRate = Math.max(...popularBaudRates)