module.exports = function(env) {
	/**
	 * Instantiate object used to store the methods registered as a
	 * 'filter' (of the same name) within nunjucks. You can override
	 * gov.uk core filters by creating filter methods of the same name.
	 * @type {Object}
	 */
	var filters = {}

	/* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

	/* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */

	const separateThousandsWithComma = input => {
		let amount = Math.round(Number(input) * 100) / 100
		if (amount % 1 !== 0) {
			amount = amount.toFixed(2)
		}
		return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}

	const toFriendlyNumber = input => {
		if (input == 0 || input == '0' || !input) {
			return 'None'
		} else {
			return separateThousandsWithComma(input)
		}
	}

	filters.currency = (number, prefix) => {
		if (!prefix) {
			prefix = '£'
		}
		return prefix + separateThousandsWithComma(number)
	}

	filters.friendlyNumber = input => {
		return toFriendlyNumber(input)
	}

	// Render numeric date as month string e.g. '04' becomes 'April'

	let numberToMonthString = input => {
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		]
		return months[Number(input) - 1]
	}

	filters.orElse = (str, fallback) => {
		if (!str || str == '') {
			return fallback
		}
		return str
	}

	filters.month = number => numberToMonthString(number)

	filters.lowerCase = str => str.toLowerCase()

	filters.upperCase = str => str.toUpperCase()

	filters.titleCase = str => {
		return str.replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
		})
	}

	filters.numbersOnly = str =>
		str
			.toString()
			.match(/\d+/g)
			.join('')

	filters.urlSafe = str => encodeURIComponent(str)

	filters.contains = (test, str) => {
		if (test) {
			return test.includes(str)
		} else {
			return false
		}
	}

	filters.arrayContains = (arrayAsString, str) => {
		if (arrayAsString) {
			const array = arrayAsString + ''.split(',')
			return array.includes(str)
		} else {
			return false
		}
	}

	filters.stringSum = arrayOfStrings => {
		var output = 0
		if (arrayOfStrings) {
			arrayOfStrings.forEach(str => {
				parseFloat(str) ? (output += parseFloat(str)) : false
			})
		}
		return output
	}

	return filters
}
