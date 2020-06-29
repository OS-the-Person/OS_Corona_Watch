<template>
    <div id="app">
        <h1 class="os-heading">COVID-19 Monitor</h1>
        <div id="topBar">
            <span class="os-main-info">Total Confirmed 
                <span id="osConfirmedNo" class="os-values os-confirmed">{{ osConfirmedNo }}</span>
            </span>
            <span class="os-main-info">Total Deaths
                <span id="osDeathNo" class="os-values os-death">{{ osDeathNo }}</span>
            </span>
            <span class="os-main-info">Total Recovered 
                <span id="osRecoveredNo" class="os-values os-recovered" >{{ osRecoveredNo }}</span> 
            </span>
        </div>
    </div>
</template>

<script>
export default {
	data () {
		return {
            osConfirmedNo : null,
            osDeathNo : null,
            osRecoveredNo : null
		}
    },

	methods: {
        getData() {
            let api_url = "https://covid19.mathdro.id/api";
            return fetch(api_url) // Call the fetch function passing the url of the API as a parameter
                .then((res) => {
                    //console.log("resp");
                    return res.json();
                })
                .catch(() => {
                    // This is where you run code if the server returns any errors
                    console.log("Failed operation in getting data")
                });
        }
    },
    
    created () {
        this.getData()
            .then(data => {
                let { deaths, confirmed, recovered, lastUpdate  } = data;
                //console.log(deaths);
                this.osDeathNo = deaths.value;
                this.osConfirmedNo = confirmed.value;
                this.osRecoveredNo = recovered.value;

                //lastUpdate = lastUpdate.slice(0, 10)
                //document.getElementById("os-time").textContent = lastUpdate;
            })
            .catch(() => {
                // This is where you run code if the server returns any errors
                console.log("Failed operation in updating data")
            });
    }
}
</script>

<style scoped>

#osHeading {
    font-weight: 20px;
}

#topBar {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 50px;
    width: 100%;
    background-color: #DDDDDD;
    border-radius: 5px;
}

.os-main-info {
    text-align: center;
    color: #474747;
}


</style>