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
  padding: 15px;
}
.special {
  min-width: 200px;
  margin-top: 10px;
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
      <Header :style="{height: '65px'}">
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
          <Content :style="{padding: '24px',  minWidth: '1118px', minHeight: '700px', background: '#fff', marginTop: '20px'}">
            <Tabs active-key="key3" @on-click="choosePage" ref="tabs">
              <Tab-pane label="查看商品" key="key1"></Tab-pane>
              <Tab-pane label="新增商品" key="key2"></Tab-pane>
              <Tab-pane label="增加库存记录" key="key3"></Tab-pane>
              <Tab-pane label="轮播图管理" key="key4"></Tab-pane>
            </Tabs>
            <div class="main_block">
              <a style="color:black;">选择分类:</a>
              <Cascader
                :data="typeList"
                v-model="model1"
                style="width:200px;margin-left:20px;display:inline-block;"
                change-on-select
              ></Cascader>
              <div style="margin-top:10px;">
                <a style="color:black;">商品名称:</a>
                <input v-model="name" style="width:200px;margin-left:20px;" placeholder="请输入商品名" />
              </div>
              <div class="special">
                <div style="width:5%;float:left;">
                  <a style="color:black;">规格:</a>
                </div>
                <div class="special_block">
                  <div class="one_special">
                    <div v-for="(item,key) in itemType" :key="key">
                      <div>{{item.typeName}}:</div>
                      <RadioGroup v-model="chosenType[key]">
                        <Radio v-for="(item2,key2) in item.type" :key="key2" :label="item2"></Radio>
                        <a style="margin-left:20px;" @click="addTypeItem(key)">增加</a>
                        <a style="margin-left:20px;" @click="deleteItem(key)">删除</a>
                        <Modal v-model="modal1" title="新增规格" @on-ok="okIn" @on-cancel="cancelIn">
                          <input v-model="addItemValueIn" />
                        </Modal>
                      </RadioGroup>
                    </div>
                  </div>
                  <Button
                    type="primary"
                    style="margin-top:10px;margin-left:10px;"
                    @click="modal2=true"
                  >添加规格</Button>
                  <Modal v-model="modal2" title="新增规格内部选项" @on-ok="okOut" @on-cancel="cancelOut">
                    <input v-model="addItemValueOut" />
                  </Modal>
                  <Modal v-model="modal3" title="删除提示" @on-ok="deleteAll" @on-cancel="cancelOut">
                    <a>确定删除此规格的所有分类吗</a>
                  </Modal>
                </div>
                <div style="clear:both;"></div>
                <div style="margin-top:10px;">
                  <a style="color:black;">进价:</a>
                  <input
                    style="width:200px;margin-left:20px;"
                    placeholder="请输入进货价"
                    v-model="inPrice"
                  />
                </div>
                <div style="margin-top:10px;">
                  <a style="color:black;">价格:</a>
                  <input
                    style="width:200px;margin-left:20px;"
                    placeholder="请输入商品价格"
                    v-model="outPrice"
                  />
                </div>
                <div style="margin-top:10px;">
                  <a style="color:black;">数量:</a>
                  <input
                    style="width:200px;margin-left:20px;"
                    placeholder="请输入商品数量"
                    v-model="totalNumber"
                  />
                </div>
                <Button
                  type="primary"
                  style="margin-top:10px;margin-left:50px;"
                  @click="toTable"
                >确认添加</Button>
                <i-table
                  style="margin-top:10px;margin-left:50px;"
                  border
                  :columns="item_column"
                  :data="item_details"
                ></i-table>
                <div style="height:300px;margin-top:10px;">
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
                  <quill-editor
                    ref="myTextEditor"
                    v-model="des"
                    :options="editorOption"
                    style="height:200px;margin-top:5px;"
                  ></quill-editor>
                </div>
                <div style="margin-top:10px;padding-bottom:10px;">
                  <div style="width:10%;float:left;">选择图片：</div>
                  <div class="img_block" style="width:90%;float:left;">
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
                      style="display: inline-block;width:58px;"
                    >
                      <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                      </div>
                    </Upload>
                  </div>
                  <div style="clear:both;"></div>
                </div>
                <!-- <input type="file" @change="handleFileChange" ref="inputer" /> -->
                <Button id="submit_button" type="primary" @click="upload()">完成</Button>
                <Button style="margin-left:20px;" @click="hidden=true">预览富文本</Button>
                <Button style="margin-left:20px;">取消</Button>
              </div>
              <div v-show="hidden" id="backend" class="hidden">
                <div id="rich" class="rich_block Rich_text" v-html="des"></div>
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
      del_url: require("../assets/delete.png"),
      headers: {},
      uploadList: [],
      imgList: [],
      name: "",
      inPrice: 0,
      outPrice: 0,
      totalNumber: 0,
      des: "",  //富文本
      hidden:false,  //决定富文本预览是否显示
      theChosenItem: 0, //用来定位当前要增加或者修改的是哪一个规格
      addItemValueIn: "", //增加某个规格内部分类其中一个选项的输入框的值
      addItemValueOut: "", //增加某个规格其中一个选项的输入框的值
      modal1: false, //用来决定增加规格内部分类的对话框是否显示的
      modal2: false, //用来决定增加规格对话框是否显示
      modal3: false, //用来决定删除提示框是否显示
      target: "",
      disabledGroup: true,
      itemType: [
        //规格单选框的数组
        // {
        // typeName:"颜色",    //单选框的标题
        // type:["黄色","绿色"]//单选框的内部选项名字
        // }
      ],
      chosenType: [], //装单选框所有被选中的值的数组
      item_column: [
        //最终表格列的数组
        // {title:"颜色",key:"color"},
        // {title:"内存",key:"storage"},
        { title: "进货价", key: "进货价" },
        { title: "价格", key: "价格" },
        { title: "数量", key: "数量" }
      ],
      item_details: [
        //表格内容数组
      ],
      numDes: [
        //用数组下标表示规格选择情况的数组
      ],
      typeList: [
        // {
        //     value: 'elect',
        //     label: '家电'
        // },
        // {
        //     value: 'shanghai',
        //     label: '电子设备'
        // }
      ],
      model1: [], //联机选择器选择的值
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
  watch: {
    itemType() {
      let a = this.itemType;
      let tableColumn = [];
      let b = {};
      for (let item in a) {
        b = {
          title: a[item].typeName,
          key: a[item].typeName
        };
        tableColumn.push(b);
        //console.log(a[item].typeName)
      }
      tableColumn.push({ title: "进货价", key: "进货价" });
      tableColumn.push({ title: "价格", key: "价格" });
      tableColumn.push({ title: "数量", key: "数量" });
      this.item_column = tableColumn;
    }
  },
  mounted() {
    let that=this
    this.token = sessionStorage.getItem("Authorization");
    this.$refs.tabs.activeKey = 1;
    this.getClass();
    let a=document.getElementById("backend")
    let b=document.getElementById("rich")
    a.addEventListener("click",function(){that.hidden=false})
    b.addEventListener("click",function(e){e.stopPropagation()},true)
  },
  methods: {
    upload() {
      let button=document.getElementById("submit_button")
      button.disabled=true;
      let name = this.name; //商品名
      let imgArray = this.imgList; //图片url
      let des = this.des; //商品描述
      let cateId = this.model1[this.model1.length - 1]; //类别id
      // let ifType = false; //是否有分类规格
      let spec = []; //商品规格名称
      let options = []; //每个规格的内部分类
      let sku = []; //具体商品细节内容（如定价等）
      let price = 100000000000; //商品价格
      let total = 0; //总库存
      var that = this;
      if (this.itemType.length > 0) {
        let specNum = this.itemType.length;
        // ifType = true;
        for (let item of this.itemType) {
          spec.push(item.typeName);
          options.push(item.type);
        }
        let tempCount = 0;
        for (let item of this.item_details) {
          let temp = {};
          temp.spec = this.numDes[tempCount];
          tempCount++;
          temp.stock_num = parseInt(item.数量);
          total += parseInt(item.数量);
          temp.price = parseInt(item.价格);
          temp.purchase_price = parseInt(item.进货价);
          sku.push(temp);
          price = price < parseInt(item.价格) ? price : parseInt(item.价格);
        }
        // console.log("有规格");
        // console.log("商品名：", name);
        // console.log("图片url：", imgArray);
        // console.log("商品详情：", des);
        // console.log("类别id：", cateId);
        // console.log("是否有规格分类：", ifType);
        // console.log("规格数目：", specNum);
        // console.log("规格名：", spec);
        // console.log("规格（options）：", options);
        // console.log("库存单位：", sku);
        // console.log("总库存：", total);
        // console.log("价格：", price);
        that.$axios
          .post(
            that.api + "/admin/goods",
            {
              name: name,
              pic: imgArray,
              description: des,
              category_id: cateId,
              has_spec: true,
              spec_num: specNum,
              spec: spec,
              options: options,
              sku: sku,
              price: price,
              stock_num: total
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
            button.disabled=false;
            that.$Message.info("商品新增成功");
            location.reload()
          })
          .catch(function(err) {
            that.$Message.info("新增失败");
            console.log(err);
          });
      } else {
        // console.log("无规格");
        // console.log("商品名：", name);
        // console.log("类别id：", cateId);
        // console.log("图片url：", imgArray);
        // console.log("商品详情：", des);
        // console.log("是否有规格分类：", ifType);
        // console.log("总库存：", parseInt(this.totalNumber));
        // console.log("价格：", parseInt(this.outPrice));
        // console.log("进货价：", parseInt(this.inPrice));
        that.$axios
          .post(
            that.api + "/admin/goods",
            {
              name: name,
              pic: imgArray,
              description: des,
              category_id: cateId,
              has_spec: false,
              price: parseInt(that.outPrice),
              purchase_price: parseInt(that.inPrice),
              stock_num: parseInt(that.totalNumber)
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
            button.disabled=false;
            that.$Message.info("商品新增成功");
            location.reload()
          })
          .catch(function(err) {
            console.log(err);
            that.$Message.info("新增失败");
          });
      }
    },
    handleFileChange(e) {
      console.log(e.target.files[0]);
    },
    getFile() {
      this.$refs.getF.click();
    },
    get_name(e) {
      var filename = this.$refs.getF.value;
      var filenames = filename.split("\\");
      filename = filenames[filenames.length - 1];
      console.log(filename);
      console.log(e.target.files[0]);
    },
    choosePage(id) {
      var that = this;
      console.log(id);
      if (id == 0) {
        that.$router.push({ path: "/itemManage" });
      } else if (id == 2) {
        that.$router.push({ path: "/itemHistory" });
      } else if (id == 3) {
        that.$router.push({ path: "/imgManage" });
      }
    },
    addTypeItem(e) {
      this.theChosenItem = e;
      this.modal1 = true;
    },
    deleteItem(e) {
      console.log(e);
      var that = this;
      if (this.chosenType[e] == undefined) {
        that.modal3 = true;
        that.theChosenItem = e;
      } else {
        console.log(that.chosenType[e]);
        console.log(that.itemType[e].type);
        let a = that.itemType[e].type;
        let number = 0;
        for (let key in a) {
          if (a[key] == that.chosenType[e]) {
            break;
          }
          number++;
        }
        console.log(number);
        that.itemType[e].type.splice(number, 1);
      }
    },
    deleteAll() {
      this.itemType.splice(this.theChosenItem, 1);
      this.theChosenItem = 0;
    },
    okIn() {
      var a = this.addItemValueIn;
      this.addItemValueIn = "";
      this.itemType[this.theChosenItem].type.push(a);
      this.$Message.info("新增成功");
    },
    cancelIn() {
      this.$Message.info("Clicked cancel");
    },
    okOut() {
      var that = this;
      var a = {
        typeName: that.addItemValueOut,
        type: []
      };
      this.addItemValueOut = "";
      this.itemType.push(a);
      this.$Message.info("新增成功");
    },
    cancelOut() {
      this.$Message.info("Clicked cancel");
    },
    toTable() {
      let a = {};
      if (this.itemType.length > 0) {
        var numArray = [];
        var itemType = this.itemType;
        var chosenType = this.chosenType;
        for (var item of chosenType) {
          for (var middleItem of itemType) {
            var tempCount = 0;
            for (var inItem of middleItem.type) {
              if (item == inItem) {
                numArray.push(tempCount);
                break;
              }
              tempCount++;
            }
          }
        }
        this.numDes.push(numArray);
        console.log("this.numDes");
        let count = 0;
        var that = this;
        for (let item of this.chosenType) {
          a[that.item_column[count].key] = item;
          count++;
        }
      }
      a["进货价"] = this.inPrice;
      a["价格"] = this.outPrice;
      a["数量"] = this.totalNumber;
      console.log(a);
      this.item_details.push(a);
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
    onEditorChange({ html }) {
      this.content = html;
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
