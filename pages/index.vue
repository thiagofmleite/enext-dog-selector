<template>
  <section class="section">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">Title</h1>
        <h2 class="subtitle">Subtitle</h2>
        <div class="field">
          <div class="control">
            <input class="input" type="text" placeholder="Normal input" />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <app-dropdown :list="breedList" @select="selectBreed" />
            <template v-if="hasSubBreeds">
              <app-dropdown :list="subBreedList" @select="selectSubBreed" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Dropdown from '~/components/Dropdown'

export default {
  components: {
    appDropdown: Dropdown
  },
  computed: {
    ...mapGetters({
      breeds: 'modules/breeds/breeds'
    }),
    breedList() {
      return Object.keys(this.breeds)
    },
    subBreedList() {
      return this.breeds[this.selectedBreed]
    },
    hasSubBreeds() {
      if (this.selectedBreed) {
        return !!this.subBreedList.length
      }
      return false
    }
  },
  methods: {
    ...mapActions({
      getAllBreeds: 'modules/breeds/getAllBreeds'
    }),
    selectBreed(breed) {
      this.selectedBreed = breed
    },
    selectSubBreed(subbreed) {
      this.selectedSubBreed = subbreed
    }
  },
  data() {
    return {
      selectedBreed: null,
      selectedSubBreed: null
    }
  },
  mounted: async function() {
    try {
      const breeds = await this.getAllBreeds()
    } catch (e) {
      console.error(e)
      this.$nuxt.error({
        message: e.message
      })
    }
  }
}
</script>
