<template>
  <div>
    <template v-if="menu.submenus">
      <BaseMenuItem :menu="menu" :depth="depth + 1" :data-depth="depth" />
    </template>

    <nuxt-link
      class="block"
      v-else
      :id="menu.title.toLowerCase().replace(' ', '-')"
      :to="$formRoute({ url: menu.slug.cached_url })"
    >
      {{ menu.title }}
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    props: {
      menu: {
        type: Object,
        required: true,
      },
      depth: {
        type: Number,
        required: true,
      },
    },
  }
</script>
