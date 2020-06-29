<template>
    <div id="app">
        <div class="os-footer">
            <span>LAST UPDATE <span id="os-time">{{ lastUpdate }}</span></span>
            <span>Data from <a href="https://github.com/mathdroid/covid-19-api">COVID-19 API</a></span>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        "lastUpdate" : {
            type : String,
        }
    },
	data () {
		return {

		}
	},
	methods: {

	}
}
</script>

<style scoped>
.os-footer {
    color: #555;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: space-around;
    height: 20px;
    bottom: 0px;
    padding: 12px 0;
    width: 100%;
    text-align: center;
    cursor: pointer;
    background-color: #DDDDDD; 
}
</style>