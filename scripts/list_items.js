async function getCountry() {
    let api_url = "https://covid19.mathdro.id/api/countries";
    let response = await fetch(api_url);
    let countries = await response.json();
	countries = Object.keys(countries.countries);
	console.log(countries[0])
	var list = document.getElementById('browsers');
	console.log("done?")
	countries.forEach(function(item){
		var option = document.createElement('option');
		option.value = item;
		list.appendChild(option);
});
}

getCountry();