import {createStore} from "vuex";

export default createStore({

    state:{
        username:null,
    },

    //MUTATIONS
    mutations:{
        setUsername(state,username){
            debugger
            state.username = username
        }
    },

    //ACTIONS
    actions:{

    }


})