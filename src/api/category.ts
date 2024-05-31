import request from '@/utils/request'

// 获取分类数据
export const getTopCategoryApi = (id: string | string[]) => {
  return request({
    url:'/category',
    params:{
      id
    }
  })
}

// 获取二级分类列表数据
export const getCategoryFilterApi = (id : string | string[]) => {
  return request({
    method:'GET',
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}

// 分类基础列表实现
/**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
interface GoodListData {
  categoryId: string | string[],
  page: number,
  pageSize: number,
  sortField: string
}
export const getSubCategoryApi = (data : GoodListData)=> {
  return request({
    url:'/category/goods/temporary',
    method:'POST',
    data
  })
}