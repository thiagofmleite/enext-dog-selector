<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <figure class="image" v-if="image">
          <img class="is-rounded" :src="image" />
        </figure>
      </div>
      <div class="column">
        <app-field-set label="Nome">
          <input class="input" type="text" placeholder="Normal input" />
        </app-field-set>
        <app-field-set label="Raça">
          <app-dropdown :list="breedList" @select="selectBreed" />
        </app-field-set>
        <template v-if="hasSubBreeds">
          <app-field-set label="Sub Raça">
            <app-dropdown :list="subBreedList" @select="selectSubBreed" />
          </app-field-set>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { getImage } from '~/services/breeds'
import FieldSet from '~/components/FieldSet'
import Dropdown from '~/components/Dropdown'

export default {
  components: {
    appFieldSet: FieldSet,
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
      this.selectedSubBreed = null
      this.image = null
      this.selectedBreed = breed
      if (!this.hasSubBreeds) {
        this.fetchImage()
      }
    },
    selectSubBreed(subbreed) {
      this.selectedSubBreed = subbreed
      this.fetchImage()
    },
    async fetchImage() {
      console.info('fetching image')
      try {
        this.image = await getImage(
          this,
          this.selectedBreed,
          this.selectedSubBreed
        )
      } catch (e) {
        console.error(e)
      }
    }
  },
  data() {
    return {
      selectedBreed: null,
      selectedSubBreed: null,
      image: null
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
