<template>
  <div class="box">
    <!-- 在顶部添加导航条 -->
    <div class="top">
      <!-- $router.back()是实例下的属性，可以直接在模板中渲染 -->
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <strong>个人中心</strong>
      <!-- $router.push()是实例下的属性，可以直接在模板中渲染 -->
      <span class="iconfont iconshouye" @click="$router.push('/')"></span>
    </div>
    <div class="container">
      <!-- 头部 -->
      <div class="header">
        <!-- 头像 -->
        <div class="avatar">
          <!-- 把后台的数据渲染到页面 -->
          <!-- $axios.defaults.baseURL是后台的基地址 -->
          <!-- 渲染头像路径 -->
          <img :src="$axios.defaults.baseURL + userInfo.head_img" />
        </div>
        <!-- 姓名 -->
        <div class="profile">
          <div>
            <!-- 渲染性别图标 -->
            <!-- 性别男的图标 -->
            <span
              class="iconfont iconxingbienan"
              v-if="userInfo.gender === 1"
            ></span>
            <!-- 性别女的图标 -->
            <span
              class="iconfont iconxingbienv"
              v-if="userInfo.gender === 0"
            ></span>
            <!-- 渲染昵称 -->
            {{ userInfo.nickname }}
          </div>
          <!-- 渲染日期 -->
          <p>{{ moment(userInfo.create_date).format("YYYY-MM-DD") }}</p>
        </div>
        <!-- 右侧的箭头图标 -->
        <span class="arrow iconfont iconjiantou1"></span>
      </div>
      <!-- 列表按钮栏 利用组件实现-->
      <!-- 调用组件 -->
      <!-- :key不是报错，可以不加，
      但是vue希望给循环的元素指定“唯一的key”，所以推荐我们在循环时候都加上-->
      <List
        v-for="(item, index) in rows"
        :key="index"
        :label="item.label"
        :tips="item.tips"
      />
      <!-- handleClick点击退出按钮时候触发 -->
      <!-- click.native这个事件类型，会给List这个组件最外部的div强制绑定点击事件
			不要去跟事件传递作比较 -->
      <List @click.native="handleClick" label="退出" />
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
//导入列表按钮栏的组件
//List为组件名
import List from "@/components/List";
//引入第三方日期处理库
import moment from "moment";
export default {
  data() {
    return {
      //创建一个列表按钮的数组
      rows: [
        { label: "我的关注", tips: "关注的用户" },
        { label: "我的跟帖", tips: "跟帖回复" },
        { label: "我的收藏", tips: "文章视频" }
        // { label: "设置", tips: "" }
      ],
      //个人的详细信息,要给一个初始值
      userInfo: {},
      // moment是日期处理的工具库，为了在模板中可以使用，所以需要绑定在data中
      //原始写法:moment:moment
      moment
    };
  },
  // 注册组件,导入的子组件都必须注册才可以再模板渲染
  components: {
    List
  },
  //组件加载完毕之后出发
  mounted() {
    //由于登录成功之后就把数据存储到本地userInfo里面去了
    //进入个人中心页面之后,要把本地里面的数据渲染到页面
    //先获取本地里面的token值和id
    //从本地获取的数据是json格式的字符串要通过JSON.parse转化成对象才可以使用
    const userJson = JSON.parse(localStorage.getItem("userInfo"));
    //userJson.token和userJson.user.id是接口需要的值,其中id是接口要求的动态值
    //发起异步请求
    this.$axios({
      url: "/user/" + userJson.user.id,
      //进入页面需要进行身份验证,需要添加请求头
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      console.log(res);
      //解构出用户的数据
      const { data } = res.data;
      // 赋值给data的userInfo
      this.userInfo = data;
    });
  },
  methods: {
    //退出事件
    handleClick() {
      //点击的时候要先询问客户是否确定退出
      // 询问用户是否确定退出
      //使用vant消息确认的Dialog 弹出框
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定退出吗？"
        })
        .then(() => {
          // 点击确定时候触发的函数

          // 清除本地的存储的用户数据
          localStorage.removeItem("userInfo");
          // 跳转到登录页,必须要使用replace。因为退出不可能再返回个人中心
          this.$router.replace("/login");
        })
        .catch(() => {
          // 点击取消按钮触发的函数
        });
    }
  }
};
</script>

<style lang="less" scoped>
.top {
  line-height: 48 / 360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20 / 360 * 100vw;
  border-bottom: 1px #eee solid;
  background-color: #757575;
  .iconshouye {
    font-size: 20px;
  }
}
.bottom {
  height: 48/360 * 100vw;
  background-color: #000;
}
.container {
  background-color: #f2f2f2;
  height: 500/360 * 100vw;
}
.header {
  padding: 20 / 360 * 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 5px #eee solid;
  .avatar {
    img {
      display: block;
      width: 70 / 360 * 100vw;
      height: 70 / 360 * 100vw;
      border-radius: 50%;
      // 被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。
      object-fit: contain;
    }
  }
  .profile {
    flex: 1;
    padding-left: 20 / 360 * 100vw;
    line-height: 1.5;
    p {
      color: #999;
    }
  }
  .iconxingbienan {
    color: skyblue;
  }
  .iconxingbienv {
    color: palevioletred;
  }
}
</style>
