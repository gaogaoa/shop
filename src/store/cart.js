
import {addToCart,getCart,checkCart,updateCartCheckedAll,reqDeleteOneCart,reqDeleteAllCart} from '@/api'
//存储数据的地方
const state = {
    cartgoodsinfolist : []
}
//直接改变数据的地方
const mutations = {
    RECEIVE_CARTGOODSLIST(state,cartgoodsinfolist){
        state.cartgoodsinfolist = cartgoodsinfolist   
    }
}
//和vue组件用户交互、通知mutation修改数据
//action对象当中的方法，就是vue和vuex交互的桥梁  后期是在vue当中 dispatch
const actions = {
    async addcart({commit},{skuid,num}){
        //发请求      
        const result = await addToCart(skuid,num)
        if(result.code === 200){
            return 'ok'
        }else{
        // return 'failde'
        return Promise.reject(new Error('failed'))
        }
      },
      async updateCartCheckedAll({commit},{isChecked,skuIds}){
        //发请求      
        const result = await updateCartCheckedAll(isChecked,skuIds)
        if(result.code === 200){
            return 'ok'
        }else{
        // return 'failde'
        return Promise.reject(new Error('failed'))
        }
      },
      async checkCart({commit},{skuID,isChecked}){
        //发请求      
        const result = await checkCart(skuID,isChecked)
        if(result.code === 200){
            return 'ok'
        }else{
        // return 'failde'
        return Promise.reject(new Error('failed'))
        }
      },
      //获取购物车
      async getCart({commit}){
        //发请求      
        const result = await getCart()
        if(result.code === 200){
            console.log(result.data)
            commit('RECEIVE_CARTGOODSLIST',result.data)
        }
      },

      async deleteOneCart({commit},skuId){
        const result = await reqDeleteOneCart(skuId)
        if(result.code === 200){
          return 'ok'
        }else{
          return Promise.reject(new Error('failed'))
        }
      },
    
      async deleteAllCart({commit},skuIds){
        const result = await reqDeleteAllCart(skuIds)
        if(result.code === 200){
          return 'ok'
        }else{
          return Promise.reject(new Error('failed')) 
        }
      }
    

}
//getters是为了简化数据的操作而出现的，请求回来的数据，有点复杂，我们可以通过这个额简化
const getters = {
    checkedNum(state){
        return state.cartgoodsinfolist.reduce((prev,item) => { 
          prev += item.cartInfoList.reduce((prev1,item1) => {
            if(item1.isChecked){
              prev1 += item1.skuNum
            }
            return prev1
          },0)
    
          return prev
        },0)
      },
    
      allMoney(state){
        return state.cartgoodsinfolist.reduce((prev,item) => { 
          prev += item.cartInfoList.reduce((prev1,item1) => {
            if(item1.isChecked){
              prev1 += item1.skuNum * item1.skuPrice
            }
            return prev1
          },0)
          return prev
        },0)
      },
    
}


export default {
    state,
    mutations,
    actions,
    getters
  }