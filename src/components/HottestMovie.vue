<template>
  <div class="hottestMovie" ref="hottestMovie">
      <ul>
        <li v-for="item in filmData" class="films">
          <div class="film">
            <div class="filmImg">
              <img width="60" height="80" :src="item.filmImg">
            </div>
            <div class="filmDes">
              <div class="filmName">电影：{{item.filmName}}</div>
              <div class="filmScore">评分:{{item.filmScore}}</div>
              <div class="filmStarrings" v-show="item.filmPersons.length>0">主演：
                <ul v-for="(items,index) in item.filmPersons" class="starring">
                  <li>&nbsp{{items}}</li>
                </ul>
              </div>
            </div>
            <div class="filmExtra">
            <span class="storage" @click="store(item.filmName,item.filmUrl,item.filmImg,item.filmScore,item.filmPersons)">收藏</span>
              <span class="display">
              <a :href="item.filmUrl">观看</a>
            </span>
            </div>
          </div>
        </li>
      </ul>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';

  export default {
    data () {
      return {
        filmData: {}
      };
    },
    created () {
      this.$http.get('/api').then((response) => {
        response = response.body;
        this.filmData = response;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.hottestMovie, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      });
    },
    methods: {
      store (filmName, filmUrl, filmImg, filmScore, filmPersons) {
        this.$http.post('/api/storeMovie', {
          filmName: filmName,
          filmUrl: filmUrl,
          filmImg: filmImg,
          filmScore: filmScore,
          filmPersons: filmPersons
        }).then(response => {
          if (response.status === 200) {
            console.log('收藏成功');
          } else {
            console.log('收藏失败');
          }
        }, response => {
          console.log('收藏失败，未通过服务端校验' + response.status);
          this.errors = response.body;
        });
      }
    }
  };
</script>
<style>
  .hottestMovie {
    position: absolute;
    top: 40px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }

  .films {
    width: 100%;
  }

  .films .film {
    display: flex;
    padding: 0 10px;
    height: 100px;
    border-bottom: solid 1px #7e8c8d;
  }

  .films .film .filmImg {
    flex: 0 0 60px;
    margin: 10px 0;
    width: 60px;
    height: 80px;
  }

  .films .film .filmDes {
    flex: 1;
    padding: 10px 6px;
  }

  .films .film .filmDes .filmName,
  .films .film .filmDes .filmScore {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
  }

  .films .film .filmDes .filmStarrings {
    height: 40px;
    font-size: 14px;
    overflow: hidden;
  }

  .films .film .filmDes .filmStarrings .starring {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    text-overflow: ellipsis;
  }

  .films .film .filmExtra {
    flex: 0 0 40px;
  }

  .films .film .filmExtra .storage,
  .films .film .filmExtra .display {
    display: block;
    padding: 0 10px;
    margin: 10px 0;
    height: 30px;
    width: 40px;
    line-height: 30px;
    font-size: 18px;
    color: #222;
    font-weight: 600;
    background-color: #adf;
    border-radius: 15px;
  }

  .films .film .filmExtra .display a {
    color: #222;
    font-weight: 600;
  }

  .films .film .filmExtra .display a:active {
    color: blue;
  }
</style>
