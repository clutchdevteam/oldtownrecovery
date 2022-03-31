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
    @apply px-5 py-1 font-display rounded transition duration-150 ease-in-out border-2 border-transparent;

    &.btn-primary {
      @apply bg-accent text-white;
    }

    &.btn-secondary {
      @apply bg-primary-dark text-white;
    }

    &:hover {
      @apply scale-105;
    }
  }

  @screen lg {
    .btn {
      @apply text-lg;
    }
  }
</style>
