<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in" appear>
      <component :is="Component"> </component>
    </transition>
  </router-view>
</template>
