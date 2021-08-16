<template>
  <div class="row justify-content-center py-1 ">
    <BugCard v-for="b in bugs" :key="b.id" :bug="b" />
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'BugThread',
  props: {
    bugs: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
</style>
