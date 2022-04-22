<template>
  <section class="relative flex justify-center py-12 overflow-hidden">
    <div class="flex flex-col items-center z-20 text-white">
      <p class="text-sm" v-if="block.kicker">{{ block.kicker }}</p>
      <BaseHeading size="h2" tag="h1">{{ block.title }}</BaseHeading>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      block: {
        type: Object,
        required: true,
      },
    },
  }
</script>

<style lang="postcss" scoped>
  section {
    @apply bg-primary-dark;

    &::after {
      content: '';
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      background: url(~/static/interiorTitle-bg.png) no-repeat;
      background-size: cover;
      background-position: center;
      opacity: 0.1;
    }
  }
</style>
