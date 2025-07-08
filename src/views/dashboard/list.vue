<template>
  <div>
    <div class="search">
      <a-form ref="formRef" class="ant-advanced-search-form" :model="formState">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item
              label="规则名称"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input v-model:value="formState.name" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="描述"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input v-model:value="formState.name" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              v-if="searchCollapse"
              label="服务调用次数"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item v-else label="" :wrapper-col="{ span: 16, offset: 8 }">
              <div>
                <a-button style="margin-right: 12px" @click="handleReset">{{
                  t("btn.reset")
                }}</a-button>
                <a-button
                  type="primary"
                  style="margin-right: 12px"
                  @click="handleSearch(1)"
                  >{{ t("btn.search") }}</a-button
                >
                <a @click="searchCollapse = !searchCollapse">
                  {{ searchCollapse ? "收起" : "展开" }}
                  <UpOutlined v-if="searchCollapse" />
                  <DownOutlined v-else />
                </a>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row v-if="searchCollapse" :gutter="24">
          <a-col :span="8">
            <a-form-item
              label="状态"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-select v-model:value="formState.status">
                <a-select-option
                  v-for="{ label, value } of statusList"
                  :value="value"
                  >{{ label }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="上次调度时间"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-input v-model:value="formState.name" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="" :wrapper-col="{ span: 16, offset: 8 }">
              <div>
                <a-button style="margin-right: 12px" @click="handleReset">{{
                  t("btn.reset")
                }}</a-button>
                <a-button
                  type="primary"
                  style="margin-right: 12px"
                  @click="handleSearch(1)"
                  >{{ t("btn.search") }}</a-button
                >
                <a @click="searchCollapse = !searchCollapse">
                  {{ searchCollapse ? "收起" : "展开" }}
                  <UpOutlined v-if="searchCollapse" />
                  <DownOutlined v-else />
                </a>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="content">
      <a-table :data-source="tableData" :pagination="false">
        <a-table-column title="规则名称" data-index="name"></a-table-column>
        <a-table-column title="描述" data-index="desc"></a-table-column>
        <a-table-column title="创建人" data-index="owner"></a-table-column>
        <a-table-column
          title="服务调用次数"
          data-index="callNo"
        ></a-table-column>
        <a-table-column title="状态" data-index="status">
          <template #default="{ record }">
            <a-badge
              v-if="record.status === '0'"
              status="default"
              text="关闭"
            />
            <a-badge
              v-else-if="record.status === '1'"
              status="processing"
              text="运行中"
            />
            <a-badge
              v-else-if="record.status === '2'"
              status="success"
              text="已上线"
            />
            <a-badge
              v-else-if="record.status === '3'"
              status="error"
              text="异常"
            />
          </template>
        </a-table-column>
        <a-table-column title="创建时间" data-index="createdAt">
          <template #default="{ record }">
            {{ formatDateTime(record.createdAt, "dateTime") }}
          </template>
        </a-table-column>
        <a-table-column title="上次调度时间" data-index="updatedAt">
          <template #default="{ record }">
            {{ formatDateTime(record.updatedAt, "dateTime") }}
          </template>
        </a-table-column>
        <a-table-column title="操作" data-index="tags">
          <a-button type="link">配置</a-button>
          <a-button type="link">订阅警报</a-button>
        </a-table-column>
      </a-table>
      <Pagination
        :current
        :pageSize
        :total
        @change="handleChange"
        @show-size-change="handleShowSizeChange"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
import Pagination from "@/components/pagination.vue";
import { formatDateTime } from "@/utils/utils";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";

const { t } = useI18n();

const statusList = reactive([
  { label: "关闭", value: "0" },
  { label: "运行中", value: "1" },
  { label: "已上线", value: "2" },
  { label: "异常", value: "3" },
]);

const formState = reactive({
  ruleName: "",
  description: "",
  invocationsNum: 0,
  status: "",
  schedulingTime: "",
});
const searchCollapse = ref(false);

const current = ref(1);
const pageSize = ref(10);
const total = ref(0);
const tableData = ref();

function handleReset() {
  formState.ruleName = "";
  formState.description = "";
  formState.invocationsNum = 0;
  formState.status = "";
  formState.schedulingTime = "";
}

function handleSearch(curr) {
  if (curr) current.value = curr;
  const params = {
    ruleName: formState.ruleName,
    description: formState.description,
    invocationsNum: formState.invocationsNum,
    status: formState.status,
    schedulingTime: formState.schedulingTime,
    current: current.value,
    pageSize: pageSize.value,
  };
  axios
    .get("/admin/v1/rule", {
      params: params,
    })
    .then((res) => {
      const { success, data, total: totals } = res.data;
      if (success) {
        tableData.value = data;
        total.value = totals;
      }
    });
}
handleSearch();

function handleChange(page) {
  current.value = page;
  handleSearch();
}

function handleShowSizeChange(size) {
  pageSize.value = size;
  handleSearch();
}
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  padding: 32px 24px 0;
}
.content {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  margin-top: 24px;
}
</style>
