import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '@/store/auth'
import dashboard from '@/store/dashboard'
import category from '@/store/category'

 
const store = createStore({
    plugins:[
        createPersistedState()
    ],
    modules:{
        auth,
        dashboard,
        category
    }
})

export default store
