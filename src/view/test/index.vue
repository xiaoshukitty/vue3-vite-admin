<template>
    <div>
        <h1>{{ obj.tableData }}</h1>
        <h1>{{ obj.count }}</h1>
    </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'


const obj = reactive({
    tableData: [],  // 数组对象
    count: 10,      // 普通变量
})

// 使用 toRefs
// let { tableData, count } = toRefs(obj) // 把第一层对象obj 作为参数即可
obj.tableData=[1]
obj.count=11
console.log('tableData---', obj.tableData);
console.log('count---', obj.count);



// 修改数据
// 同样需要调用  .value 
// tableData.value = [1,2,3]
// count.value = 11
</script>
