<template>
  <div class="home container-fluid flex-grow-1 d-flex flex-column">
    <div class="row">
      <div class="my-2 col-12 p-3 d-flex justify-content-between">
        <h2 class="mx-2">Bugs</h2>
        <button v-if="account.name" class="btn btn-primary" data-toggle="modal" data-target="#create-bug" title="Create New Bug">Add Bug</button>
      </div>
        <div class="mobile-off col-md-3 border-bottom pb-2">
          <h4><b>Title</b></h4>
        </div>
        <div class="mobile-off col-md-3 border-bottom pb-2">
          <h4><b>Reported By</b></h4>
        </div>
        <div class="mobile-off col-md-3 border-bottom pb-2">
          <h4><b>Last Updated</b></h4>
        </div>
        <div class="mobile-off col-md-3 border-bottom pb-2">
          <h4 @click="filterOpen"><b>Sort</b></h4>
        </div>
      <div class="col-12">
        <BugThread v-if="state.isOpen" :bugs="bugs.filter(b=> !b.closed)"/>
        <BugThread v-else :bugs="bugs"/>
      </div>
    </div>
  </div>
  <AddBugModal/>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import {bugsService} from '../services/BugsService'

export default {
  setup() {
    const state = reactive({
      isOpen: false
    })
    onMounted(async() => {
      try {
        await bugsService.getAll()
        await bugsService.getOpen()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      state,
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs),
      filterOpen(){
        state.isOpen = !state.isOpen
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
