<template>
  <div>
  <TypeNav></TypeNav>
  <ListContainer></ListContainer>
  <Recommend></Recommend>
  <Rank></Rank>
  <Like></Like>
  <Floor v-for="(floor) in FlootList" :key="floor.id" :floor="floor"></Floor>
  </div>
  

</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import  Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import { mapState } from 'vuex';
export default {
  name: 'Home',
  components:{ListContainer,Recommend,Rank,Like,Floor},
  mounted(){
   this.getlist()

  },
  computed:{
      ...mapState({
           FlootList: (state) => state.home.flootList,
      }),},
  methods:{
    getlist(){
      this.$store.dispatch('getFlootList')
    }
 
  }
}
</script>

<style lang="less" scoped>

</style>

