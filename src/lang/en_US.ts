export default {
  common: {
    Login: 'Login',
    WelcomeBack: 'Welcome Back 👋🏻',
    UserName: 'User Name',
    Password: 'Password',
    RememberMe: 'Remember Me',
    ForgotPassword: 'Forgot Password?',
    LoginIntroduce: 'Enter your account details to manage your projects',
    PhoneLogin: 'Phone Login',
    ScanPayLogin: 'Scan Pay Login',
    OtherLogin: 'Other Login',
    UserNameVerify: 'Please enter username',
    PassWordVerify: 'Please enter password',
  },

  routerNavigation: [
    {
      name: 'HomePage',
      path: 'module',
      id: '0',
      router: '/home',
      icon: 'el-icon-monitor',
    },
    {
      name: 'tips',
      path: 'tips',
      id: '1',
      router: '',
      icon: 'el-icon-s-grid',
      children: [
        {
          name: 'BarCode',
          path: 'barCode',
          id: '1-3',
          router: '/tips/barCode',
          icon: 'el-icon-c-scale-to-original',
        },
        {
          name: 'Verification Code',
          path: 'verificationCode',
          id: '1-7',
          router: '/tips/verificationCode',
          icon: 'el-icon-message',
        },
        {
          name: 'Drag',
          path: 'drag',
          id: '1-4',
          router: '/tips/drag',
          icon: 'el-icon-set-up',
        },
      ],
    },
    {
      name: 'Map',
      path: 'map',
      id: '2',
      router: '',
      icon: 'el-icon-map-location',
      children: [
        {
          name: 'El Map',
          path: 'elMap',
          id: '2-1',
          router: '/map/elMap',
          icon: 'el-icon-location',
        },
        {
          name: 'QQ Map',
          path: 'qqMap',
          id: '2-2',
          router: '/map/qqMap',
          icon: 'el-icon-place',
        },
      ],
    },
  ],
}
