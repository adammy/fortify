# Fortify.js
### A password strength indicator.

#### Demo
[http://codepen.io/adammy/pen/dNmGmr](http://codepen.io/adammy/pen/dNmGmr)

#### CDN
Add a link to the css file in your `<head>`:
```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/fortify/1.0.4/fortify.min.css">
```

Then, before your closing `<body>` tag add:
```html
<script type="text/javascript" src="//cdn.jsdelivr.net/fortify/1.0.4/fortify.min.js"></script>
```

#### Package Managers

##### Bower
```sh
bower install fortify --save
```

##### NPM
```sh
npm install fortify-js --save
```

##### Yarn
```sh
yarn add fortify-js
```

#### Usage
Reference the fortify method on your password input field like so:
```html
<input type="password" id="password" />
```
```javascript
$("#password").fortify();
```

##### Settings
When calling the fortify method, you can pass it an object to overwrite some settings. See below:
```javascript
$('#password').fortify({
  debug: false,
  feedback: true,
  keyTimeout: 150,
  progressBar: true,
  callback: function (score, feedback) {
    // your code
  }
});
```

Details of each setting are below:

**debug** (boolean)<br />
Default value: false<br />
If true, the password score will be logged to the console on each keypress.

**feedback** (boolean)<br />
Default value: true<br />
If true, password strength feedback will be displayed to the user. If false, feedback will not be shown, but Fortify can still be used by your application via the callback function.

**keyTimeout** (number)<br />
Default value: 150<br />
The amount of time (in milliseconds) it takes for the password script to run when the user stops typing.

**progressBar** (boolean)<br />
Default value: true<br />
If true, user feedback will be shown in the form of a progress bar. If false, the bar will just be a full block display containing the string feedback.

**callback** (function)<br />
Default value: undefined<br />
Parameters: score, feedback<br />
Lets you do whatever you want with the data being generated.
