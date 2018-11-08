import CookieManagement from './CookieManagement.js';
import DOMClass from './DOMClass.js';
import merge from 'deepmerge';

export default class CookieBar {
    constructor() {
        /**
         * @type {Object}
         */
        this._args = {
            link: false,
            link_blank: false,
            accept: 'Accept',
            reload_after_accept: false,
            delay_show: 500,
            accept_id: 'js-cookie_bar--accept',
            more: 'More',
            text: 'This site uses cookies.',
            cookie: {
                name: 'cookie_bar',
                expires: 356,
            },
            css: {
                file: 'https://cdn.jsdelivr.net/npm/native-js-cookiebar@latest/dist/cookiebar.min.css',
                parent: '',
                text: '',
                button: '',
                button_accept: '',
                button_more: '',
                animate: 'cookie_bar--animate',
            },
            style: {
                bg: false,
                color: false
            },
            animation_speed: 400,
            html: '<div class="cookie_bar__inner"##style.inner##><div class="cookie_bar__left"><span class="cookie_bar__text ##css.text##">##text##</span></div><div class="cookie_bar__right">##right_side##</div></div>',
        };
        
        /**
         * @type {String}
         */
        this._callback = 'cookieBarRun';

        /**
         * @type {Object}
         */
        this._newArgs = {};

        /**
         * @type {Object}
         */
        this._bar;

        /**
         * @type {Object}
         */
        this._buttonAccept;

        /**
         * @type {Object}
         */
        this._customEvent = this._addCustomEvent();;
        
        if (!this._getCallback()) {
            console.warn(`Don't see init function: ${this._callback}, or return value isn't object`);
            return false;
        }
        
        this._body = document.getElementsByTagName('body')[0];
        this._args = this._setArgs();
        
        this._cookie = new CookieManagement(this._args.cookie.name);
        
        if (this._cookie.get() == 1) {
            window.dispatchEvent(this._customEvent);
            return false;
        }
        window.addEventListener('load', () => {
            this._runCookieBar();

        }, false);
    }


    _runCookieBar() {
        const loadCSS = new Promise((resolve, reject) => {
            this._addCSS(resolve);
        });

        loadCSS.then(res => {
            this._prepareBar();
            this._body.appendChild(this._bar);
            if (this._setAcceptButton()) {
                this._initEvents();
                setTimeout(()=>{
                    this._showCookieBar();
                }, this._args.delay_show);
            }
        });
    }

    /**
     * @description init all DOM events
     */
    _initEvents() {
        this._buttonAccept.addEventListener('click', ()=>{
            this._cookie.set(1, this._args.cookie.expires);
            this._hideCookieBar();
            setTimeout(()=>{
                this._removeCookieBar();
            }, (this._args.animation_speed+50));

            if (this._args.reload_after_accept) {
                this._reloadPage();
            }
            window.dispatchEvent(this._customEvent);
        }, false);
    }

    /**
     * @description register new event
     * @return {Object}
     */
    _addCustomEvent() {
        const date = new Date();
        return new CustomEvent('cookieBarAccepted');
    }

    /**
     * @description reload browser
     */
    _reloadPage() {
        location.reload();
    }

    /**
     * @description show cookiebar
     */
    _showCookieBar() {
        DOMClass.addClass(this._bar, this._args.css.animate);
    }

    /**
     * @description hide cookiebar
     */
    _hideCookieBar() {
        DOMClass.removeClass(this._bar, this._args.css.animate);
    }

    /**
     * @description remove cookiebar from DOM
     */
    _removeCookieBar() {
        this._bar.parentNode.removeChild(this._bar);
    }

    /**
     * @description get accept button from DOM to variable
     * @return {Boolean}
     */
    _setAcceptButton() {
        this._buttonAccept = document.getElementById(this._args.accept_id);
        if (this._buttonAccept.length == 0) {
            console.warn(`Can't init accept button: ${this._args.accept_id}`);
            return false;
        } 
        return true;
    }

    /**
     * @description prepare outer div for cookiebar
     */
    _prepareBar() {
        this._bar = document.createElement('div');
        this._bar.className = `cookie_bar ${this._args.css.parent}`;
        this._bar.innerHTML = this._convertTemplateToHTML();
    }

    /**
     * @description replace all template tag to values
     * @return {String}
     */
    _convertTemplateToHTML() {
        let html = this._args.html
            .replace('##css.text##', this._args.css.text)
            .replace('##text##', this._args.text);
        
        let rightSide = '';
        if (this._args.link) {
            rightSide += `<a href="${this._args.link}" title="${this._args.more}" ${(this._args.link_blank ? 'target="_blank"' : '')} rel="nofollow" class="cookie_bar__button cookie_bar__button--more ${this._args.css.button_more}">${this._args.more}</a>`;
        }
        rightSide += `<button id="${this._args.accept_id}" class="cookie_bar__button cookie_bar__button--accept ${this._args.css.button_accept}">${this._args.accept}</button>`;
        html = html.replace('##right_side##', rightSide);

        if (this._args.style.bg || this._args.style.color) {
            const styleInner = `style="${this._args.style.bg ? 'background:' + this._args.style.bg + ';' : ''}${this._args.style.color ? ' color:' + this._args.style.color + ';' : ''}"`;
            html = html.replace('##style.inner##', styleInner);
        } else {
            html = html.replace('##style.inner##', '');
        }
        return html;
    }

    /**
     * @description add css file to DOM and run Promise resolve
     * @param {Function} resolve - callback Promise
     */
    _addCSS(resolve) {
        if (!this._args.css.file) {
            resolve('0');
        }
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = this._args.css.file;
        this._body.appendChild(css);
        css.addEventListener('load', () => {
            resolve('1');
        }, false);
    }

    /**
     * @description function merge new args object with default args
     * @return {Object}
     */
    _setArgs() {
        return merge.all([this._args, this._newArgs]);
    }

    /** 
     * @description Function try get callback with args from DOM
     * @return {Boolean} 
     */
    _getCallback() {
        if (typeof window[this._callback] !== 'function' && typeof window[this._callback]() !== 'object') {
            return false;
        }

        this._newArgs = window[this._callback]();
        return true;
    }
}