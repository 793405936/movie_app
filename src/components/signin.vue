<template>
  <div class="signin">
    <div class="back" @click="back"><span><</span></div>
    <div class="signInDetails">
      <form class="details">
        用户名：<input type="text" class="name" name="name" placeholder="请输入用户名" v-model="name">
        密码：<input type="password" class="password" name="password" placeholder="请输入密码" v-model="password">
        <a @click.preventDefault="login(name,password)">登录</a>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        password: ''
      };
    },
    methods: {
      back () {
        window.history.back();
      },
      login (name, password) {
        this.$http.post('/api/signin', {
          name: this.name,
          password: this.password
        }).then(response => {
          if (response.status === 200) {
            console.log('登录成功');
            this.username = response.body;
            this.$router.push('/HottestMovie');
          } else {
            console.log('登录失败');
          }
        }, response => {
          console.log('登录失败，未通过服务端校验' + response.status);
          this.errors = response.body;
        });
      }
    }
  };
</script>

<style>
  .signin {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: #fff;
  }

  .signin .back {
    width: 100%;
    height: 60px;
    padding: 10px;
    line-height: 60px;
  }

  .signin .back span {
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

  .signin .signInDetails {
    width: 100%;
    height: 400px;
    border-top: solid 2px green;
    border-bottom: solid 2px green;
    padding: 50px 10px;
  }

  .signin .signInDetails .details {
    font-size: 28px;
  }

  .signin .signInDetails .details input {
    display: block;
    margin: 10px auto 10px 5px;
    border: solid 1px green;
    font-size: 28px;
  }
</style>
