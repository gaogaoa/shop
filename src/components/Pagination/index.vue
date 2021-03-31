<template>
  <div class="pagination">
    <button :disabled="currentPageNo === 1" @click="$emit('changePageNo',currentPageNo - 1)">上一页</button>
    <!-- 当连续页的起始位置是1，那么这个1就要删掉，否则就有两个1 -->
    <!-- [] == ![] -->
    <button v-if="startEnd.start !== 1" @click="$emit('changePageNo',1)">1</button>
    <button v-if="startEnd.start > 2">···</button>

    <!-- vfor和vif如果同时使用 vfor优先级比vif要高 -->
    <button
      :class="{ active: currentPageNo === page }"
      v-for="page in startEnd.end"
      :key="page"
      v-if="page >= startEnd.start"
      @click="$emit('changePageNo',page)"
    >
      {{ page }}
    </button>

    <button v-if="startEnd.end < totalPageNo - 1">···</button>
    <button v-if="startEnd.end !== totalPageNo" @click="$emit('changePageNo',totalPageNo)">{{ totalPageNo }}</button>
    <button :disabled="currentPageNo === totalPageNo" @click="$emit('changePageNo',currentPageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPageNo: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 3,
    },
    continueNo: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    //计算总页数
    totalPageNo() {
      return Math.ceil(this.total / this.pageSize);
    },

    //计算连续页的起始位置和结束位置
    startEnd() {
      let start = 0;
      let end = 0;
      let { totalPageNo, currentPageNo, continueNo } = this;

      //先判断总页数是不是小于连续数
      if (totalPageNo <= continueNo) {
        start = 1;
        end = totalPageNo;
      } else {
        start = currentPageNo - Math.floor(continueNo / 2);
        end = currentPageNo + Math.floor(continueNo / 2);
        //当前页在左侧的时候,我们需要修正算出来的值
        if (start <= 1) {
          start = 1;
          end = continueNo;
        }
        //当前页在右侧的时候，我们也要修正算出来的值
        if (end >= totalPageNo) {
          end = totalPageNo;
          start = end - continueNo + 1;
        }
      }

      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
