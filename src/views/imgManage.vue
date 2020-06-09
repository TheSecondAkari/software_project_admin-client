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
  width: 500px;
  border-bottom: 1px solid grey;
  position: relative;
  padding: 15px;
  overflow: hidden;
  /* border: 1px solid gray; */
}
.item_img {
  height: 130px;
  width: 130px;
  float: left;
  /* border:1px solid grey; */
  background-color: grey;
}
.item_info_block {
  position: relative;
  height: 130px;
  width: 50%;
  /* border: 1px solid gray; */
  float: left;
  margin-left: 20px;
}
.item_info {
  margin-top: 6px;
  font-size: 13px;
  width: 150px;
}
.test {
  position: relative;
  width: 100px;
  height: 100px;
  background-color: yellow;
  left: 180px;
}
.leftForm {
  width: 450px;
  margin-top: 20px;
  position: absolute;
}
.rightForm {
  padding: 10px;
  position: absolute;
  top: 80px;
  width: 525px;
  left: 500px;
  height: 590px;
  background-color: #f5f7f9;
}
.Page {
  position: absolute;
  bottom: 10px;
  left: 160px;
}
.pageDiv {
  position: absolute;
  bottom: 15px;
  padding-bottom: 10px;
  left: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header :style="{height: '64px'}">
        <Menu mode="horizontal" theme="dark" active-name="1"></Menu>
      </Header>
      <Layout :style="{overflow:'auto'}">
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
          :style="{padding: '0 24px 0 ',position:'absolute',left:'200px',bottom:'10px',top:'64px',right:'0px', overflow:'auto',}"
        >
          <!-- <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>-->
          <Content
            :style="{padding: '24px', minWidth: '1118px', minHeight: '700px', background: '#fff' , position: 'relative', marginTop: '20px'}"
          >
            <Tabs active-key="4" @on-click="choosePage" ref="tabs">
              <Tab-pane label="查看商品" key="key1"></Tab-pane>
              <Tab-pane label="新增商品" key="key2"></Tab-pane>
              <Tab-pane label="增加库存记录" key="key3"></Tab-pane>
              <Tab-pane label="轮播图管理" key="key4"></Tab-pane>
            </Tabs>
            <Input v-model="input_item_name" placeholder="请输入商品名" style="width: 300px" />
            <Button @click="search()" style="margin-left:10px;" type="primary">查找</Button>
            <!-- <div style="width:100%;position:relative;"> -->
            <div class="leftForm">
              <Table
                border
                :columns="item_colums"
                :data="selectedList"
                style="width:450px;"
                ref="table"
              >
                <template slot-scope="{ row, index }" slot="action">
                  <a @click="remove(index)">删除</a>
                  <a @click="moveUp(index)" style="margin-left:10px;">上移</a>
                  <a @click="moveDown(index)" style="margin-left:10px;">下移</a>
                </template>
              </Table>
              <Button id="submitImg" style="margin-top:20px;" @click="submitImg()">提交轮播图</Button>
            </div>
            <!-- </div> -->
            <div class="rightForm">
              <div class="item_block" v-for=" (item,key) in itemList" :key="key" :id="key">
                <img :src="item.img_url" class="item_img" />
                <div class="item_info_block">
                  <div class="item_info">
                    <b>商品id：</b>
                    {{item.item_id}}
                  </div>
                  <div class="item_info">
                    <b>商品类别：</b>
                    {{item.item_obj}}
                  </div>
                  <div class="item_info">
                    <b>商品名称：</b>
                    {{item.item_name}}
                  </div>
                  <div class="item_info">
                    <b>商品价格：</b>
                    {{item.item_price}}
                  </div>
                  <div class="item_info">
                    <b>商品浏览数：</b>
                    {{item.item_viewed_times}}
                  </div>
                  <div class="item_info" style="position:absolute;top:0px;left:150px;">
                    <b>剩余总库存：</b>
                    {{item.item_total_left}}
                  </div>
                </div>
                <Button
                  style="position:absolute;right:20px;bottom:20px;"
                  @click="addTo($event)"
                >添加到轮播图</Button>
                <div style="clear:both"></div>
              </div>
              <div class="pageDiv">
                <Page
                  :total="totalNumber"
                  :page-size="pageSize"
                  @on-change="changePage"
                  show-total
                />
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
  data() {
    return {
      api: process.env.NODE_ENV === "production" ? "/ruangong" : "/api",
      token: "",
      currentPage: 1,
      totalNumber: 0,
      pageSize: 3,
      input_item_name: "",
      itemList: [],
      img_number: 0,
      item_colums: [
        {
          title: "商品ID",
          key: "id"
        },
        {
          title: "商品名称",
          key: "name"
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      selectedList: [
        // {
        //   id: 12,
        //   name: "小米电视"
        // }
      ],
      all_itemList: [
        // {
        //   item_name: "小米手机",
        //   item_obj: "手机",
        //   item_id: 1,
        //   item_price: 2999,
        //   item_viewed_times: 4,
        //   item_total_left: 999
        // }
      ]
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("Authorization");
    this.getImgList();
    this.getItem();
  },
  methods: {
    test(id) {
      console.log(id);
    },
    getImgList() {
      let that = this;
      this.$axios.get(this.api + "/carousel").then(function(res) {
        let data = res.data.data;
        let temp_arr = [];
        let temp_obj = {};
        for (let item of data) {
          temp_obj = {};
          temp_obj.id = item.id;
          temp_obj.name = item.name;
          temp_arr.push(temp_obj);
        }
        that.selectedList = temp_arr;
      });
    },
    getItem() {
      var that = this;
      this.$axios
        .get(that.api + "/admin/goods", {
          headers: {
            Authorization: that.token
          }
        })
        .then(function(res) {
          let data = res.data.data;
          console.log(data);
          let temp_arr = [];
          let temp_obj = {};
          for (let item of data.items) {
            temp_obj = {};
            temp_obj.item_name = item.name;
            temp_obj.item_obj = item.category.name;
            temp_obj.item_id = item.id;
            temp_obj.item_price = item.price;
            temp_obj.item_viewed_times = item.view;
            temp_obj.item_total_left = item.stock_num;
            temp_obj.img_url = item.pic[0];
            temp_arr.push(temp_obj);
          }
          that.slicePage(temp_arr);
        });
    },
    slicePage(temp_arr) {
      let that = this;
      that.all_itemList = temp_arr;
      that.totalNumber = that.all_itemList.length;
      that.$refs.tabs.activeKey = 3;
      var temp = that.all_itemList;
      var size = that.pageSize;
      that.currentPage = 1;
      that.itemList = temp.slice(0, size);
      that.img_number = that.selectedList.length;
    },
    search() {
      let that = this;
      this.$axios
        .get(that.api + "/admin/goods/search", {
          params: {
            key: that.input_item_name
          },
          headers: {
            Authorization: that.token
          }
        })
        .then(function(res) {
          let data = res.data.data;
          console.log(data);
          let temp_arr = [];
          let temp_obj = {};
          for (let item of data.items) {
            temp_obj = {};
            temp_obj.item_name = item.name;
            temp_obj.item_obj = item.category.name;
            temp_obj.item_id = item.id;
            temp_obj.item_price = item.price;
            temp_obj.item_viewed_times = item.view;
            temp_obj.item_total_left = item.stock_num;
            temp_obj.img_url = item.pic[0];
            temp_arr.push(temp_obj);
          }
          that.slicePage(temp_arr);
        });
      console.log("ok");
    },
    submitImg() {
      document.getElementById("submitImg").disabled = true;
      let that = this;
      let temp_arr = this.selectedList;
      let submit_arr = [];
      for (let item of temp_arr) {
        submit_arr.push(item.id);
      }
      this.$axios
        .post(
          that.api + "/admin/carousel",
          {
            goods_id: submit_arr
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: that.token
            }
          }
        )
        .then(function(res) {
          console.log(res);
          that.$Message.info("修改成功");
          document.getElementById("submitImg").disabled = false;
        });
    },
    show_detail(e) {
      console.log(e);
      // document.getElementsByClassName("test").setAttribute("display","block")
    },
    changePage(c) {
      var temp = this.all_itemList;
      var size = this.pageSize;
      this.currentPage = c;
      this.itemList = temp.slice((c - 1) * size, c * size);
    },
    choosePage(id) {
      var that = this;
      console.log(id);
      if (id == 0) {
        that.$router.push({ path: "/itemManage" });
      } else if (id == 1) {
        that.$router.push({ path: "/addItem" });
      } else if (id == 2) {
        that.$router.push({ path: "/itemHistory" });
      }
    },
    addTo(e) {
      console.log(this.img_number);
      var a = e.currentTarget.parentNode.id;
      var _id = this.itemList[a].item_id;
      var _name = this.itemList[a].item_name;
      var newObj = {
        id: _id,
        name: _name
      };
      if (this.img_number > 4) {
        alert("最多选择五个商品展示");
      } else {
        this.selectedList.push(newObj);
        this.img_number = this.img_number + 1;
      }
    },
    remove(index) {
      this.selectedList.splice(index, 1);
    },
    moveUp(index) {
      var that = this;
      if (index != 0) {
        that.selectedList[index] = that.selectedList.splice(
          index - 1,
          1,
          that.selectedList[index]
        )[0];
      } else {
        alert("已经是第一个了");
      }
    },
    moveDown(index) {
      var that = this;
      if (index != that.selectedList.length - 1) {
        that.selectedList[index] = that.selectedList.splice(
          index + 1,
          1,
          that.selectedList[index]
        )[0];
      } else {
        alert("已经是最后一个了");
      }
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
