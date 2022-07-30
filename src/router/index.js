import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/menu',
        name: 'Menu',
        redirect: "/menu/dashboard",
        component: () => import('../views/Menu.vue'),
        children: [
            {
                path: '/menu/dashboard',
                name: '仪表盘',
                icon: 'el-icon-odometer',
                component: () => import('../views/DashBoard.vue')
            },
            {
                path: '/menu/blog/blogManage',
                name: '博客管理',
                icon: 'el-icon-edit',
                component: () => import('../views/BlogManage.vue')
            }, {
                path: '/menu/blog/typeManage',
                name: '分类管理',
                icon: 'el-icon-s-fold',
                component: () => import('../views/TypeManage.vue')
            },
            {
                path: '/menu/blog/labelManage',
                name: '标签管理',
                icon: 'el-icon-collection-tag',
                component: () => import('../views/LabelManage.vue')
            }, {
                path: '/menu/blog/remarkManage',
                name: '评论管理',
                icon: 'el-icon-chat-line-square',
                component: () => import('../views/RemarkManage.vue')
            }, {
                path: '/menu/blog/messageManage',
                name: '留言管理',
                icon: 'el-icon-message',
                component: () => import('../views/MessageManage.vue')
            }
        ]
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router
