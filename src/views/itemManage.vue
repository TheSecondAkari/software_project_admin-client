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
                <Sider hide-trigger :style="{position:'absolute',top:'65px',bottom:'0px', background: '#fff'}">
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
                <Layout :style="{padding: '0 24px 0 ',position:'absolute',left:'200px',bottom:'0px',top:'65px',right:'0px',overflow:'hidden'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '10px', background: '#fff', position:'relative'}">
                        
                        <Tabs active-key="key1" @on-click="choosePage" ref="tabs">
                            <Tab-pane label="查看商品" key="key1" ></Tab-pane>
                            <Tab-pane label="新增商品" key="key2"></Tab-pane>
                            <Tab-pane label="增加库存记录" key="key3"></Tab-pane>
                            <Tab-pane label="轮播图管理" key="key4"></Tab-pane>
                        </Tabs>
                        <Input v-model="input_item_name" placeholder="请输入商品名" style="width: 300px" />
                        <Button type="primary" style="margin-left:10px;" @click="search()">查找</Button>
                        <Button style="margin-left:10px;">新增</Button>
                        <div style="height:20px;"></div>
                        <div id="itemTable" style="position:absolute;top:120px;left:0px;right:0px;bottom:0px;overflow:auto;">
                            <ItemBlock @showModal="parentFn" :itemList="itemList_father"></ItemBlock>
                            <Page 
                            style="margin-top:20px;margin-left:10px;margin-bottom:10px;"
                            :total="totalNumber"
                            :page-size="pageSize"
                            @on-change="changePage"
                            show-total
                            />
                        </div>
                        <Modal
                            v-model="show"
                            title="修改商品总数"
                            @on-ok="modal_ok()"
                            @on-cancel="modal_cancel()">
                            <div style="margin-top:10px;">
                                <a style="display:inline-block;">商品id：</a>
                                <p style="display:inline-block;">{{spec_id}}</p><br>
                                <a>商品总数：</a>
                                <p style="display:inline-block;">{{total}}</p><br>
                                <a>新增数量：</a>
                                <Input v-model="add_num" style="width:200px"/>
                            </div>
                        </Modal>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
    
