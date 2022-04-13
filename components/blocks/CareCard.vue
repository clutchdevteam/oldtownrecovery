<template>
  <div class="flex flex-col mt-4 drop-shadow-md">
    <div
      :class="`mx-4 rounded-xl overflow-hidden ${
        block.isHighLight ? 'bg-primary-light text-white' : 'bg-white text-primary-light'
      }`"
    >
      <div class="w-full h-40 overflow-hidden flex items-center">
        <BaseImage :src="block.image.filename" :alt="block.image.alt" />
      </div>

      <div class="px-6">
        <BaseHeading size="h3" class="font-normal w-2/5 lg:w-11/12 py-4">
          {{ block.heading }}
        </BaseHeading>

        <BaseText v-if="block.text.length" class="font-body opacity-90 pt-2 pb-20">
          {{ block.text }}
        </BaseText>
      </div>

      <div v-if="!block.isHighLight" class="py-12"></div>

      <div v-if="!block.isHighLight" class="pb-6">
        <BaseLink
          :href="block.button[0].link.cached_url"
          class="px-6 font-display text-accent-light text-xl border-none underline underline-offset"
        >
          {{ block.button[0].btnText }}
        </BaseLink>
      </div>
    </div>
    <div v-if="block.isHighLight" class="py-6 px-10 -mt-11 lg:flex lg:justify-center">
      <BaseButton
        :href="block.button[0].link.cached_url"
        class="relative text-center block lg:inline"
      >
        {{ block.button[0].btnText }}
      </BaseButton>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CareCard',
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
