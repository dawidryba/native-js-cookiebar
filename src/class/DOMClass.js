/**
 * @description Class to manage class in DOM elements
 */
export default class DOMClass {
    /**
     * @property {string} current The current weather.
     * @param {object} el DOM Element
     * @param {string} className 
     */
    static addClass(el, className) {
        if (el.classList)
            el.classList.add(className);
        else
            el.className += ' ' + className;
    }

    /**
     * @property {string} current The current weather.
     * @param {object} el DOM Element
     * @param {string} className 
     */
    static removeClass(el, className) {
        if (el.classList)
            el.classList.remove(className);
        else
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    /**
     * @property {string} current The current weather.
     * @param {object} el DOM Element
     * @param {string} className 
     */
    static toggleClass(el, className) {
        if (el.classList) {
            el.classList.toggle(className);
        } else {
            var classes = el.className.split(' ');
            var existingIndex = classes.indexOf(className);

            if (existingIndex >= 0)
                classes.splice(existingIndex, 1);
            else
                classes.push(className);

            el.className = classes.join(' ');
        }
    }
}