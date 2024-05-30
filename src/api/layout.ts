import request from '@/utils/request';

// 获取产品分类
export const getCategoryApi = () => {
  return request({
    method: 'GET',
    url: '/home/category/head'
  })
}