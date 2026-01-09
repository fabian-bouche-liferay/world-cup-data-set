import 'country-flag-icons/3x2/flags.css'

import { hasFlag } from 'country-flag-icons'

const countryFlag = ({ value }) => {

	const el = document.createElement('span')

	const code = (value ?? '').toString().trim().toUpperCase()
	if (!code || !hasFlag(code)) {
		el.textContent = code
		return el
	}

	el.className = `flag:${code}`
	el.style.setProperty('--CountryFlagIcon-height', '24px')
	return el

}

export default countryFlag