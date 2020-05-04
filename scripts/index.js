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


async function searchCountry(country) {
    if (true){
        api_url = "https://covid19.mathdro.id/api/countries/" + country;
        let response = await fetch(api_url);
        let data = await response.json();
        let { deaths, confirmed, recovered, lastUpdate } = data;

        deaths = deaths.value;
        confirmed = confirmed.value;
        recovered = recovered.value;
        lastUpdate = lastUpdate.slice(0, 10)
        
        document.getElementById("osCountryConfirmed").textContent = confirmed;
        document.getElementById("osCountryDeath").textContent = deaths;
        document.getElementById("osCountryRecovered").textContent = recovered;
        document.getElementById("os-time").textContent = lastUpdate;
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



