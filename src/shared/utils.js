export function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {width, height};
}

export function isSmallScreen() {
    const {width} = getWindowDimensions()
    return width < 768
}