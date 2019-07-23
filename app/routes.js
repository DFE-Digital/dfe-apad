const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

function setUrlParameter(url, key, value) {
	var key = encodeURIComponent(key),
		value = encodeURIComponent(value)

	var baseUrl = url.split('?')[0],
		newParam = key + '=' + value,
		params = '?' + newParam

	if (url.split('?')[1] == undefined) {
		// if there are no query strings, make urlQueryString empty
		urlQueryString = ''
	} else {
		urlQueryString = '?' + url.split('?')[1]
	}

	// If the "search" string exists, then build params from it
	if (urlQueryString) {
		var updateRegex = new RegExp('([?&])' + key + '[^&]*')
		var removeRegex = new RegExp('([?&])' + key + '=[^&;]+[&;]?')

		if (typeof value === 'undefined' || value === null || value === '') {
			// Remove param if value is empty
			params = urlQueryString.replace(removeRegex, '$1')
			params = params.replace(/[&;]$/, '')
		} else if (urlQueryString.match(updateRegex) !== null) {
			// If param exists already, update it
			params = urlQueryString.replace(updateRegex, '$1' + newParam)
		} else if (urlQueryString == '') {
			// If there are no query strings
			params = '?' + newParam
		} else {
			// Otherwise, add it to end of query string
			params = urlQueryString + '&' + newParam
		}
	}

	// no parameter was set so we don't need the question mark
	params = params === '?' ? '' : params

	return baseUrl + params
}

router.all('*', (req, res, next) => {
	req.session.data.subsetError = 'false'
	next()
})

router.post('*', function(req, res, next) {
	console.log(req.body)
	if (req.body['next-page']) {
		res.redirect(req.body['next-page'])
	} else {
		next()
	}
})

router.post('/validate-subset', (req, res) => {
	const allKey = Object.keys(req.body).filter(key => key.endsWith('-all'))[0]
	const infantKey = Object.keys(req.body).filter(key =>
		key.endsWith('-infant')
	)[0]
	const allValue = req.body[allKey] ? parseFloat(req.body[allKey]) : 0
	const infantValue = req.body[infantKey] ? parseFloat(req.body[infantKey]) : 0
	if (allValue >= infantValue) {
		res.redirect(req.body['success-page'])
	} else {
		req.session.data.subsetError = 'true'
		res.redirect(req.headers.referer)
	}
})

module.exports = router
