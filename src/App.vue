<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
//引入图标库样式
@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css");
//引入vant
@import url("../node_modules/vant/lib/index.css");
// 公共的样式
* {
  margin: 0;
  padding: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  // inhert 继承父级样式
  color: inherit;
}
ul,
li,
ol {
  list-style: none;
}
i,
em {
  font-style: normal;
}
</style>
