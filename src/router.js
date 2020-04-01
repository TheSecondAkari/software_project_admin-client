const routers = [
    {
        path: '/',
        meta: {
            title: '登录'
        },
        component: (resolve) => require(['./views/Login.vue'], resolve)
    },
    {
        path: '/home',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./views/Home.vue'], resolve)
    },
    {
        path: '/item_manage',
        meta: {
            title: '商品管理'
        },
        component: (resolve) => require(['./views/item_manage.vue'], resolve)
    },
    {
        path: '/item_block',
        meta: {
            title: '商品详情组件'
        },
        component: (resolve) => require(['./views/item_block.vue'], resolve)
    }
];
export default routers;