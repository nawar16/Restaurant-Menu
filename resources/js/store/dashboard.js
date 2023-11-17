import axios from 'axios'


export default {
    namespaced: true,
 
    state:{
        currentMenu:{}
    },
    getters:{
        currentMenu(state){
            return state.currentMenu
        }
    },
    mutations:{
        SET_MENU (state, value) {
            state.currentMenu = value
        }
    },
    actions:{
        getMenu({commit}){
            return axios.get('/api/menu').then(({data})=>{
                commit('SET_MENU',data)
            }).catch(({response:{data}})=>{
                commit('SET_MENU',{})
            })
        },
        updateMenu({commit},menu){
                commit('SET_MENU',menu)
        },
    }
}
