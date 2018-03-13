(function () {

	/*
	 * constructor
	 * @public
	 * @param {Element} field - the password <input> field that the user is entering their password on
	 * @param {Object} settings - use to overwrite default settings
	 */
	this.Fortify = function (field, confirmField, settings) {

		// default settings
		var defaults = {
			allowSubmission: true,
			callback: null,
			feedback: true,
			keyTimeout: 150,
			progressBar: true
		};

		// props
		this.field = field;
		this.confirmField = confirmField;
		this.form = this.field.form;
		this.settings = extendDefaults(defaults, settings);
		this.bar = document.createElement('div');
		this.innerBar = document.createElement('div');
		this.confirmBar = document.createElement('div');
		this.confirmInnerBar = document.createElement('div');

		// apply class names to dom elements
		this.bar.className = 'fortify-bar';
		this.innerBar.className = 'fortify fortify-nothing';
		this.confirmBar.className = 'fortify-bar';
		this.confirmInnerBar.className = 'fortify fortify-nothing';

		// insert elements into dom
		this.bar.appendChild(this.innerBar);
		this.field.parentNode.insertBefore(this.bar, this.field.nextSibling);
		this.confirmBar.appendChild(this.confirmInnerBar);
		this.confirmField.parentNode.insertBefore(this.confirmBar, this.confirmField.nextSibling);

		// for use in private event handler functions (referenced as event.target.self)
		this.field.self = this;
		this.confirmField.self = this;
		this.form.self = this;

		// add event listeners
		this.field.addEventListener('keypress', handleChange);
		this.field.addEventListener('keyup', handleChange);
		this.field.addEventListener('keydown', handleChange);
		this.field.addEventListener('keypress', handleConfirmChange);
		this.field.addEventListener('keyup', handleConfirmChange);
		this.field.addEventListener('keydown', handleConfirmChange);
		this.confirmField.addEventListener('keypress', handleConfirmChange);
		this.confirmField.addEventListener('keyup', handleConfirmChange);
		this.confirmField.addEventListener('keydown', handleConfirmChange);
		this.form.addEventListener('submit', handleSubmit);

	};

	/*
	 * given two objects, will seek to overwrite first object with anything provided in the second object
	 * alternative to Object.assign() which doesn't work in IE apparently
	 * @private
	 * @param {Object} source - source object to be modified
	 * @param {Object} updates - object with updated values
	 * @returns {Object}
	 */
	function extendDefaults(source, properties) {
		for (property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}
		return source;
	}

	/*
	 * returns a score and string for interface elements to utilize
	 * @private
	 * @param {String} password - the password the user enters into the field
	 * @returns {Object}
	 */
	function getPasswordScore(password) {

		if (!password) return { score: 0, feedback: 'nothing' }

		var score = 0;
		var scoreStr;

		/*
		add points to score for every unique char
		score added is lowered with each subsequent use of the same character
		*/
		var letterMap = {};
		password.split('').forEach(function (letter) {
			letterMap[letter] = (letterMap[letter] || 0) + 1;
			score += (5.0 / letterMap[letter]);
		});

		// multiply score based on variations used, e.g. lower and upper, special chars, and numbers
		var variations = {
			digits: /\d/.test(password),
			lower: /[a-z]/.test(password),
			upper: /[A-Z]/.test(password),
			nonWords: /\W/.test(password)
		},
		variationPasses = 0;
		for (var variance in variations) {
			variationPasses += (variations[variance] === true) ? 1 : 0;
		}
		score += (variationPasses - 1) * 10;

		// set the user-friendly score string
		if (score === 0) scoreStr = 'nothing';
		else if (score > 80) scoreStr = 'strong';
		else if (score > 60 && score <= 80) scoreStr = 'good';
		else if (score > 30 && score <= 60) scoreStr = 'okay';
		else scoreStr = 'weak';

		return {
			number: parseInt(score),
			feedback: scoreStr
		};

	};

	/*
	 * event handler for this.field on keypress, keyup, and keydown
	 * @private
	 * @param {Event} e
	 */
	function handleChange(e) {

		var _ = e.target.self;

		var timeout;
		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(function () {

			var score = getPasswordScore(_.field.value);

			if (_.settings.feedback) {
				_.innerBar.className = 'fortify fortify-' + score.feedback;
				_.innerBar.textContent = capitalize(score.feedback);
				if (_.settings.progressBar) {
					_.innerBar.style.width = score.number + '%';
				}
			}
			if (_.settings.callback) {
				_.settings.callback(score.number, score.feedback);
			}
		}, _.settings.keyTimeout);

	}

	/*
	 * event handler for this.confirmField on keypress, keyup, and keydown
	 * @private
	 * @param {Event} e
	 */
	function handleConfirmChange(e) {

		var _ = e.target.self;

		var timeout;
		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(function () {

			var score = getPasswordScore(_.field.value);

			if (_.settings.feedback) {

				if (!_.confirmField.value) {
					_.confirmInnerBar.className = 'fortify fortify-nothing';
					_.confirmInnerBar.textContent = '';
					return;
				} else if (!_.field.value) {
					_.confirmInnerBar.className = 'fortify fortify-weak';
					_.confirmInnerBar.textContent = 'There is nothing in the password field';
					return;
				} else if (_.field.value === _.confirmField.value) {
					if (score.number <= 60) {
						_.confirmInnerBar.className = 'fortify fortify-' + score.feedback;
						_.confirmInnerBar.textContent = 'Password matches, but it is not particularly good';
					} else {
						_.confirmInnerBar.className = 'fortify fortify-' + score.feedback;
						_.confirmInnerBar.textContent = 'Password matches';
					}
				} else {
					_.confirmInnerBar.className = 'fortify fortify-weak';
					_.confirmInnerBar.textContent = 'The passwords do not match';
				}

			}

		}, _.settings.keyTimeout);

	}

	/*
	 * event handler for this.form on submit
	 * @private
	 * @param {Event} e
	 */
	function handleSubmit(e) {
		var _ = e.target.self;
		if (!_.settings.allowSubmission) {
			var score = getPasswordScore(_.field.value);
			if (score.number <= 60 || _.field.value != _.confirmField.value) {
				e.preventDefault();
			}
		}
	}

	/*
	 * returns a capitalized string
	 * @private
	 * @param {String} str - the string to be capitalized
	 * @returns {String}
	 */
	function capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

}());
