<template>
  <div class="hello" style="padding-top: 15%;">
    <div v-loading="statuscx" element-loading-text="加载中">
    </div>
    <div v-if="!statuscx">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark bg-purple-darkTitle">{{level}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark bg-purple-darkxq">星期{{week[itemNum-1]}}</div>
        </el-col>
      </el-row>
      <div style="width: 90%;margin: 0 auto;">
        <el-card class="box-card">
          <div v-for="(item,index) in itemDetail[itemNum-1].topic_answer" key="item.id" @click="hightClick(index,item.topic_answer_id)" :class="{current:index===hightData}" class="text item"><span>{{Letter(index)}}</span><span>{{item.answer_name}}</span>
          </div>
        </el-card>
      </div>
      <el-row>
        <el-col :span="24" style="margin-top:15px;">
          <el-button type="success" v-if="itemNum<itemDetail.length" @click="NextQuestion()">下一题</el-button>
          <el-button type="success" v-else @click="SubmitAnswer()">提交答案</el-button>
        </el-col>
      </el-row>
      <!-- 弹框组件 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
        <span>请选择答案</span>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'HelloWorld',
  data() {
    return {
      data1: 1,
      hightData: null,
      hightId: null,
      week: ["一", "二", "三", "四", "五"],
      statuscx: true,
      dialogVisible: false
    }
  },
  computed: {
    localComputed() { return this.data1++ },
    // 初始化
    ...mapState({
      'itemNum': 'itemNum', //第几题
      'level': 'level', //第几周
      'timer': 'timer', //记录正常消耗时间
      'itemDetail': 'itemDetail' //题目数据
    })
  },
  created() {
    this.Initialization();
    setTimeout(() => {
      this.statuscx = false
    }, 1000)
  },
  methods: {
    // 两种提交方式，任选其一
    //异步提交
    ...mapActions([
      'increment',
      'Initialization'
      // 'incrementBy'
    ]),
    //同步提交
    // ...mapMutations({
    //   INCREASE_IN_QUANTITY: 'INCREASE_IN_QUANTITY',
    //   zengshu: 'RECORD_THE_ANSWER',
    //   Initialization: "INITIALIZATION",
    //   // INCREASE_IN_QUANTITY:"INCREASE_IN_QUANTITY"
    // }),
    Letter(num) {
      switch (num) {
        case 0:
          return "A"
          break;
        case 1:
          return "B"
          break;
        case 2:
          return "C"
          break;
        case 3:
          return "D"
          break;
      }
    },
    hightClick(index, sum) {
      this.hightData = index;
      this.hightId = sum;
      console.log(`你选中的答案是${this.hightId}`);
    },
    NextQuestion() {
      if (this.hightData !== null) {
        this.hightData = null;
        this.increment(this.hightId);
      } else {
        this.dialogVisible = true;
      }
    },
    SubmitAnswer() {
      this.increment(this.hightId);
      clearInterval(this.timer);
      this.$router.push({ name: 'Result', params: { userId: 123 } })
    }

  }
}

</script>
<style lang="scss" scoped>
.hello {
  text-align: center;
  .k-center {
    position: absolute;
    top: 50%;
    margin-top: -10px;
  }
  .bg-purple-darkTitle {
    font-size: 30px;
    margin-bottom: 20px;
  }
  .bg-purple-darkxq {
    margin-bottom: 20px;
  }
  .el-loading-parent--relative {
    position: static!important;
  }
  .current {
    background: yellow
  }
  .item {
    padding: 18px 0;
  }
}

</style>
