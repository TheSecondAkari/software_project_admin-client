<template>
<div >
    <div v-for="(item,key) in imgList" :key="key" >
        <img :src="item" style="height：100px;height:100px;"></img>
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
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera" size="20"></Icon>
        </div>
    </Upload>
    <button @click="test()">test</button>
</div>
</template>
<script>
    export default {
        data () {
            return {
                api:"/api",
                headers:{},
                uploadList: [],
                imgList:[]
            }
        },
        methods: {
            test(){
                var that=this
                // this.$axios.post(that.api + "/科技创新环境/get_all/", {
                //     token: sessionStorage.getItem("token")
                //     })
                //     .then(function(res) {
                //         var temp = [];
                //         var template = {};
                //         res.data.forEach(v => {
                //             temp.push(v.fields);
                //         });
                //         for (var key in temp[0]) {
                //             template[key] = "";
                //         }
                //         that.contentNew = template;
                //         that.data = res.data;
                //         that.field = temp;
                //         that.tableData = temp.slice(0, that.size);
                //         that.total = res.data.length;
                //     })
                this.$axios.get(that.api + "/categories", {
                    })
                    .then(function(res) {
                        console.log(res)

                    })
            },
            handleSuccess (res, file) { //上传成功的时候调用的函数
                console.log("成功")
                console.log(res)
                console.log(file)
                this.imgName=res.url
                this.imgList=res.url
            },
            handleFormatError (file) { //文件格式验证失败的时候调用的函数
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload () {  //上传之前的函数
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        }
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
