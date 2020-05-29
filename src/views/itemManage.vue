<style scoped>
/* 当前网页布局有问题，高度不能填满整个画面。 */
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
button {
  width: auto;
  font-size: 13px;
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 5px;
}
.item_block {
  width: 99%;
  border-bottom: 1px solid grey;
  position: relative;
  padding: 20px;
  overflow: hidden;
  /* border: 1px solid gray; */
}
.item_img {
  height: 160px;
  width: 160px;
  float: left;
  /* border:1px solid grey; */
  background-color: grey;
}
.item_info_block {
  position: relative;
  height: 160px;
  width: 50%;
  /* border: 1px solid gray; */
  float: left;
  margin-left: 20px;
}
.item_info {
  margin-top: 10px;
}
.rightMenu{
  position: absolute;
  padding: 20px;
  right:0px;
  top:64px;
  bottom: 0px;
  width:300px;
  background:	#F0F8FF;
  z-index: 100;
}
.back{
  position: absolute;
  top:0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
}
.search_des{
  display: inline-block;
  height:20px;
  color: grey;
  margin-left: 20px;
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
              <Icon type="ios-navigate"></Icon>Item 1
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>Item 2
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>Item 3
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>Item 4
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider
          hide-trigger
          :style="{position:'absolute',top:'65px',bottom:'0px', background: '#fff'}"
        >
          <Menu active-name="2" theme="light" width="auto" @on-select="redirect">
            <MenuItem name="1">
              <Icon type="ios-keypad" style="margin-right: 10px;"></Icon>分类管理
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-navigate" style="margin-right: 10px;"></Icon>商品管理
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics" style="margin-right: 10px;"></Icon>订单管理
            </MenuItem>
          </Menu>
        </Sider>
        <Layout
          :style="{padding: '0 24px 0 ',position:'absolute',left:'200px',bottom:'0px',top:'65px',right:'0px',overflow:'hidden', minWidth: '1166px'}"
        >
          <!-- <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb> -->
          <Content :style="{padding: '24px',  minWidth: '1118px', minHeight: '700px', background: '#fff' , position: 'relative', marginTop: '20px'}">
            <Tabs active-key="key1" @on-click="choosePage" ref="tabs">
              <Tab-pane label="查看商品" key="key1"></Tab-pane>
              <Tab-pane label="新增商品" key="key2"></Tab-pane>
              <Tab-pane label="增加库存记录" key="key3"></Tab-pane>
              <Tab-pane label="轮播图管理" key="key4"></Tab-pane>
            </Tabs>
            <div style="height:50px;line-height:50px;">
              <Input v-model="input_item_name" placeholder="请输入商品名" style="width: 150px" />
              <Cascader
                :data="typeList"
                v-model="model1"
                style="width:150px;margin-left:10px;display:inline-block;"
                change-on-select
              ></Cascader>
              <Button type="primary" style="margin-left:10px;" @click="search()">查找</Button>
              <Button style="margin-left:10px;" @click="getAll()">重新加载</Button>
              <!-- <Button style="margin-left:10px;">新增</Button> -->
              <Button style="margin-left:10px;" @click="right_dis=true">查找选项</Button>
              <div class="search_des">{{sortVal}} / {{sort[sort_type[0]].label}} / {{overdue}}</div>
            </div>

            <div style="height:20px;"></div>
            <div
              id="itemTable"
              style="position:absolute;top:120px;left:20px;right:0px;bottom:0px;overflow:auto;"
            >
              <ItemBlock @showModal="parentFn" @showModalDel="del_item" @showModalRe="restock" :itemList="itemList_father"></ItemBlock>
              <div style="height:60px;line-height:60px;display:flex;justify-content: center;">
                <Page
                  :total="totalNumber"
                  :page-size="pageSize"
                  @on-change="changePage"
                  show-total
                />
              </div>

            </div>
            <Modal v-model="show" title="修改商品总数" @on-ok="modal_ok()" @on-cancel="modal_cancel()">
              <div style="margin-top:10px;">
                <a style="display:inline-block;">商品id：</a>
                <p style="display:inline-block;">{{spec_id}}</p>
                <br />
                <a>商品总数：</a>
                <p style="display:inline-block;">{{total}}</p>
                <br />
                <a>新增数量：</a>
                <Input v-model="add_num" style="width:200px" />
              </div>
            </Modal>
            <Modal v-model="del" title="下架商品" @on-ok="del_ok()" @on-cancel="del_cancel()">
              <div style="margin-top:10px;">
                <p>确定要下架 <a>{{del_name}}</a> 吗</p>
              </div>
            </Modal>
            <Modal v-model="re" title="重新上架商品" @on-ok="re_ok()" @on-cancel="re_cancel()">
              <div style="margin-top:10px;">
                <p>确定要重新上架 <a>{{re_name}}</a> 吗</p>
              </div>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <div class="rightMenu" v-show="right_dis">
      <p>排序选项</p>
      <RadioGroup style="margin-top:10px;" v-model="sortVal" type="button">
          <Radio label="正序"></Radio>
          <Radio label="倒序"></Radio>
      </RadioGroup>
      <p style="margin-top:10px;">排序方式</p>
      <Cascader :data="sort" v-model="sort_type" style="margin-top:10px;width:150px;display:inline-block;"></Cascader>
      <br>
      <p>商品选项</p>
      <RadioGroup style="margin-top:10px;" v-model="overdue" type="button">
          <Radio label="未下架"></Radio>
          <Radio label="已下架"></Radio>
      </RadioGroup>
      <p style="margin-top:20px;margin-bottom:10px;">共{{total_page}}页商品 <br>当前为第 {{now_page}} 页</p>
      <Button type="primary" @click="prePage()" id="prebutton" disabled>上一页</Button>
      <Button type="primary" style="margin-left:20px;" @click="nextPage()" id="nextbutton">下一页</Button> 
      <!-- <Button style="margin-top:50px;" @click="right_dis=false">收起菜单</Button> -->
    </div>
    <div class="back" v-show="right_dis" @click="right_dis=false"></div>
  </div>
</template>
<script>
import ItemBlock from "./itemBlock";
export default {
  components: {
    ItemBlock
  },
  data() {
    return {
      api: "/api",
      sort:[{
        value:0,
        label:"时间排序"
      },{
        value:1,
        label:"销量排序"
      },{
        value:2,
        label:"浏览量排序"
      }],
      typeList:[],//商品分类的选择框
      model1:[0],  //商品分类最终选择结果
      sort_type:[0],//最终选择的排序方式
      sortVal:'正序',//正序还是倒序
      total_page:1, //商品总页数
      now_page:1,//当前商品页数
      overdue:'未下架', //设置查看未下架商品还是已下架商品
      del_name:'',//准备下架的商品名
      del_id:0,//准备下架的商品id
      re_name:'',//准备重新上架商品名
      re_id:0,//准备重新上架商品id
      right_dis:false,
      token: "",
      currentPage: 1,
      totalNumber: 10,
      pageSize: 10,
      add_num: 0,
      input_item_name: "",
      show: false, //修改数量的框是否显示
      del:false, //下架商品的框是否显示
      re:false,//重新上架商品的框是否显示
      total: 0, //暂存当前要修改的商品数
      spec_id: 0, //暂存当前要修改的规格id
      itemList_father: [],
      all_itemList: [
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
      ]
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("Authorization");
    console.log(this.token)
    this.$refs.tabs.activeKey = 0;
    this.getAll();
    this.getClass();
    let that = this;
    let a = document.getElementById("itemTable");
    function chooseItem(e) {
      if (e.target.id == "change") {
        let parent = e.target.parentNode;
        let itemId = parent.childNodes[1].childNodes[0];
        let id = itemId.innerText.substr(6);
        that.$router.push({
          path: `/changeItem/${id}`
        });
      }
    }
    a.addEventListener("click", chooseItem);
  },
  methods: {
    getAll() {
      var that = this;
      //model1[model1.length-1]
      let sortVal=0;
      if (this.sortVal!="正序")
        sortVal=1;
      let overdue=0;
      if(this.overdue!="未下架")
        overdue=1;
      this.$axios
        .get(that.api + "admin/goods", {
          params: {
            category_id: that.model1[that.model1.length-1],
            sort:that.sort_type[0],
            desc:sortVal,
            overdue:overdue,
            page:that.now_page
          },
          headers: {
            Authorization: that.token
          }
        })
        .then(function(res) {
          console.log(res)
          if(res.data.data.count<=20)
            document.getElementById("nextbutton").disabled=true
          if(res.data.data.count%20==0)
            that.total_page=res.data.data.count/20
          else
            that.total_page=Math.floor(res.data.data.count/20)+1
          that.totalNumber = res.data.data.rows;
          var arr = [];
          var temp = {};
          //let item=res.data.data.items[0];
          for (var item of res.data.data.items) {
            temp = {};
            if(that.overdue=="未下架")
              temp.over=0
            else
              temp.over=1
            temp.item_name = item.name;
            temp.item_obj = item.category.name;
            temp.item_id = item.id;
            temp.item_price = item.price;
            temp.item_viewed_times = item.view;
            temp.item_total_left = item.stock_num;
            temp.item_img = item.pic[0];
            if (item.specifications.length > 0) {
              temp.item_details = [];
              temp.item_colums = [];
              let tempOut = {};
              let count = 0;
              temp.item_colums.push({ title: "id", key: "id" });
              for (let item of item.specifications) {
                tempOut = {};
                tempOut.title = item.name;
                tempOut.key = item.name;
                temp.item_colums.push(tempOut);
              }
              temp.item_colums.push({ title: "库存", key: "库存" });
              let tempIn = {};
              for (let item of item.sku) {
                tempIn = {};
                count = 0;
                tempIn.id = item.id;
                tempIn.库存 = item.stock_num;
                for (let item2 of item.options) {
                  tempIn[temp.item_colums[count + 1].title] = item2.name;
                  count++;
                }
                temp.item_details.push(tempIn);
              }
            }
            arr.push(temp);
          }
          that.all_itemList = arr;
          var size = that.pageSize;
          that.currentPage = 1;
          that.itemList_father = arr.slice(0, size);
          var a = {
            title: "Action",
            slot: "action",
            width: 150,
            align: "center"
          };
          for (let item in that.all_itemList) {
            if (that.all_itemList[item].item_colums)
              that.all_itemList[item].item_colums.push(a);
          }
        });
    },
    search() {
      let that = this;
      let sortVal=1;
      if (this.sortVal!="正序")
        sortVal=0;
      this.$axios
        .get(that.api + "/admin/goods/search", {
          params: {
            key: that.input_item_name,
            category_id: that.model1[that.model1.length-1],
            sort:that.sort_type[0],
            desc:sortVal
          },
          headers: {
            Authorization: that.token
          }
        })
        .then(function(res) {
          that.totalNumber = res.data.data.rows;
          var arr = [];
          var temp = {};
          //let item=res.data.data.items[0];
          for (var item of res.data.data.items) {
            temp = {};
            temp.item_name = item.name;
            temp.item_obj = item.category.name;
            temp.item_id = item.id;
            temp.item_price = item.price;
            temp.item_viewed_times = item.view;
            temp.item_total_left = item.stock_num;
            temp.item_img = item.pic[0];
            if (item.specifications.length > 0) {
              temp.item_details = [];
              temp.item_colums = [];
              let tempOut = {};
              let count = 0;
              for (let item of item.specifications) {
                tempOut = {};
                tempOut.title = item.name;
                tempOut.key = item.name;
                temp.item_colums.push(tempOut);
              }
              temp.item_colums.push({ title: "id", key: "id" });
              temp.item_colums.push({ title: "库存", key: "库存" });
              let tempIn = {};
              for (let item of item.sku) {
                tempIn = {};
                count = 0;
                tempIn.id = item.id;
                tempIn.库存 = item.stock_num;
                for (let item2 of item.options) {
                  tempIn[temp.item_colums[count].title] = item2.name;
                  count++;
                }
                temp.item_details.push(tempIn);
              }
            }
            arr.push(temp);
          }
          that.all_itemList = arr;
          var size = that.pageSize;
          that.currentPage = 1;
          that.itemList_father = arr.slice(0, size);
          var a = {
            title: "Action",
            slot: "action",
            width: 150,
            align: "center"
          };
          for (let item in that.all_itemList) {
            if (that.all_itemList[item].item_colums)
              that.all_itemList[item].item_colums.push(a);
          }
        });
    },
    getClass() {
      var that = this;
      this.$axios.get(that.api + "/categories", {}).then(function(res) {
        console.log(res.data.data);
        let arr = res.data.data;
        let temp = [];
        let obj = {};
        for (var item of arr) {
          obj = {
            value: item.id,
            label: item.name
          };
          let children = [];
          let inObj = {};
          if (item.childrens.length > 0) {
            for (var inItem of item.childrens) {
              inObj = {
                value: inItem.id,
                label: inItem.name
              };
              children.push(inObj);
            }
            obj.children = children;
          }
          temp.push(obj);
        }
        obj = {
          value: 0,
          label: "全部分类"
        };
        temp.unshift(obj)
        that.typeList = temp;
        console.log(that.typeList)
      });
    },
    nextPage(){
      document.getElementById("prebutton").disabled=false
      this.now_page=this.now_page+1
      if(this.now_page==this.total_page){
        document.getElementById("nextbutton").disabled=true
      }
      this.getAll()
    },
    prePage(){
      document.getElementById("nextbutton").disabled=false
      this.now_page=this.now_page-1
      if(this.now_page==1){
        document.getElementById("prebutton").disabled=true
      }
      this.getAll()
    },
    del_item(e){
      this.del=true
      this.del_id=e.id
      this.del_name=e.name
      console.log(e)
    },
    restock(e){
      this.re=true
      this.re_id=e.id
      this.re_name=e.name
      console.log(e)
    },
    del_ok(){
      let that = this;
      this.$axios
        .delete(
          that.api + "/admin/goods/"+that.del_id,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: that.token
            }
          }
        )
        .then(function(e) {
          console.log(e);
          location.reload();
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    del_cancel(){

    },
    re_ok(){
      let that = this;
      this.$axios
        .post(
          that.api + "/admin/goods/" + that.re_id + "/putaway",{},
          {
            headers: {
              Authorization: that.token
            }
          }
        )
        .then(function(e) {
          console.log(e);
          location.reload();
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    re_cancel(){

    },
    show_detail(e) {
      console.log(e);
      // document.getElementsByClassName("test").setAttribute("display","block")
    },
    changePage(c) {
      var temp = this.all_itemList;
      var size = this.pageSize;
      this.currentPage = c;
      this.itemList_father = temp.slice((c - 1) * size, c * size);
    },
    choosePage(id) {
      var that = this;
      console.log(id);
      if (id == 1) {
        that.$router.push({ path: "/addItem" });
      } else if (id == 2) {
        that.$router.push({ path: "/itemHistory" });
      } else if (id == 3) {
        that.$router.push({ path: "/imgManage" });
      }
    },
    // selectItem(index, e, p) {
    //   console.log(index);
    //   console.log(e.currentTarget.parentNode);
    //   console.log(p);
    //   // this.$Modal.info({
    //   //     title: '用户信息',
    //   //     content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
    //   // })
    // },
    modal_ok() {
      let that = this;
      this.$axios
        .post(
          that.api + "/admin/goods/sku/" + that.spec_id + "/stock",
          {
            num: that.add_num
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: that.token
            }
          }
        )
        .then(function(e) {
          console.log(e);
          location.reload();
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    modal_cancel() {
      console.log("cancel");
    },
    parentFn(obj) {
      this.show = true;
      this.total = obj.total;
      this.spec_id = obj.id;
    },

    // 侧边栏页面跳转
    redirect(name) {
      console.log("");
      var that = this;
      var id = parseInt(name);
      switch (id) {
        case 1:
          that.$router.push({ path: "/Classify" });
          break;
        case 2:
          that.$router.push({ path: "/itemManage" });
          break;
        case 3:
          that.$router.push({ path:'/orders'});
          break;
        default:
          break;
      }
    }
  }
};
</script>
