const currentForm = ({ value }) => {
	const element = document.createElement('div');
	element.style.display = 'flex';
	element.style.alignItems = 'center';

	const form = (value ?? '').toString().trim().toUpperCase();
	if (!form) return element;

	const dotR = 10;
	const gap = 6;
	const pad = 1;
	const step = dotR * 2 + gap;

	const tokens = [...form].filter((c) => c === 'W' || c === 'L' || c === 'T');

	const width = pad * 2 + Math.max(tokens.length, 1) * step - gap;
	const height = pad * 2 + dotR * 2;

	const svgNS = 'http://www.w3.org/2000/svg';
	const svg = document.createElementNS(svgNS, 'svg');
	svg.setAttribute('width', String(width));
	svg.setAttribute('height', String(height));
	svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
	svg.style.display = 'block';

	const defs = document.createElementNS(svgNS, 'defs');

	function addSphereGradient(id, cssVar) {
		const grad = document.createElementNS(svgNS, 'radialGradient');
		grad.setAttribute('id', id);

		grad.setAttribute('cx', '30%');
		grad.setAttribute('cy', '30%');
		grad.setAttribute('r', '75%');

		const stop1 = document.createElementNS(svgNS, 'stop');
		stop1.setAttribute('offset', '0%');
		stop1.setAttribute('stop-color', '#ffffff');
		stop1.setAttribute('stop-opacity', '0.65');

		const stop2 = document.createElementNS(svgNS, 'stop');
		stop2.setAttribute('offset', '45%');
		stop2.setAttribute('stop-color', `var(${cssVar})`);
		stop2.setAttribute('stop-opacity', '1');

		const stop3 = document.createElementNS(svgNS, 'stop');
		stop3.setAttribute('offset', '100%');
		stop3.setAttribute('stop-color', '#000000');
		stop3.setAttribute('stop-opacity', '0.25');

		grad.appendChild(stop1);
		grad.appendChild(stop2);
		grad.appendChild(stop3);

		defs.appendChild(grad);
	}

	addSphereGradient('grad-w', '--success');
	addSphereGradient('grad-t', '--secondary');
	addSphereGradient('grad-l', '--danger');

	const filter = document.createElementNS(svgNS, 'filter');
	filter.setAttribute('id', 'shadow');
	filter.setAttribute('x', '-30%');
	filter.setAttribute('y', '-30%');
	filter.setAttribute('width', '160%');
	filter.setAttribute('height', '160%');

	const dropShadow = document.createElementNS(svgNS, 'feDropShadow');
	dropShadow.setAttribute('dx', '0');
	dropShadow.setAttribute('dy', '1.2');
	dropShadow.setAttribute('stdDeviation', '0.9');
	dropShadow.setAttribute('flood-color', '#000');
	dropShadow.setAttribute('flood-opacity', '0.25');

	filter.appendChild(dropShadow);
	defs.appendChild(filter);

	svg.appendChild(defs);

	const style = document.createElementNS(svgNS, 'style');
	style.textContent = `
		.dot { filter: url(#shadow); }
		.dot-w { fill: url(#grad-w); }
		.dot-t { fill: url(#grad-t); }
		.dot-l { fill: url(#grad-l); }
	`;
	svg.appendChild(style);

	tokens.forEach((t, i) => {
		const cx = pad + dotR + i * step;
		const cy = pad + dotR;

		const circle = document.createElementNS(svgNS, 'circle');
		circle.setAttribute('cx', String(cx));
		circle.setAttribute('cy', String(cy));
		circle.setAttribute('r', String(dotR));
		circle.setAttribute('class', `dot ${t === 'W' ? 'dot-w' : t === 'T' ? 'dot-t' : 'dot-l'}`);

		const highlight = document.createElementNS(svgNS, 'circle');
		highlight.setAttribute('cx', String(cx - dotR * 0.35));
		highlight.setAttribute('cy', String(cy - dotR * 0.35));
		highlight.setAttribute('r', String(dotR * 0.35));
		highlight.setAttribute('fill', '#fff');
		highlight.setAttribute('opacity', '0.35');

		const title = document.createElementNS(svgNS, 'title');
		title.textContent = t === 'W' ? 'Win' : t === 'T' ? 'Tie' : 'Loss';
		circle.appendChild(title);

		svg.appendChild(circle);
		svg.appendChild(highlight);
	});

	element.appendChild(svg);
	return element;
};

export default currentForm;
