export function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {width, height};
}

export function isSmallScreen() {
    const {width} = getWindowDimensions()
    return width < 768
}

export function setTargetValid(target) {
    target.classList.remove("is-invalid")
    target.classList.add("is-valid")
}

export function setTargetInvalid(target) {
    target.classList.remove("is-valid")
    target.classList.add("is-invalid")
}

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