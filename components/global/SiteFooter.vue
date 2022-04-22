<template>
  <footer class="bg-primary-dark">
    <div class="container mx-auto flex flex-col justify-between items-center py-20">
      <div>
        <BaseImage
          class="w-56 h-auto"
          :src="footerContent.logo.filename"
          :alt="footerContent.logo.alt"
        />
      </div>

      <nav class="pt-8">
        <ul class="flex space-x-10">
          <li v-for="menu in footerContent.footerNav" :key="menu.id">
            <BaseLink :href="menu.slug.cached_url" class="text-white opacity-75 border-none">{{
              menu.title
            }}</BaseLink>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script>
  export default {
    props: {
      footerContent: {
        type: Object,
        required: true,
      },
    },
  }
</script>
