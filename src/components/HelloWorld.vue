<template>
  <div class="wrap">
    <div class="hello" id="hello_baidu">
    </div>
    <div v-loading="status">
    </div>
    <div class="title-address" style="width:100%;">
      <el-row>
        <el-col :span="20">
          <el-button type="primary" icon="el-icon-location" class="locationree" disabled> 当前地址:{{positionBai}}</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" style="width:100%;border-radius:0;" @click="modify()">修改</el-button>
        </el-col>
      </el-row>
    </div>
    <router-link :to="{ name: 'Content', params: { userId: 123 }}" tag="div">
      <el-button type="primary" class="k-center">开始测试</el-button>
    </router-link>
    <!-- 更换地址 -->
    <el-dialog title="修改地址" :visible.sync="dialogVisible" width="70%">
      <el-input v-model="messageInt" placeholder="请输入新地址"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="cancel()">取 消</el-button>
    <el-button type="primary" @click="determine()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      x: "",
      y: "",
      status: true,
      messageInt: "",
      dialogVisible: false
    }
  },
  computed: {
    localComputed() { return this.data1++ },
    // 初始化
    ...mapState({
      'positionBai': 'positionBai'
    })
  },
  mounted() {
    this.fer()
  },
  methods: {
    ...mapMutations([
      "ADDRESS"
    ]),
    fer() {
      var map = new BMap.Map("hello_baidu");
      map.centerAndZoom(new BMap.Point(108.94872347625733, 34.271292416588516), 15); // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true);
      var geolocation = new BMap.Geolocation();
      var that = this;
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          // var myIcon = new BMap.Icon("../../static/images/address.png", new BMap.Size(100, 100));
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          mk.setAnimation(BMAP_ANIMATION_BOUNCE);
          console.log(that);
          that.x = r.point.lng;
          that.y = r.point.lat;
          var point = new BMap.Point(that.x, that.y);
          console.log(point);
          var url = "http://api.map.baidu.com/geocoder/v2/?location=" + that.y + "," + that.x + "&output=json&pois=1&ak=3ev032fLxNjw5R8C788XdBi1HVOAgmrQ"
          $.ajax({
            url: url,
            type: 'get',
            dataType: 'jsonp',
            jsonp: "callback",
            jsonpCallback: "success_jsonpCallback",
            success: function(data) {
              that.status = false;
              that.ADDRESS(data.result.formatted_address)
            },
            error: function() {
              that.$alert('服务器错误', '服务器错误', {
                confirmButtonText: '确定',
                callback: action => {}
              });
            }
          })
        } else {
          alert('failed' + this.getStatus());
        }
      }, { enableHighAccuracy: true })
    },
    modify() {
      this.dialogVisible = true;
    },
    cancel() {
      this.dialogVisible = false;
    },
    determine() {
      var that=this;
      that.dialogVisible = false;
      console.log(that.messageInt);
      // 百度地图API功能
      var map1 = new BMap.Map("hello_baidu");
      var point1 = new BMap.Point(108.94872347625733, 34.271292416588516);
      map1.centerAndZoom(point1, 12);
      // 创建地址解析器实例
      var myGeo = new BMap.Geocoder();
      // 将地址解析结果显示在地图上,并调整地图视野
      myGeo.getPoint(that.messageInt, function(point1) {
        if (point1) {
          map1.centerAndZoom(point1, 16);
          map1.addOverlay(new BMap.Marker(point1));
          console.log(that.messageInt);
          that.ADDRESS(that.messageInt)
          console.log(that.messageInt);
           //that.messageInt = "";
        } else {
          alert("您选择地址没有解析到结果!");
        }
      });


    }
  }
}

</script>
<style lang="scss" scoped>
.wrap {

  .hello {
    text-align: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute!important;
    margin: 0;
    font-family: "微软雅黑";
    z-index: 1;
  }

  .title-address {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2000;
  }
  .locationree{
width:100%;
border-radius:0;
overflow:hidden;
text-overflow:ellipsis;
-o-text-overflow:ellipsis;
-webkit-text-overflow:ellipsis;
-moz-text-overflow:ellipsis;
white-space:nowrap;
  }
  .k-center {
    position: absolute;
    top: 80%;
    margin-top: -10px;
    z-index: 1000;
    margin-left: -49px;
  }
  .el-loading-parent--relative {
    position: absolute!important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .el-dialog__footer {
    padding: 10px 15px 15px;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-button {

    padding: 12px 10px;

}
}

</style>
