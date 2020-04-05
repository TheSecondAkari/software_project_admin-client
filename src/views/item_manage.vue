<style scoped>
/* 当前网页布局有问题，高度不能填满整个画面。 */
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
button{
    width:auto;
    font-size: 13px;
    padding-top: 5px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 5px;
}
.item_block{
    width: 99%;
    border-bottom: 1px solid grey;
    position: relative;
    padding:20px;
    overflow: hidden;
    /* border: 1px solid gray; */
}
.item_img{
    height: 160px;
    width:160px;
    float: left;
    /* border:1px solid grey; */
    background-color: grey;
}
.item_info_block{
    position: relative;
    height:160px;
    width:50%;
    /* border: 1px solid gray; */
    float: left;
    margin-left: 20px;
}
.item_info{
    margin-top: 10px;
}
.test{
    position: relative;
    width:100px;
    height:100px;
    background-color:yellow;
    left:180px;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <MenuItem name="1-1">Option 1</MenuItem>
                            <MenuItem name="1-2">Option 2</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Item 2
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                Item 3
                            </template>
                            <MenuItem name="3-1">Option 1</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '700px', background: '#fff'}">
                            <Tabs active-key="key1" @on-click="choosePage" ref="tabs">
                                <Tab-pane label="查看商品" key="key1" ></Tab-pane>
                                <Tab-pane label="新增商品" key="key2"></Tab-pane>
                                <Tab-pane label="增加库存记录" key="key3"></Tab-pane>
                                <Tab-pane label="轮播图管理" key="key4"></Tab-pane>
                            </Tabs>
                        <Input v-model="input_item_name" placeholder="请输入商品名" style="width: 300px" />
                        <button style="margin-left:10px;">查找</button>
                        <button style="margin-left:10px;">新增</button>
                        <div style="height:20px;"></div>
                        <ItemBlock :itemList="itemList_father"></ItemBlock>
                        <Page 
                        :total="totalNumber"
                        :page-size="pageSize"
                        @on-change="changePage"
                        show-total
                         />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
    
</template>
<script>
import ItemBlock from "./item_block"
    export default {
        components:{
            ItemBlock
        },
        data () {
            return {
                currentPage:1,
                totalNumber:10,
                pageSize:5,
                input_item_name:'',
                itemList_father:[],
                all_itemList:[{
                    item_name:"小米手机",
                    item_obj:"手机",
                    item_id:1,
                    item_price:2999,
                    item_viewed_times:4,
                    item_total_left:999,
                    item_details:[{
                        color:"黄色",
                        storage:"128g"
                    },{
                        color:"绿色",
                        storage:"256g"
                    }],
                    item_colums:[{
                        title:"颜色",
                        key:"color"
                    },{
                        title:"内存",
                        key:"storage"
                    }],
                },{
                    item_name:"小米电视",
                    item_obj:"家电",
                    item_id:2,
                    item_price:4999,
                    item_viewed_times:4,
                    item_total_left:999,
                    item_details:[{
                        color:"黄色",
                        size:"50寸"
                    },{
                        color:"蓝色",
                        size:"80寸"
                    }],
                    item_colums:[{
                        title:"颜色",
                        key:"color"
                    },{
                        title:"尺寸",
                        key:"size"
                    }],
                },
                {
                    item_name:"小米手机",
                    item_obj:"手机",
                    item_id:3,
                    item_price:2999,
                    item_viewed_times:4,
                    item_total_left:999,
                },
                {
                    item_name:"小米手机",
                    item_obj:"手机",
                    item_id:4,
                    item_price:2999,
                    item_viewed_times:4,
                    item_total_left:999,
                },
                {
                    item_name:"小米手机",
                    item_obj:"手机",
                    item_id:5,
                    item_price:2999,
                    item_viewed_times:4,
                    item_total_left:999,
                },
                {
                    item_name:"小米手机",
                    item_obj:"手机",
                    item_id:6,
                    item_price:2999,
                    item_viewed_times:4,
                    item_total_left:999,
                },
                {
                    item_name:"小米手机",
                    item_obj:"手机",
                    item_id:7,
                    item_price:2999,
                    item_viewed_times:4,
                    item_total_left:999,
                },
                {
                    item_name:"小米手机",
                    item_obj:"手机",
                    item_id:8,
                    item_price:2999,
                    item_viewed_times:4,
                    item_total_left:999,
                },
                {
                    item_name:"小米手机",
                    item_obj:"手机",
                    item_id:9,
                    item_price:2999,
                    item_viewed_times:4,
                    item_total_left:999,
                },
                {
                    item_name:"小米手机",
                    item_obj:"手机",
                    item_id:10,
                    item_price:2999,
                    item_viewed_times:4,
                    item_total_left:999,
                },
                ],

            }
        },
        mounted(){
                this.$refs.tabs.activeKey=0
                var temp = this.all_itemList;
                var size = this.pageSize;
                this.currentPage = 1;
                this.itemList_father = temp.slice(0,size);
                var a= {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                for(let item in this.all_itemList){
                    this.all_itemList[item].item_colums.push(a)

                }
                
        },
        methods:{
            show_detail(e){
                console.log(e)
                // document.getElementsByClassName("test").setAttribute("display","block")
            },
            changePage(c){
                var temp = this.all_itemList;
                var size = this.pageSize;
                this.currentPage = c;
                this.itemList_father = temp.slice((c - 1) * size, c * size);
            },
            choosePage(id){
                var that=this
                console.log(id)
                if(id==1){
                     that.$router.push({ path:'/add_item'  })
                }
                else if(id==2){
                     that.$router.push({ path:'/item_history'  })
                }
                else if(id==3){
                     that.$router.push({ path:'/img_manage'  })
                }
            },
            selectItem (index,e,p) {
                console.log(index)
                console.log(e.currentTarget.parentNode)
                console.log(p)
                // this.$Modal.info({
                //     title: '用户信息',
                //     content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
                // })
            },
        }

    };
</script>
