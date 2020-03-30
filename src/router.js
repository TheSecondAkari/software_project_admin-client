const routers = [
    {
        path: '/',
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
    }
];
export default routers;