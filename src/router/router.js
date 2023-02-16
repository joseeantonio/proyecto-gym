import { createRouter, createWebHashHistory } from 'vue-router'
import store from "@/store";

const routes = [
    { path: '/', component: ()=> import('@/components/Login.vue'),
    },
    { path: '/login',name: "login", component: ()=> import('@/components/Login.vue'),
    },
    { path: '/register', component:()=> import('@/components/Register.vue'),
    },
    { path: '/:pathMath(.*)*', component: ()=> import('@/components/NoPageFound.vue'),
    },
    { path: '/listado', component: ()=> import('@/pages/Listado.vue'),
    },
    { path: '/carrito',meta: {
            requiresAuth: true
        }, component: ()=> import("@/pages/Carrito.vue"),
    },
    { path: '/producto/:id',meta: {
            requiresAuth: true
        }, component: ()=> import("@/components/detallesProducto.vue"),
    },
    { path: '/productos/:marca', component: ()=> import("@/pages/productosMarca.vue"),
    },
    { path: '/updatePerfil',meta: {
            requiresAuth: true
        }, component: ()=> import("@/pages/updateUser.vue"),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.state.username) {
            next();
        } else {
            next({ name: "login" });
        }
    } else {
        next();
    }
});


export default router
