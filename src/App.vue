<template>
  <div id="app">
    <div class="tab">
      <div class="tab-item">
        <router-link to="/HottestMovie">热门电影</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/myCollection">我的收藏</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {};
</script>
<style>
  .tab {
    display: flex;
    height: 40px;
    width: 100%;
    line-height: 40px;
    font-size: 20px;
    border-bottom: solid 1px #aaa;
    background-color: #eee;
  }

  .tab .tab-item {
    flex: 1;
    text-align: center;
    border-right: solid 1px #aaa;
  }

  .tab .tab-item a {
    display: block;
    color: dimgrey;
  }

  .tab .tab-item a.router-link-active {
    color: rgb(240, 20, 20);
  }
</style>
