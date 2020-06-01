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
        <Sider hide-trigger :style="{background: '#fff', position:'absolute',top:'65px', bottom:'0px'}">
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
      <Layout :style="{padding: '0 24px 24px', position: 'absolute', left:'200px', top:'65px', bottom:'0px', right:'0px'  }">
        <Content style="padding: 24px; background-color: #fff; margin-top: 24px; overflow:auto">
          <div>
            <Input
              search
              enter-button
              placeholder="请输入订单号查询"
              v-model="search_content"
              @on-search="search()"
            />
          </div>
          <Tabs>
            <Tab-pane label="待发货" key="1">
              <Table :columns="columns_pre" :data="pre_showList">
                <template slot-scope="row" slot="action">
                  <Button
                    type="primary"
                    size="small"
                    style="margin-right: 5px"
                    @click="getInfo(row)"
                  >详情</Button>
                  <Button type="error" size="small" @click="checkSend(row)">确认发货</Button>
                </template>
              </Table>
              <div style="margin-top:20px;display:flex;justify-content:center;">
                <Page
                  :total="pre_totalNumber"
                  :page-size="pre_pageSize"
                  @on-change="pre_changePage"
                  show-total
                />
              </div>
            </Tab-pane>
            <Tab-pane label="已发货" key="2">
              <Table :columns="columns_snd" :data="snd_showList">
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
                <Page
                  :total="snd_totalNumber"
                  :page-size="snd_pageSize"
                  @on-change="snd_changePage"
                  show-total
                />
              </div>
            </Tab-pane>
            <Tab-pane label="已收货" key="3">
              <Table :columns="columns_com" :data="com_showList">
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
                <Page
                  :total="com_totalNumber"
                  :page-size="com_pageSize"
                  @on-change="com_changePage"
                  show-total
                />
              </div>
            </Tab-pane>
            <Tab-pane label="退款中" key="4">
              <Table :columns="columns_ref" :data="ref_showList">
                <template slot-scope="row" slot="action">
                  <Button
                    type="primary"
                    size="small"
                    style="margin-right: 5px"
                    @click="getInfo(row)"
                  >详情</Button>
                  <Button type="error" size="small" @click="checkRefund(row)">通过申请</Button>
                </template>
              </Table>
              <div style="margin-top:20px;display:flex;justify-content:center;">
                <Page
                  :total="refund_totalNumber"
                  :page-size="refund_pageSize"
                  @on-change="refund_changePage"
                  show-total
                />
              </div>
            </Tab-pane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
