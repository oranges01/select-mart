import { ref, computed, watch } from 'vue';
import {  AddressMapType } from '@/types/index';
// 详细地址(省市区 详细地址)
import areaObj from '../../public/area.json'; 

export const   useAddress = () => {
  const areaData = areaObj as AddressMapType;
 
  // 省
  const provinceArr = Object.keys(areaData) as string[]
  const province = ref<string>(provinceArr[6])

  // 市
  const cityArr = computed(() => {
      return Object.keys(areaData[province.value]) as string[]
  })
  const city = ref<string>(cityArr.value[0])

  // 区
  const areaArr = computed(() => {
      return areaData[province.value][city.value] as string[]
  })
  const area = ref<string>(areaArr.value[0])

  // 监听省份变化
  watch(province, (newVal) => {
    city.value = Object.keys(areaData[newVal])[0] as string
  })

  // 监听市变化
  watch(city, (newVal) => {
    console.log(newVal)
      area.value = areaData[province.value][newVal][0] as string
  })
  
  // 详细地址
  const detailArea = ref<string>('')

  return {
    provinceArr,
    cityArr,
    areaArr,
    province,
    city,
    area,
    detailArea,
  }
}