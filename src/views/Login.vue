<template>
  <div style="height: 100%; width: 100%; background-color: #AFADAD;">
    <div
      style="height: 550px; width: 1000px; background-color: white; position: relative; top: 15%; left: 20%;"
    >
      <div style="display: flex; flex-direction: row; height: 100%;">
        <img :src="require('../assets/login.png')" style="height: 100%; width: 500px;" />
        <div style="width: 50%;">
          <img
            :src="require('../assets/logo.png')"
            style="height: 100px; width: 100px; margin: 10% 0 0 40%;"
          />
          <div style="margin: 5% 0 0 27%; font-size: 28px; font-family: STKaiti">天东易宝管理系统</div>
          <i-Form :model="formInline" :rules="ruleInline">
            <FormItem prop="user" style="width: 65%; margin: 8% 0 0 17.5%;">
              <i-Input type="text" v-model="formInline.user" placeholder="用户名" size="large">
                <Icon type="ios-contact" slot="prepend" size="24" />
              </i-Input>
            </FormItem>
            <FormItem
              prop="password"
              style="width: 65%; margin: 8% 0 0 17.5%; border-radius: 10px;"
            >
              <i-Input type="password" v-model="formInline.password" placeholder="密码" size="large">
                <Icon type="ios-lock-outline" slot="prepend" size="24" />
              </i-Input>
            </FormItem>
            <FormItem style="width: 65%; margin: 8% 0 0 17.5%;">
              <i-Button size="large" type="primary" @click="handleSubmit()" style="width: 100%;">登录</i-Button>
              <div class="notice" v-if="show">用户名或密码错误</div>
            </FormItem>
          </i-Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,

      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      // var that = this;
      // var name = this.formInline.user;
      // var password = this.formInline.password;
      this.$router.push({path: "/classify"});
      // this.$axios
      //   .post("api/admin/auth", {
      //     name: name,
      //     password: password
      //   })
      //   .then(function(res) {
      //     console.log(res.data);
      //   })
      //   .catch(function(err) {
      //     console.log(err);
      //     that.show = true;
      //   });
    }
  }
};
</script>

<style>
.notice {
  width: 100%;
  margin-top: 10%;
  background-color: #afadad;
  text-align: center;
  color: white;
}
</style>