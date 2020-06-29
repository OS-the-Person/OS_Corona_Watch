function searchCountry(country) {
    if (true) {
        api_url = "https://covid19.mathdro.id/api/countries/" + country;
        fetch(api_url) // Call the fetch function passing the url of the API as a parameter
	    .then((resp) => resp.json())
	    .then((data) => {
            let { deaths, confirmed, recovered, lastUpdate } = data;

            deaths = deaths.value;
            confirmed = confirmed.value;
            recovered = recovered.value;
            lastUpdate = lastUpdate.slice(0, 10)
            
            document.getElementById("osCountryConfirmed").textContent = confirmed;
            document.getElementById("osCountryDeath").textContent = deaths;
            document.getElementById("osCountryRecovered").textContent = recovered;
            document.getElementById("os-time").textContent = lastUpdate;
        }).catch(function() {
            // This is where you run code if the server returns any errors
            console.log("Failed operation in searching for country info")
	    });
    }
}

function osSearch() {
    let country = document.getElementById("osInput").value;
    console.log(country);
    searchCountry(country);
}



