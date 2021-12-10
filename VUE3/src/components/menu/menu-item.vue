<template>
  <template v-if="!menuInfo.meta.hidden">
    <a-sub-menu
      v-if="menuInfo.children?.length"
      :key="menuInfo.name"
      v-bind="$attrs"
    >
      <template #title>
        <span>
          <span>{{ menuInfo.meta.title }}</span>
        </span>
      </template>
      <template v-for="item in menuInfo.children" :key="item.name">
        <template v-if="!item.children">
          <a-menu-item :key="item.name">
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <menu-item :key="item.name" :menu-info="item" />
        </template>
      </template>
    </a-sub-menu>
    <template v-else>
      <a-menu-item :key="menuInfo.name">
        <span>{{ menuInfo.meta.title }}</span>
      </a-menu-item>
    </template>
  </template>
</template>

<script>
import { defineComponent } from "vue";
import { Menu } from "ant-design-vue";

export default defineComponent({
  name: "MenuItem",
  components: {
    "a-sub-menu": Menu.SubMenu,
    "a-menu-item": Menu.Item,
  },
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style scoped></style>
