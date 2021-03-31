<template>
<div>

<Header></Header>
<router-view></router-view> 
<Footer v-show="!$route.meta.isyincang"></Footer>

 </div>
</template>

<script>

import Footer from '@/components/Footer'
import Header from '@/components/Header'
export default {
  name: 'App',
 components:{Footer,Header},
 mounted(){
    this.$store.dispatch('getCategoryList')
 }
}
</script>

<style lang="less" scoped>

</style>
