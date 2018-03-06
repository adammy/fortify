class Fortify {

	constructor(field, options) {
		const defaults = {
			feedback: true,
			keyTimeout: 150,
			progressBar: true,
			callback: null
		};
		this.field = field;
		this.options = Object.assign(defaults, options);
		this.init();
	}

	getPasswordScore(password) {

		if (!password) return { score: 0, feedback: 'nothing' }

		let score = 0;
		let scoreStr;

		/*
			add points to score for every unique char
			score added is lowered with each subsequent use of the same character
		*/
		let letterMap = {};
		password.split('').forEach(letter => {
			letterMap[letter] = (letterMap[letter] || 0) + 1;
			score += (5.0 / letterMap[letter]);
		});

		// multiply score based on variations used, e.g. lower and upper, special chars, and numbers
		let variations = {
			digits: /\d/.test(password),
			lower: /[a-z]/.test(password),
			upper: /[A-Z]/.test(password),
			nonWords: /\W/.test(password)
		},
		variationPasses = 0;
		for (let variance in variations) {
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
			score: parseInt(score),
			feedback: scoreStr
		};

	}

	init() {

		// initialize and set props for dom elements
		const fortifyBar = document.createElement('div');
		fortifyBar.className = 'fortify-bar';
		const fortifyInner = document.createElement('div');
		fortifyInner.className = 'fortify fortify-nothing';
		fortifyBar.appendChild(fortifyInner);
		this.field.parentNode.insertBefore(fortifyBar, this.field.nextSibling);

		// init _this for usage in eventListener
		const _this = this;

		// init timeout to allow for clearing
		let timeout;

		// execute on change of password
		function handleChange() {

			if (timeout) clearTimeout(timeout);

			timeout = setTimeout(function () {

				const scoreObj = _this.getPasswordScore(_this.field.value),
					score = scoreObj.score,
					feedback = scoreObj.feedback;

				if (_this.options.feedback) {
					fortifyInner.className = `fortify fortify-${feedback}`;
					fortifyInner.textContent = capitalize(feedback);
					if (_this.options.progressBar) {
						fortifyInner.style.width = `${score}%`;
					}
				}
				if (_this.options.callback) {
					_this.options.callback(score, feedback);
				}
			}, _this.options.keyTimeout);
		}

		this.field.addEventListener('keypress', handleChange);
		this.field.addEventListener('keyup', handleChange);
		this.field.addEventListener('keydown', handleChange);

	}

}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
