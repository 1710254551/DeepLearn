<template>
  <template v-for="(item, index) in menuList" :key="index">
    <!-- 遍历路由表，生成左侧菜单 -->
    <template v-if="item.children && item.children.length > 0">
      <a-sub-menu>
        <template #title>
          <span>
            <user-outlined />
            {{ item.name }}
          </span>
        </template>

        <a-menu-item
          v-for="childItem in item.children"
          :key="item.children + '/' + childItem.path"
          >{{ childItem.name }}</a-menu-item
        >
      </a-sub-menu>
    </template>
    <template v-else>
      <a-menu-item>
        <span>{{ item.name }}</span>
      </a-menu-item>
    </template>
  </template>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  setup() {
    onMounted(() => {});

    return {};
  },
});
</script>
