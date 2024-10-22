import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

//引入 svg 需要用到插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

//mock 插件提供方法
import { viteMockServe } from 'vite-plugin-mock'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig((command, mode) => {
  // 获取各种环境下对应的变量
  let env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve', //提供开发阶段mock使用的接口
        mockPath: './moke',
      }),
    ],

    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },

    // scss 全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    // 代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据服务器地址
          target: 'VITE_SERVE',
          // 是否代理跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    // 构建输出配置
    build: {
      outDir: './dist',
      target: 'modules', // 兼容性配置
      assetsDir: 'assets',
      assetsInlineLimit: 360000,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    // 静态资源基础路径 base: './' || '',
    // base: '/h5', // 子目录
    base: process.env.NODE_ENV === 'production' ? './' : '/',
  }
})
