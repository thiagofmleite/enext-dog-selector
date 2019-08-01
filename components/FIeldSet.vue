<template>
  <div class="field is-horizontal">
    <div class="field-label">
      <label class="label">{{ label }}</label>
    </div>
    <div class="field-body">
      <div class="control">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: false
    }
  }
}
</script>
