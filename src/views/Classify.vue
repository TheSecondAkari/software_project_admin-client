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
          <Content
            style="padding: 24px; minHeight: 280px; background-color: #fff; margin-top: 24px;"
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
                  @click="show(index)"
                >编辑</Button>
                <Button type="error" size="small" @click="remove(index)">删除</Button>
              </template>
            </Table>
          </Content>
        </Layout>
        <Drawer :closable="false" v-model="second" width="50">
          <template slot="header">
            <Icon type="ios-arrow-back" size="28" />
            <strong style="font-size: 24px; margin-left: 15px;">{{second_title}}</strong>
          </template>
          <Table :columns="second_columns" :data="second_data">
            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
              <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
          </Table>
        </Drawer>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      second: false,
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
      ],
      second_data: [],
      second_title: ""
    };
  },
  methods: {
    show(row) {
      this.second = true;
      this.second_data = row.child;
      this.second_title = row.name;
    },
    remove(index) {
      this.data.splice(index, 1);
    }
  }
};
</script>
