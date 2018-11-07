# native-js-cookiebar
Native JS Cookie Bar with many options

## How run script

```html
<script src="https://cdn.jsdelivr.net/npm/native-js-cookiebar@1.0.0/dist/cookiebar.min.js" defer></script>
<script>
    window.cookieBarRun = function () {
        var args = {
            link: '/polityka-prywatnosci',
            link_blank: true,
            accept: 'Ok :)',
            more: 'Więcej informacji',
            text: 'Ta strona wykorzystuje pliki cookies',
            css: {
                parent: 'cookie_bar--right',
            }
        }

        return args;
    }
</script>
```

## Available arguments

```javascript
{
  link: false,
  link_blank: false, // bool 
  accept: 'Accept', // string
  reload_after_accept: false, // bool
  delay_show: 500, // int (ms)
  accept_id: 'js-cookie_bar--accept', // string (unique)
  more: 'More', // string
  text: 'This site uses cookies.', // string
  cookie: {
      name: 'cookie_bar', // string
      expires: 356, // int
  },
  css: {
      file: 'https://cdn.jsdelivr.net/npm/native-js-cookiebar@1.0.0/dist/cookiebar.min.css', // string or false
      parent: '', // string
      text: '', // string
      button: '', // string
      button_accept: '', // string
      button_more: '', // string
      animate: 'cookie_bar--animate', // string
  },
  style: {
      bg: false, // string (hex)
      color: false // string (hex)
  },
  animation_speed: 400, // int
  html: '<div class="cookie_bar__inner"##style.inner##><div class="cookie_bar__left"><span class="cookie_bar__text ##css.text##">##text##</span></div><div class="cookie_bar__right">##right_side##</div></div>',
};
```

## Custom event
If the cookiebar is accepted, javascript will launch event *cookieBarAccepted*. You can connect to it and execute scripts. For example, adding google analytics. :)

### Example:
```javascript
window.addEventListener('cookieBarAccepted', () => {
        console.log('jest');
        var gaScript = document.createElement('script');
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=UA-xxx-2';
        gaScript.setAttribute('async', '');

        document.getElementsByTagName('body')[0].appendChild(gaScript);

        var gaScript2 = document.createElement('script');
        gaScript2.text = "window.dataLayer = window.dataLayer || [];function gtag() {dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-xxx-2');";
        document.getElementsByTagName('body')[0].appendChild(gaScript2);
    }, false);
```

