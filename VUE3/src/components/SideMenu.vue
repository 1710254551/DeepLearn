<template>
  <template v-for="item in meuns" :key="item.path">
    <!-- 遍历路由表，生成左侧菜单 -->
    <template v-if="item.children && item.children.length > 0">
      <a-sub-menu :key="item.path">
        <template #title>
          <user-outlined v-if="item.icon" />
          <span>
            {{ item.name }}
          </span>
        </template>
        <template v-for="childItem in item.children" :key="childItem.path">
          <template v-if="childItem.children && childItem.children.length > 0">
            <SideMenu :routes="[childItem]" />
          </template>
          <template v-else>
            <a-menu-item :key="childItem.path">
              <span>
                <router-link :to="childItem.path">{{
                  childItem.name
                }}</router-link>
              </span>
            </a-menu-item>
          </template>
        </template>
      </a-sub-menu>
    </template>
    <template v-else>
      <a-menu-item :key="item.path" v-if="!item.hidden">
        <user-outlined v-if="item.icon" />
        <span>
          <router-link :to="item.path">{{ item.name }}</router-link>
        </span>
      </a-menu-item>
    </template>
  </template>
</template>

<script>
import { UserOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    UserOutlined,
  },
  props: {
    routes: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return { meuns: [] };
  },

  mounted() {
    this.meuns = this.routes;
  },
};
</script>

<style lang="less">
.ant-menu-item {
  a {
    color: #ffffffa6;
  }
  a:hover {
    color: #fff;
  }
}

.ant-menu-item-selected {
  a {
    color: #fff;
  }
}
</style>
