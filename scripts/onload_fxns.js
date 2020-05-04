async function getCountry() {
    let api_url = "https://covid19.mathdro.id/api/countries";
    let response = await fetch(api_url);
    let countries = await response.json();
	countries = countries.countries;
	var list = document.getElementById('browsers');
	
	for (let i = 0; i<countries.length; i++){
		var option = document.createElement('option');
		option.value = countries[i]["name"];
		list.appendChild(option);
	};
}
getCountry();

async function listDeaths() {
	let api_url = "https://covid19.mathdro.id/api/deaths";
	let response = await fetch(api_url);
	let data = await response.json();
	//console.log(data[0]["countryRegion"].deaths)
	let countries = {}
	for (let i = 0; i < data.length; i++){
		let x  = data[i];
		var vall = x.countryRegion

		if (vall in countries){
			countries[vall] += x.deaths;	
		}
		else {
			countries[vall] = x.deaths;
		}
	};
	let deathsArr = []
	
	console.log(countries)
	
	for (i in countries){
		deathsArr.push([i, countries[i]]);
	}
	deathsArr.sort((a, b) => {
		return b[1] - a[1]
	});
	deathsArr.splice(10);
	console.log(deathsArr);

	var list = document.getElementById('osMaxDeath');
	//clear element childs
	list.innerHTML = '';

	for (let i = 0; i<deathsArr.length; i++){
		var div = document.createElement('div');
		var countryName = document.createElement('span');
		var countryDeath = document.createElement('span');
		countryName.textContent = deathsArr[i][0];
		countryDeath.textContent = deathsArr[i][1];

		countryDeath.setAttribute('class', 'os-death');

		div.appendChild(countryName);
		div.appendChild(countryDeath);
		div.setAttribute('class', 'os-deaths-item');
		list.append(div)
	};
}
listDeaths()
	