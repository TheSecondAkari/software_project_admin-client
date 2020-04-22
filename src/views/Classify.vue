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
.img_block {
  display: flex;
  flex-wrap: wrap;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header></Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1" theme="light" width="auto">
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
        <Layout :style="{padding: '0 24px 24px'}">
          <!-- 一级分类 -->
          <Content
            style="padding: 24px; minHeight: 500px; background-color: #fff; margin-top: 24px;"
          >
            <Tabs active-key="1" @on-click="choosePage" ref="tabs">
              <Tab-pane label="查看分类" key="key1"></Tab-pane>
              <Tab-pane label="添加分类" key="key2"></Tab-pane>
            </Tabs>
            <Table :columns="columns" :data="data" @on-row-dblclick="show">
              <template slot-scope="{ row, index }" slot="action">
                <Button
                  type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="editFirst(row, index)"
                >编辑</Button>
                <Button type="error" size="small" @click="remove(index)">删除</Button>
              </template>
            </Table>
          </Content>
        </Layout>

        <!-- 二级分类 -->
        <Drawer :closable="false" v-model="second" width="50">
          <template slot="header">
            <Icon type="ios-arrow-back" size="28" @click.native="close" />
            <strong style="font-size: 24px; margin-left: 15px;">{{second_title}}</strong>
          </template>
          <Table :columns="second_columns" :data="second_data">
            <template slot-scope="{ row, index }" slot="action">
              <Button
                type="primary"
                size="small"
                style="margin-right: 5px"
                @click="editSecond(row, index)"
              >编辑</Button>
              <Button type="error" size="small" @click="del(row, index)">删除</Button>
            </template>
          </Table>
        </Drawer>
      </Layout>
    </Layout>
    <!-- 一级分类编辑 -->
    <Modal v-model="edit_first" title="编辑分类" @on-ok="comfirmFirst" @on-cancel="cancelFirst">
      <div style="width: 60%; margin: 10px 0 25px 0;">
        <i-Form :label-width="90">
          <FormItem label="分类名称：">
            <i-Input v-model="firstName" placeholder="请输入新的分类名称"></i-Input>
          </FormItem>
        </i-Form>
      </div>
    </Modal>

    <!-- 二级分类编辑 -->
    <Modal v-model="edit_second" title="编辑分类" @on-ok="comfirmSecond" @on-cancel="cancelSecond">
      <div style="width: 60%; margin: 10px 0 25px 0;">
        <i-Form :label-width="90">
          <FormItem label="分类名称：">
            <i-Input v-model="secondName" placeholder="请输入新的分类名称"></i-Input>
          </FormItem>
          <FormItem label="从属分类：">
            <Select v-model="parent" style="width:200px">
              <Option v-for="item in data" :value="item.name" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="分类图片：">
            <div class="img_block" style="width:90%;float:left;">
              <img :src="require('../assets/add.png')" style="height:100px;width:100px;" />
            </div>
          </FormItem>
        </i-Form>
      </div>
    </Modal>

    <!-- 删除二级分类 -->
    <Modal v-model="delSecond" width="360">
        <p slot="header" style="color: #f60; text-align: center">
            <Icon type="ios-information-circle"></Icon>
            <span>确认删除该分类</span>
        </p>
        <div style="text-align:center">
            <p>删除后该分类将从列表中消失！</p>
            <p>是否继续删除该分类？</p>
        </div>
        <div slot="footer">
            <Button style="margin-right: 30px;" @click="delSecond = false">取消</Button>
            <Button type="error" style="margin-right: 80px;" @click="translate = true; delSecond = false">删除</Button>
        </div>
    </Modal>

    <!-- 转移二级分类 -->
    <Modal v-model="translate" width="360">
        <p slot="header" style="color: #f60; text-align: center">
            <Icon type="ios-information-circle"></Icon>
            <span>是否转移该分类下的商品</span>
        </p>
        <div style="text-align:center">
            <p>是否将该分类下的商品转移至其他分类当中？</p>
            <Select v-model="tran" style="width:200px">
              <Option v-for="item in data" :value="item.name" :key="item.id">{{ item.name }}</Option>
            </Select>
        </div>
        <div slot="footer">
            <Button style="margin-right: 30px;" @click="onlyDel">取消</Button>
            <Button type="primary" style="margin-right: 80px;" @click="delAndTra">确认</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      second: false,
      edit_first: false, // 一级分类编辑页面显示
      edit_second: false, // 二级分类编辑页面显示
      delFirst: false,
      delSecond: false,
      translate: false,
      second_data: [], // 二级分类数据表
      second_title: "", // 二级分类页显示的标题
      parent: "", // 所要编辑的二级分类要绑定的父类
      tran: "", // 所要转移到的父类
      firstRow: [], // 选中的一级分类行
      secondRow: [], // 选中的二级分类行
      firstName: [],
      secondName: [],
      index: -1, // 选中的行，可以是一级也可以是二级

      columns: [
        {
          title: "分类编号",
          key: "id"
        },
        {
          title: "分类名称",
          key: "name"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      second_columns: [
        {
          title: "分类编号",
          key: "id"
        },
        {
          title: "分类名称",
          key: "name"
        },
        {
          title: "分类图片",
          key: "picture"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      data: [
        {
          id: 1,
          parent_id: 1,
          name: "家具家电",
          picture: "New York No. 1 Lake Park",
          child: [
            {
              id: 5,
              parent_id: 1,
              name: "冰箱",
              picture: "New York No. 1 Lake Park"
            },
            {
              id: 6,
              parent_id: 1,
              name: "洗衣机",
              picture: "New York No. 1 Lake Park"
            },
            {
              id: 7,
              parent_id: 1,
              name: "消毒柜",
              picture: "New York No. 1 Lake Park"
            },
            {
              id: 8,
              parent_id: 1,
              name: "电视",
              picture: "New York No. 1 Lake Park"
            }
          ]
        },
        {
          id: 2,
          parent_id: 2,
          name: "鞋靴箱包",
          picture: "New York No. 1 Lake Park",
          child: []
        },
        {
          id: 3,
          parent_id: 3,
          name: "智能家庭",
          picture: "New York No. 1 Lake Park",
          child: []
        },
        {
          id: 4,
          parent_id: 4,
          name: "户外运动",
          picture: "New York No. 1 Lake Park",
          child: []
        }
      ]
    };
  },
  mounted(){
    console.log(sessionStorage.getItem("Authorization"))
  },
  methods: {
    show(row) {
      this.second = true;
      this.second_data = row.child;
      this.second_title = row.name;
    },
    remove(index) {
      this.data.splice(index, 1);
    },
    // remove_(index) {
    //   this.second_data.splice(index, 1);
    // },
    editFirst(row, index) {
      this.edit_first = true;
      this.firstRow = row;
      this.index = index;
      this.firstName = row.name;
    },
    editSecond(row, index) {
      this.edit_second = true;
      this.secondRow = row;
      this.index = index;
      this.secondName = row.name;

      var temp = this.data.findIndex((value)=>value.parent_id == row.parent_id);
      this.parent = this.data[temp].name;
    },
    comfirmFirst() {
      this.firstRow.name = this.firstName;
    },
    comfirmSecond() {
      this.secondRow.name = this.secondName;
    },
    cancelFirst() {
      this.index = -1;
    },
    cancelSecond() {
      this.index = -1;
    },
    choosePage() {},
    close() {
      this.second = false;
    },
    del(row, index){
      this.secondRow = row;
      this.index = index;
      this.delSecond = true;
    },
    onlyDel(){
      this.translate = false;
      this.second_data.splice(this.index, 1);
    },
    delAndTran(){
      this.translate = false;
      this.second_data.splice(this.index, 1);
      
    },
  }
};
</script>
