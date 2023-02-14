import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: ()=> import('@/components/Login.vue'),
    },
    { path: '/login', component: ()=> import('@/components/Login.vue'),
    },
    { path: '/register', component:()=> import('@/components/Register.vue'),
    },
    { path: '/:pathMath(.*)*', component: ()=> import('@/components/NoPageFound.vue'),
    },
    { path: '/listado', component: ()=> import('@/pages/Listado.vue'),
    },
    { path: '/carrito', component: ()=> import("@/pages/Carrito.vue"),
    },
    { path: '/producto/:id', component: ()=> import("@/components/detallesProducto.vue"),
    },
    { path: '/productos/:marca', component: ()=> import("@/pages/productosMarca.vue"),
    },
    { path: '/updatePerfil', component: ()=> import("@/pages/updateUser.vue"),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
