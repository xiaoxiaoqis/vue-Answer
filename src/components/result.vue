<template>
  <div class="hello">
    <el-row>
      <el-col :span="24">
      <div class="grid-content bg-purple-dark" style="font-size:30px;margin-top:30px;margin-bottom:20px;">本场总分<span style="color:red;">{{sumData}}</span></div>
        <el-rate style="margin-bottom:20px;" v-model="value5" show-text disabled text-color="#ff9900" score-template="{value}">
        </el-rate>
        <div style="margin-bottom:20px;">
          {{scoreTipsArr[value5]}}
        </div>
        <div>
          获奖地址:{{positionBai}}
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      //需要正确答案
      correct: [2, 7, 12, 13, 18],
      sumData: 0,
      value5: 0,
      scoreTipsArr: ['你说，是不是把知识都还给小学老师了？', '还不错，但还需要继续加油哦！', '不要嘚瑟还有进步的空间！', '智商离爆表只差一步了！', '你太聪明啦,坐飞船去太空吧！', '学校你不适合待了,因为老师教不了你了'],
    }
  },
  created() {
    this.finalScoring()
    this.average()
  },
  computed: {
    ...mapState([
      "answerid", "positionBai"
    ]),

  },
  methods: {
    finalScoring() {
      this.answerid.forEach((item, index) => {
        if (item === this.correct[index]) {
          this.sumData += 20;
        }
      })
    },
    average() {
      this.value5 = (this.sumData / 20)
    }

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
  text-align: center;
  .k-center {
    position: absolute;
    top: 50%;
    margin-top: -10px;
  }
}

</style>
