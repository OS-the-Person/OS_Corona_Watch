//functiions that are called on page load
function getCountry() {
    let api_url = "https://covid19.mathdro.id/api/countries";
	fetch(api_url) // Call the fetch function passing the url of the API as a parameter
	.then((resp) => resp.json())
	.then((data) => {
		countries = data.countries;
		var list = document.getElementById('browsers');
		
		for (let i = 0; i<countries.length; i++){
			var option = document.createElement('option');
			option.value = countries[i]["name"];
			list.appendChild(option);
		};
	})
    .catch(function() {
	    // This is where you run code if the server returns any errors
	    console.log("Failed operation in getting countries")
	});
}


function getData() {
	let api_url = "https://covid19.mathdro.id/api";
	fetch(api_url) // Call the fetch function passing the url of the API as a parameter
	.then((resp) => resp.json())
	.then((data) => {
    	let { deaths, confirmed, recovered, lastUpdate  } = data;
    	console.log(deaths);
	    deaths = deaths.value;
	    confirmed = confirmed.value;
	    recovered = recovered.value;
	    lastUpdate = lastUpdate.slice(0, 10)
	    document.getElementById("osConfirmedNo").textContent = confirmed;
	    document.getElementById("osDeathNo").textContent = deaths;
	    document.getElementById("osRecoveredNo").textContent = recovered;
	    document.getElementById("os-time").textContent = lastUpdate;
    })
    .catch(function() {
	    // This is where you run code if the server returns any errors
	    console.log("Failed operation in getting data")
	});
}


function listDeaths() {
	let api_url = "https://covid19.mathdro.id/api/deaths";
	fetch(api_url) // Call the fetch function passing the url of the API as a parameter
	.then((resp) => resp.json())
	.then((data) => {
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
	})
    .catch(function() {
	    // This is where you run code if the server returns any errors
	    console.log("Failed operation in listing deaths")
	});
}


function dailyInfo() {
	let api_url = "https://covid19.mathdro.id/api/daily";
	fetch(api_url) // Call the fetch function passing the url of the API as a parameter
	.then((resp) => resp.json())
	.then((data) => {
		data = data.pop();
		confirmed = data["deltaConfirmed"];
		recovered = data["deltaRecovered"];
		document.getElementById("dailyConfrmed").textContent = confirmed;
	    document.getElementById("dailyRecovered").textContent = recovered;
		
		//date 1
		let d = new Date()
		let osDate = String(d.getMonth() + 1) + "-" + String((d.getDate()) - 1) + "-" + String(d.getFullYear())

		let totalDeaths = 0;

		fetch(api_url + "/" + osDate) // Call the fetch function passing the url of the API as a parameter
		.then((resp) => resp.json())
		.then((data) => {
			for (i in data){
				totalDeaths += Number(data[i]["deaths"])
			}
		}).catch(function() {
	    	// This is where you run code if the server returns any errors
	    	console.log("Failed operation in getting daily date 1")
		});
		//date 2
		osDate = String(d.getMonth() + 1) + "-" + String((d.getDate()) - 2) + "-" + String(d.getFullYear())

		// date 1 - date 2 (difference is daily increase)
		fetch(api_url + "/" + osDate) // Call the fetch function passing the url of the API as a parameter
		.then((resp) => resp.json())
		.then((data) => {
			for (i in data){
				totalDeaths -= Number(data[i]["deaths"])
			}
		}).catch(function() {
	    	// This is where you run code if the server returns any errors
	    	console.log("Failed operation in getting daily date 2")
		});

		document.getElementById("dailyDeath").textContent = totalDeaths;   
	}).catch(function() {
	    // This is where you run code if the server returns any errors
	    console.log("Failed operation in getting daily info")
	});
}
//call the fxns
getCountry();
getData()
listDeaths()
dailyInfo()