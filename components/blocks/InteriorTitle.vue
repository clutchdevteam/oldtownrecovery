<template>
  <section class="relative bg-primary-dark flex justify-center py-16 overflow-hidden">
    <img
      class="absolute z-10 inset-0 opacity-10 object-center top-[-100%]"
      src="/interiorTitle-bg.png"
      alt=""
    />
    <div class="flex flex-col items-center">
      <p class="text-white" v-if="block.kicker">{{ block.kicker }}</p>
      <BaseHeading size="h1" class="text-white z-20">{{ block.title }}</BaseHeading>
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

<style lang="scss" scoped></style>
