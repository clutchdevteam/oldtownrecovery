<template>
  <section class="base-wrapper mt-4 drop-shadow-md">
    <div
      :class="`rounded-xl overflow-hidden ${
        block.isHighLight ? 'bg-primary-light text-white' : 'bg-white text-primary-light'
      }`"
    >
      <div class="w-full h-40 overflow-hidden flex items-center">
        <BaseImage :src="block.image.filename" :alt="block.image.alt" />
      </div>

      <div class="px-6">
        <BaseHeading size="h2" class="font-normal w-3/4 lg:w-1/2 py-4">
          {{ block.heading }}
        </BaseHeading>

        <BaseText v-if="block.text.length" class="font-body opacity-90 pt-2 pb-20">
          {{ block.text }}
        </BaseText>
      </div>

      <div v-if="!block.isHighLight" class="py-6"></div>

      <div v-if="!block.isHighLight" class="pb-6">
        <BaseLink
          :href="block.button[0].link.cached_url"
          class="px-6 font-display text-accent-light text-xl underline underline-offset"
        >
          {{ block.button[0].btnText }}
        </BaseLink>
      </div>
    </div>
    <div v-if="block.isHighLight" class="p-6 -mt-11">
      <BaseButton
        :href="block.button[0].link.cached_url"
        class="relative text-center btn-padding lg:inline"
      >
        {{ block.button[0].btnText }}
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

<style lang="postcss" scoped>
  .underline-offset {
    text-decoration-line: underline;
    text-underline-offset: 2px;
  }
</style>
