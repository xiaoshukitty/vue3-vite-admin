import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

//引入 svg 需要用到插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

//生成可视化的打包报告
import { visualizer } from 'rollup-plugin-visualizer'

//mock 插件提供方法
import { viteMockServe } from 'vite-plugin-mock'

import path from 'path'

// 加载图片预加载
import { preloadImages } from './plugins/preloadImages'

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
      //生成可视化的打包报告 需要就把里面的注释放开
      visualizer({
        // filename: 'dist/stats.html', // 指定报告文件的输出路径
        // open: true, // 构建完成后自动打开报告
      }),
      //图片预加载
      preloadImages({
        dir: 'images/*.{jpeg,png,jpg,svg,webp}',
        attrs: {
          rel: 'preload',
        },
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
      minify: 'terser', // 使用terser进行压缩
      cache: true, // 开启缓存
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境移除console
          drop_debugger: true, // 生产环境移除debugger
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString() // 将依赖拆分成单独的块
            }
          },
        },
      },
    },
    // 静态资源基础路径 base: './' || '',
    // base: '/h5', // 子目录
    base: process.env.NODE_ENV === 'production' ? './' : '/',
  }
})
