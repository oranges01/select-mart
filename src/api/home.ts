import request from '@/utils/request';

// 获取产品分类
export const getBannerApi = () => {
  return request({
    method: 'GET',
    url: 'home/banner'
  })
} 

// 获取优选集萃
export const getNewApi = () => {
  return request({
    method: 'GET',
    url: '/home/new'
  })
}

// 获取热门商品
export const getHotApi = () => {
  return request({
    method: 'GET',
    url: '/home/hot'
  })
}

// 获取所有商品
export const getGoodsApi = () => {
  return request({
    method: 'GET',
    url: '/home/goods'
  })
}