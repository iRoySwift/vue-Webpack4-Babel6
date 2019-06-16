export default {
  changeParams(state, payload) { // payload 对象方式提交
    const sta = state;
    sta.params = payload.payload;
  }
};
