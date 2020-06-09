<style>
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
.img_block {
  display: flex;
  flex-wrap: wrap;
}
.addSecond {
  display: inline-block;
  margin: -10% 0 0 20%;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header></Header>
      <!-- 导航栏 -->
      <Layout>
        <Sider
          hide-trigger
          :style="{position:'absolute',overflow:'auto' ,top:'64px',bottom:'0px', background: '#fff'}"
        >
          <Menu active-name="3" theme="light" width="auto" @on-select="redirect">
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
      </Layout>
      <Layout
        :style="{padding: '0 24px 0 ',position:'absolute',left:'200px',bottom:'10px',top:'64px',right:'0px',overflow:'auto',}"
      >
        <Content style="padding: 24px; background-color: #fff; margin-top: 20px; overflow:auto">
          <Row>
            <i-col span="12" offset="6">
              <div>
                <Input
                  search
                  enter-button
                  type="number"
                  placeholder="请输入订单号查询"
                  v-model="search_content"
                  @on-search="search()"
                />
              </div>
            </i-col>
          </Row>
          <Tabs v-model="status" @on-click="getOrderList()">
            <Tab-pane label="待发货" name="1">
              <Table :columns="columns_pre" :data="orderlist_pre">
                <template slot-scope="row" slot="action">
                  <Row>
                    <i-col span="12">
                      <Button
                        type="primary"
                        size="small"
                        style="margin-right: 5px"
                        @click="getInfo(row)"
                      >详情</Button>
                    </i-col>
                    <i-col span="12">
                      <Button type="error" size="small" @click="checkSend(row)">确认发货</Button>
                    </i-col>
                  </Row>
                </template>
              </Table>
              <div style="margin-top:20px;display:flex;justify-content:center;">
                <Row>
                  <i-col span="4">
                    <Button type="primary" @click="lastPage">上一页</Button>
                  </i-col>
                  <i-col span="4" offset="10">
                    <Button type="primary" @click="nextPage">下一页</Button>
                  </i-col>
                </Row>
              </div>
            </Tab-pane>
            <Tab-pane label="已发货" name="2">
              <Table :columns="columns_snd" :data="orderlist_snd">
                <template slot-scope="row" slot="action">
                  <Button
                    type="primary"
                    size="small"
                    style="margin-right: 5px"
                    @click="getInfo(row)"
                  >详情</Button>
                </template>
              </Table>
              <div style="margin-top:20px;display:flex;justify-content:center;">
                <Row>
                  <i-col span="4">
                    <Button type="primary" @click="lastPage">上一页</Button>
                  </i-col>
                  <i-col span="4" offset="10">
                    <Button type="primary" @click="nextPage">下一页</Button>
                  </i-col>
                </Row>
              </div>
            </Tab-pane>
            <Tab-pane label="已收货" name="3">
              <Table :columns="columns_com" :data="orderlist_com">
                <template slot-scope="row" slot="action">
                  <Button
                    type="primary"
                    size="small"
                    style="margin-right: 5px"
                    @click="getInfo(row)"
                  >详情</Button>
                </template>
              </Table>
              <div style="margin-top:20px;display:flex;justify-content:center;">
                <Row>
                  <i-col span="4">
                    <Button type="primary" @click="lastPage">上一页</Button>
                  </i-col>
                  <i-col span="4" offset="10">
                    <Button type="primary" @click="nextPage">下一页</Button>
                  </i-col>
                </Row>
              </div>
            </Tab-pane>
            <Tab-pane label="退款中" name="4">
              <Table :columns="columns_ref" :data="orderlist_ref">
                <template slot-scope="row" slot="action">
                  <Row>
                    <i-col span="12">
                      <Button
                        type="primary"
                        size="small"
                        style="margin-right: 5px"
                        @click="getInfo(row)"
                      >详情</Button>
                    </i-col>
                    <i-col span="12">
                      <Button type="error" size="small" @click="checkRefund(row)">通过申请</Button>
                    </i-col>
                  </Row>
                </template>
              </Table>
              <div style="margin-top:20px;display:flex;justify-content:center;">
                <Row>
                  <i-col span="4">
                    <Button type="primary" @click="lastPage">上一页</Button>
                  </i-col>
                  <i-col span="4" offset="10">
                    <Button type="primary" @click="nextPage">下一页</Button>
                  </i-col>
                </Row>
              </div>
            </Tab-pane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
    <!-- 订单详情 -->
    <div v-if="info_show">
      <Modal v-model="info_show" title="订单详情">
        <div style="width: 100%; margin: 10px 0 25px 0;">
          <i-Form :label-width="90">
            <p>订单ID：{{info.order_id}}</p>
            <p>订单号：{{info.order_number}}</p>
            <p v-if="info_status==2||info_status==3">物流号：{{info.number}}</p>
            <p>创建时间：{{info.created_at}}</p>
            <p>更新时间：{{info.updated_at}}</p>
            <p>用户名：{{info.user.name}}</p>
            <p>用户ID：{{info.user.id}}</p>
            <p v-if="info_status==4">退款原因：{{info.refund_remark}}</p>
            <p>收件人：{{info.address.name}}</p>
            <p>手机号：{{info.address.phone}}</p>
            <p>地址：{{info.address.province}}/{{info.address.city}}/{{info.address.county}}/{{info.address.detail}}</p>
            <p>备注：{{info.remark}}</p>
            <p>订单商品：</p>
            <template style="width:100%">
              <i-table stripe :columns="columns_good" :data="goods"></i-table>
            </template>
          </i-Form>
        </div>
      </Modal>
    </div>
    <!-- 输入订单号 -->
    <div>
      <Modal v-model="number_show" title="请输入订单号" @on-ok="Send()" @on-cancel="cancelSend()">
        <div style="width: 90%; margin: 10px 0 25px 0;">
          <i-Form :label-width="90">
            <FormItem label="订单号：">
              <Input v-model="number" type="number" placeholder="请输入8位数字号码" style="width: 300px" />
            </FormItem>
          </i-Form>
        </div>
      </Modal>
    </div>
    <!-- 退货确认框 -->
    <div>
      <Modal v-model="refund_show" title="确认退货吗？" @on-ok="Refund()" @on-cancel="cancelRefund()">
        <div style="width: 90%; margin: 10px 0 25px 0;">
          <i-Form :label-width="90">
            <p>退款理由为：{{refund_remark}}</p>
          </i-Form>
        </div>
      </Modal>
    </div>
    <!-- 搜索结果 -->
    <div>
      <Modal v-model="search_show" title="搜索结果" @on-ok="close()" @on-cancel="close()">
        <div style="width: 100%; margin: 10px 0 25px 0;">
          <i-Form :label-width="90">
            <p>当前状态为：{{info_status}}</p>
            <Table :columns="search_columns" :data="search_list">
              <template slot-scope="row" slot="action">
                <Row>
                  <i-col span="12">
                    <Button
                      type="primary"
                      size="small"
                      style="margin-right: 5px"
                      @click="getInfo(row)"
                    >详情</Button>
                  </i-col>
                  <i-col span="12">
                    <Button
                      v-if="search_status==1"
                      type="error"
                      size="small"
                      @click="checkSend(row)"
                    >确认发货</Button>
                  </i-col>
                  <i-col span="12">
                    <Button
                      v-if="search_status==4"
                      type="error"
                      size="small"
                      @click="checkRefund(row)"
                    >通过申请</Button>
                  </i-col>
                </Row>
              </template>
            </Table>
          </i-Form>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      api: process.env.NODE_ENV === "production" ? "/ruangong" : "/api",
      info_show: false,
      number_show: false,
      refund_show: false,
      search_show: false,
      pre_pagenumber: 1,
      snd_pagenumber: 1,
      com_pagenumber: 1,
      ref_pagenumber: 1,

      status: "1",
      page: 1, //页码
      info: {}, //详细信息
      number: "", //输入物流编号
      id: "", //订单id
      refund_remark: "", //退款备注
      search_content: "", //搜索内容
      search_status: "", //搜索出的订单状态
      info_status: "", //查看详细信息时的的订单状态
      columns_pre: [
        { title: "订单ID", key: "order_id", sortable: true },
        { title: "订单号", key: "order_number", sortable: true },
        { title: "创建时间", key: "created_at", sortable: true },
        { title: "操作", slot: "action", width: 150, align: "center" }
      ],
      columns_snd: [
        { title: "订单ID", key: "order_id", sortable: true },
        { title: "订单号", key: "order_number", sortable: true },
        { title: "物流单号", key: "number", sortable: true },
        { title: "创建时间", key: "created_at", sortable: true },
        { title: "操作", slot: "action", width: 150, align: "center" }
      ],
      columns_com: [
        { title: "订单ID", key: "order_id", sortable: true },
        { title: "订单号", key: "order_number", sortable: true },
        { title: "物流单号", key: "number", sortable: true },
        { title: "创建时间", key: "created_at", sortable: true },
        { title: "操作", slot: "action", width: 150, align: "center" }
      ],
      columns_ref: [
        { title: "订单ID", key: "order_id", sortable: true },
        { title: "订单号", key: "order_number", sortable: true },
        { title: "取消原因", key: "refund_remark", sortable: true },
        { title: "创建时间", key: "created_at", sortable: true },
        { title: "操作", slot: "action", width: 150, align: "center" }
      ],
      columns_good: [
        { title: "商品ID", key: "good_id" },
        { title: "商品名", key: "good_name" },
        { title: "商品规格", key: "good_options" },
        { title: "商品数量", key: "good_number" }
      ],
      search_columns: [],
      orderlist_pre: [],
      orderlist_snd: [],
      orderlist_com: [],
      orderlist_ref: [],
      search_list: [],
      goods: []
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("Authorization");
    this.getOrderList();
  },
  methods: {
    // 页面跳转
    redirect(name) {
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
          that.$router.push({ path: "/orders" });
          break;
        default:
          break;
      }
    },
    async getOrderListPre() {
      var i = 0;
      // console.log("xx");
      var that = this;
      var templist = [];
      this.$axios({
        method: "GET",
        url: that.api + "/admin/orders?type=1&page=" + that.page, //不会翻页，读取的page都写的是1
        headers: {
          Authorization: that.token
        }
      })
        .then(function(res) {
          res = res.data.data;
          console.log(res);
          for (i = 0; i < res.items.length; i++) {
            templist.push({
              order_id: res.items[i].id, //id
              order_number: res.items[i].order_number, //订单号
              number: res.items[i].number, //物流号
              price: res.items[i].price, //总价
              created_at: res.items[i].created_at, //创建时间
              updated_at: res.items[i].updated_at, //更新时间
              remark: res.items[i].remark, //备注
              refund_remark: res.items[i].refund_remark, //退款备注
              status: res.items[i].status,
              items: res.items[i].items, //物品
              address: res.items[i].address, //地址
              user: res.items[i].user, //用户

              rows: res.row,
              count: res.count,
              page: res.page
            });
          }
          that.orderlist_pre = templist;
          templist = [];
          that.pre_pagenumber = Math.ceil(res.count / 20);
        })
        .catch(function() {});
    },
    async getOrderListSnd() {
      var i = 0;
      // console.log("xx");
      var that = this;
      var templist = [];

      this.$axios({
        method: "GET",
        url: that.api + "/admin/orders?type=2&page=" + that.page,
        headers: {
          Authorization: that.token
        }
      })
        .then(function(res) {
          res = res.data.data;
          console.log(res);
          for (i = 0; i < res.items.length; i++) {
            templist.push({
              order_id: res.items[i].id, //id
              order_number: res.items[i].order_number, //订单号
              number: res.items[i].number, //物流号
              price: res.items[i].price, //总价
              created_at: res.items[i].created_at, //创建时间
              updated_at: res.items[i].updated_at, //更新时间
              remark: res.items[i].remark, //备注
              refund_remark: res.items[i].refund_remark, //退款备注
              status: res.items[i].status,
              items: res.items[i].items, //物品
              address: res.items[i].address, //地址
              user: res.items[i].user, //用户

              rows: res.row,
              count: res.count,
              page: res.page
            });
          }
          that.orderlist_snd = templist;
          templist = [];
          that.snd_pagenumber = Math.ceil(res.count / 20);
        })
        .catch(function() {});
    },
    async getOrderListCom() {
      var i = 0;
      // console.log("xx");
      var that = this;
      var templist = [];
      this.$axios({
        method: "GET",
        url: that.api + "/admin/orders?type=3&page=" + that.page,
        headers: {
          Authorization: that.token
        }
      })
        .then(function(res) {
          res = res.data.data;
          console.log(res);
          for (i = 0; i < res.items.length; i++) {
            templist.push({
              order_id: res.items[i].id, //id
              order_number: res.items[i].order_number, //订单号
              number: res.items[i].number, //物流号
              price: res.items[i].price, //总价
              created_at: res.items[i].created_at, //创建时间
              updated_at: res.items[i].updated_at, //更新时间
              remark: res.items[i].remark, //备注
              refund_remark: res.items[i].refund_remark, //退款备注
              status: res.items[i].status,
              items: res.items[i].items, //物品
              address: res.items[i].address, //地址
              user: res.items[i].user, //用户

              rows: res.row,
              count: res.count,
              page: res.page
            });
          }
          that.orderlist_com = templist;
          templist = [];
          that.com_pagenumber = Math.ceil(res.count / 20);
        })
        .catch(function() {});
    },
    async getOrderListRef() {
      var i = 0;
      // console.log("xx");
      var that = this;
      var templist = [];
      this.$axios({
        method: "GET",
        url: that.api + "/admin/orders?type=4&page=" + that.page,
        headers: {
          Authorization: that.token
        }
      })
        .then(function(res) {
          res = res.data.data;
          console.log(res);
          for (i = 0; i < res.items.length; i++) {
            templist.push({
              order_id: res.items[i].id, //id
              order_number: res.items[i].order_number, //订单号
              number: res.items[i].number, //物流号
              price: res.items[i].price, //总价
              created_at: res.items[i].created_at, //创建时间
              updated_at: res.items[i].updated_at, //更新时间
              remark: res.items[i].remark, //备注
              refund_remark: res.items[i].refund_remark, //退款备注
              status: res.items[i].status,
              items: res.items[i].items, //物品
              address: res.items[i].address, //地址
              user: res.items[i].user, //用户

              rows: res.row,
              count: res.count,
              page: res.page
            });
          }
          that.orderlist_ref = templist;
          templist = [];
          that.ref_pagenumber = Math.ceil(res.count / 20);
        })
        .catch(function() {});
    },

    async getOrderList() {
      this.page = 1;
      await this.getOrderListPre();
      await this.getOrderListSnd();

      await this.getOrderListCom();

      await this.getOrderListRef();
      
      console.log(this.status);
      console.log(this.pre_pagenumber);
    },
    getInfo(row) {
      this.info = [];
      this.goods = [];
      this.info = row.row;
      this.info_show = true;
      this.info_status = this.info.status;
      var options = "";

      for (var i = 0; i < this.info.items.length; i++) {
        options = "";
        for (var j = 0; j < this.info.items[i].sku.options.length; j++) {
          options = options + "/" + this.info.items[i].sku.options[j].name;
        }
        this.goods.push({
          good_id: this.info.items[i].sku.goods.id,
          good_name: this.info.items[i].sku.goods.name,
          good_options: options,
          good_number: this.info.items[i].num
        });
      }

      console.log(this.info);
    },
    checkSend(row) {
      this.id = row.row.order_id;
      this.number_show = true;
    },
    Send() {
      if (this.number.toString().length != 8) {
        this.$Message.error("请输入正确格式");
      } else {
        this.number_show = false;
        var that = this;
        this.$axios({
          method: "PUT",
          url: that.api + "/admin/order/" + this.id + "/deliver",
          headers: {
            Authorization: that.token
          },
          data: {
            number: that.number
          }
        })
          .then(function() {
            that.close();
            that.getOrderList();
            that.$Message.success("成功发货");
            console.log("成功");
            that.number = "";
          })
          .catch(function() {
            console.log(that.number);
            that.$Message.error("发货异常/请输如正确的物流单号");
            that.number = "";
          });
      }
    },
    cancelSend() {
      this.number_show = false;
    },
    checkRefund(row) {
      this.id = row.row.order_id;
      this.refund_remark = row.row.refund_remark;
      this.refund_show = true;
    },
    Refund() {
      this.refund_show = false;
      var that = this;
      this.$axios({
        method: "POST",
        url: that.api + "/admin/order/" + this.id + "/refund",
        headers: {
          Authorization: that.token
        },
        data: {
          number: that.number
        }
      })
        .then(function() {
          that.close();
          that.getOrderList();
          that.$Message.success("退款成功");
          console.log("成功");
        })
        .catch(function() {
          that.$Message.error("退款失败");
          console.log("失败");
        });
    },
    cancelRefund() {
      this.refund_show = false;
    },
    search() {
      if (this.search_content == "") {
        this.$Message.error("请输入内容");
      } else {
        var that = this;
        this.$axios({
          method: "GET",
          url: that.api + "/admin/orders/search?key=" + that.search_content,
          headers: {
            Authorization: that.token
          }
        })
          .then(function(res) {
            res = res.data.data.items[0];
            console.log(res);
            if (res == undefined) {
              that.$Message.error("搜索失败");
            } else {
              that.search_show = true;
              that.search_list.push({
                order_id: res.id, //id
                order_number: res.order_number, //订单号
                number: res.number, //物流号
                price: res.price, //总价
                created_at: res.created_at, //创建时间
                updated_at: res.updated_at, //更新时间
                remark: res.remark, //备注
                refund_remark: res.refund_remark, //退款备注

                items: res.items, //物品
                address: res.address, //地址
                user: res.user //用户
              });
              that.search_status = res.status;
              console.log(that.search_status);

              if (res.status == "1") {
                that.search_columns = that.columns_pre;
                that.info_status = "待发货";
              } else if (res.status == "2") {
                that.search_columns = that.columns_snd;
                that.info_status = "已发货";
              } else if (res.status == "3") {
                that.search_columns = that.columns_com;
                that.info_status = "已收货";
              } else if (res.status == "4") {
                that.search_columns = that.columns_ref;
                that.info_status = "退款中";
              }

              console.log(that.search_columns);

              console.log("成功");
            }
          })
          .catch(function() {
            that.$Message.error("未找到相关结果");
          });
      }
    },
    lastPage() {
      if (this.page == 1) this.$Message.error("已经是第一页");
      else {
        this.page -= 1;
        if (this.status == 1) this.getOrderListPre();
        else if (this.status == 2) this.getOrderListSnd();
        else if (this.status == 3) this.getOrderListCom();
        else if (this.status == 4) this.getOrderListRef();
        console.log(this.page);
      }
    },
    nextPage() {
      if (this.status == 1) {
        if (this.page == this.pre_pagenumber)
          this.$Message.error("已经是最后一页");
        else {
          this.page += 1;
          this.getOrderListPre();
        }
      } else if (this.status == 2) {
        if (this.page == this.snd_pagenumber)
          this.$Message.error("已经是最后一页");
        else {
          this.page += 1;
          this.getOrderListSnd();
        }
      } else if (this.status == 3) {
        if (this.page == this.com_pagenumber)
          this.$Message.error("已经是最后一页");
        else {
          this.page += 1;
          this.getOrderListCom();
        }
      } else if (this.status == 4) {
        if (this.page == this.ref_pagenumber)
          this.$Message.error("已经是最后一页");
        else {
          this.page += 1;
          this.getOrderListRef();
        }
      }
    },
    close() {
      this.search_show = false;
      this.search_status = 0;
      this.search_columns = [];
      this.search_list = [];
    }
  }
};
</script>