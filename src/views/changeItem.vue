<style scoped>
/* 当前网页布局有问题，高度不能填满整个画面。 */
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  overflow-y: scroll;
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
.main_block {
  position: relative;
  width: 90%;
  min-height: 500px;
  /* border: 1px solid grey; */
  padding: 10px;
}
.special {
  min-width: 200px;
}
.special_block {
  min-height: 50px;
  width: 95%;
  float: left;
}
.one_special {
  margin-left: 20px;
  /* border: 1px solid grey; */
}
textarea {
  min-height: 100px;
  min-width: 200px;
}
.img_block {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
}
.hidden{
  position: absolute;
  right:0px;
  top:0px;
  bottom:0px;
  left:0px;
  background:rgba(192,192,192,0.5);
  z-index: 1;
  display: flex;
}
.Rich_text {
  /* margin-top: 5%; */
  white-space: pre-wrap;
  word-wrap: break-word;
  table-layout: fixed;
  word-break: break-all;
  text-align: center;
  
}

.rich_block{
  z-index:4;
  margin:auto;
  height: 600px;
  overflow: auto;
  width:375px;
  background:white;
  padding: 10px;
}

/* 在使用scoped的时候，使用穿透符即可 */
.Rich_text >>> img {
  width: 100% !important;
  height: auto !important;
  -ms-interpolation-mode: bicubic;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
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
        <Layout :style="{padding: '0 24px 24px',overflow:'auto'}">
          <!-- <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb> -->
          <Content :style="{padding: '20px',  minWidth: '1118px', minHeight: '700px', background: '#fff' , marginTop: '20px'}">
            <div class="main_block">
              <div class="special">
                <div style="padding-bottom:20px;">
                  <h2>更新商品数量/售价</h2>
                  <Table
                    border
                    :columns="item_column"
                    :data="item_details"
                    style="margin-top:10px;"
                    ref="table"
                  >
                    <template slot-scope="{ row }" slot="action">
                      <a @click="change(row)">更改</a>
                    </template>
                  </Table>
                </div>
                <div style="width:100%;margin-top:10px;">
                  <h2 style="margin-top:10px; ">更新商品内容</h2>
                  <div style="margin-top:10px; ">
                    <a style="color:black;">选择分类:</a>
                    <Cascader
                      :data="typeList"
                      v-model="model1"
                      style="margin-left:10px;width:200px; display:inline-block;"
                      change-on-select
                    ></Cascader>
                  </div>
                  <div style="margin-top:10px; ">
                    <a style="color:black;">商品名称:</a>
                    <Input
                      v-model="name"
                      style="margin-left:10px;width:200px; "
                      placeholder="请输入商品名"
                    />
                  </div>
                  <div style="height:300px;margin-top:10px; ">
                    <a style="color:black;">详情:</a>
                    <Upload
                      ref="upload"
                      :show-upload-list="false"
                      :on-success="handleSuccess2"
                      :format="['jpg','jpeg','png']"
                      :max-size="2048"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :before-upload="handleBeforeUpload"
                      multiple
                      type="drag"
                      action="/api/pictures"
                      :headers="headers"
                      style="display:none;"
                    >
                      <div style="width: 58px;height:58px;line-height: 58px;" id="quill-img">
                        <Icon type="ios-camera" size="20"></Icon>
                      </div>
                    </Upload>
                    <!-- <i-input type="textarea" :rows="4" placeholder="请输入备注信息" style="display:block;width:400px;"></i-input> -->
                    <quill-editor
                      ref="myTextEditor"
                      v-model="des"
                      :options="editorOption"
                      style="height:200px;margin-top:5px;background:white"
                    ></quill-editor>
                  </div>
                  <div style="margin-top:10px; display:flex;flex-wrap:wrap;">
                    <!-- <div
                      v-for="(item,key) in imgList"
                      :key="key"
                      style="position:relative;height:100px;width:100px;margin-right:10px;background:#d7dde4;border-radius:5px;"
                    >
                      <img
                        v-bind:src="del_url"
                        style="position:absolute;top:0px;right:0px;height:15px;height:15px;"
                        @click="del_img(key)"
                      />
                      <div style="position:absolute;height：85px;width:85px;top:10px;left:0px;display:flex;align-items:center;justify-content:center;">
                        <img
                          :src="item"
                          style="max-width:85px;max-height:85px;"
                        />
                      </div>
                    </div> -->
                    <div
                      v-for="(item,key) in imgList"
                      :key="key"
                      style="position:relative;height:100px;width:100px;margin-right:10px;background:#d7dde4;border-radius:5px;"
                    >
                      <div style="border-radius:5px 5px 0px 0px ;height:75px;width:100px;display:flex;align-items:center;justify-content:center;align-items:center">
                        <img
                          :src="item"
                          style="max-width:100px;max-height:75px;"
                        />
                      </div>
                      <div 
                        style="height:25px;width:100px;background:grey;border-radius: 0px 0px 5px 5px ;display:flex;align-items:center;justify-content:center;align-items:center;color:white"
                        @click="del_img(key)">
                        删除
                      </div>
                    </div>
                    <Upload
                      ref="upload"
                      :show-upload-list="false"
                      :on-success="handleSuccess"
                      :format="['jpg','jpeg','png']"
                      :max-size="2048"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :before-upload="handleBeforeUpload"
                      multiple
                      type="drag"
                      action="/api/pictures"
                      :headers="headers"
                      style="display: inline-block;width:100px;"
                    >
                      <div style="width:100px;height:100px;line-height:100px;">
                        <Icon type="ios-camera" size="100"></Icon>
                      </div>
                    </Upload>
                  </div>
                  <Button id="submitButton" type="primary" style=" margin-top:20px;" @click="submit_des()">提交修改</Button>
                  <Button style="margin-left:20px;margin-top:20px;" @click="hidden=true">预览富文本</Button>
                </div>
                <div v-show="hidden" id="backend" class="hidden">
                  <div id="rich" class="rich_block Rich_text" v-html="des"></div>
                </div>

                <Modal v-model="modal1" title="修改规格" @on-ok="okIn" @on-cancel="cancelIn">
                  <div style="margin-top:10px;">
                    <a>商品总数：</a>
                    <p style="display:inline-block;">{{now_id}}</p>
                  </div>
                  <div style="margin-top:10px;">
                    <a>商品进价：</a>
                    <Input style="width:200px;" v-model="now_in" />
                  </div>
                  <div style="margin-top:10px;">
                    <a>商品售价：</a>
                    <Input style="width:200px;" v-model="now_out" />
                  </div>
                </Modal>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  [{ size: ["small", false, "large", "huge"] }],
  [{ font: [] }],
  [{ color: [] }],
  [{ align: [] }],
  ["link", "image"]
];
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      api: "/api",
      token: "",
      name: "",
      des: "",  //富文本
      hidden:false, //决定预览框是否显示
      id: 0,
      del_url: require("../assets/delete.png"), //删除照片的叉叉的url
      uploadList: [],
      headers: {},
      theChosenItem: 0, //用来定位当前要修改的是哪一个规格
      modal1: false, //用来决定增加规格内部分类的对话框是否显示的
      now_in: 0, //
      now_out: 0,
      now_id: 0,
      target: "",
      disabledGroup: true,
      imgList: [],
      typeList: [
        {
          value: "elect",
          label: "家电"
        },
        {
          value: "shanghai",
          label: "电子设备"
        }
      ],
      model1: [],
      item_column: [
        //表格列的数组
        { title: "颜色", key: "color" },
        { title: "内存", key: "storage" },
        { title: "数量", key: "total_number" },
        { title: "进货价", key: "priceIn" },
        { title: "售价", key: "priceOut" },
        { title: "Action", slot: "action", width: 150, align: "center" }
      ],
      item_details: [
        //表格内容数组
        {
          color: "黄色",
          storage: "128g",
          total_number: 200,
          priceIn: 1000,
          priceOut: 2000
        }
      ],
      editorOption: {
        //富文本
        placeholder: "编辑文章内容",
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
                if (value) {
                  document.getElementById("quill-img").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },
  watch: {},
  mounted() {
    let that=this
    this.token = sessionStorage.getItem("Authorization");
    this.onload();
    this.getClass();
    let a=document.getElementById("backend")
    let b=document.getElementById("rich")
    a.addEventListener("click",function(){that.hidden=false})
    b.addEventListener("click",function(e){e.stopPropagation()},true)
  },
  methods: {
    onload() {
      var that = this;
      let id = this.$route.params.id;
      this.id = id;
      this.$axios
        .get(that.api + "admin/goods/" + id, {
          headers: {
            Authorization: that.token
          }
        })
        .then(function(res) {
          let data = res.data.data;
          console.log(data);
          that.name = data.name;
          that.des = data.description;
          that.imgList = data.pic;
          let item_details = [];
          let item_colums = [];
          if (data.specifications.length > 0) {
            let tempOut = {};
            let count = 0;
            item_colums.push({ title: "id", key: "ID" });
            for (let item of data.specifications) {
              tempOut = {};
              tempOut.title = item.name;
              tempOut.key = item.name;
              item_colums.push(tempOut);
            }
            item_colums.push({ title: "数量", key: "数量" });
            item_colums.push({ title: "进货价", key: "进货价" });
            item_colums.push({ title: "售价", key: "售价" });
            item_colums.push({
              title: "Action",
              slot: "action",
              width: 150,
              align: "center"
            });
            let tempIn = {};
            for (let item of data.sku) {
              tempIn = {};
              count = 0;
              tempIn.ID = item.id;
              tempIn.进货价 = item.purchase_price;
              tempIn.售价 = item.price;
              tempIn.数量 = item.stock_num;
              console.log(tempIn)
              for (let item2 of item.options) {
                tempIn[item_colums[count + 1].title] = item2.name;
                count++;
              }
              item_details.push(tempIn);
            }
          }
          else{
            item_colums.push({ title: "id", key: "ID" });
            item_colums.push({ title: "数量", key: "数量" });
            item_colums.push({ title: "进货价", key: "进货价" });
            item_colums.push({ title: "售价", key: "售价" });
            item_colums.push({
              title: "Action",
              slot: "action",
              width: 150,
              align: "center"
            });
            let tempIn={}
            tempIn = {};
            tempIn.ID = data.sku[0].id;
            tempIn.进货价 = data.sku[0].purchase_price;
            tempIn.售价 = data.sku[0].price;
            tempIn.数量 = data.sku[0].stock_num;
            item_details.push(tempIn);
          }
          console.log(item_colums);
          console.log(item_details);
          that.item_column = item_colums;
          that.item_details = item_details;
          that.model1 = [data.category.parent_id, data.category_id];
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
        console.log(temp);
        that.typeList = temp;
      });
    },
    test() {
      let a = [];
      let b = ["aa", "bb"];
      for (let item in b) {
        a.push({ [item]: item });
      }
      console.log(a);
    },
    submit_des() {
      let that = this;
      let a=document.getElementById("submitButton");
      a.disabled=true;
      that.$axios
        .put(
          that.api + "/admin/goods/" + this.id,
          {
            name: that.name,
            pic: that.imgList,
            description: that.des,
            category_id: that.model1[that.model1.length - 1]
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: that.token
            }
          }
        )
        .then(function(e) {
          a.disabled=false;
          console.log(e);
          that.$Message.info("修改成功");
          location.reload();
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    handleFileChange(e) {
      console.log(e.target.files[0]);
    },
    getFile() {
      this.$refs.getF.click();
    },
    get_name() {
      var filename = this.$refs.getF.value;
      var filenames = filename.split("\\");
      filename = filenames[filenames.length - 1];
    },
    okIn() {
      let that = this;
      that.$axios
        .put(
          that.api + "/admin/goods/" + this.id + "/sku/" + this.now_id,
          {
            price: parseInt(that.now_out),
            purchase_price: parseInt(that.now_in)
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
          that.$Message.info("修改成功");
          location.reload();
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    cancelIn() {
      this.$Message.info("取消更改");
    },
    cancelOut() {
      this.$Message.info("Clicked cancel");
    },
    change(rows) {
      this.now_in = rows.进货价;
      this.now_out = rows.售价;
      this.now_id = rows.ID;
      // this.theChosenItem=e;
      this.modal1 = true;
    },
    handleSuccess(res, file) {
      //上传成功的时候调用的函数
      console.log("成功");
      console.log(res);
      console.log(file);
      for (var i = 0; i < res.url.length; i++) {
        this.imgList.push(res.url[i]);
      }
    },
    handleSuccess2(res, file) {
      //富文本上传成功的时候调用的函数
      console.log("成功");
      console.log(res);
      console.log(file);
      this.quillImgSuccess(res.url[0]);
    },
    quillImgSuccess(res) {
      let quill = this.$refs.myTextEditor.quill;
      let length = quill.getSelection().index;
      quill.insertEmbed(length, "image", res);
      quill.setSelection(length + 1);
      console.log("现在是：" + this.des);
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
    handleBeforeUpload() {
      //上传之前的函数
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    },
    del_img(e) {
      let temp = this.imgList;
      temp.splice(e, 1);
      this.imgList = temp;
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
