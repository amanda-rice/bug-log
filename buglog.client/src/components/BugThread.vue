<template>
  <div class="row justify-content-between py-1 ">
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
  },
  setup(props) {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style>
.comp-thread{
  background-color: lavender;
  box-shadow: 1px 1px 15px darkslategray;
}
</style>
