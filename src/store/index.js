import {createStore} from "vuex";

export default createStore({

    state:{
        username:null,
        auth:null,
    },

    //MUTATIONS
    mutations:{
        loginUsername(state,username){
            state.username = username
            state.auth = true
        },
        logoutUsername(state){
            state.username = null
            state.auth = false
        }

    },

    //ACTIONS
    actions:{

    }


})