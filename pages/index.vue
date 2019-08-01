<template>
  <section class="section">
    <div class="hero-body">
      <app-dog-editor />
    </div>
  </section>
</template>

<script>
import DogEditor from '~/components/DogEditor'

export default {
  components: {
    appDogEditor: DogEditor
  }
}
</script>
