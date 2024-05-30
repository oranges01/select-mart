import { defineStore } from "pinia";
import { ref } from "vue";
import { getCategoryApi } from '@/api/layout'

export const useCategoryStore = defineStore('category', () =>{

  // state
  const categoryList = ref([] as any[])

  // actions
  const getCategoryList = async () => {
    const res = await getCategoryApi()
    categoryList.value = res.result
  }


  // return
  return {
    categoryList,
    getCategoryList
  }
})