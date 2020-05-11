//functiions that are called on page load
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

async function getData() {
    let api_url = "https://covid19.mathdro.id/api";
    let response = await fetch(api_url);
    let data = await response.json();
    let { deaths, confirmed, recovered, lastUpdate  } = data;

    deaths = deaths.value;
    confirmed = confirmed.value;
    recovered = recovered.value;
    lastUpdate = lastUpdate.slice(0, 10)

    document.getElementById("osConfirmedNo").textContent = confirmed;
    document.getElementById("osDeathNo").textContent = deaths;
    document.getElementById("osRecoveredNo").textContent = recovered;
    document.getElementById("os-time").textContent = lastUpdate;
}
getData()

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

	// this gets the countries object and outs the (key, value) into a list of tuples
	let deathsArr = []
	for (i in countries){
		deathsArr.push([i, countries[i]]);
	}
	//this sorts the list of tuples from highest to lowest
	deathsArr.sort((a, b) => {
		return b[1] - a[1]
	});
	deathsArr.splice(10);

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

async function dailyInfo() {
	let api_url = "https://covid19.mathdro.id/api/daily";
	let response = await fetch(api_url);
	let data = await response.json();
	
	data = data.pop();
	confirmed = data["deltaConfirmed"];
	recovered = data["deltaRecovered"];
	document.getElementById("dailyConfrmed").textContent = confirmed;
    document.getElementById("dailyRecovered").textContent = recovered;
	
	let d = new Date()
	let osDate = String(d.getMonth() + 1) + "-" + String((d.getDate()) - 1) + "-" + String(d.getFullYear())

	response = await fetch(api_url + "/" + osDate);
	data = await response.json();

	let totalDeaths = 0;
	for (i in data){
		totalDeaths += Number(data[i]["deaths"])
	}
	
	osDate = String(d.getMonth() + 1) + "-" + String((d.getDate()) - 2) + "-" + String(d.getFullYear())

	response = await fetch(api_url + "/" + osDate);
	data = await response.json();

	for (i in data){
		totalDeaths -= Number(data[i]["deaths"])
	}

	document.getElementById("dailyDeath").textContent = totalDeaths;   
	

}
dailyInfo()