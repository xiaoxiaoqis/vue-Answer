/*
 * @Author: Marte
 * @Date:   2017-12-07 14:17:17
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-12-08 20:47:11
 */
const INCREASE_IN_QUANTITY = 'INCREASE_IN_QUANTITY' //改变数量
const RECORDING_TIME = 'RECORDING_TIME' //记录时间
const RECORD_THE_ANSWER = 'RECORD_THE_ANSWER' //存答案
const INITIALIZATION = 'INITIALIZATION' //初始化数据
const ADDRESS = 'ADDRESS' //初始化数据
export default {
  [INCREASE_IN_QUANTITY](state) {
    state.itemNum += 1;
    console.log(state.itemNum);
  },
  [RECORDING_TIME](state) {
    state.timer = setInterval(() => {
      state.allTime++;
    }, 1000);
  },
  [RECORD_THE_ANSWER](state, id) {
    state.answerid.push(id);
    console.log(state.answerid);
  },
  [INITIALIZATION](state) {
    state.itemNum = 1;
    state.allTime = 0;
    state.answerid = [];
  },
  [ADDRESS] (state,id1) {
    state.positionBai=id1;
    console.log(state.positionBai);
  }
}
