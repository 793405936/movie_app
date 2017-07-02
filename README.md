# myproject

> A Vue.js project 

项目前提：项目所用电影信息是从腾讯视频抓取的，把数据保存到数据库之后，才能运行该项目。 
运行条件：mongodb、nodejs（>4.0,因为项目采用vue-cli脚手架工具进行构建，对nodejs版本有要求）。 
运行步骤： 
1. 安装依赖：npm install
2. 获取电影数据：切换到server目录运行 node crawler.js
3. 切换到项目目录运行 npm run dev