</template>
<script>
import ItemBlock from "./itemBlock"
    export default {
        components:{
            ItemBlock
        },
        data () {
            return {
                api:"/api",
                token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW4iOnRydWUsImlhdCI6MTU4ODMwMjk1MiwiZXhwIjoxNTg4Mzg5MzUyfQ.Q12hCON9pHXDskH7ZDO8_L0UiOp9bujeNqdZvS7Hv-E",
                currentPage:1,
                totalNumber:10,
                pageSize:5,
                add_num:0,
                input_item_name:'',
                show:false,  //修改数量的框是否显示
                total:0,  //暂存当前要修改的商品数
                spec_id:0, //暂存当前要修改的规格id
                itemList_father:[],
                all_itemList:[
                //     {
                //     item_name:"小米手机",
                //     item_obj:"手机",
                //     item_id:1,
                //     item_price:2999,
                //     item_viewed_times:4,
                //     item_total_left:999,
                //     item_details:[{
                //         color:"黄色",
                //         storage:"128g"
                //     },{
                //         color:"绿色",
                //         storage:"256g"
                //     }],
                //     item_colums:[{
                //         title:"颜色",
                //         key:"color"
                //     },{
                //         title:"内存",
                //         key:"storage"
                //     }],
                // },
                // {
                //     item_name:"小米手机",
                //     item_obj:"手机",
                //     item_id:3,
                //     item_price:2999,
                //     item_viewed_times:4,
                //     item_total_left:999,
                // }
                ],

            }
        },
        mounted(){
                this.$refs.tabs.activeKey=0
                this.getAll()
                let that=this
                //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW4iOnRydWUsImlhdCI6MTU4NzcwMDQ2OSwiZXhwIjoxNTg3Nzg2ODY5fQ.fLrU3joxE-llq1N4H5O0-sqZhCZhSz79IDwZKoatdz4
                let a=document.getElementById("itemTable")
                function chooseItem(e){
                    if(e.target.id=="change"){
                        let parent=e.target.parentNode;
                        let itemId=parent.childNodes[1].childNodes[0];
                        let id=itemId.innerText.substr(6)
                        that.$router.push({
                        path: `/changeItem/${id}`,
                        })
                    }
                }
                a.addEventListener("click",chooseItem)
                
        },
        methods:{
            getAll(){
                var that=this
                this.$axios.get(that.api + "admin/goods", {
                    headers:{
                        "Authorization":that.token
                    }
                })
                .then(function(res) {
                        that.totalNumber=res.data.data.rows;
                        var arr=[];
                        var temp={};
                        //let item=res.data.data.items[0];
                        for(var item of res.data.data.items){
                            temp={}
                            temp.item_name=item.name;
                            temp.item_obj=item.category.name;
                            temp.item_id=item.id;
                            temp.item_price=item.price;
                            temp.item_viewed_times=item.view;
                            temp.item_total_left=item.stock_num;
                            temp.item_img=item.pic[0];
                            if(item.specifications.length>0){
                                temp.item_details=[];
                                temp.item_colums=[];
                                let tempOut={};
                                let count=0;
                                temp.item_colums.push({title:"id",key:"id"})
                                for(let item of item.specifications){
                                    tempOut={};
                                    tempOut.title=item.name;
                                    tempOut.key=item.name;
                                    temp.item_colums.push(tempOut);
                                }
                                temp.item_colums.push({title:"库存",key:"库存"})
                                let tempIn={};
                                for(let item of item.sku){
                                    tempIn={};
                                    count=0;
                                    tempIn.id=item.id
                                    tempIn.库存=item.stock_num
                                    for(let item2 of item.options){
                                    tempIn[temp.item_colums[count+1].title]=item2.name;
                                    count++;
                                    }
                                    temp.item_details.push(tempIn)
                                }
                            }
                            arr.push(temp)
                        }
                that.all_itemList=arr
                var size = that.pageSize;
                that.currentPage = 1;
                that.itemList_father = arr.slice(0,size);
                var a= {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                for(let item in that.all_itemList){
                    if(that.all_itemList[item].item_colums)
                        that.all_itemList[item].item_colums.push(a)
                }
                console.log(arr);
                })
            },
            search(){
                let that=this
                this.$axios.get(that.api + "/admin/goods/search", {
                    params:{
                        key:that.input_item_name
                    },
                    headers:{
                        "Authorization":that.token
                    }
                }).then(function(res){
                    that.totalNumber=res.data.data.rows;
                    var arr=[];
                    var temp={};
                    //let item=res.data.data.items[0];
                    for(var item of res.data.data.items){
                        temp={}
                        temp.item_name=item.name;
                        temp.item_obj=item.category.name;
                        temp.item_id=item.id;
                        temp.item_price=item.price;
                        temp.item_viewed_times=item.view;
                        temp.item_total_left=item.stock_num;
                        temp.item_img=item.pic[0];
                        if(item.specifications.length>0){
                            temp.item_details=[];
                            temp.item_colums=[];
                            let tempOut={};
                            let count=0;
                            for(let item of item.specifications){
                                tempOut={};
                                tempOut.title=item.name;
                                tempOut.key=item.name;
                                temp.item_colums.push(tempOut);
                            }
                            temp.item_colums.push({title:"id",key:"id"})
                            temp.item_colums.push({title:"库存",key:"库存"})
                            let tempIn={};
                            for(let item of item.sku){
                                tempIn={};
                                count=0;
                                tempIn.id=item.id
                                tempIn.库存=item.stock_num
                                for(let item2 of item.options){
                                tempIn[temp.item_colums[count].title]=item2.name;
                                count++;
                                }
                                temp.item_details.push(tempIn)
                            }
                        }
                        arr.push(temp)
                    }
                    that.all_itemList=arr
                    var size = that.pageSize;
                    that.currentPage = 1;
                    that.itemList_father = arr.slice(0,size);
                    var a= {
                            title: 'Action',
                            slot: 'action',
                            width: 150,
                            align: 'center'
                        }
                    for(let item in that.all_itemList){
                        if(that.all_itemList[item].item_colums)
                            that.all_itemList[item].item_colums.push(a)
                    }
                    console.log(arr);
                })
                console.log("ok")
            },
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
            modal_ok(){
                let that=this
                this.$axios.post(that.api + "/admin/goods/sku/"+that.spec_id+"/stock", {
                        num: that.add_num
                },{
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":that.token
                    }
                    }).then(function(e){
                        console.log(e)
                        location.reload
                    }).catch(function(err){
                        console.log(err)
                })
                console.log("ok")
            },
            modal_cancel(){
                console.log("cancel")
            },
            parentFn(obj){
                this.show=true;
                this.total=obj.total;
                this.spec_id=obj.id;
            }
        }

    };
</script>
