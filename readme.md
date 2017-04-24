# Fortify.js
**A password strength indicator.**

Fortify is a jQuery plugin that gives your users feedback on how strong their password is as they enter it into your registration form.

#### Demo
[http://codepen.io/adammy/pen/dNmGmr](http://codepen.io/adammy/pen/dNmGmr)

#### Install via Bower
```sh
bower install fortify --save
```

#### Install via NPM
```sh
npm install fortify-js --save
```

#### Install via Yarn
```sh
yarn add fortify-js
```

#### CDN
Coming soon.

#### Download
Download the development version or the minified production version.

## Basic Usage
1. Place fortify.js and fortify.css on your site. jQuery is a dependency for Fortify, so make sure to include it.
```html
<link rel="stylesheet" href="fortify.css" />
```
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="fortify.js"></script>
```
2. Reference the fortify method on your password input field.
```html
<input type="password" id="password" />
```
```javascript
$("#password").fortify();
```

## Settings
When calling fortify, you can pass it an object to overwrite some settings. An example is below:
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
