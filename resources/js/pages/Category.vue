<template>
    <div class="card">
        <div class="card-header">
            <div class="col-12 col-md-6 offset-md-3">
                <div class="card shadow sm">
                    <div class="card-body">
                        <h1 class="text-center">Add Category</h1>
                        <hr/> 
                        <form action="javascript:void(0)" class="row" method="post">
                            <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
                                <div class="alert alert-danger">
                                    <ul class="mb-0">
                                        <li v-for="(value, key) in validationErrors" :key="key">{{ value }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group col-12">
                                <label for="name" class="font-weight-bold">Category Name</label>
                                <input type="text" v-model="category.name" name="name" id="name" class="form-control">
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="discount" class="font-weight-bold">Category Discount (%)</label>
                                <input type="number" v-model="category.discount" name="discount" id="discount" class="form-control">
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="category" class="font-weight-bold">Parent Category</label>
                                <select class="form-select" v-model="category.parent_id" aria-label="Default select example" id="category">
                                    <option v-for="cat in availableParentCategories" :value="cat.id">{{cat.name}}</option>
                                </select>
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="types" class="font-weight-bold">Category Child Type</label>
                                <select class="form-select" v-model="category.child_type" aria-label="Default select example" id="types">
                                <option v-for="type in types" :value="type.code">{{type.name}}</option>
                                </select>
                            </div>
                            <div class="col-12 mb-2">
                                <button type="submit" :disabled="processing" @click="add" class="btn btn-primary btn-block">
                                    {{ processing ? "Please wait" : "Add" }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import axios from "axios";
export default {
    name:"category",
    data(){
        return {
            validationErrors:{},
            processing:false,
            category:{
                "name":"",
                "parent_id":"",
                "child_type":"category",
                "discount":0
            },
            types:[
                {name:"Item",code:"item"},
                {name:"Category",code:"category"},
            ]
        }},
    computed: {
        ...mapGetters({
            user: "auth/user",
            menu:"menu/currentMenu",
            availableParentCategories:"category/availableParentCategories"
        }),
    },
    methods:{
        ...mapActions({
            addCategory:'category/addCategory',
        }),
        async add(){
            this.processing = true
            axios.post(`/api/categories`,this.category).then((res)=>{
                this.addCategory(res.data.data)
                this.validationErrors = {}
            }).catch(({response})=>{
                if(response.status===422){
                    this.validationErrors = response.data.errors
                }else{
                    this.validationErrors = {}
                    alert(response.data.message)
                }
            }).finally(()=>{
                this.processing = false
            })
        },
    },
}
</script>
