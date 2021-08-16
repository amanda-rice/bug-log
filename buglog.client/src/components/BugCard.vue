<template>
  <div class="col-11 bg-light mt-1 pt-2 pb-1 rounded-lg">
    <div class="row">
      <div class="col-md-4 py-1">
        <h5 class="mobile-on"><b>Title:</b></h5>
        <div class="d-flex justify-content-center">
          <div v-if="bug.closed">
          <p title="Bug is closed">🟢</p>
        </div>
        <div v-else>
          <p title="Bug is open">🔴</p>
        </div>
          <router-link :to="{name: 'BugPage', params: {bugId: bug.id}}"
          :title="`Go to ${bug.title} details page`" 
          :aria-label="`Go to ${bug.title} details page`">
          <p class="text-dark text-wrap text-break pl-2">{{bug.title}}</p>
        </router-link>
      </div>
      </div>
      <div class="col-md-4 py-1">
        <h5 class="mobile-on"><b>Reported By:</b></h5>
        <p>{{bug.creator.name}}</p>
      </div>
      <div class="col-md-4 py-1">
        <h5 class="mobile-on"><b>Last Updated:</b></h5>
        <p>{{createdDate}}</p>
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
      async closeBug() {
        try {
          if (await Pop.confirm(title = 'Are you sure you want to close this bug?', text = "You won't be able to revert this!", icon = 'warning', confirmButtonText = 'Yes, close it!')) {
            await bugsService.closeBug(props.bug.id)
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