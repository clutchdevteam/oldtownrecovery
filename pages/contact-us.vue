<template>
  <section class="w-full">
    <InteriorTitle :block="{ title: 'Contact Us' }" />

    <form class="relative max-w-xl mx-auto px-6 xl:px-0 py-20" @submit.prevent="handleSubmit">
      <input class="hidden" type="hidden" name="form-name" value="Contact" />

      <BaseInput v-model="form.name" label="Name" name="name" required />
      <BaseInput v-model="form.email" label="Email" name="email" type="email" required />
      <BaseInput v-model="form.phone" label="Phone" name="phone" type="tel" />

      <BaseTextarea
        class="mb-8"
        label="Message"
        name="message"
        :rows="6"
        v-model="form.message"
        required
      />

      <p class="hidden">
        <label>Don't fill this out if you're human: <input name="bot-field" /></label>
      </p>

      <BaseButton class="float-right" type="submit">Send a Message</BaseButton>

      <p
        v-if="responseMessage"
        :class="`${responseState === 'success' ? 'text-primary-light' : 'text-red-700'} text-sm `"
      >
        {{ this.responseMessage }}
      </p>
    </form>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
          phone: '',
          message: '',
        },
        responseMessage: null,
        responseState: null,
      }
    },
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
            'form-name': 'Contact',
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
