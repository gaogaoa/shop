<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body" v-for="(cartgoodsinfo, index) in cartgoodsinfolist" :key="index">
        <ul class="cart-list"  v-for="(cartInfo, index) in cartgoodsinfo.cartInfoList" :key="index">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cartInfo.isChecked"  @click="updateOneCheck(cartInfo)">
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cartInfo.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins"  @click="changeskunum( cartInfo,-1)">-</a>
            <input autocomplete="off" type="text"  minnum="1" class="itxt" :value="cartInfo.skuNum" @change="changeskunum( cartInfo,$event.target.value * 1 - cartInfo.skuNum)">
            <a href="javascript:void(0)" class="plus" @click="changeskunum( cartInfo,1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartInfo.skuPrice*cartInfo.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="delone(cartInfo.skuId)">删除</a>
            <br>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isCheckAll">
        <span >全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllChecked">删除选中的商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{checkedNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{allMoney}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import { arch } from 'os';
  export default {
    name: 'ShopCart',
    mounted(){
      this.getcatgoodslist()
    },
    data(){
      return {
      
      }
    },
    computed:{
      ...mapState({
      cartgoodsinfolist: (state) => state.cart.cartgoodsinfolist,
      
    }),
      ...mapGetters(["checkedNum", "allMoney"]),

    isCheckAll: {
      get() {
        return (
          this.cartgoodsinfolist.every((item) =>
            item.cartInfoList.every((item1) => item1.isChecked === 1)
          ) && this.cartgoodsinfolist.length > 0
        ); },
        
      async set(val) {
        let isChecked = val ? 1 : 0;
        let skuIds = [];

        this.cartgoodsinfolist.forEach((item) => {
          item.cartInfoList.forEach((item1) => {
            if (item1.isChecked !== isChecked) {
              skuIds.push(item1.skuId);
            }
          });
          // skuIds = skuIds.concat(
          //   item.cartInfoList.map((item1) => {
          //     if (item1.isChecked !== isChecked) {
          //       return item1.skuId;
          //     }
          //   })
          // );
        });

        try {
          await this.$store.dispatch("updateCartCheckedAll", {
            isChecked,
            skuIds,
          });

          alert("修改多个购物车状态成功");
          this.getcatgoodslist();
        } catch (error) {
          alert(error.message);
        }
      },
        
        }
    },
    methods:{
//点删除

async delone(skuId){
 try {
         await this.$store.dispatch("deleteOneCart", skuId);
        alert("删除一个购物车成功");
        this.getcatgoodslist();
      } catch (error) {
        alert(error.message);
      }
},
//点击删除选中的购物车
    async deleteAllChecked() {
      // let skuIds = [];
      // this.shopCartList.forEach((item) => {
      //   skuIds = skuIds.concat(
      //     item.cartInfoList.map((item1) => {
      //       if (item1.isChecked) {
      //         return item1.skuId;
      //       } 
      //     })
      //   );
      // });
      let skuIds = [];
      this.cartgoodsinfolist.forEach((item) => {
        item.cartInfoList.forEach((item1) => {
          if (item1.isChecked) {
            skuIds.push(item1.skuId);
          }
        });
      });

      try {
       await this.$store.dispatch("deleteAllCart", skuIds);
        alert("删除多个购物车成功");
        this.getcatgoodslist();
      } catch (error) {
        alert(error.message);
      }
    },
      checkall(cartgoodsinfolist){
        cartgoodsinfolist
      },
      async updateOneCheck(cartInfo){
        let isChecked = ''
       if(cartInfo.isChecked.toString() === '1'){
          isChecked = '0'
       } else{
         isChecked = '1'
       }
      try {
            const res = await this.$store.dispatch('checkCart',{skuID:cartInfo.skuId,isChecked:isChecked})
            this.getcatgoodslist()
      } catch (error) {
         alert(error)
      }
    
      },
      getcatgoodslist(){
        this.$store.dispatch('getCart')
      },
      async changeskunum( cartInfo,skunum){
              if (skunum + cartInfo.skuNum < 1) {
        // 如果最终的值是小于1，那么就让最终的值等于1  来计算变化的量
        alert('不能少于一个')
      }else{
         try {
             const res =  await this.$store.dispatch('addcart',{skuid:cartInfo.skuId,num:skunum})
         } catch (error) {
           alert(error)
         }
          this.getcatgoodslist()
        }
       }
      }
    
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }
    
          .cart-list-con1 {
            width:  15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }



          .cart-list-con4 {
            width: 10%;

          }
   
          .cart-list-con5 {
            width:17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>