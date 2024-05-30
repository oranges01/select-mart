// 定义懒加载插件

import { type App, DirectiveBinding } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install (app: App<Element>) {
    // 懒加载指令逻辑
    app.directive('img-lazy', {
      mounted (el: HTMLImageElement, binding: DirectiveBinding<string>) {
        // el: 指令绑定的元素  img
        // binding: 指令绑定的数据对象（指令名称等号后面的值）  图片的url
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            console.log(isIntersecting)
            if (isIntersecting) {
              // 进入视口区域
              el.src = binding.value
              stop()
            }
          },
        )
      }
    })
  }
}
