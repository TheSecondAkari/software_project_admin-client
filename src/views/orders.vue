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
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1" theme="light" width="auto" @on-select="redirect">
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
      <Layout :style="{padding: '0 24px 24px'}">
        <!-- 一级分类 -->
        <Content style="padding: 24px; minHeight: 500px; background-color: #fff; margin-top: 24px;">
          <Tabs>
            <Tab-pane label="待发货" key="1">
              <Table :columns="columns_pre" :data="orderlist_pre">
                <template slot-scope="row" slot="action">
                  <Button
                    type="primary"
                    size="small"
                    style="margin-right: 5px"
                    @click="getInfo(row)"
                  >详情</Button>
                  <Button type="error" size="small">确认发货</Button>
                </template>
              </Table>
            </Tab-pane>
            <Tab-pane label="已发货" key="2">
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
            </Tab-pane>
            <Tab-pane label="已收货" key="3">
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
            </Tab-pane>
            <Tab-pane label="退款中" key="4">
              <Table :columns="columns_ref" :data="orderlist_ref">
                <template slot-scope="row" slot="action">
                  <Button
                    type="primary"
                    size="small"
                    style="margin-right: 5px"
                    @click="getInfo(row)"
                  >详情</Button>
                  <Button type="error" size="small">通过申请</Button>
                </template>
              </Table>
            </Tab-pane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>

    <div v-if="info_show">
      <Modal v-model="info_show" title="订单详情">
        <div style="width: 90%; margin: 10px 0 25px 0;">
          <i-Form :label-width="90">
            <FormItem label="分类名称：">
              <p>订单ID：{{info.order_id}}</p>
              <p>订单号：{{info.order_number}}</p>
              <p>创建时间：{{info.created_at}}</p>
              <p>用户名：{{info.user.name}}</p>
              <p>用户ID：{{info.user.id}}</p>
              <p>收件人：{{info.address.name}}</p>
              <p>手机号：{{info.address.phone}}</p>
              <p>地址：{{info.address.province}}/{{info.address.city}}/{{info.address.county}}/{{info.address.detail}}</p>
              <p>备注：{{info.remark}}</p>
              <p>订单商品：</p>
              <template style="width:100%">
                <i-table stripe :columns="columns_good" :data="goods" ></i-table>
              </template>
            </FormItem>
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
      info: {},
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
      orderlist_pre: [],
      orderlist_snd: [],
      orderlist_com: [],
      orderlist_ref: [],
      goods: []
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
        url: that.api + "/admin/orders?type=1&page=1",
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

              items: res[i].items, //物品
              address: res[i].address, //地址
              user: res[i].user //用户
            });
          }
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

              items: res[i].items, //物品
              address: res[i].address, //地址
              user: res[i].user //用户
            });
          }
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

              items: res[i].items, //物品
              address: res[i].address, //地址
              user: res[i].user //用户
            });
          }
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

              items: res[i].items, //物品
              address: res[i].address, //地址
              user: res[i].user //用户
            });
          }
        })
        .catch(function() {});
    },
    getInfo(row) {
      this.info = [];
      this.goods = [];
      this.info = row.row;
      this.info_show = true;
        var options="";
        for(var i=0;i<this.info.items.length;i++)
        {     options="";
            for(var j =0;j<this.info.items[i].sku.options.length;j++)
            {
                options = options +"/"+this.info.items[i].sku.options[j].name;
            }
            this.goods.push({
              good_id: this.info.items[i].sku.goods.id,
              good_name: this.info.items[i].sku.goods.name,
              good_options: options,
              good_number:this.info.items[i].num
          });
        }

      console.log(this.info);
    }
  }
};
</script>
