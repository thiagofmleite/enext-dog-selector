<template>
  <div class="select is-rounded">
    <select v-model="model" @change="select">
      <option v-for="(item, key) in list" :key="key">{{ item }}</option>
    </select>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array | Object,
      required: true
    }
  },
  methods: {
    select($event) {
      this.$emit('select', this.model)
    }
  },
  data() {
    return {
      model: null
    }
  }
}
</script>
