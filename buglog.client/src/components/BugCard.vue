<template>
  <div class="col-12 border-top border-primary pt-3 pb-2">
    <div class="row">
      <div class="col-md-3 py-1">
        <h5 class="mobile-on"><b>Title:</b></h5>
        <p>{{bug.title}}</p>
      </div>
      <div class="col-md-3 py-1">
        <h5 class="mobile-on"><b>Reported By:</b></h5>
        <p>{{bug.creator.name}}</p>
      </div>
      <div class="col-md-3 py-1">
        <h5 class="mobile-on"><b>Last Updated:</b></h5>
        <p>{{createdDate}}</p>
      </div>
      <div class="col-md-3 py-1">
        <div v-if="bug.closed">
          🟢
        </div>
        <div v-else>
          🔴
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { bugsService } from '../services/BugsService'

export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
       createdDate: computed(() => {
        const updated = new Date(props.bug.createdAt)
        return new Intl.DateTimeFormat('en-US').format(updated)
       }),
      async destroy() {
        try {
          if (await Pop.confirm()) {
            await bugsService.destroy(props.bug.id)
            Pop.toast('Deleted Project Successfully', 'success')
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>