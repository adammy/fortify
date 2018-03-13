# Fortify.js
### A password strength indicator.

#### Demo
[http://codepen.io/adammy/pen/dNmGmr](http://codepen.io/adammy/pen/dNmGmr)

#### CDN
Add a link to the css file in your `<head>`:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fortify-js@2.2.2/dist/fortify.min.css">
```

Then, before your closing `<body>` tag add:
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/fortify-js@2.2.2/dist/fortify.min.js"></script>
```

#### Package Managers

##### NPM
```sh
npm install fortify-js --save
```

##### Bower
```sh
bower install fortify --save
```

#### Usage
Reference the fortify method on your password input fields like so:
```html
<div>
	<input type="password" id="password" />
</div>
<div>
	<input type="password" id="confirm-password" />
</div>
```
```javascript
var field = document.getElementById('password');
var confirmField = document.getElementById('confirm-password');
var fortify = new Fortify(field, confirmField);
```

##### Settings
When calling the Fortify constructor, you can pass it an object to overwrite some settings. See below:
```javascript
var fortify = new Fortify(field, confirmField, {
	allowSubmission: true,
	feedback: true,
	keyTimeout: 150,
	progressBar: true,
	callback: function (score, feedback) {
		// your code
	}
});
```

Details of each setting are below:

**allowSubmission** (boolean)<br />
Default value: true<br />
If true, the parent form to your <input> fields can freely submit without interference from Fortify. If false, the form can only be submitted when the password is at least 'good' and the confirm password field matches the password field.

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
