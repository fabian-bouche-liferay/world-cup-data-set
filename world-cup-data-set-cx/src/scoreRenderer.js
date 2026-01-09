const scoreRenderer = ({ itemData, value }) => {

	const el = document.createElement('span')

  el.innerHTML = value;

  if (Math.max(itemData.homeScore, itemData.awayScore) == value && itemData.homeScore != itemData.awayScore) {
  	el.className = `text-6`
    const strong = document.createElement('strong');
    strong.appendChild(el);
    return strong;
  }

  el.className = `text-6 text-secondary`

  return el;

}

export default scoreRenderer