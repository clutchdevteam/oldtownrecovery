<template>
  <section class="w-full">
    <InteriorTitle :block="{ title: 'Check Your Insurance' }" />

    <form class="max-w-4xl mx-auto py-20">
      <div class="grid lg:grid-cols-2 gap-12 mb-6">
        <BaseInput v-model="name" label="Name" />
        <BaseInput v-model="birthday" label="Birthday" />
      </div>

      <div class="grid lg:grid-cols-2 gap-12 mb-6">
        <BaseInput v-model="insuranceProvider" label="Insurance Provider" />
        <BaseInput v-model="memberId" label="Member ID" />
      </div>

      <div class="grid lg:grid-cols-2 gap-12 mb-6">
        <BaseInput v-model="pointOfContactName" label="Point of Contact (Name)" />
        <BaseInput v-model="pointOfContactPhone" label="Point of Contact (Phone Number)" />
      </div>

      <BaseTextarea class="mb-8" label="Additional Notes" rows="6" />

      <BaseButton class="float-right" type="submit">Submit</BaseButton>
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
          birthday: '',
          insuranceProvider: '',
          memberId: '',
          pointOfContactName: '',
          pointOfContactPhone: '',
          notes: '',
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
