 ;(function ($, undefined) {

	 'use strict';

	 $.fn.fortify = function (options) {

		 // setting plugin defaults
		 var settings = $.extend({
			 debug: false,
			 feedback: true,
			 keyTimeout: 150,
			 progressBar: true,
			 callback: undefined
		 }, options),
		 field = this,
		 timeout;

		 function calculatePasswordStrength (password) {

			 var score = 0;
			 if (!password) {
				 return score;
			 }

			 // add points to score for every unique letter until 5 repetitions
			 var letters = {};
			 for (var i = 0; i < password.length; i++) {
				 letters[password[i]] = (letters[password[i]] || 0) + 1;
				 score += 5.0 / letters[password[i]];
			 }

			 // multipliers for using variations
			 var variations = {
				 digits: /\d/.test(password),
				 lower: /[a-z]/.test(password),
				 upper: /[A-Z]/.test(password),
				 nonWords: /\W/.test(password)
			 },
			 variationCount = 0;
			 for (var check in variations) {
				 variationCount += (variations[check] === true) ? 1 : 0;
			 }
			 score += (variationCount - 1) * 10;

			 return parseInt(score);

		 }

		 function calculateScoreString (score) {

			 if (score === 0) {
				 return 'nothing';
			 } else if (score > 80) {
				 return 'strong';
			 } else if (score > 60) {
				 return 'good';
			 } else if (score > 30) {
				 return 'okay';
			 } else {
				 return 'weak';
			 }

		 }

		 String.prototype.capitalize = function () {
			 return this.charAt(0).toUpperCase() + this.slice(1);
		 };

		 // add feedback div after field
		 field.after('<div class=\"fortify-bar\"><div class=\"fortify fortify-nothing\"></div></div>');

		 field.on('keypress keyup keydown', function () {

			 if (timeout) {
				 clearTimeout(timeout);
			 }

			 timeout = setTimeout(function () {

				 var score = calculatePasswordStrength(field.val());
				 var feedback = calculateScoreString(score);

				 if (settings.feedback) {

					 $('.fortify').removeClass(function (index, className) {
						 return (className.match(/(^|\s)fortify-\S+/g) || []).join(' ');
					 }).addClass('fortify-' + feedback).text(feedback.capitalize());

					 if (settings.progressBar) {
						 $('.fortify').css('width', score + '%');
					 }

				 }

				 if (settings.debug) {
					 console.log(feedback + ' : Score is ' + score);
				 }

				 if (settings.callback) {
					 settings.callback(score, feedback);
				 }

			 }, settings.keyTimeout);

		 });

	 };

 }(jQuery));
