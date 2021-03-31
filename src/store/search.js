
import {getGoodsObj} from '@/api'
//存储数据的地方
const state = {
    goods:{}, //初始化状态数据
}
//直接改变数据的地方
const mutations = {
    RECEIVE_GOODS(state,goods){
        state.goods = goods
      }
}
//和vue组件用户交互、通知mutation修改数据
//action对象当中的方法，就是vue和vuex交互的桥梁  后期是在vue当中 dispatch
const actions = {
    async getGoods({commit},goodsparams){
        //发请求      
       
        const result = await getGoodsObj(goodsparams)
       
        if(result.code === 200){
          commit('RECEIVE_GOODS',result.data)
        }
      },

}
//getters是为了简化数据的操作而出现的，请求回来的数据，有点复杂，我们可以通过这个额简化
const getters = {
    attrsList(state){
        return state.goods.attrsList || []
    },
    goodsList(state){
        return state.goods.goodsList || []
      },
    trademarkList(state){
    return state.goods.trademarkList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
  }