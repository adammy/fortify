# Fortify.js
**A password strength indicator.**
Fortify is a jQuery plugin that gives your users feedback on how strong their password is as they enter it into your registration form.

#### Demo
[http://codepen.io/adammy/pen/dNmGmr](http://codepen.io/adammy/pen/dNmGmr)

#### Install via Bower
```sh
bower install fortify --save
```

#### CDN
Coming soon...

#### Download
Download the development version or the minified production version.

## Basic Usage
Insert content

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
Property | Data Type | Default Value | Description
-------- | --------- | ------------- | -----------
debug | boolean | false | If true, fortify will log the password score to the console on each keypress.
feedback | boolean | true | If true, fortify will display the password strength feedback to the user. If false, no feedback will be shown, but fortify can still be used by your application via the callback function.
keyTimeout | number | 150 | The amount of time (in milliseconds) it takes for the password script to run when the user stops typing.
progressBar | boolean | true | If true, user feedback will be shown in the form of a progress bar. If false, the bar will just be a full block display containing the string feedback.
callback | function | undefined | Lets you do whatever you want with the data being generated. Includes two parameters: score and feedback.
