export default {
  common: {
    Login: '登录',
    WelcomeBack: '欢迎回来 👋🏻',
    Username: '用户名',
    Password: '密码',
    RememberMe: '记住我',
    ForgotPassword: '忘记密码',
    LoginIntroduce: '请输入您的帐户信息以开始管理您的项目',
    PhoneLogin: '手机号登录',
    ScanPayLogin: '扫码登录',
    OtherLogin: '其他登录方式',
    UserNameVerify: '请输入用户名',
    PassWordVerify: '请输入密码',
  },
  routers: {
    Home: '首页',
    Tips: '组件',
    BarCode: '条形码',
    VerificationCode: '验证码',
    Drag: '原生拖拽',
    Map: '地图',
    ElMap: '高德地图',
    QqMap: 'QQ地图',
  },
  routerNavigation: [
    {
      name: '首页',
      path: 'home',
      id: '0',
      router: '/home',
      icon: 'el-icon-monitor',
    },
    {
      name: '组件',
      path: 'tips',
      id: '1',
      router: '',
      icon: 'el-icon-s-grid',
      children: [
        {
          name: '条形码',
          path: 'barCode',
          id: '1-1',
          router: '/tips/barCode',
          icon: 'el-icon-c-scale-to-original',
        },
        {
          name: '验证码',
          path: 'verificationCode',
          id: '1-2',
          router: '/tips/verificationCode',
          icon: 'el-icon-message',
        },
        {
          name: '原生拖拽',
          path: 'drag',
          id: '1-3',
          router: '/tips/drag',
          icon: 'el-icon-set-up',
        },
      ],
    },
    {
      name: '地图',
      path: 'map',
      id: '2',
      router: '',
      icon: 'el-icon-map-location',
      children: [
        {
          name: '高德地图',
          path: 'elMap',
          id: '2-1',
          router: '/map/elMap',
          icon: 'el-icon-location',
        },
        {
          name: 'QQ地图',
          path: 'qqMap',
          id: '2-2',
          router: '/map/qqMap',
          icon: 'el-icon-place',
        },
      ],
    },
  ],
}
