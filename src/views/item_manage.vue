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
    width: 1050px;
    height: auto;
    border-bottom: 1px solid grey;
    position: relative;
    padding:20px;
    overflow: hidden;
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
    width:820px;
    /* border: 1px solid gray; */
    float: left;
    margin-left: 20px;
}
.item_info{
    margin-top: 10px;
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
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <Input v-model="value" placeholder="请输入商品名" style="width: 300px" />
                        <button style="margin-left:10px;">查找</button>
                        <button style="margin-left:10px;">新增</button>
                        <div style="height:20px;"></div>
                        <div class="item_block" v-for=" (item,key) in itemList" :key="key">
                            <div class="item_img"></div>
                            <div class="item_info_block">
                                <div class="item_info"><b>商品id：</b> {{item.item_id}}</div>
                                <div class="item_info"><b>商品类别：</b> {{item.item_obj}}</div>
                                <div class="item_info"><b>商品名称：</b> {{item.item_name}}</div>
                                <div class="item_info"><b>商品价格：</b> {{item.item_price}}</div>
                                <div class="item_info"><b>商品浏览数：</b> {{item.item_viewed_times}}</div>
                                <div class="item_info" style="position:absolute;top:0px;left:150px;"><b>剩余总库存：</b> {{item.item_viewed_times}}</div>
                                <button style="position:absolute;top:0px;left:750px;">修改</button>
                                <button style="position:absolute;top:0px;top:120px;left:750px;">收起</button>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
    
</template>
<script>
    export default {
        data () {
            return {
                itemList:[{
                    item_name:"小米手机",
                    item_obj:"手机",
                    item_id:1,
                    item_price:2999,
                    item_viewed_times:4,
                    item_total_left:999,
                },{
                    item_name:"小米手机",
                    item_obj:"手机",
                    item_id:1,
                    item_price:2999,
                    item_viewed_times:4,
                    item_total_left:999,
                },
                ],

            }
        }
    }
</script>
