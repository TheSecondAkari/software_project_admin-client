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
        <Layout :style="{padding: '0 24px 24px'}">
          <!-- 一级分类 -->
          <Content
            style="padding: 24px; minHeight: 500px; background-color: #fff; margin-top: 24px;"
          >
            <Tabs>
              <Tab-pane label="查看分类" key="key1">
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
              </Tab-pane>
              <Tab-pane label="添加分类" key="key2">
                <div style="width: 350px; margin-top: 20px">
                  <i-Form :label-width="90">
                    <FormItem label="分类名称：">
                      <Row>
                        <i-Col span="18">
                          <i-Input v-model="createName" placeholder="请输入名称" maxlength="10"></i-Input>
                        </i-Col>
                        <i-Col span="4" offset="1">
                          <Button type="primary" @click="createFirst">创建一级分类</Button>
                        </i-Col>
                      </Row>
                    </FormItem>
                  </i-Form>
                </div>
                <Divider style="margin-top: 30px;" />
                <div style="margin-bottom: 24px; height: 375px; overflow-y: scroll;">
                  <i-Form :label-width="150" label-position="left">
                    <FormItem label="从属分类：">
                      <Row>
                        <i-Col span="5">
                          <Select v-model="followTo" style="width:200px">
                            <Option
                              v-for="item in data"
                              :value="item.id"
                              :key="item.id"
                            >{{ item.name }}</Option>
                          </Select>
                        </i-Col>
                        <i-Col span="5">
                          <Button type="primary" @click="keepAdd">继续添加</Button>
                        </i-Col>
                      </Row>
                    </FormItem>
                    <FormItem
                      v-for="(item, index) in create"
                      :key="index"
                      label="分类名称和图片："
                      style="width: 500px;"
                    >
                      <Row>
                        <i-Col span="14">
                          <i-Input v-model="item.name" placeholder="请输入名称" maxlength="10"></i-Input>
                        </i-Col>
                        <i-Col span="2">
                          <Upload
                            id="ss"
                            ref="upload"
                            :show-upload-list="false"
                            :on-success="(value => handle(index, value))"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            type="drag"
                            action="/api/pictures"
                            class="addSecond"
                          >
                            <img
                              v-if="item.picture != null"
                              :src="item.picture"
                              width="40"
                              height="40"
                            />
                            <img v-else :src="require('../assets/add.png')" width="40" height="40" />
                          </Upload>
                        </i-Col>
                        <i-Col span="2" offset="2" v-if="index != 0">
                          <Icon
                            type="ios-close-circle"
                            size="24"
                            style="margin-top: 5px;"
                            @click.native="revoke(index)"
                          />
                        </i-Col>
                      </Row>
                    </FormItem>
                  </i-Form>
                  <Button
                    type="primary"
                    @click="createSecond"
                    style="margin: -2.5% 0 0 12.5%;"
                  >创建二级分类</Button>
                </div>
              </Tab-pane>
            </Tabs>
          </Content>
        </Layout>

        <!-- 二级分类 -->
        <Drawer :closable="false" v-model="second" width="50">
          <template slot="header">
            <Icon type="ios-arrow-back" size="28" @click.native="close" />
            <strong style="font-size: 24px; margin-left: 15px;">{{second_title}}</strong>
          </template>
          <Table :columns="second_columns" :data="second_data">
            <template slot-scope="{row}" slot="picture">
              <img :src="row.picture" width="40" height="40" style="margin-top: 5px" />
            </template>
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
              <Option v-for="item in data" :value="item.id" :key="item.id">{{ item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="分类图片：">
            <div class="img_block" style="width:90%;float:left;">
              <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                type="drag"
                action="/api/pictures"
                style="display: inline-block;"
              >
                <img :src="imgURL" style="height:100px;width:100px;" />
              </Upload>
            </div>
          </FormItem>
        </i-Form>
      </div>
    </Modal>

    <!-- 删除一级分类 -->
    <Modal v-model="delFirst" width="360">
      <p slot="header" style="color: #f60; text-align: center">
        <Icon type="ios-information-circle"></Icon>
        <span>确认删除该分类</span>
      </p>
      <div style="text-align:center">
        <p>删除后该分类将从列表中消失！</p>
        <p>是否继续删除该分类？</p>
      </div>
      <div slot="footer">
        <Button style="margin-right: 30px;" @click="delFirst = false">取消</Button>
        <Button type="error" style="margin-right: 80px;" @click="firstDel">删除</Button>
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
        <Button
          type="error"
          style="margin-right: 80px;"
          @click="translate = true; delSecond = false"
        >删除</Button>
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
          <OptionGroup v-for="item in data" :key="item.id" :label="item.name">
            <Option v-for="item2 in item.childrens" :value="item2.id" :key="item2.id">{{ item2.name }}</Option>
          </OptionGroup>
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
      api: "/api",
      second: false,
      edit_first: false, // 一级分类编辑页面显示
      edit_second: false, // 二级分类编辑页面显示
      delFirst: false,
      delSecond: false,
      translate: false,
      second_data: [], // 二级分类数据表
      second_title: "", // 二级分类页显示的标题
      parent: -1, // 所要编辑的二级分类要绑定的父类
      imgURL: "", // 所要编辑的二级分类的图片
      tran: -1, // 所要转移到的父类
      firstRow: [], // 选中的一级分类行
      secondRow: [], // 选中的二级分类行
      firstName: "",
      secondName: "",
      createName: "",
      create: [
        {
          name: "",
          picture: null
        }
      ],
      followTo: -1, // 二级分类从属分类
      index: -1, // 选中的行，可以是一级也可以是二级

      columns: [
        {
          title: "分类编号",
          key: "id",
          sortable: true
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
          slot: "picture",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      data: [
        // {
        //   created_at: "2020-04-22 18:31:10",
        //   updated_at: "2020-04-22 18:31:10",
        //   id: 1,
        //   name: "西八罗马",
        //   parent_id: 0,
        //   picture: null,
        //   childrens: [
        //     {
        //       created_at: "2020-04-22 18:31:10",
        //       updated_at: "2020-04-22 18:31:10",
        //       id: 2,
        //       name: "手机啊",
        //       parent_id: 1,
        //       picture:
        //         "https://www.cbfgo.cn/tdyb/20200417/182bfc55-88aa-492c-92e2-1307382556ad.jpg"
        //     },
        //     {
        //       created_at: "2020-04-22 18:31:10",
        //       updated_at: "2020-04-22 18:31:10",
        //       id: 3,
        //       name: "笔记本",
        //       parent_id: 1,
        //       picture:
        //         "https://www.cbfgo.cn/tdyb/20200417/d6519f71-c455-4326-b8ff-980d9c99f3bf.jpg"
        //     }
        //   ]
        // },
        // {
        //   created_at: "2020-04-22 18:31:10",
        //   updated_at: "2020-04-22 18:31:10",
        //   id: 4,
        //   name: "鸡巴罗马",
        //   parent_id: 0,
        //   picture: null,
        //   childrens: [
        //     {
        //       created_at: "2020-04-22 18:31:10",
        //       updated_at: "2020-04-22 18:31:10",
        //       id: 5,
        //       name: "手机啊",
        //       parent_id: 4,
        //       picture:
        //         "https://www.cbfgo.cn/tdyb/20200417/182bfc55-88aa-492c-92e2-1307382556ad.jpg"
        //     },
        //     {
        //       created_at: "2020-04-22 18:31:10",
        //       updated_at: "2020-04-22 18:31:10",
        //       id: 6,
        //       name: "笔记本",
        //       parent_id: 4,
        //       picture:
        //         "https://www.cbfgo.cn/tdyb/20200417/d6519f71-c455-4326-b8ff-980d9c99f3bf.jpg"
        //     }
        //   ]
        // }
      ]
    };
  },
  mounted() {
    console.log(sessionStorage.getItem("Authorization"));
    this.all();
  },
  methods: {
    show(row) {
      this.second = true;
      this.second_data = row.childrens;
      this.second_title = row.name;
    },
    remove(index) {
      this.delFirst = true;
      this.index = index;
    },

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
      this.imgURL = row.picture;

      var temp = this.data.findIndex(value => value.id == row.parent_id);
      this.parent = this.data[temp].id;
    },
    all() {
      var that = this;
      this.$axios.get(that.api + "/categories").then(function(res) {
        that.data = res.data.data;
        console.log(that.data);
      });
    },

    handleSuccess(res) {
      const msg = this.$Message.loading({
        content: "加载中...",
        duration: 0
      });
      setTimeout(msg, 1000);
      this.imgURL = res.url[0];
    },

    handle(index, res) {
      const msg = this.$Message.loading({
        content: "加载中...",
        duration: 0
      });
      setTimeout(msg, 1000);
      this.create[index].picture = res.url[0];
    },
    handleFormatError(file) {
      //文件格式验证失败的时候调用的函数
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    comfirmFirst() {
      var that = this;
      this.$axios({
        method: "PUT",
        url: that.api + "/admin/category/" + that.firstRow.id,
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        data: {
          parent_id: that.firstRow.parent_id,
          name: that.firstName,
          picture: null
        }
      })
        .then(function(res) {
          console.log(res);
          that.firstRow.name = that.firstName;
          that.$Message.success({
            content: "分类名称修改成功！",
            duration: 1,
            closable: true
          });
        })
        .catch(function(err) {
          console.log(err);
          that.$Message.error({
            content: "分类名称修改失败！",
            duration: 1,
            closable: true
          });
        });
    },
    comfirmSecond() {
      var that = this;
      this.$axios({
        method: "PUT",
        url: that.api + "/admin/category/" + that.secondRow.id,
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        data: {
          parent_id: that.parent,
          name: that.secondName,
          picture: that.imgURL
        }
      })
        .then(function(res) {
          console.log(res);
          that.secondRow.name = that.secondName;
          that.secondRow.picture = that.imgURL;
          if (that.parent != that.secondRow.parent_id) {
            that.secondRow.parent_id = that.parent;
            that.second_data.splice(that.secondRow._index, 1);
            var temp = that.data.findIndex(value => value.id == that.parent);
            that.data[temp].childrens.push(that.secondRow);
          }
          that.$Message.success({
            content: "分类编辑成功！",
            duration: 1,
            closable: true
          });
        })
        .catch(function(err) {
          console.log(err);
          that.$Message.error({
            content: "分类编辑失败！",
            duration: 1,
            closable: true
          });
        });
    },
    cancelFirst() {
      this.index = -1;
    },
    cancelSecond() {
      this.index = -1;
    },
    close() {
      this.second = false;
    },
    del(row, index) {
      this.secondRow = row;
      this.index = index;
      this.delSecond = true;
    },
    firstDel() {
      var that = this;
      var id = this.data[this.index].id;
      this.$axios({
        method: "DELETE",
        url: that.api + "/admin/category/" + id,
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        }
      })
        .then(function(res) {
          console.log(res.data);
          that.delFirst = false;
          that.data.splice(that.index, 1);
          that.$Message.success({
            content: "分类删除成功！",
            duration: 1,
            closable: true
          });
        })
        .catch(function(err) {
          console.log(err);
          that.$Message.error({
            content: "分类删除失败！",
            duration: 1,
            closable: true
          });
        });
    },

    onlyDel() {
      var that = this;
      var id = this.second_data[this.index].id;
      this.$axios({
        method: "DELETE",
        url: that.api + "/admin/category/" + id,
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        }
      })
        .then(function(res) {
          console.log(res.data);
          that.translate = false;
          that.second_data.splice(that.index, 1);
          that.$Message.success({
            content: "分类删除成功！",
            duration: 1,
            closable: true
          });
        })
        .catch(function(err) {
          console.log(err);
          that.$Message.error({
            content: "分类删除失败！",
            duration: 1,
            closable: true
          });
        });
    },

    delAndTra() {
      var that = this;
      var id = this.second_data[this.index].id;
      this.$axios({
        method: "DELETE",
        url: that.api + "/admin/category/" + id,
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        data: {
          change_id: that.tran
        }
      })
        .then(function(res) {
          console.log(res.data);
          that.translate = false;
          that.second_data.splice(that.index, 1);
          that.$Message.success({
            content: "分类转移并删除成功！",
            duration: 1,
            closable: true
          });
        })
        .catch(function(err) {
          console.log(err);
          that.$Message.error({
            content: "分类转移并删除失败！",
            duration: 1,
            closable: true
          });
        });
    },

    createFirst() {
      var that = this;
      var item = [{ name: that.createName, picture: null }];
      this.$axios({
        method: "POST",
        url: that.api + "/admin/categories",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        data: {
          parent_id: 0,
          items: item
        }
      })
        .then(function(res) {
          console.log(res);
          that.all();
          that.createName = "";
          that.$Message.success({
            content: "一级分类创建成功！",
            duration: 1,
            closable: true
          });
        })
        .catch(function(err) {
          console.log(err);
          that.$Message.error({
            content: "一级分类创建失败！",
            duration: 1,
            closable: true
          });
        });
    },
    createSecond() {
      var that = this;
      this.$axios({
        method: "POST",
        url: that.api + "/admin/categories",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        data: {
          parent_id: that.followTo,
          items: that.create
        }
      })
        .then(function(res) {
          console.log(res);
          that.all();
          that.create = [
            {
              name: "",
              picture: null
            }
          ];
          that.followTo = -1;
          that.$Message.success({
            content: "二级分类创建成功！",
            duration: 1,
            closable: true
          });
        })
        .catch(function(err) {
          console.log(err);
          that.$Message.error({
            content: "二级分类创建失败！",
            duration: 1,
            closable: true
          });
        });
    },

    // 添加、撤销二级分类
    keepAdd() {
      this.create.push({
        name: "",
        picture: null
      });
    },
    revoke(index) {
      console.log(index);
      this.create.splice(index, 1);
    },

    // 页面跳转
    redirect(name){
      var that = this;
      var id = parseInt(name);
      switch(id){
        case 2:
           that.$router.push({ path:'/itemManage'});
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
