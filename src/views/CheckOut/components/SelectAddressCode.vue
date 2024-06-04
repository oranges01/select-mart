<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue';
import { AddressMapCodeType } from '@/types/index';

// 详细地址(省市区 详细地址)
import areaObj from '../../../../public/area-c.json'; 


// 传入的参数
const props = defineProps({
  form: {
    type: Object,
    default: () => {}
  }
})

// 触发事件
const emit = defineEmits(['change']);

// 省市区数据
const areaData = areaObj as AddressMapCodeType[];

// 省
const provinceArr = areaData.map(item => item.name)
const province = ref<string>(provinceArr[0])
const provinceCode = computed(() => {
  return areaData.find(p => p.name === province.value)?.code || ''
})

// 市
const cityArr = computed(() => {
  const selectedProviceItem = areaData.find(p => p.name === province.value)
  return selectedProviceItem ? selectedProviceItem.children?.map(item => item.name) || [] : []
})
const city = ref<string>(cityArr.value[0])
const cityCode = computed(() => {
  const selectedCityItem = areaData.find(p => p.name === province.value)?.children?.find(c => c.name === city.value)
  return selectedCityItem?.code || ''
})

// 区
const areaArr = computed(() => {
  const selectedProvinceItem = areaData.find(p => p.name === province.value);
  const selectedCityItem = selectedProvinceItem?.children?.find(c => c.name === city.value);
  return selectedCityItem ? selectedCityItem.children?.map(area => area.name) || [] : [];
});
const area = ref<string>(areaArr.value[0])
const areaCode = computed(() => {
  const selectedAreaItem = areaData.find(p => p.name === province.value)?.children?.find(c => c.name === city.value)?.children?.find(a => a.name === area.value)
  return selectedAreaItem?.code || ''
})

// 详细地址
const detailArea = ref<string>('')


// 监听表单数据变化
watchEffect(() => {
  province.value = props.form.province;
  city.value = props.form.city;
  detailArea.value = props.form.detail;
});

// 监听省份变化
watchEffect(() => {
  city.value = areaData.find(p => p.name === province.value)?.children?.map(item => item.name)[0] || '';
  // 省变了--表单显示的市、区要清空
  emit('change', {flag:1, provinceCode: provinceCode.value, cityCode: '', areaCode: ''})
});

// 监听市变化
watchEffect(() => {
    area.value = areaData.find(p => p.name === province.value)?.children?.find(c => c.name === city.value)?.children?.map(area => area.name)[0] || '';
    // 市变了--表单显示的区要清空
    emit('change', {flag:2, provinceCode: provinceCode.value, cityCode: cityCode.value, areaCode: ''})
});

// 监听区变化
watchEffect(() => {
    // 区变了--表单显示的详细地址要清空
    emit('change', {flag:3, provinceCode: provinceCode.value, cityCode: cityCode.value, areaCode: areaCode.value})
});



</script>

<template> 
  <el-form ref="form" :model="form" label-width="120px">
    <el-row>
      <el-select v-model="form.province" placeholder="请选择省" >
        <el-option v-for="item in provinceArr" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select v-model="form.city" placeholder="请选择市">
        <el-option v-for="item in cityArr" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select v-model="form.area" placeholder="请选择区">
        <el-option v-for="item in areaArr" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-input placeholder="详细地址" v-model="form.detail" style="width:200px;"></el-input>
    </el-row>
  </el-form>

</template>

<style lang="scss" scoped>
.el-row {
  display: inline;
}

.el-row {
  display: inline-flex;
  flex: auto;

  .el-select {
    margin: 0 20px 0 0;
    width: 160px;
  }
}

</style>