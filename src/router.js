const routers = [
    {
        path: '/',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./views/Home.vue'], resolve)
    }
];
export default routers;