<template>
  <a-menu
    v-model:open-keys="openKeys"
    v-model:selected-keys="selectedKeys"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    class="menu-container"
    @click="clickMenuItem"
  >
    <template v-for="item in menus" :key="item.name">
      <menu-item :menu-info="item" />
    </template>
  </a-menu>
</template>

<script>
import { defineComponent, reactive, computed, watch, toRefs } from "vue";
import MenuItem from "./menu-item.vue";
import { useRoute, useRouter } from "vue-router";
import { routes } from "@/router";

export default defineComponent({
  name: "Menu",
  components: {
    MenuItem,
  },
  props: {
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean,
    },
  },
  setup(props) {
    // 当前路由
    const currentRoute = useRoute();
    const router = useRouter();

    // 获取当前打开的子菜单
    const getOpenKeys = () => [currentRoute.matched[1]?.name];

    const state = reactive({
      openKeys: getOpenKeys(),
      selectedKeys: [currentRoute.name],
    });

    const menus = computed(
      () => routes.find((item) => item.name == "Layout")?.children
    );
    // 监听菜单收缩状态
    watch(
      () => props.collapsed,
      (newVal) => {
        state.openKeys = newVal ? [] : getOpenKeys();
        state.selectedKeys = [currentRoute.name];
      }
    );

    // 跟随页面路由变化，切换菜单选中状态
    watch(
      () => currentRoute.fullPath,
      () => {
        if (currentRoute.name == "login" || props.collapsed) return;
        state.openKeys = getOpenKeys();
        state.selectedKeys = [currentRoute.name];
      }
    );

    // 点击菜单
    const clickMenuItem = ({ item, key, keyPath }) => {
      console.log(item, key, keyPath);
      if (/http(s)?:/.test(key)) {
        window.open(key);
      } else {
        router.push({ name: key });
      }
    };

    return {
      ...toRefs(state),
      menus,
      clickMenuItem,
    };
  },
});
</script>

<style scoped>
.menu-container {
  height: calc(100vh - 64px);
  overflow: auto;
}

.menu-container::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
