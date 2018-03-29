/*
 * @Author: Marte
 * @Date:   2017-12-07 14:17:39
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-12-07 18:06:18
 */
export default {

  increment({ commit, state },id) {
    //保存答案
    commit('RECORD_THE_ANSWER',id);
    //如果itemNum小于数组的个数,表示继续下一题
    if (state.itemNum < state.itemDetail.length) {

      commit('INCREASE_IN_QUANTITY');

    }

  },
  Initialization({ commit }) {
    commit('INITIALIZATION');
  }

}
