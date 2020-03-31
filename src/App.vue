
<style>
/* //初始默认的整体属性，我删除了一些，可以随便修改 */
#app { 
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,body,#app{
}
html{
    overflow: scroll;
    height:800px;
}
</style>
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>

    export default {
        data () {
            return {}
        },
        mounted () {
        },
        beforeDestroy () {
        },
        methods: {
        }
    }
</script>