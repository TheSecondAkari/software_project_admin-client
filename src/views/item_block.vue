<style scoped>
/* 当前网页布局有问题，高度不能填满整个画面。 */
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
button{
    width:auto;
    font-size: 13px;
    padding-top: 5px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 5px;
}
.item_block{
    width: 99%;
    border-bottom: 1px solid grey;
    position: relative;
    padding:20px;
    overflow: hidden;
    /* border: 1px solid gray; */
}
.item_img{
    height: 160px;
    width:160px;
    float: left;
    /* border:1px solid grey; */
    background-color: grey;
}
.item_info_block{
    position: relative;
    height:160px;
    width:50%;
    /* border: 1px solid gray; */
    float: left;
    margin-left: 20px;
}
.item_info{
    margin-top: 10px;
}
.table{
    position: relative;
    max-width: 80%;
    left:180px;
}
</style>
<template>
    <div>
        <div class="item_block" v-for=" (item,key) in itemList" :key="key">
            <div class="item_img"></div>
            <div class="item_info_block">
                <div class="item_info"><b>商品id：</b> {{item.item_id}}</div>
                <div class="item_info"><b>商品类别：</b> {{item.item_obj}}</div>
                <div class="item_info"><b>商品名称：</b> {{item.item_name}}</div>
                <div class="item_info"><b>商品价格：</b> {{item.item_price}}</div>
                <div class="item_info"><b>商品浏览数：</b> {{item.item_viewed_times}}</div>
                <div class="item_info" style="position:absolute;top:0px;left:150px;"><b>剩余总库存：</b> {{item.item_total_left}} </div>
            </div>
            <div style="clear:both"></div>
            <button style="position:absolute;top:30px;right:10%;">修改</button>
            <button style="position:absolute;top:130px;right:10%;" @click="change_detail($event)">{{showORhide}}</button>
            <div style="display:none;">
                <Table  border :columns="itemList[key].item_colums" :data="itemList[key].item_details" class="table">
                            <template slot-scope="{ row, index }" slot="action">
                                <Button size="small" style="margin-right: 5px" @click="selectItem(row,index)">修改</Button>
                            </template>
                </Table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:"ItemBlock",
        props:["itemList"],
        mounted(){
        },
        data () {
            return {
                input_item_name:'',
                show:0,
                showORhide:"显示",
            }
        },
        methods:{
            change_detail(e){
                console.log(e.currentTarget.nextElementSibling.style.display);
                if(e.currentTarget.nextElementSibling.style.display=="none"){
                    console.log("改成显示")
                    e.currentTarget.innerHTML= "显示";
                    e.currentTarget.nextElementSibling.style.display="block";
                    console.log("现在是"+e.currentTarget.nextElementSibling.style.display)
                }
                else{
                    console.log("改成隐藏")
                    e.currentTarget.innerHTML= "隐藏";
                    e.currentTarget.nextElementSibling.style.display="none";
                }
                
            },
            selectItem (row,index) {
                console.log(row.color)
                console.log(index)
            }
        }

    };
</script>
