<template>
  <div class="myCollection" @click="refreshpage">
    <div class="header" v-show="sign">
      <div class="log">
        <span>已有账号，请</span>
        <div class="sign-item">
          <router-link to="/signin">登录</router-link>
        </div>
      </div>
      <div class="reg">
        <span>没有账号，请</span>
        <div class="sign-item">
          <router-link to="/signup">注册</router-link>
        </div>
      </div>
    </div>
    <div class="movie" v-show="movie">
      <loveMovie></loveMovie>
    </div>
    <div class="logout" v-show="movie" @click="logout">注销</div>
  </div>
</template>

<script>
  import loveMovie from './loveMovie.vue';

  export default {
    data () {
      return {
        sign: true,
        movie: false,
        user: {}
      };
    },
    created () {
//      console.log(this.sign);
      this.$http.get('/api/session').then((response) => {
        if (response.status === 200) {
          this.user = response.body;
          this.sign = false;
          this.movie = true;
//          console.log(this.sign);
//          console.log(this.movie);
//          this.$router.go(0);
        } else {
          this.$router.push('/signin');
        }
      });
    },
    methods: {
      logout () {
        this.$http.get('/api/logout').then(response => {
          if (response.status === 200) {
            console.log('用户已退出登录');
            this.sign = true;
            this.movie = false;
            this.$router.push('/signin');
          }
        });
      },
      refreshpage () {
        this.$router.go(0);
      }
    },
    components: {
      loveMovie
    }
  };
</script>

<style>
  .header {
    position: relative;
    width: 100%;
    height: 120px;
    top: 120px;
    text-align: center;
    border-top: solid 1px rgba(15, 128, 24, 0.7);
    border-bottom: solid 1px rgba(15, 128, 24, 0.7);
  }

  .header .log,
  .header .reg {
    height: 60px;
    line-height: 60px;
  }

  .header .sign-item {
    display: inline-block;
    font-size: 24px;
    color: #00b;
  }

  .header .sign-item a {
    font-size: 24px;
    color: #00b;
  }

  .myCollection .logout {
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 30px;
    width: 100%;
    line-height: 30px;
    font-size: 28px;
    color: red;
    background-color: #eee;
    text-align: center;
  }
</style>
