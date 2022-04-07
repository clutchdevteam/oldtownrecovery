<template>
  <section
    class="inset-0 absolute h-screen w-screen bg-white z-[52] overflow-hidden flex justify-center items-center"
  >
    <div class="absolute inset-0 bg-black opacity-50" />
    <div class="z-50 text-center text-white px-6 xl:px-0">
      <img
        class="mx-auto w-32 lg:w-80"
        src="/logo_white.svg"
        alt="A stylized willow tree with the text Old Town Recovery"
      />
      <BaseHeading class="text-5xl mb-6" size="h1">Coming Soon</BaseHeading>
      <BaseText class="text-lg">Men's substance abuse treatment center</BaseText>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState('global', ['loaded']),
      // set version based on environment
      version() {
        return this.$nuxt.context.query._storyblok || this.$nuxt.context.isDev
          ? 'draft'
          : 'published'
      },
    },
    mounted() {
      this.$storybridge(
        () => {
          // eslint-disable-next-line no-undef
          const storyblokInstance = new StoryblokBridge()
          storyblokInstance.on('enterEditmode', (event) => {
            this.isProdSite && this.$fetch()
            this.getStory(event.storyId)
          })
          storyblokInstance.on(['input', 'published', 'change'], (event) => this.handleEvent(event))
        },
        (error) => {
          if (this.$nuxt.context.isDev && this.$route.query._storyblok) {
            this.logError(error)
          }
        }
      )
    },
    async fetch() {
      if (!this.loaded) {
        const globalRes = await this.$storyapi.get('cdn/stories/global', {
          version: this.version,
        })

        // set global content in vuex
        this.$store.commit('global/setGlobals', globalRes.data.story.content)
        // set loaded to true to negate uneccesary additional calls to storyblok
        this.$store.commit('global/isLoaded', true)
      }

      const fullSlug = this.$route.path === '/' ? 'home' : this.$route.path

      let res
      try {
        res = await this.$storyapi.get(`cdn/stories/${fullSlug}`, {
          version: this.version,
        })
        this.story = res.data.story
      } catch (e) {
        if (!e.response) {
          this.$nuxt.context.error({
            statusCode: 404,
            message: 'Failed to receive content from api',
          })
        } else {
          this.$nuxt.context.error({
            statusCode: e.response.status,
            message: e.response.data,
          })
        }
      }
    },
    methods: {
      encode(data) {
        return Object.keys(data)
          .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
          .join('&')
      },
      handleSubmit() {
        fetch('/', {
          method: 'post',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.encode({
            'form-name': 'contact',
            ...this.form,
          }),
        })
          .then((res, err) => {
            if (res.status === 200) {
              this.responseMessage = "Thanks for reaching out! We'll be in contact shortly!"
              this.responseState = 'success'

              this.form.name = ''
              this.form.email = ''
              this.form.phone = ''
              this.form.message = ''
            } else {
              this.responseMessage = 'Oops! Looks like something went wrong. Please try again!'
              this.responseState = 'error'
            }
          })
          .catch((e) => console.error(e))
      },
      getStory(storyId, version = 'draft') {
        return this.$storyapi
          .get(`cdn/stories/${storyId}`, {
            version: version,
          })
          .then(({ data }) => {
            this.story.content = data.story && data.story.content
          })
          .catch((error) => {
            console.error(error)
          })
      },
      handleEvent(event) {
        if (event.action === 'input') {
          if (event.story.id === this.story.id) {
            this.story.content = event.story.content
          }
        } else {
          this.$nuxt.$router.go({
            path: this.$nuxt.$router.currentRoute,
            force: true,
          })
        }
      },
    },
  }
</script>

<style lang="postcss" scoped>
  section {
    background: url(/landing-bg.jpg) no-repeat;
    background-size: cover;
    background-position: center;
  }
</style>
