<template>
  <div :class="`col-11 bg-light shadow mt-2 pt-2 pb-1 ${bug.closed?'green-border':'red-border'}`">
    <router-link :to="{name: 'BugPage', params: {bugId: bug.id}}"
    :title="`Go to ${bug.title} details page`" 
    :aria-label="`Go to ${bug.title} details page`">
    <div class="row">
      <div class="col-md-4 pb-2 pt-3">
        <h5 class="mobile-on text-dark text-wrap text-break"><b>Title:</b></h5>
        <div class="d-flex justify-content-center">
          <p class="text-dark text-wrap text-break pl-2">{{bug.title}}</p>
        </div>
      </div>
      <div class="col-md-4 pb-2 pt-3 text-dark">
        <h5 class="mobile-on text-break text-wrap"><b>Reported By:</b></h5>
        <p class="text-break text-wrap">{{bug.creator.name}}</p>
      </div>
      <div class="col-md-4 pb-2 pt-3 text-dark">
        <h5 class="mobile-on text-break text-wrap"><b>Last Updated:</b></h5>
        <p>{{createdDate}}</p>
      </div>
    </div>
  </router-link>
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
            Pop.toast('Closed Bug Successfully', 'success')
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
.green-border{
  border-left: 8px solid #558B6E;
  border-bottom: 3px solid #558B6E;
}
.red-border{
  border-left: 8px solid #CD8B76;
  border-bottom: 3px solid #CD8B76;
}
</style>