<template>
  <section class="desktop-container my-20 lg:my-28">
    <div class="grid lg:grid-cols-2 gap-12">
      <div :class="block.imageLeft ? 'order-last' : ''">
        <BaseHeading class="mb-6" size="h2">{{ block.heading }}</BaseHeading>
        <BaseRichText :content="block.text" />
      </div>
      <div>
        <BaseImage :src="block.image.filename" :alt="block.image.alt" />
      </div>
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

<style lang="postcss" scoped></style>
