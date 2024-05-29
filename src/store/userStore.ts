import { defineStore } from "pinia";
import { reactive } from "vue";

export const useUserStore = defineStore('user', () =>{
  const userInfo = reactive({
    token: ''
  })
  userInfo.token = '1111'

  return {
    userInfo
  }

})