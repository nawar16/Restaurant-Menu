<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-md-3">
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import axios from "axios";
export default {
    name:"menu",
    data(){
        return {
            validationErrors:{},
            processing:false
        }},
    computed: {
        ...mapGetters({
            user: "auth/user",
            menu:"dashboard/currentMenu",

        }),
    },
    methods:{
        ...mapActions({
            getMenu:'dashboard/getMenu',
            updateMenu:'dashboard/updateMenu',

        }),
        calculate(){
            this.processing = true
            this.getMenu().then((res)=>{
            }).finally(()=>{
                this.processing = false
            })
        },
       

     
    },



}
</script>
