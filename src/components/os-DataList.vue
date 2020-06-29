<template>
    <div>
        <datalist id="browsers">
            <option v-for="(country, index) in countries.countries" v-bind:key="index">{{ country.name }}</option>
        </datalist>
    </div>
</template>

<script>


export default {
    props : {
        "countries" : {
            type : Object,
            required : true
        }
    },
    
	data () {
		return {
            
		}
	},
	
}
</script>

<style scoped>

</style>