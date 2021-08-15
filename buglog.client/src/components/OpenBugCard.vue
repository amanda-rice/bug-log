<template>
  <div class="row" >
    <div class="col-12 border-top border-primary pt-3 pb-2 px-5">
      <div class="row text-left justify-content-between">
        <div class="col-md-4 d-flex align-items-end">
          <img :src="bug.creator.picture" :alt="bug.creator.name">
          <div class="pl-2 text-break">
            <h5 class="text-grey">Reported By</h5>
            <h5 class="">{{bug.creator.name}}</h5>
          </div>
        </div>
        <div class="col-6 col-md-2 d-flex flex-column justify-content-end align-items-start pt-2">
          <h5 class="text-grey">Last Updated</h5>
          <h5><i>{{createdDate}}</i></h5>
        </div>
        <div v-if="bug.closed" class="col-6 d-flex align-items-end pt-2">
          <h2>🟢</h2>
          <div class="text-right">
            <h5 class="text-grey">Status</h5>
            <h5>Closed</h5>
          </div>
        </div>
        <div v-else class="col-6 d-flex align-items-end justify-content-end pt-2">
          <h2>🔴</h2>
          <div class="d-flex flex-column justify-content-end">
            <h5 class="text-grey ">Status</h5>
            <h5 class="">Open</h5>
          </div>
        </div>
        <div class="col-12 py-4"> 
          <p>{{bug.description}}</p> 
        </div>
        <div class="col-12">
          <p>Add note input</p>
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