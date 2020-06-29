<template>
    <div>
        <div id="sideComp" class="os-deaths-item" v-for="(country, count) in topCountries" :key="country">
            <span>{{ count }}</span>
            <span class="os-death">{{ country }}</span>
        </div>
    </div>
</template>

<script>
//import listitems from "./ListItems.vue"

export default {
    props : {
        "topCountries" : {
            type : Object,
            required : true
        }
    },
	data () {
		return {

		}
    }
}
</script>

<style scoped>
.os-death {
    color: rgb(223, 68, 68);
}

.os-deaths-item {
    border: 1px solid rgb(228, 139, 22);
    /* border-radius: 5px; */
    margin-bottom: 20px;
    padding: 10px;
    text-align: center;
    background-color: #eee;
}


</style>