# 优选集

优选集是一个综合性的 B2C 电商平台，基于 Vue 3 和 TypeScript 开发，提供了完整的商品浏览、选购、结算与支付功能。平台支持用户登录，提供丰富的个人中心功能，包括会员信息和会员订单查询等。

## 特性

- **技术栈**: Vue 3 + TypeScript
- **路由管理**: 使用 Vue Router 实现页面间的导航和路由管理
- **状态管理**: 使用 Pinia 状态管理库管理全局状态和响应式数据
- **UI 组件库**: 使用 ElementPlus 提供的组件（弹窗、表单、对话框等）和样式构建页面
- **工具库**: 使用 VueUse 提供的函数实现吸顶导航、页面上拉加载等功能
- **自定义功能**:
  - 自定义图片懒加载指令，有效减少页面加载时间，提升用户体验，节省带宽
  - 通过 axios 二次封装，优化接口请求流程，成功降低接口请求错误率
  - 瀑布流布局实现商品列表无限加载功能（自定义无限列表加载），提升用户浏览商品的便利性
  - 小图切换大图与放大镜效果实现，给用户良好的浏览体验
  - 监听路由变化解决路由缓存问题
  - SKU 组件封装
  - 封装面包屑导航组件、三级地址联动选择组件等

## 功能模块

- **登录功能**: 用户登录、注册、密码管理
- **首页**: 商品列表展示、商品分类导航
- **商品详情页**: 商品详细信息展示、商品选购、SKU 选择
- **购物车**: 商品结算、支付功能
- **个人中心**: 会员信息查看、会员订单管理
- **其他**: 20+ 页面、40+ 接口的封装调用

## 项目结构

```plaintext
 src/
 ├── assets/                # 静态资源
 ├── components/            # 公共组件
 │   ├── Breadcrumb         # 面包屑导航组件
 │   ├── SkuPackage         # SKU组件
 │   └── ...                # 其他组件
 ├── directives/            # 自定义指令
 │   └── lazyLoad           # 图片懒加载指令
 ├── composables/           # 自定义 hooks
 ├── views/                 # 页面组件
 │   ├── Home               # 首页
 │   ├── Login              # 登录
 │   ├── Layout             # 架子
 │   ├── CartList           # 购物车
 │   ├── Category           # 一级分类 
 │   ├── SubCategory        # 二级分类
 │   └── ...                # 其他页面
 ├── router/                # 路由配置
 │   └── index.ts
 ├── store/                 # Pinia 状态管理
 │   ├── cartStore.ts       # 购物车信息 
 │   ├── categoryStore.ts   # 分类信息
 │   └── userStore.ts       # 用户信息
 ├── utils/                 # 工具函数
 │   └── request.ts         # axios 二次封装
 ├── styles/                # 工具函数
 │   ├── element            # 自定义elementplus样式
 │   └── ...                # 项目基础样式
 ├── types/                 # 工具函数
 │   └── index.ts           # 类型管理
 ├── App.vue                # 根组件
 └── main.ts                # 入口文件

```

## 安装与使用

### 克隆仓库

```
git clone https://gitee.com/kkot_123/vue-gems.git
cd vue-gems

```

### 安装依赖并运行 

```
npm install
npm run dev

```
