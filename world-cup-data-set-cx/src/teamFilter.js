let _teamsPromise = null;

function fetchTeams() {
	if (_teamsPromise) return _teamsPromise;

	const url =
		'/o/c/teams/?fields=countryFlagCode%2CexternalReferenceCode%2Cname&pageSize=200';

	_teamsPromise = window.Liferay.Util.fetch(url, {
		headers: {
			Accept: 'application/json',
		},
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error(`Teams fetch failed: ${res.status} ${res.statusText}`);
			}
			return res.json();
		})
		.then((json) => {
			const items = Array.isArray(json?.items) ? json.items : [];
			return items
				.map((t) => ({
					countryFlagCode: (t.countryFlagCode || '').toString().trim().toUpperCase(),
					erc: (t.externalReferenceCode || '').toString().trim().toUpperCase(),
					name: (t.name || '').toString().trim(),
				}))
				.filter((t) => t.erc && t.name)
				.sort((a, b) => a.name.localeCompare(b.name));
		})
		.catch((err) => {
			_teamsPromise = null;
			throw err;
		});

	return _teamsPromise;
}

function descriptionBuilder(selectedData) {
	if (!selectedData) return '';
	return `Team: ${selectedData}`;
}

function escapeODataString(value) {
	return String(value).replace(/'/g, "''");
}

function oDataQueryBuilder(selectedData) {
	const teamERC = (selectedData || '').trim().toUpperCase();
	if (!teamERC) return '';

	const safe = escapeODataString(teamERC);

	return `((r_homeTeam_c_teamERC eq '${safe}') or (r_awayTeam_c_teamERC eq '${safe}'))`;
}

function htmlElementBuilder({ filter, setFilter }) {
	const div = document.createElement('div');
	div.className = 'dropdown-item';

	const row = document.createElement('div');
	row.style.display = 'flex';
	row.style.gap = '8px';
	row.style.alignItems = 'center';

	const flag = document.createElement('span');
	flag.style.display = 'inline-block';
	flag.style.setProperty('--CountryFlagIcon-height', '16px');
	flag.textContent = '';

	const select = document.createElement('select');
	select.className = 'form-control';
	select.style.flex = '1 1 auto';

	const placeholderOption = document.createElement('option');
	placeholderOption.value = '';
	placeholderOption.textContent = 'Loading teams…';
	select.appendChild(placeholderOption);

	row.appendChild(flag);
	row.appendChild(select);

	const button = document.createElement('button');
	button.className = 'btn btn-block btn-secondary btn-sm mt-2';
	button.innerText = 'Apply';

	const clearBtn = document.createElement('button');
	clearBtn.className = 'btn btn-block btn-link btn-sm mt-1 p-0';
	clearBtn.type = 'button';
	clearBtn.innerText = 'Clear';
	clearBtn.style.textAlign = 'left';

	const ercToFlagCode = new Map();

	function applySelection() {
		const teamERC = (select.value || '').trim().toUpperCase();
		setFilter({ selectedData: teamERC });
	}

	button.onclick = applySelection;

	clearBtn.onclick = () => {
		select.value = '';
		flag.className = '';
		flag.textContent = '';
		setFilter({ selectedData: '' });
	};

	select.addEventListener('change', () => {
		const teamERC = (select.value || '').trim().toUpperCase();
		const countryCode = ercToFlagCode.get(teamERC);

		if (countryCode) {
			flag.className = `flag:${countryCode}`;
		} else {
			flag.className = '';
			flag.textContent = '';
		}
	});

	fetchTeams()
		.then((teams) => {
			select.innerHTML = '';

			const opt0 = document.createElement('option');
			opt0.value = '';
			opt0.textContent = 'Select a team…';
			select.appendChild(opt0);

			for (const t of teams) {
				const opt = document.createElement('option');
				opt.value = t.erc;
				opt.textContent = t.name;
				select.appendChild(opt);

				ercToFlagCode.set(t.erc, t.countryFlagCode);
			}

			const current = (filter?.selectedData || '').toString().trim().toUpperCase();
			if (current) {
				select.value = current;
				const countryCode = ercToFlagCode.get(current);
				if (countryCode) flag.className = `flag:${countryCode}`;
			}
		})
		.catch((err) => {
			select.innerHTML = '';
			const opt = document.createElement('option');
			opt.value = '';
			opt.textContent = 'Failed to load teams';
			select.appendChild(opt);
		});

	div.appendChild(row);
	div.appendChild(button);
	div.appendChild(clearBtn);

	return div;
}

const teamHomeOrAwayFilter = {
	descriptionBuilder,
	htmlElementBuilder,
	oDataQueryBuilder,
};

export default teamHomeOrAwayFilter;
