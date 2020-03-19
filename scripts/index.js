
async function getData() {
    let api_url = "https://covid19.mathdro.id/api";
    let response = await fetch(api_url);
    let data = await response.json();
    let { deaths, confirmed, recovered } = data;

    deaths = deaths.value;
    confirmed = confirmed.value;
    recovered = recovered.value;

    document.getElementById("osConfirmedNo").textContent = confirmed;
    document.getElementById("osDeathNo").textContent = deaths;
    document.getElementById("osRecoveredNo").textContent = recovered;
}
getData()


async function searchCountry(country) {
    let api_url = "https://covid19.mathdro.id/api/countries";
    let response = await fetch(api_url);
    let countries = await response.json();
    countries = countries.countries;
    if (country in countries){
        api_url = "https://covid19.mathdro.id/api/countries/" + countries[country];
        let response = await fetch(api_url);
        let data = await response.json();
        let { deaths, confirmed, recovered, lastUpdate } = data;

        deaths = deaths.value;
        confirmed = confirmed.value;
        recovered = recovered.value;
        console.log(confirmed)
        console.log(deaths)
        
        document.getElementById("osCountryConfirmed").textContent = confirmed;
        document.getElementById("osCountryDeath").textContent = deaths;
        document.getElementById("osCountryRecovered").textContent = recovered;
    }
    else {
        console.log("Country don't exist")
    }
}

function osSearch() {
    let country = document.getElementById("osInput").value;
    console.log(country);
    searchCountry(country);
}

