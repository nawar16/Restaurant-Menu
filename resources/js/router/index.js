import { createWebHistory, createRouter } from 'vue-router'
import store from '@/store'

/* Guest Component */
const Login = () => import('@/pages/Login.vue')
const Register = () => import('@/pages/Register.vue')
/* Guest Component */

/* Layouts */
const DahboardLayout = () => import('@/layouts/Layout.vue')
/* Layouts */

/* Authenticated Component */
const Dashboard = () => import('@/pages/Dashboard.vue')
const Category = () => import('@/pages/Category.vue')
const Item = () => import('@/pages/Item.vue')
/* Authenticated Component */


const routes = [
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: `Login`
        }
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            middleware: "guest",
            title: `Register`
        }
    },
    {
        path: "/",
        component: DahboardLayout,
        meta: {
            middleware: "auth"
        },
        children: [
            {
                name: "dashboard",
                path: '/',
                component: Dashboard,
                meta: {
                    title: `Dashboard`
                }
            },
            {
                name: "category",
                path: '/category',
                component: Category,
                meta: {
                    title: `Category`
                }
            },
            {
                name: "item",
                path: '/item',
                component: Item,
                meta: {
                    title: `Item`
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
 
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.middleware == "guest") {
        if (store.state.auth.authenticated) {
            next({ name: "dashboard" })
        }
        next()
    } else {
        if (store.state.auth.authenticated) {
            next()
        } else {
            next({ name: "login" })
        }
    }
})

export default router
