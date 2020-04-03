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
.main_block{
    width:90%;
    min-height: 500px;
    border: 1px solid grey;
    padding:15px;
    
}
.special{
    min-width: 200px;
    margin-top: 10px;
}
.special_block{
    min-height: 50px;
    width:95%;
    float: left;
}
.one_special{
    min-height: 50px;
    border: 1px solid grey;
}
textarea{
    min-height: 100px;
    min-width: 200px;
}
.img_block{
    display: flex;
    flex-wrap: wrap;
    
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
                            <Tabs active-key="key3" @on-click="choosePage" ref="tabs">
                                <Tab-pane label="查看商品" key="key1" ></Tab-pane>
                                <Tab-pane label="新增商品" key="key2"></Tab-pane>
                                <Tab-pane label="增加库存记录" key="key3"></Tab-pane>
                                <Tab-pane label="轮播图管理" key="key4"></Tab-pane>
                            </Tabs>
                            <div class="main_block">
                                <a style="color:black;">选择分类:</a>
                                    <i-select :model.sync="model1" style="width:200px;margin-left:20px;">
                                        <i-option v-for="(item,key) in typeList" :value="item.value" :key="key">{{ item.label }}</i-option>
                                    </i-select>
                                <div style="margin-top:10px;">
                                    <a style="color:black;">商品名称:</a>
                                    <input style="width:200px;margin-left:20px;" placeholder="请输入商品名">
                                </div>
                                <div class="special">
                                    <div style="width:5%;float:left;">
                                        <a style="color:black;">规格</a>
                                    </div>
                                    <div class="special_block">
                                        <div class="one_special">
                                            <div>颜色</div>
                                            <div>
                                                <Radio-group :model.sync="disabledGroup">
                                                    <Radio value="金斑蝶"></Radio>
                                                    <Radio value="爪哇犀牛"></Radio>
                                                    <Radio value="印度黑羚"></Radio>
                                                </Radio-group>
                                            </div>
                                        </div>
                                        <button>添加规格</button>
                                    </div>
                                    <div style="clear:both;"></div>
                                    <div style="margin-top:10px;">
                                        <a style="color:black;">进价:</a>
                                        <input style="width:200px;margin-left:20px;" placeholder="请输入进货价">
                                    </div>
                                    <div style="margin-top:10px;">
                                        <a style="color:black;">价格:</a>
                                        <input style="width:200px;margin-left:20px;" placeholder="请输入商品价格">
                                    </div>
                                    <div style="margin-top:10px;">
                                        <a style="color:black;">数量:</a>
                                        <input style="width:200px;margin-left:20px;" placeholder="请输入商品数量">
                                    </div>
                                    <button style="margin-top:10px;margin-left:50px;">确认添加</button>    
                                    <i-table style="margin-top:10px;margin-left:50px;" border :columns="item_column" :data="item_details"></i-table>
                                    <div style="margin-top:10px;">
                                        <a style="color:black;">详情:</a>
                                        <i-input type="textarea" :rows="4" placeholder="请输入..."></i-input>
                                    </div>
                                    <div style="margin-top:10px;">
                                        <div style="width:10%;float:left;">选择图片：</div>
                                        <div class="img_block" style="width:90%;float:left;">
                                            <div v-for="(item,key) in imgList" :key="key">
                                                <img :src="item.imgUrl" style="height:100px;width:100px;">
                                            </div>
                                            <input style="display: none" type="file" id="fileExport" ref="getF" accept=".jpg" @change="get_name">
                                            <img @click="getFile()" src="../assets/add.png" style="height:100px;width:100px;">
                                        </div>
                                        <div style="clear:both;"></div>
                                    </div>   
                                    <input type="file" @change="handleFileChange" ref="inputer" />
                                    <button>完成</button>
                                    <button style="margin-left:20px;">取消</button>
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
                target:'',
                animal: '爪哇犀牛',
                disabledGroup:true,
                imgList:[
                    {imgUrl: require('../assets/add.png')},
                    {imgUrl: require('../assets/add.png')},
                    ],
                typeList: [
                    {
                        value: 'beijing',
                        label: '北京市'
                    },
                    {
                        value: 'shanghai',
                        label: '上海市'
                    }
                ],
                model1: '',
                item_column:[
                    {title:"颜色",key:"color"},
                    {title:"内存",key:"storage"},
                    {title:"价格",key:"price"},
                    {title:"数量",key:"total_number"},
                    ],
                item_details:[{
                    color:"黄色",
                    storage:"128g",
                    price:"1999",
                    total_number:"200"
                },{
                    color:"绿色",
                    storage:"256g",
                    price:"2999",
                    total_number:"200"
                }],
            }
        },
        mounted(){
            this.$refs.tabs.activeKey=1
        },
        methods:{
            test(id){
                console.log(id)
            },
            handleFileChange (e) {
                console.log(e.target.files[0])
        
            },
            getFile(){
                this.$refs.getF.click()
            },
            get_name(e){
                var filename=this.$refs.getF.value;
                var filenames=filename.split("\\")
                filename=filenames[filenames.length-1];
                console.log(filename)
                console.log(e.target.files[0])     
            },
            choosePage(id){
                var that=this
                console.log(id)
                if(id==0){
                     that.$router.push({ path:'/item_manage'  })
                }
                else if(id==2){
                     that.$router.push({ path:'/item_history'  })
                }
                else if(id==3){
                     that.$router.push({ path:'/img_manage'  })
                }
            }
        },
        

    };
</script>
