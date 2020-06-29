<template>
    <div id="daily-bar">
        <h2 class="os-heading">Daily Info</h2>
        <div class="os-country">
            <span class="os-details">
                <p id="dailyConfrmed" class="os-daily-val os-confirmed">{{ confirmed }}</p>
                    Confirmed 
            </span>
            <span class="os-details">
                <p id="dailyDeath" class="os-daily-val os-death">{{ deaths }}</p>
                    Deaths
            </span>
            <span class="os-details">
                <p id="dailyRecovered" class="os-daily-val  os-recovered">{{ recovered }}</p>
                    Recovered
            </span>
        </div>
        <h4 class="os-daily-time"></h4>
    </div>
</template>

<script>
export default {
	data () {
		return {
            confirmed : "",
            deaths : "",
            recovered : ""
		}
	},
	methods: {
        dailyInfo() {
            let api_url = "https://covid19.mathdro.id/api/daily";
            return fetch(api_url) // Call the fetch function passing the url of the API as a parameter
                .then((resp) => { 
                    return resp.json() 
                })
                .catch(function() {
                    // This is where you run code if the server returns any errors
                    console.log("Failed operation in getting daily data")
                });
        },
        date(osDate) {
            let api_url = "https://covid19.mathdro.id/api/daily";
            return fetch(api_url + "/" + osDate).then((resp) => { return resp.json() })
                .then((data) => {
                    //console.log(typeof data)
                    let totalDeaths = 0;
                    data.forEach(x => {
                        totalDeaths += Number(x.deaths)
                    })
                    return totalDeaths 
                }).catch(function() {
                    // This is where you run code if the server returns any errors
                    console.log("Failed operation in getting daily dates")
                });
        },


    },
    created () {
        this.dailyInfo()
            .then((data) => {
                data = data.pop();
                this.confirmed = data["deltaConfirmed"];
                this.recovered = data["deltaRecovered"];
                //document.getElementById("dailyConfrmed").textContent = confirmed;
                //document.getElementById("dailyRecovered").textContent = recovered;
                
                //console.log("hollass")
                //date 1
                
                let d = new Date()
                let osDate1 = String(d.getMonth() + 1) + "-" + String((d.getDate()) - 1) + "-" + String(d.getFullYear())
    
                let totalDeaths = 0;    
                
                this.date(osDate1).then((data) => {
                    // console.log(data)
                    let osDate2 = String(d.getMonth() + 1) + "-" + String((d.getDate()) - 2) + "-" + String(d.getFullYear())
                    this.date(osDate2).then((data2) =>{
                        this.deaths = data - data2
                    })
                })
            })
            .catch( () => {
                console.log("failed to complete main daily operation")
            })
    }
}
</script>

<style scoped>
#daily-bar{
   
    box-shadow: 0 0 10px grey;
    border-radius: 5px;
    margin: 10px;
    width: 100%;
    height: 200px
}

.os-heading {
    text-align: center;
    font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
}

.os-country {
    width: 100%;
    height: 200px;
    padding: 20px;
    margin: 10px;
    text-align: left;
    display: flex;
    justify-content: space-around;
}

.os-details {
    text-align: center;
    font-size: 20px;
    color: rgb(71, 71, 71);
}

.os-confirmed {
    color:  rgb(58, 89, 190);
}

.os-death {
    color: rgb(223, 68, 68);
}

.os-recovered {
    color: rgb(37, 134, 37);
}
</style>