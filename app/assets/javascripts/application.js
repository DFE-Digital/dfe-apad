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

$('input[id$="-all"]').on('input', function() {
	var labelContent = 'For infant classes only'
	var numericValue = Number($(this).val())
	if (numericValue) {
		if (numericValue <= 1) {
			labelContent = 'For infant classes only'
		} else {
			labelContent =
				'Of those <b>' +
				numericValue +
				'</b> appeals, how many were for infant classes?'
		}
	}
	$('label[for$="-infant"]').html(labelContent)
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
