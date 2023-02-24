/**
 * A function that returns the user's screen size.
 * @returns {{width: number, height: number}}
 */
export function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {width, height};
}

/**
 * A function that checks the size of the screen width,
 * if it is less than 768 pixels then the screen is considered small.
 * @returns {boolean}
 */
export function isSmallScreen() {
    const {width} = getWindowDimensions()
    return width < 768
}

/**
 * Sets HTMLInputElement to the Bootstrap class is-valid and removes the is-invalid class.
 * @param {HTMLInputElement} target
 */
export function setTargetValid(target) {
    target.classList.remove("is-invalid")
    target.classList.add("is-valid")
}

/**
 * Sets HTMLInputElement to the Bootstrap class is-invalid and removes is-valid the class.
 * @param {HTMLInputElement} target
 */
export function setTargetInvalid(target) {
    target.classList.remove("is-valid")
    target.classList.add("is-invalid")
}

/**
 * HTMLInputElement validation function.
 * Either way, calls `setStateFunc` with the value of the element to set the state.
 * In case of successful validation, it calls `setStorageFunc`, having previously parsed the value from `parseFunc`.
 * For validation, `HTMLInputElement` attributes `(min, max, required...)` are used.
 * @param {HTMLInputElement} target
 * @param {function} setStateFunc
 * @param {function} setStorageFunc
 * @param {function} parseFunc
 */
export function changeNumberWithValidation(target, setStateFunc, setStorageFunc, parseFunc) {
    setStateFunc(target.value)
    if (!target.validity.valid) return setTargetInvalid(target)
    setTargetValid(target)
    setStorageFunc(parseFunc(target.value))
}

/**
 * The function calls an `alarm` with text about `problems using virtual ports`.
 */
export function alertWarningVirtualSerialPort() {

    const alertText = "At the time of the development of this software, " +
        "the Web Serial API did not allow getting the port name in the OS, " +
        "and it does not have a USB Product ID and Vendor ID. \n" +
        "Such ports cannot be distinguished from each other, therefore it is " +
        "impossible to store different configurations for them (name, speed, etc.).\n" +
        "Therefore, you can use only one virtual port, when adding a new virtual port, " +
        "the old ones will be forgotten. To switch a virtual port, add it via the add " +
        "button, and the current one, if any, will be forgotten. \n\n" +
        "If the Web Serial API currently allows you to get the port name, contact the developer."

    alert(alertText)
}