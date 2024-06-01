import request from '@/utils/request';

// 登录
export const loginApi = (account: string, password: string) => {
  return request({
    method: 'POST',
    url: '/login',
    data: {
      account,
      password
    }
  })
}

// 获取喜好列表
export const getLikeListApi = (limit?: number) => {
  limit = limit || 4
  return request({
    method: 'GET',
    url: '/goods/relevant',
    params: {
      limit,
    }
  })
}
