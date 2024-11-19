import { reqLogin } from './../src/api/user/index'
import type { Plugin } from 'vite'

//用来读取文件夹中的文件 也可以用 node 中的 fs 模块
import fg from 'fast-glob'
interface PreloadImagesOptions {
  dir: string
  attrs: {
    rel: 'preload' | 'prefetch'
  }
}
export const preloadImages = (options: PreloadImagesOptions): Plugin => {
  //根据传递来的是 preload 或则 prefetch
  const { dir, attrs = {} } = options
  return {
    name: 'vite-plugin-image-prefetch',
    transformIndexHtml(html, ctx) {
      //读取传递过来的文件
      const files = fg.sync(dir, {
        cwd: ctx.server?.config.publicDir, //根据是否有传递过来的打包目录来读取文件
      })

      // vite.config 中是否有配置 base 有就还要 +上 base 路径
      const images = files.map((file) => ctx.server?.config.base + file)

      return images.map((href) => {
        return {
          tag: 'link',
          attrs: {
            rel: 'prefetch', //预加载  prefetch(优先级低，需要等到页面空闲才加载，下次使用的话会再次请求，不过返回是让你走缓存的数据) | preload(优先级高，会存到内存中去(不是http缓存)，下次使用的时候直接从内存中读取，不会再次请求)
            href: href,
            as: 'image', //资源图片
            ...attrs,
          },
        }
      })
    },
  }
}
