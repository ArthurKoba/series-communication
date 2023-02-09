import {makeAutoObservable} from "mobx";

class DesignStorage {
    darkMode = true
    sidebarEnabled = true

    constructor() {
        makeAutoObservable(this)
    }

    swapDarkMode() {
        this.darkMode = !this.darkMode;
    }

    swapShowNavbar() {
        this.sidebarEnabled = !this.sidebarEnabled;
    }
}

export default new DesignStorage();