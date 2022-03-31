<template>
  <nuxt-link :class="`btn btn-${theme}`" class="block" v-if="href" :to="href">
    <slot />
  </nuxt-link>

  <button v-else :class="`btn btn-${theme}`" :type="type" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'button',
      },
      theme: {
        type: String,
        default: 'primary',
      },
      href: {
        type: String,
        required: false,
      },
    },
  }
</script>

<style lang="postcss" scoped>
  .btn {
    @apply px-10 py-2 font-display font-semibold rounded transition duration-150 ease-in-out;

    &.btn-primary {
      @apply bg-accent-light text-white;

      &:hover {
        @apply bg-accent-dark;
      }
    }
  }
</style>
