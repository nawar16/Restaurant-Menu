<template>
    <div class="container">
        <div class="row justify-content-center">
                <div class="col-6 col-md-6">
                    <div class="card shadow sm">
                        <div class="card-body">
                            <form action="javascript:void(0)" class="row" method="post">
                                <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
                                    <div class="alert alert-danger">
                                        <ul class="mb-0">
                                            <li v-for="(value, key) in validationErrors" :key="key">{{ value }}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="form-group col-12">
                                    <label for="name" class="font-weight-bold">Menu Name</label>
                                    <input type="text" v-model="menu.name" name="name" id="name" class="form-control">
                                </div>
                                <div class="form-group col-12 my-2">
                                    <label for="discount" class="font-weight-bold">Discount on Menu (%)</label>
                                    <input type="number" v-model="menu.discount" name="discount" id="discount" class="form-control">
                                </div>
                                <div class="form-group col-12 my-2">
                                    <label for="price1" class="font-weight-bold">Price of Menu After Discount</label>
                                    <input type="number" disabled v-model="menu.prices.discountPrice" name="price1" id="price1" class="form-control">
                                </div>
                                <div class="form-group col-12 my-2">
                                    <label for="price2" class="font-weight-bold">Original Price of Menu</label>
                                    <input type="number" disabled v-model="menu.prices.originalPrice" name="price2" id="price2" class="form-control d-inline">
                                </div>
                                <div class="form-group col-12 my-2">
                                    <label for="price3" class="font-weight-bold">Total Price</label>
                                    <input type="number" disabled v-model="menu.prices.totalPrice" name="price3" id="price3" class="form-control d-inline">
                                </div>
                                <div class="col-12 mb-2">
                                    <button type="submit" :disabled="processing" @click="update" class="btn btn-primary btn-block">
                                        {{ processing ? "Please wait" : "update" }}
                                    </button>
                                    <button :disabled="processing" @click="calculate" class="btn btn-success float-end">
                                        {{ processing ? "Please wait" : "refresh total menu prices" }}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-6">
                    <div class="card">
                    <div class="card-header justify-content-center">Categories and Items Tree</div>
                    <div class="card-body">
                        <ul v-for="item in categories">
                        <div class="card-header">Category Name : {{item.name}} / Discount: ({{item.discount}}%)  <button class="btn btn-danger " @click="deleteCategory(item.id)"> X </button></div>
                        <hr class="hr" />
                        <ul v-for="subItem in item.sub_categories">
                            <div class="card-header">Sub Category (level-1) Name : {{subItem.name}} / Discount: ({{subItem.discount}}%) <button class="btn btn-danger " @click="deleteCategory(subItem.id)"> X </button></div>
                            <hr class="hr" />
                            <ul v-for="subItem in subItem.sub_categories">
                                <div class="card-header">Sub Category (level-2) Name : {{subItem.name}} / Discount: ({{subItem.discount}}%)  <button class="btn btn-danger " @click="deleteCategory(subItem.id)"> X </button></div>
                                <hr class="hr" />
                                <ul v-for="subItem in subItem.sub_categories">
                                    <div class="card-header">Sub Category (level-3) Name : {{subItem.name}} / Discount: ({{subItem.discount}}%)  <button class="btn btn-danger " @click="deleteCategory(subItem.id)"> X </button></div>
                                    <hr class="hr" />
                                    <ul v-for="subItem in subItem.sub_categories">
                                        <div class="card-header">Sub Category (level-4) Name : {{subItem.name}} / Discount: ({{subItem.discount}}%)  <button class="btn btn-danger " @click="deleteCategory(subItem.id)"> X </button></div>
                                        <hr class="hr" />
                                        <ul v-for="item in subItem.items">
                                            <li>Item Name:{{item.name}} / Price:{{item.price}} / Discount: ({{item.discount}}%) / Discounted Price: {{item.discount_price}} <button class="btn btn-danger " @click="deleteItem(item.id)"> X </button></li>
                                        </ul>
                                    </ul>
                                    <ul v-for="item in subItem.items">
                                        <li>Item Name:{{item.name}} / Price:{{item.price}} / Discount: ({{item.discount}}%) / Discounted Price: {{item.discount_price}} <button class="btn btn-danger " @click="deleteItem(item.id)"> X </button></li>
                                    </ul>
                                </ul>
                                <ul v-for="item in subItem.items">
                                    <li>Item Name:{{item.name}} / Price:{{item.price}} / Discount: ({{item.discount}}%) / Discounted Price: {{item.discount_price}} <button class="btn btn-danger " @click="deleteItem(item.id)"> X </button></li>
                                </ul>
                            </ul>
                            <ul v-for="item in subItem.items">
                                <li>Item Name:{{item.name}} / Price:{{item.price}} / Discount: ({{item.discount}}%) / Discounted Price: {{item.discount_price}} <button class="btn btn-danger " @click="deleteItem(item.id)"> X </button></li>
                            </ul>
                        </ul>
                        <ul v-for="item in item.items">
                            <li>Item Name:{{item.name}} / Price:{{item.price}} / Discount: ({{item.discount}}%) / Discounted Price: {{item.discount_price}} <button class="btn btn-danger " @click="deleteItem(item.id)"> X </button></li>
                        </ul>
                    </ul>
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
            categories:"category/categories"
        }),
    },
    methods:{
        ...mapActions({
            getMenu:'dashboard/getMenu',
            updateMenu:'dashboard/updateMenu',
            removeCategory:'category/removeCategory',
            removeItem:'category/removeItem',
            getCategory:'category/getCategory',
        }),
        calculate(){
            this.processing = true
            this.getMenu().then((res)=>{
            }).finally(()=>{
                this.processing = false
            })
        },
        async update(){
            this.processing = true
            axios.put(`/api/menu/${this.menu.id}`,this.menu).then((res)=>{
                res = res.data;
                this.updateMenu(res.data)
                this.getCategory()
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
        async deleteCategory(id){
            this.processing = true
            axios.delete(`/api/categories/${id}`).then((res)=>{
                this.removeCategory(id)
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
        async deleteItem(id){
            this.processing = true
            axios.delete(`/api/items/${id}`).then((res)=>{
                this.removeItem()
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
