<template>
    <div class="os-lister">
        <div class="os-country" v-show="enabled">
            <span class="os-details">
                Confirmed 
                <p id="osCountryConfirmed" class="os-dets os-confirmed">{{ osCountryConfirmed }}</p>
                    
            </span>
            <span class="os-details">
                Deaths
                <p id="osCountryDeath" class="os-dets os-death">{{ osCountryDeath }}</p>
                    
            </span>
            <span class="os-details">
                Recovered
                <p id="osCountryRecovered" class="os-dets os-recovered">{{ osCountryRecovered }}</p>
                
            </span>
        </div>
        <div class="os-country" v-show="!enabled" id="message">
            Select a country to find the Impact of COVID-19 on it.
        </div>
    </div>
</template>

<script>
export default {
    props : {
        "osCountryConfirmed" : {
            type : Number,
        },
        "osCountryDeath" : {
            type : Number,
        },
        "osCountryRecovered" : {
            type : Number,
        },
        "enabled": {
            type : Boolean
        }
    },
	data () {
		return {
            
		}
    },
	methods: {

    },
    created() {

    }
}
</script>

<style scoped>
.os-details {
    text-align: center;
    font-size: 20px;
    color: rgb(71, 71, 71);
}

.os-lister {
    /* border:1px solid #444; */
    padding: 20px;
    margin: 20px;
    width: 90%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
}

.os-country {
    width: 100%;
    height: 200px;
    /* border: 1px solid pink; */
    padding: 20px;
    margin: 10px;
    text-align: left;
    display: flex;
    justify-content: space-around;
}

.os-dets {
    padding: 0px;
    margin: 15px;
    font-size: 50px;
}

</style>