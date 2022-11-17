const { createRouter, createWebHashHistory } = VueRouter

import homePage from './pages/home-page.js'
import shopApp from './pages/shop-app.js'
import userDetails from './pages/user-details.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/shop',
        component: shopApp
    },
    {
        path: '/user',
        component: userDetails
    },
]

export const router = createRouter({
    routes,
    history: createWebHashHistory()
})