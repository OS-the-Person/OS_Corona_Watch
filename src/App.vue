<template>
  <div id="app">
		<div id="osSpace">
			<div class="main-container">
				<app-header></app-header>
                <div id="osContent" class="os-main-con"> 
                    <div id="osSearch">
                        <form name="os-country-search-from">
                            <input list="browsers" name="osCountrySearch" id="osInput" placeholder="Enter a country" v-model="country"/>
                            <app-datalist v-bind:countries="countries"></app-datalist>
                            <!-- <button type='button' class="os-search-btn" v-on:click="searchCountry(country)">Search</button>  -->
                        </form>
                    </div>
                    <app-search :enabled="enabled" :osCountryConfirmed="osCountryConfirmed" :osCountryDeath="osCountryDeath" :osCountryRecovered="osCountryRecovered"></app-search>
                </div>
			</div>
			<div class="osSide" id="app">
				<h2 class="os-heading">Top Ten Country Deaths</h2>
				<div id="osMaxDeath">
					<app-side v-bind:topCountries="topCountries"></app-side>
				</div>
			</div>
			<app-daily></app-daily>
		</div>
		<app-footer :lastUpdate="lastUpdate"></app-footer> 
  </div>
</template>

<script>

import Header from './components/os-Header.vue';
import Search from './components/os-Search.vue';
import DataList from './components/os-DataList';
import Side from './components/os-Side.vue';
import Daily from './components/os-Daily.vue';
import Footer from './components/os-Footer.vue';
import CountryList from './countries.json'


export default {
	name: 'app',
	components: {
		"app-header" : Header,
		"app-search" : Search,
		"app-side" : Side,
		"app-daily" : Daily,
        "app-footer" : Footer,
        "app-datalist" : DataList,
	},
 	
  	data () {
		return {
            topCountries : {},
            countries : CountryList,
            country : "",
            osCountryConfirmed : null,
            osCountryDeath : null,
            osCountryRecovered : null,
            lastUpdate : null,
            enabled : false
		}
	},
    methods : {
        listDeaths() {
            let api_url = "https://covid19.mathdro.id/api/deaths";
            //console.log("here")

            return fetch(api_url)  // return this promise
                .then(resp => resp.json()).catch((error) => {
            // This is where you run code if the server returns any errors
                console.log(error)
            });
        },
        searchCountry(country) {
            let api_url = "https://covid19.mathdro.id/api/countries/" + country;
            return fetch(api_url)  // return this promise
                .then(resp => resp.json()).then((data) => {
                let { deaths, confirmed, recovered, lastUpdate } = data;
                
                this.osCountryDeath = deaths.value;
                this.osCountryConfirmed = confirmed.value;
                this.osCountryRecovered = recovered.value;
                this.lastUpdate = lastUpdate.slice(0, 10)
                
                // document.getElementById("osCountryConfirmed").textContent = confirmed;
                // document.getElementById("osCountryDeath").textContent = deaths;
                // document.getElementById("osCountryRecovered").textContent = recovered;
                //document.getElementById("os-time").textContent = lastUpdate;
            }).catch(function() {
                // This is where you run code if the server returns any errors
                console.log("Failed operation in searching for country info")
            });
        },
        messager() {
            if (this.country == ""){
                this.enabled = false
            } else {
                this.enabled = true
            }
        }
    },

    created() {
        this.listDeaths().then((data) => {
            //console.log(data[0]["countryRegion"].deaths);
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
            for (let i in countries){
                deathsArr.push([i, countries[i]]);
            }
            //this sorts the list of tuples from highest to lowest
            deathsArr.sort((a, b) => {
                return b[1] - a[1]
            });
            deathsArr.splice(10);

            let obj = {}
            for (let i = 0; i < deathsArr.length; i++){
                let name = deathsArr[i][0]
                obj[name] = deathsArr[i][1]
            };
            this.topCountries = obj;
        })
        .catch( ()=> {
            // This is where you run code if the server returns any errors
            console.log("HOOLLAA")
        });
    },
    updated() {
        this.messager();
        this.searchCountry(this.country)
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
}

body {
    background-color: rgb(243, 243, 243);
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

.main-container .os-heading {
    color : #e0860f;
}

#osSpace {
    display: flex;
    justify-content: space-around;
    padding: 10px 10px;
    margin: 10px 200px;
    flex-flow: row wrap;
    /* border: 1px solid black; */
}

#osMaxDeath {
    padding: 10px;
    margin: 10px;
    display: flex;
    flex-direction: column;
}

.main-container {
    box-shadow: 0 0 10px grey;
    border-radius: 5px;
    margin: 10px;
    margin-bottom: 40px;
    padding: 20px;
    width: 750px;
    flex: 4; 
}
.osSide {
    flex: 2;
    box-shadow: 0 0 10px grey;
    border-radius: 5px;
    width: 100%;
    margin: 10px;
    padding: 20px;
}


.os-heading {
    text-align: center;
    font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    color:rgb(53, 53, 53);
}

.os-search-btn {
    background-color: rgb(228, 139, 22);
    padding: 10px 15px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    color: white;
    margin: 4px;
    width: 200px;
    border-radius: 4px;
    cursor: pointer;
}
.os-search-btn:active {
    background-color: rgb(236, 236, 236);
    color: #444;
}

#osSearch form {
    text-align: center;
}

#osContent {
    margin-top: 50px;
    padding: 20px;
    border-radius: 5px;
    background-color: rgb(221, 221, 221);
    display: flex;
    flex-direction: column;
    align-items: float-left;
    justify-content: space-evenly;
}

#osInput {
    height: 44px;
    border: 1px solid rgba(223, 225, 229);
    font-size: 16px;
    border-radius: 5px;
    outline:none;
    width: 500px;
    color: #444;
    margin: 25px 0 25px 0;
    text-indent: 2.6em;
    box-shadow: 0 1px 6px 0 #333;
}
#osInput:focus {
    border-color : #C47713;
    box-shadow: 0 0 10px #C47713;
}
</style>
