<template>
  <div class="mapsearch">
      <div class="header">
          <div class="title">
              <i class="icon iconfont">&#xe612;</i>
              <span>实时地图查询</span>
          </div>
          <div class="search-box">
              <input class="search-input" type="text" name="" value="">
              <button class="search-button button" type="button" name="button">进入</button>
          </div>
      </div>
      <div class="content">
         <div class="real-time-map" id="real-time-map">

         </div>
         <div class="info-box">
             <div class="user-info">
                 <table>

                 </table>
             </div>
             <div class="module-ionfo">
                 <table>

                 </table>
             </div>
         </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'mapsearch',
  created:function(){
      this.initMap();
  },
  methods: {
      initMap:function(){
        var mapOptions = {
          zoom: 16,
          center:[120.01335374840001,30.2846277638],    //定位到海创园
          resizeEnable:true
        }

        var amap = new AMap.Map('real-time-map',mapOptions);
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'],function () {
          $scope.map.addControl(new AMap.ToolBar());
          $scope.map.addControl(new AMap.Scale());
        });
      }
  }
}
</script>

<style lang="less" scoped>
    .mapsearch{
        width: 100%;
        height: 95%;
        // background-color: blue;
        padding-top: 22px;
        position: relative;
        .header{
            height: 64px;
            margin-left: 22px;
            margin-right: 22px;
            background-color: #e6e6eb;
            line-height: 64px;
            font-size: 24px;
            .title{
                margin-left: 15px;
                display: inline-block;
                .icon{
                    font-size: 28px;
                    position: relative;
                    top: 4px;
                }
                span{
                    margin-left: 5px;
                }
            }
            .search-box{
                display: inline-block;
                float: right;
                .button{
                    top: -3px;
                    left: -8px;
                }
            }
        }
        .content{
            margin-left: 22px;
            margin-right: 22px;
            background-color: red;
            height: 85%;
            .real-time-map{
                 width: 60%;
                 height: 90%;
                 background-color: #fff;
            }
        }
    }
</style>
