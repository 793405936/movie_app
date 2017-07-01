<template>
  <div class="myCollection">
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
    <div class="movie">
      <!--<router-link to="/loveMovie"></router-link>-->
      <loveMovie v-show="movie"></loveMovie>
    </div>
  </div>
</template>

<script>
  import loveMovie from './loveMovie.vue';
  //  import sign from './sign.vue';

  export default {
    data () {
      return {
        sign: true,
        movie: false,
        username: ''
      };
    },
    created () {
      this.$http.get('/api/session').then((response) => {
        if (response.status === 200) {
//          console.log(response.body);
//          this.username = response.body;
//          console.log(this.username);
//          var that = this;
          this.sign = false;
          this.movie = true;
          console.log(this.sign);
          console.log(this.movie);
//          this.$nextTick(() => {
//            that.sign = false;
//            that.movie = true;
//          });
//          this.viewDetail();
        } else {
          this.$router.push('/sign');
          console.log('1111111111');
        }
      });
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
</style>
