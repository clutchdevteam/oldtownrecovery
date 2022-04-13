<template>
  <section class="base-wrapper relative my-20 lg:my-28">
    <div
      :class="`flex flex-col items-center max-w-4xl mx-auto text-center border-2 border-secondary rounded-lg py-6 px-6 lg:py-8 lg:px-20 ${
        block.button ? 'pb-8 lg:pb-12' : 'pb-6 lg:pb-8'
      }`"
    >
      <BaseHeading size="h3" tag="h2">{{ block.text }}</BaseHeading>

      <BaseButton
        v-if="block.button.length"
        class="absolute bottom-0 -mb-4"
        :href="block.button[0].link.cached_url"
      >
        {{ block.button[0].text }}
      </BaseButton>
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
