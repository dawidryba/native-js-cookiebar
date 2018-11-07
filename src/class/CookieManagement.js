/**
 * @description Class to manage cookies
 */
export default class CookieManagement {
    /**
     * @param {string} name 
     */
    constructor(name) {
        this._name = name;
    }

    /**
     * @description function set cookies
     * @param {string} value 
     * @param {number} days 
     */
    set(value, days) {
        let expires = '';
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = this._name + '=' + value + expires + '; path=/';
    }

    /**
     * @return {number|null}
     */
    get() {
        let nameEQ = this._name + '=';
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    delete() {
        document.cookie = this._name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}
