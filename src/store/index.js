import {createStore} from "vuex";

export default createStore({
    //STATE
    state:{
        username:null,
        auth:null,
        cantidad:null
    },
    //MUTATIONS
    mutations:{
        //metodo almacenado en el store para poner el username null o darle un valor
        loginUsername(state,username){
            state.username = username
            state.auth = true
        },
        logoutUsername(state){
            state.username = null
            state.auth = false
        },
        setCantidad(state,cantidad){
            state.cantidad = cantidad
        }
    },
    //ACTIONS
    actions:{
    }
})