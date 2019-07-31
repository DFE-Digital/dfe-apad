/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
	window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function() {
	window.GOVUKFrontend.initAll()

	$('input').attr('autocomplete', 'off')
})

function nextPageBasedOnSelection($radioObject) {
	if (nextPageRoutes) {
		for (let index = 0; index < Object.keys(nextPageRoutes).length; index++) {
			var checkboxValue = $radioObject.val()
			if (nextPageRoutes[checkboxValue] != undefined) {
				var nextPageField = null
				if ($('#next-page').length) {
					nextPageField = $('#next-page')
				} else {
					nextPageField = $(
						'<input type="hidden" id="next-page" name="next-page">'
					)
					$('button[type=submit]').before(nextPageField)
				}
				nextPageField.val(nextPageRoutes[checkboxValue])
				console.log(
					'Next page destination has been set as "' +
						nextPageRoutes[checkboxValue] +
						'"'
				)
				break
			} else {
				$('#next-page').remove()
			}
		}
	}
}

$('input[type=radio]').on('change', function() {
	try {
		$('input[type=radio]:checked').each(function() {
			nextPageBasedOnSelection($(this))
		})
	} catch (e) {}
})

function separateThousandsWithComma(input) {
	let amount = Math.round(Number(input) * 100) / 100
	if (amount % 1 !== 0) {
		amount = amount.toFixed(2)
	}
	return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function toFriendlyNumber(input) {
	if (input == 0 || input == '0' || !input) {
		return 'None'
	} else {
		return separateThousandsWithComma(input)
	}
}

function setLabels() {
	if ($('input[id$="-all"]').length != 0) {
		var labelContent = 'For infant classes only'
		var numericValue = Number($('input[id$="-all"]').val())
		if (numericValue) {
			if (numericValue <= 1) {
				labelContent = 'For infant classes only'
			} else {
				labelContent =
					'Of those <b>' +
					toFriendlyNumber(numericValue) +
					'</b> appeals, how many were for infant classes?'
			}
		}
		$('label[for$="-infant"]').html(labelContent)
	}
}

setLabels()

$('input[id$="-all"]').on('input', function() {
	setLabels()
})

window.addEventListener('pageshow', event => {
	const historyTraversal =
		event.persisted ||
		(typeof window.performance != 'undefined' &&
			window.performance.navigation.type === 2)
	if (historyTraversal) {
		// Handle page restore.
		window.location.reload()
	}
})

// Suffix all root link paths with current iteration

const iterationRoute = (str, path) => {
	var pathParts = []
	while (path.length != 0) {
		pathParts.push(path.substring(path.lastIndexOf('/'), path.length))
		path = path.slice(0, -pathParts[pathParts.length - 1].length)
	}
	return str.replace(
		'#root#',
		pathParts[pathParts.length - 1] + pathParts[pathParts.length - 2]
	)
}

const windowPath = window.location.pathname

// Apply to all links, forms and input values with #root# placeholder

$('a[href*=\\#root\\#]').each((_, link) => {
	$(link).attr('href', iterationRoute($(link).attr('href'), windowPath))
})

$('input[value*=\\#root\\#]').each((_, input) => {
	$(input).attr('value', iterationRoute($(input).attr('value'), windowPath))
})

$('form[action*=\\#root\\#]').each((_, form) => {
	$(form).attr('action', iterationRoute($(form).attr('action'), windowPath))
})

$('.govuk-summary-list__key').each(function() {
	if (
		$(this)
			.text()
			.trim() == ''
	) {
		$(this)
			.closest('.govuk-summary-list__row')
			.remove()
	}
})

$('.query-notice .govuk-warning-text__icon').text('?')
