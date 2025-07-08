<template>
  <a-config-provider :locale="lang === 'en' ? enUS : zhCN">
    <RouterView />
  </a-config-provider>
</template>

<script setup>
import { ref, watch } from "vue";
import enUS from "ant-design-vue/es/locale/en_US.js";
import zhCN from "ant-design-vue/es/locale/zh_CN.js";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn.js";
import "dayjs/locale/en.js";
import { useI18n } from "vue-i18n";
import { i18n, loadLocaleMessages } from "@/lang/index.js";

dayjs.locale("zh-cn");
const lang = ref("zh");

const { locale } = useI18n();

watch(
  () => locale.value,
  (val) => {
    console.log(val);
    if (val === "en") {
      dayjs.locale("en-us");
      lang.value = "en";
      loadLocaleMessages(i18n, lang.value)
    } else {
      dayjs.locale("zh-cn");
      lang.value = "zh";
      loadLocaleMessages(i18n, lang.value)
    }
  },
  { deep: true }
);
</script>

<style lang="less" scoped></style>
