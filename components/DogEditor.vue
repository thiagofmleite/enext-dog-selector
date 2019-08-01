<template>
  <div class="container">
    <section class="section">
      <div class="has-text-centered">
        <h1 class="title">Selecione o seu Cão</h1>
      </div>
    </section>
    <div class="columns">
      <div class="column" v-if="image">
        <figure class="image">
          <img class="is-rounded" :src="image" />
        </figure>
        <p :style="computedStyle">{{ name }}</p>
      </div>
      <div class="column">
        <app-field-set label="Nome">
          <input class="input" type="text" placeholder="Nome" v-model="name" />
        </app-field-set>
        <app-field-set label="Fonte">
          <app-dropdown :list="fonts" label="name" :selected="selectedFont" @select="selectFont" />
        </app-field-set>
        <app-field-set label="Cor do Texto">
          <app-dropdown :list="colors" label="name" value="color" />
        </app-field-set>
        <app-field-set label="Raça">
          <app-dropdown :list="breedList" :selected="selectedBreed" @select="selectBreed" />
        </app-field-set>
        <template v-if="hasSubBreeds">
          <app-field-set label="Sub Raça">
            <app-dropdown
              :list="subBreedList"
              :selected="selectedSubBreed"
              @select="selectSubBreed"
            />
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
    fontList() {
      return this.fonts.map(f => f.name)
    },
    hasSubBreeds() {
      if (this.selectedBreed) {
        return !!this.subBreedList.length
      }
      return false
    },
    fontFamily() {
      return this.fonts.find(f => f.name === this.selectedFont).fontFamily
    },
    computedStyle() {
      return {
        fontFamily: this.fontFamily
      }
    }
  },
  methods: {
    ...mapActions({
      getAllBreeds: 'modules/breeds/getAllBreeds'
    }),
    selectFont(font) {
      this.selectedFont = font
    },
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
      name: null,
      selectedBreed: null,
      selectedSubBreed: null,
      selectedFont: 'Roboto',
      image: null,
      colors: [
        {
          name: 'Vermelho',
          color: '#ff0000'
        },
        {
          name: 'Verde',
          color: '#00ff00'
        },
        {
          name: 'Azul',
          color: '#0000ff'
        },
        {
          name: 'Roxo',
          color: '#bd34eb'
        },
        {
          name: 'Laranja',
          color: '#eb7734'
        }
      ],
      fonts: [
        {
          name: 'Crimson Pro',
          fontFamily: "'Crimson Pro', serif"
        },
        {
          name: 'Lacquer',
          fontFamily: "'Lacquer', sans-serif"
        },
        {
          name: 'Merriweather',
          fontFamily: "'Merriweather', serif"
        },
        {
          name: 'Saira Stencil One',
          fontFamily: "'Saira Stencil One', cursive"
        },
        {
          name: 'Roboto',
          fontFamily: "'Roboto', sans-serif"
        }
      ]
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
