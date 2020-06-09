<style scoped>
/* 当前网页布局有问题，高度不能填满整个画面。 */
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
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
.ivu-table-overflowX{
  overflow-x: hidden;
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
.test {
  position: relative;
  width: 100px;
  height: 100px;
  background-color: yellow;
  left: 180px;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header :style="{height: '64px'}">
        <Menu mode="horizontal" theme="dark" active-name="1">
        </Menu>
      </Header>
      <Layout>
        <Sider 
          hide-trigger 
          :style="{position:'absolute',top:'64px',bottom:'0px', background: '#fff'}"
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
          :style="{padding: '0 24px 0 ',position:'absolute',left:'200px',bottom:'10px',top:'64px',right:'0px',overflow:'auto'}"
          >
          <Content :style="{padding: '24px',  minWidth: '1100px', background: '#fff' , position: 'relative', marginTop: '20px'}">
            <Tabs active-key="key3" @on-click="choosePage" ref="tabs">
              <Tab-pane label="查看商品" key="key1"></Tab-pane>
              <Tab-pane label="新增商品" key="key2"></Tab-pane>
              <Tab-pane label="增加库存记录" key="key3"></Tab-pane>
              <Tab-pane label="轮播图管理" key="key4"></Tab-pane>
            </Tabs>
            <!-- <Input v-model="input_item_name" placeholder="请输入商品名" style="width: 300px" />
            <Button type="primary" style="margin-left:10px;">查找</Button> -->
            <Button style="margin-left:10px;" @click="prePage()" id="pre">上一页</Button>
            <Button type="primary" style="margin-left:10px;" @click="nextPage()" id="next">下一页</Button>
            <p style="margin-left:10px;display:inline-block;">第 {{get_page}} 页</p>
            <p style="display:inline-block;margin-left:10px;">共 {{total_page}} 页</p>
            <div style="left:20px;right:20px;position:absolute;overflow:auto;top:120px;bottom:0px;">
              <Table border :columns="item_colums" :data="itemList_father"></Table>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      api: process.env.NODE_ENV === 'production' ? "/ruangong":"/api",
      token: "",
      currentPage: 1,
      totalNumber: 10,
      pageSize: 20,
      input_item_name: "",
      itemList_father: [],
      get_page:1,  //获取第几页的商品记录
      total_page:0,   //总商品记录页数
      item_colums: [
        {
          title: "商品ID",
          key: "id"
        },
        {
          title: "商品名",
          key: "name"
        },
        {
          title: "增加数量",
          key: "addNumber"
        },
        {
          title: "增加时间",
          key: "addTime"
        }
      ],
      history_info: [
        // {
        //     id:1,
        //     name:"小米9/黄色/128g",
        //     addNumber:"100",
        //     addTime:"2020-4-3"
        // }
      ]
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("Authorization");
    this.getAll();
    let pre=document.getElementById("pre")
    pre.disabled=true;
  },
  methods: {
    test(id) {
      console.log(id);
    },
    getAll() {
      var that = this;
      console.log(this.get_page)
      this.$axios
        .get(that.api + "/admin/records", {
          params:{
            page:that.get_page
          },
          headers: {
            Authorization: that.token
          }
        })
        .then(function(res) {
          if(res.data.count<=20){
            let next=document.getElementById("next")
            next.disabled=true;
          }
          if(res.data.count%20==0)
            that.total_page=res.data.count/20
          else
            that.total_page=Math.floor(res.data.count/20)+1
          that.totalNumber = res.data.rows;
          let tempArr = [];

          for (var item of res.data.items) {
            var tempObj = {};
            (tempObj.id = item.id), (tempObj.name = item.sku.goods.name);
            tempObj.addNumber = item.num;
            tempObj.addTime = item.updated_at;
            tempArr.push(tempObj);
          }
          that.history_info = tempArr;
          that.$refs.tabs.activeKey = 2;
          that.totalNumber = that.history_info.length;
          that.currentPage = 1;
          var size = that.pageSize;
          that.itemList_father = that.history_info.slice(0, size);
          console.log(that.history_info);
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
        });
    },
    show_detail(e) {
      console.log(e);
      // document.getElementsByClassName("test").setAttribute("display","block")
    },
    changePage(c) {
      var temp = this.history_info;
      var size = this.pageSize;
      this.currentPage = c;
      this.itemList_father = temp.slice((c - 1) * size, c * size);
    },
    choosePage(id) {
      var that = this;
      console.log(id);
      if (id == 0) {
        that.$router.push({ path: "/itemManage" });
      } else if (id == 1) {
        that.$router.push({ path: "/addItem" });
      } else if (id == 3) {
        that.$router.push({ path: "/imgManage" });
      }
    },
    prePage(){
      document.getElementById("next").disabled=false
      this.get_page=this.get_page-1
      if(this.get_page==0){
        document.getElementById("pre").disabled=true
      }
      this.getAll()
    },
    nextPage(){
      document.getElementById("pre").disabled=false
      this.get_page=this.get_page+1
      if(this.get_page==this.total_page){
        document.getElementById("next").disabled=true
      }
      this.getAll()
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
          //  that.$router.push({ path:'/item_manage'});
          break;
        default:
          break;
      }
    }
  }
};
</script>
