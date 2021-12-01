<template>
  <el-container>
    <el-aside width="200px">
      <div :style="styleObject">121212</div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item one</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import { routes } from "./router";
import { defineComponent, onCreated } from "vue";

import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons";

export default defineComponent({
  components: {
    // Location,
    Document,
    Setting,
    IconMenu,
  },
  setup() {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    // onCreated(() => {
    //   console.log(routes);
    // });

    return {
      handleOpen,
      handleClose,
      styleObject: { height: "60px", lineHeight: "1" },
      routeConfig: routes,
    };
  },
});
</script>

<style lang="less">
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside .el-menu-vertical-demo {
  background-color: #d3dce6;
  li {
    background-color: #d3dce6;
  }
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}

#app > .el-container {
  height: calc(100vh - 16px);
}
</style>
