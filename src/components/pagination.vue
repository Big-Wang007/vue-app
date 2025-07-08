<template>
  <div class="custom-pagination">
    <a-pagination
      :current="current"
      :page-size="pageSize"
      :total="total"
      :show-total="(total) => `Total ${total} items`"
      
      show-quick-jumper
      @change="change"
      @showSizeChange="showSizeChange"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  current: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 20,
  },
  total: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["change", "show-size-change"]);

function change(page, pageSize) {
  emit("change", page);
}

function showSizeChange(current, size) {
  emit("showSizeChange", size);
}
</script>

<style lang="less" scoped>
.custom-pagination {
  margin-top: 24px;
  text-align: right;
  position: relative;
  :deep(.ant-pagination-total-text) {
    position: absolute;
    left: 0;
  }
}
</style>
