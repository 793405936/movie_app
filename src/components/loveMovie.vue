<template>
  <div class="loveMovie" ref="loveMovie">
    <ul>
      <li v-for="(item,index) in selectedMovie" class="selectedFilms">
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
            <!--<span class="deleteMovie" @click="deleteMovie">取消</span>-->
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
//
  export default {
    data () {
      return {
        selectedMovie: {}
      };
    },
    created () {
      this.$http.get('/api/storemovies').then((response) => {
        response = response.body;
        this.selectedMovie = response;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.loveMovie, {
            click: true
          });
        });
      });
    }
//    methods: {
//      /**
//       * 取消收藏
//       */
//      deleteMovie (id) {
//        this.$http.delete('/article/' + id).then(function(res){
//          if(res.status==200) this.articles.splice(index,1);
//
//          if(this.articles.length<1){
//            this.getArticleList(1, this.sortby, this.sortdir, this.category, this.user, this.keyword);
//          }
//        }, function(res){
//          alert('删除文章列表： '+ res.status);
//        });
//      }
//    }
  };
</script>

<style>
  .loveMovie{
    position: absolute;
    top: 40px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .loveMovie .selectedFilms .film {
    display: flex;
    padding: 0 10px;
    height: 100px;
    border-bottom: solid 1px #7e8c8d;
  }
  .loveMovie .selectedFilms .film .filmImg {
    flex: 0 0 60px;
    margin: 10px 0;
    width: 60px;
    height: 80px;
  }

  .loveMovie .selectedFilms .film .filmDes {
    flex: 1;
    padding: 10px 6px;
  }

  .loveMovie .selectedFilms .filmDes .filmName,
  .loveMovie .selectedFilms .filmDes .filmScore {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
  }

  .loveMovie .selectedFilms .filmDes .filmStarrings {
    height: 40px;
    font-size: 14px;
    overflow: hidden;
  }

  .loveMovie .selectedFilms .filmDes .filmStarrings .starring {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    text-overflow: ellipsis;
  }

  .loveMovie .selectedFilms .filmExtra {
    flex: 0 0 40px;
  }

  .loveMovie .selectedFilms .filmExtra .deleteMovie,
  .loveMovie .selectedFilms .film .filmExtra .display {
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

  .loveMovie .selectedFilms .film .filmExtra .display a {
    color: #222;
    font-weight: 600;
  }

  .loveMovie .selectedFilms .film .filmExtra .display a:active {
    color: blue;
  }
</style>
