<template>
  <section class="flex flex-col items-center base-wrapper desktop-container pt-14">
    <BaseHeading size="h2" class="text-primary-dark mb-4"> {{ block.heading }} </BaseHeading>
    <div class="flex flex-col lg:flex-row">
      <CareCard
        v-for="card in block.cards"
        :key="card._uid"
        :block="card"
        :class="`flex flex-col lg:w-1/3 ${card.isHighLight ? 'high-light-placement' : ''}`"
      />
    </div>
  </section>
</template>

<script>
  import CareCard from '~/components/blocks/CareCard'

  export default {
    name: 'ThreeUpCard',
    components: {
      CareCard,
    },
    props: {
      block: {
        type: Object,
        required: true,
      },
    },
  }
</script>

<style lang="postcss" scoped>
  @media (max-width: 1023px) {
    .high-light-placement {
      @apply order-last;
    }
  }
</style>
