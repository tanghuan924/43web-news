import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//路由配置
const routes = [
  {
    // 除了首页之外的都可以使用懒加载
    //登录页
    path: "/login",
    // @符号代表src这个目录
    //Login.vue 后面的.vue扩展名可以省略掉
    component: () => import("@/views/Login")
  },
  {
    //注册页
    path: "/register",
    component: () => import("@/views/Register")
  },
  {
    //个人中心页
    path: "/personal",
    component: () => import("@/views/Personal")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