<!-- 订单详情 -->
    <div v-if="info_show">
      <Modal v-model="info_show" title="订单详情">
        <div style="width: 90%; margin: 10px 0 25px 0;">
          <i-Form :label-width="90">
            <FormItem label="分类名称：">
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
            </FormItem>
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
              <Input v-model="number" placeholder="请输入8位数字号码" style="width: 300px" />
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
        <div style="width: 90%; margin: 10px 0 25px 0;">
          <i-Form :label-width="90">
            <p>当前状态为：{{info_status}}</p>
            <Table :columns="search_columns" :data="search_list">
              <template slot-scope="row" slot="action">
                <Button
                  type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="getInfo(row)"
                >详情</Button>

                <Button
                  v-if="search_status==1"
                  type="error"
                  size="small"
                  @click="checkSend(row)"
                >确认发货</Button>

                <Button
                  v-if="search_status==4"
                  type="error"
                  size="small"
                  @click="checkRefund(row)"
                >通过申请</Button>
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
      api: "/api",
      info_show: false,
      number_show: false,
      refund_show: false,
      search_show: false,
      info: {},//详细信息
      number: "",//输入物流编号
      id: "",//订单id
      refund_remark: "",//退款备注
      search_content: "",//搜索内容
      search_status: "",//搜索出的订单状态
      info_status: "",//查看详细信息时的的订单状态
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
      goods: [],

      refund_totalNumber:0,
      refund_pageSize:9,
      ref_showList:[],

      pre_totalNumber:0,
      pre_pageSize:9,
      pre_showList:[],

      snd_totalNumber:0,
      snd_pageSize:9,
      snd_showList:[],

      com_totalNumber:0,
      com_pageSize:9,
      com_showList:[],
    };
  },
  mounted() {
    console.log("1");
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
    async getOrderList() {
      var i = 0;
      var that = this;
      this.$axios({
        method: "GET",
        url: that.api + "/admin/orders?type=1&page=1",//不会翻页，读取的page都写的是1
        headers: {
          Authorization: that.token
        }
      })
        .then(function(res) {
          res = res.data.data.items;
          console.log(res);
          for (i = 0; i < res.length; i++) {
            that.orderlist_pre.push({
              order_id: res[i].id, //id
              order_number: res[i].order_number, //订单号
              number: res[i].number, //物流号
              price: res[i].price, //总价
              created_at: res[i].created_at, //创建时间
              updated_at: res[i].updated_at, //更新时间
              remark: res[i].remark, //备注
              refund_remark: res[i].refund_remark, //退款备注
              status: res[i].status,
              items: res[i].items, //物品
              address: res[i].address, //地址
              user: res[i].user //用户
            });
          }
          that.pre_totalNumber=res.length
          that.pre_showList = that.orderlist_pre.slice(0,that.pre_pageSize);
          
        })
        .catch(function() {});
      this.$axios({
        method: "GET",
        url: that.api + "/admin/orders?type=2&page=1",
        headers: {
          Authorization: that.token
        }
      })
        .then(function(res) {
          res = res.data.data.items;
          for (i = 0; i < res.length; i++) {
            that.orderlist_snd.push({
              order_id: res[i].id, //id
              order_number: res[i].order_number, //订单号
              number: res[i].number, //物流号
              price: res[i].price, //总价
              created_at: res[i].created_at, //创建时间
              updated_at: res[i].updated_at, //更新时间
              remark: res[i].remark, //备注
              refund_remark: res[i].refund_remark, //退款备注
              status: res[i].status,

              items: res[i].items, //物品
              address: res[i].address, //地址
              user: res[i].user //用户
            });
          }
          that.snd_totalNumber=res.length
          that.snd_showList = that.orderlist_snd.slice(0,that.snd_pageSize);
        })
        .catch(function() {});
      this.$axios({
        method: "GET",
        url: that.api + "/admin/orders?type=3&page=1",
        headers: {
          Authorization: that.token
        }
      })
        .then(function(res) {
          res = res.data.data.items;
          for (i = 0; i < res.length; i++) {
            that.orderlist_com.push({
              order_id: res[i].id, //id
              order_number: res[i].order_number, //订单号
              number: res[i].number, //物流号
              price: res[i].price, //总价
              created_at: res[i].created_at, //创建时间
              updated_at: res[i].updated_at, //更新时间
              remark: res[i].remark, //备注
              refund_remark: res[i].refund_remark, //退款备注
              status: res[i].status,

              items: res[i].items, //物品
              address: res[i].address, //地址
              user: res[i].user //用户
            });
          }
          that.com_totalNumber=res.length
          that.com_showList = that.orderlist_com.slice(0,that.com_pageSize);
        })
        .catch(function() {});
      this.$axios({
        method: "GET",
        url: that.api + "/admin/orders?type=4&page=1",
        headers: {
          Authorization: that.token
        }
      })
        .then(function(res) {
          res = res.data.data.items;
          console.log(res);
          for (i = 0; i < res.length; i++) {
            that.orderlist_ref.push({
              order_id: res[i].id, //id
              order_number: res[i].order_number, //订单号
              number: res[i].number, //物流号
              price: res[i].price, //总价
              created_at: res[i].created_at, //创建时间
              updated_at: res[i].updated_at, //更新时间
              remark: res[i].remark, //备注
              refund_remark: res[i].refund_remark, //退款备注
              status: res[i].status,
              items: res[i].items, //物品
              address: res[i].address, //地址
              user: res[i].user //用户
            });
          }
          that.refund_totalNumber=res.length
          that.ref_showList = that.orderlist_ref.slice(0,that.refund_pageSize);
        })
        .catch(function() {});
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
          console.log("成功");
        })
        .catch(function() {
          console.log("失败");
        });
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
          console.log("成功");
        })
        .catch(function() {
          console.log("失败");
        });
    },
    cancelRefund() {
      this.refund_show = false;
    },
    search() {
      this.search_show = true;
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
          that.search_show = true;

          console.log("成功");
        })
        .catch(function() {
          console.log("失败");
        });
    },
    refund_changePage(c) {
      var temp = this.orderlist_ref
      var size = this.refund_pageSize;
      this.ref_showList = temp.slice((c - 1) * size, c * size);
    },
    snd_changePage(c) {
      var temp = this.orderlist_snd
      var size = this.snd_pageSize;
      this.snd_showList = temp.slice((c - 1) * size, c * size);
    },
    com_changePage(c) {
      var temp = this.orderlist_com
      var size = this.com_pageSize;
      this.com_showList = temp.slice((c - 1) * size, c * size);
    },
    pre_changePage(c) {
      var temp = this.orderlist_pre
      var size = this.pre_pageSize;
      this.pre_showList = temp.slice((c - 1) * size, c * size);
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