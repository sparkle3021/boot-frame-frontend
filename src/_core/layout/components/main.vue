<script setup>
</script>

<template>
  <div class="app-main">
    <div class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>