<template>
  <div class="select is-rounded">
    <select v-model="model" @change="select">
      <option
        v-for="(item, index) in computedList"
        :key="index"
        :value="item.optionValue"
      >{{ item.optionLabel }}</option>
    </select>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false
    },
    list: {
      type: Array,
      required: true
    },
    selected: {
      type: String,
      required: false
    }
  },
  computed: {
    computedList() {
      if (this.label) {
        return this.list.map(item => {
          return {
            optionLabel: item[this.label],
            optionValue: this.value ? item[this.value] : item[this.label]
          }
        })
      }
      return this.list.map(item => {
        return {
          optionLabel: item,
          optionValue: item
        }
      })
    }
  },
  methods: {
    select($event) {
      this.$emit('select', this.model)
    }
  },
  data() {
    return {
      model: this.selected
    }
  }
}
</script>
