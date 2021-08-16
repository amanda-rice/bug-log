<template>
  <div class="row justify-content-center">
    <NoteCard v-for="b in notes" :key="b.id" :note="b" />
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'NoteThread',
  props: {
    notes: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
</style>
