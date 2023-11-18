import axios from 'axios'
import router from '@/router'

export default {
    namespaced: true, 

    state:{
        categories:[],
        availableParentCategories:[],
        availableItemCategories:[]
    },
    getters:{
        categories(state){
            return state.categories
        },
        availableParentCategories(state){
            return state.availableParentCategories
        },
        availableItemCategories(state){
            return state.availableItemCategories
        }

    },
    mutations:{
        SET_CATEGORIES (state, value) {
            state.categories=value
        },
        ADD_AVAILABLE_PARENT_CATEGORIES (state, value) {
            state.availableParentCategories.push(value)
        },
        ADD_AVAILABLE_ITEM_CATEGORIES (state, value) {
            state.availableItemCategories.push(value)
        },
        SET_AVAILABLE_PARENT_CATEGORIES (state, value) {
            state.availableParentCategories=value
        },
        SET_AVAILABLE_ITEM_CATEGORIES (state, value) {
            state.availableItemCategories=value
        },
        REMOVE_CATEGORIES(state, id) {
            state.categories = state.categories.filter((item) => {
                return (item.id !== id && item.parent_id != id);
            });
        },
        REMOVE_PARENT_CATEGORIES(state, id) {
            state.availableParentCategories = state.availableParentCategories.filter((item) => {
                return (item.id !== id && item.parent_id != id);
            });
        },
        REMOVE_ITEM_CATEGORIES(state, id) {
            state.availableItemCategories = state.availableItemCategories.filter((item) => {
                return (item.id !== id && item.parent_id != id);
            });
        },
    },
    actions:{
        addItem({commit}){
            return axios.get('/api/categories').then(({data})=>{
                data = data.data;
                commit('SET_CATEGORIES',data)
                router.push({name:'dashboard'})
            }).catch(({response:{data}})=>{
                console.log(data);
            })
        },
        removeItem({commit}){
            return axios.get('/api/categories').then(({data})=>{
                data = data.data;
                commit('SET_CATEGORIES',data)
            }).catch(({response:{data}})=>{
                console.log(data);
            })
        },
        addCategory({commit},data){
            if(data.child_type==="category")
            commit('ADD_AVAILABLE_PARENT_CATEGORIES',data)
            if(data.child_type==="item")
            commit('ADD_AVAILABLE_ITEM_CATEGORIES',data)
            return axios.get('/api/categories').then(({data})=>{
                data = data.data;
                console.log(data);
                commit('SET_CATEGORIES',data)
                router.push({name:'dashboard'})
            }).catch(({response:{data}})=>{
                console.log(data);
            })
        },
        removeCategory({commit},data){
            data = data.data
            commit('REMOVE_CATEGORIES',data)
            commit('REMOVE_PARENT_CATEGORIES',data)
            commit('REMOVE_ITEM_CATEGORIES',data)
        },
        getCategory({commit}){
            return axios.get('/api/categories').then(({data})=>{
                data = data.data;
                console.log(data);
                commit('SET_CATEGORIES',data)
            }).catch(({response:{data}})=>{
                console.log(data);
            })
        },
        availableParentCategories({commit}){
            return axios.get('/api/availableParentCategories').then(({data})=>{
                data = data.data;
                console.log(data);
                commit('SET_AVAILABLE_PARENT_CATEGORIES',data)
            }).catch(({response:{data}})=>{
                console.log(data);
            })
        },
        availableItemCategories({commit}){
            return axios.get('/api/availableItemCategories').then(({data})=>{
                data = data.data;
                console.log(data);
                commit('SET_AVAILABLE_ITEM_CATEGORIES',data)
            }).catch(({response:{data}})=>{
                console.log(data);
            })
        },
    }
}
