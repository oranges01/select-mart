// axios基础的封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/userStore'

// 创建axios实例
const request = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})


// axios请求拦截器
request.interceptors.request.use(config => {
  // 1. 从pinia获取token数据
  const userStore = useUserStore()
  // 2. 按照后端的要求拼接token数据
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
request.interceptors.response.use(res => res.data, e => {
  // 统一错误提示
  ElMessage({
    type: 'warning',
    message: e.response && e.response.data && e.response.data.message ? e.response.data.message : 'An unknown error occurred'
  })
  return Promise.reject(e)
})


export default request