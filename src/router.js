const routers = [
    {
        path: '/',
        meta: {
            title: '登录'
        },
        component: (resolve) => require(['./views/Login.vue'], resolve)
    },
    {
        path: '/classify',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./views/Classify.vue'], resolve)
    },
    {
        path: '/addclass',
        meta: {
            title: '添加分类'
        },
        component: (resolve) => require(['./views/AddClass.vue'], resolve)
    },
    {
        path: '/itemManage',
        meta: {
            title: '商品管理'
        },
        component: (resolve) => require(['./views/itemManage.vue'], resolve)
    },
    {
        path: '/itemBlock',
        meta: {
            title: '商品详情组件'
        },
        component: (resolve) => require(['./views/itemBlock.vue'], resolve)
    },
    {
        path: '/addItem',
        meta: {
            title: '新增商品'
        },
        component: (resolve) => require(['./views/addItem.vue'], resolve)
    },
    {
        path: '/changeItem',
        meta: {
            title: '新增商品'
        },
        component: (resolve) => require(['./views/changeItem.vue'], resolve)
    },
    {
        path: '/itemHistory',
        meta: {
            title: '修改记录'
        },
        component: (resolve) => require(['./views/itemHistory.vue'], resolve)
    },
    {
        path: '/imgManage',
        meta: {
            title: '轮播图管理'
        },
        component: (resolve) => require(['./views/imgManage.vue'], resolve)
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