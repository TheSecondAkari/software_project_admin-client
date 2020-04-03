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
    },
    {
        path: '/item_block',
        meta: {
            title: '商品详情组件'
        },
        component: (resolve) => require(['./views/item_block.vue'], resolve)
    },
    {
        path: '/add_item',
        meta: {
            title: '新增商品'
        },
        component: (resolve) => require(['./views/add_item.vue'], resolve)
    },
    {
        path: '/item_history',
        meta: {
            title: '修改记录'
        },
        component: (resolve) => require(['./views/item_history.vue'], resolve)
    },
    {
        path: '/img_manage',
        meta: {
            title: '轮播图管理'
        },
        component: (resolve) => require(['./views/img_manage.vue'], resolve)
    },
    {
        path: '/test',
        meta: {
            title: '新增商品'
        },
        component: (resolve) => require(['./views/test.vue'], resolve)
    }
];
export default routers;