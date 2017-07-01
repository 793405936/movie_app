<template>
  <div v-show="signUpShow" class="signup">
    <div class="back" @click="back"><span><</span></div>
    <div class="signUpDetails">
      <form action="#" class="details">
        用户名：<input type="text" class="name" name="name" v-model="name" placeholder="请输入用户名">
        密码：<input type="text" class="password" name="password" v-model="password" placeholder="请输入密码">
        重复输入密码：<input type="text" class="confirm" name="password" v-model="rePassword" placeholder="请再次输入密码">
        <a @click="reg(name,password,rePassword)">提交</a>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        signUpShow: true,
        name: '',
        password: '',
        rePassword: ''
      };
    },
    methods: {
      back () {
        window.history.back();
      },
      reg (name, password, rePassword) {
        this.$http.post('/api/signup', {
          name: this.name,
          password: this.password,
          rePassword: this.rePassword
        }).then(response => {
          if (response.status === 200) {
            console.log('注册成功');
            this.$router.push('/signin');
          } else {
            console.log('注册失败');
          }
        }, response => {
          console.log('注册失败，未通过服务端校验' + response.status);
          this.errors = response.body;
        });
      }
    }
  };
</script>

<style>
  .signup {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: #fff;
  }

  .signup .back {
    width: 100%;
    height: 60px;
    padding: 10px;
    line-height: 60px;
  }

  .signup .back span {
    display: block;
    width: 40px;
    height: 40px;
    font-size: 24px;
    line-height: 40px;
    text-align: center;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.3);
    background-color: #eee;
    border-radius: 50%;
  }

  .signup .signUpDetails {
    width: 100%;
    height: 400px;
    border-top: solid 2px green;
    border-bottom: solid 2px green;
    padding: 50px 10px;
  }

  .signup .signUpDetails .details {
    font-size: 28px;
  }

  .signup .signUpDetails .details input {
    display: block;
    margin: 10px auto 10px 5px;
    border: solid 1px green;
    font-size: 28px;
  }
</style>
