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
                            <Tabs active-key=3 @on-click="choosePage" ref="tabs">
                                <Tab-pane label="查看商品" key="key1" ></Tab-pane>
                                <Tab-pane label="新增商品" key="key2"></Tab-pane>
                                <Tab-pane label="增加库存记录" key="key3"></Tab-pane>
                                <Tab-pane label="轮播图管理" key="key4"></Tab-pane>
                            </Tabs>
                        <Input v-model="input_item_name" placeholder="请输入商品名" style="width: 300px" />
                        <button style="margin-left:10px;">查找</button>
                        <Page 
                        style="margin-top:20px;"
                        :total="totalNumber"
                        :page-size="pageSize"
                        @on-change="changePage"
                        show-total
                         />
                        <Table  border :columns="item_colums" :data="itemList_father" style="margin-top:20px;"></Table>
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
                api:"/api",
                currentPage:1,
                totalNumber:10,
                pageSize:10,
                input_item_name:'',
                itemList_father:[],
                item_colums:[{
                    title:"商品ID",
                    key:"id"
                },{
                    title:"商品名",
                    key:"name"
                },{
                    title:"增加数量",
                    key:"addNumber"
                },{
                    title:"增加时间",
                    key:"addTime"
                }],
                history_info:[
                // {
                //     id:1,
                //     name:"小米9/黄色/128g",
                //     addNumber:"100",
                //     addTime:"2020-4-3"
                // }
                ]

            }
        },
        mounted(){
                this.getAll();
        },
        methods:{
            test(id){
                console.log(id)
            },
            getAll(){
                var that=this
                this.$axios.get(that.api + "/admin/records",{
                    headers:{
                        "Authorization":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW4iOnRydWUsImlhdCI6MTU4NzQ0Njg1MCwiZXhwIjoxNTg3NTMzMjUwfQ.bPbEkirCVaHN-GtkN-z9cPHymSERg5-75jFYsVi1W1k'
                    }})
                .then(function(res) {
                        console.log(res.data)
                        that.totalNumber=res.data.rows
                        let tempArr=[];
                        
                        for(var item of res.data.items){
                            var tempObj={};
                            tempObj.id=item.id,
                            tempObj.name=item.sku.goods.name
                            tempObj.addNumber=item.num
                            tempObj.addTime=item.updated_at
                            tempArr.push(tempObj)
                        }
                        that.history_info=tempArr;
                        that.$refs.tabs.activeKey=2
                        that.totalNumber=that.history_info.length
                        that.currentPage = 1;
                        var size = that.pageSize;
                        that.itemList_father = that.history_info.slice(0,size);
                        console.log(that.history_info)
                // {
                //     id:5,
                //     name:"小米9/绿色/128g",
                //     addNumber:"100",
                //     addTime:"2020-4-3"
                // }

                // created_at: "2020-04-21 14:00:43"
                // updated_at: "2020-04-21 14:00:43"
                // id: 6
                // sku_id: 7
                // num: 111
                // price: 24642
                })
            },
            show_detail(e){
                console.log(e)
                // document.getElementsByClassName("test").setAttribute("display","block")
            },
            changePage(c){
                var temp = this.history_info;
                var size = this.pageSize;
                this.currentPage = c;
                this.itemList_father = temp.slice((c - 1) * size, c * size);
            },
            choosePage(id){
                var that=this
                console.log(id)
                if(id==0){
                     that.$router.push({ path:'/item_manage'  })
                }
                else if(id==1){
                     that.$router.push({ path:'/add_item'  })
                }
                else if(id==3){
                     that.$router.push({ path:'/img_manage'  })
                }
            }
        }

    };
</script>
