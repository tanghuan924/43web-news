<template>
  <div class="list">
    <router-link to="#">
      <div>{{label}}</div>
      <div class="tips">
        {{tips}}
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  //声明父组件personal可以接收的属性,子传父
  props: ["label", "tips"]
};
</script>

<style lang="less" scoped>
.list {
  padding: 0 20/360 * 100vw;
  height: 48/360 * 100vw;
  line-height: 48/360 * 100vw;
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #999;
    .tips {
      color: #999;
      span {
        margin-left: 3px;
      }
    }
  }
}
</style>