import request from '@/utils/request'

// 获取订单页详情接口
export const getCheckInfoApi = () => {
  return request({
    method: 'GET',
    url: '/member/order/pre'
  })
}


// 创建订单
export const createOrderApi = (data: any) => {
  return request({
    url: '/member/order',
    method: 'POST',
    data
  })
}