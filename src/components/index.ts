import { type App } from 'vue'

import ImageView from './ImageView/index.vue'
import GoodsSku from './SkuPackage/index.vue' 

export const componentPlugin = {
  install (app: App<Element>) {
    // app.component('组件名字'，组件配置对象)
    app.component('ImageView', ImageView)
    app.component('GoodsSku', GoodsSku)
  }
}