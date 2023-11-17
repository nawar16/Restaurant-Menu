import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '@/store/auth'
import dashboard from '@/store/dashboard'

 
const store = createStore({
    plugins:[
        createPersistedState()
    ],
    modules:{
        auth,
        dashboard
    }
})

export default store
