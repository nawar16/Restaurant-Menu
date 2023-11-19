<template> 
    <div class="card">
        <div class="card-header">
            <div class="col-12 col-md-6 offset-md-3">
                <div class="card shadow sm">
                    <div class="card-body">
                        <h1 class="text-center">Add Item</h1>
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
                                <label for="name" class="font-weight-bold">Item Name</label>
                                <input type="text" v-model="item.name" name="name" id="name" class="form-control">
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="discount" class="font-weight-bold">Item Discount (%)</label>
                                <input type="number" v-model="item.discount" name="discount" id="discount" class="form-control">
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="category" class="font-weight-bold">Item Category</label>
                                <select class="form-select" v-model="item.category_id" aria-label="Default select example" id="category">
                                    <option v-for="cat in availableItemCategories" :value="cat.id">{{cat.name}}</option>
                                </select>
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="price" class="font-weight-bold">Item Price ($)</label>
                                <input type="number" v-model="item.price" name="price" id="price" class="form-control">

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
    name:"item",
    data(){
        return {
            validationErrors:{},
            processing:false,
            item:{
                "name":"",
                "category_id":"",
                "price":0,
                "discount":0
            },
        }
    },
    computed: {
        ...mapGetters({
            availableItemCategories:"category/availableItemCategories"
        }),
    },
    methods:{
        ...mapActions({
            addItem:'category/addItem',
        }),
        async add(){
            this.processing = true
            axios.post(`/api/items`,this.item).then((res)=>{
                this.addItem(res.data)
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
