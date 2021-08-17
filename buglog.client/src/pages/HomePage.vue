<template>
  <div class="home container-fluid flex-grow-1 d-flex flex-column">
    <div class="row">
      <div class="my-2 col-12 py-3 px-4">
        <div class="row justify-content-between">
          <div class="col-md-3 pb-2">
            <h2 class="text-left">Bugs</h2>
          </div>
          <div class="col-6 col-md-2">
            <button class="btn btn-outline-dark" 
            @click="filterOpen"
            :title="`Filter to ${state.isOpen?'View All':'View Open Bugs'}`" 
            :aria-label="`Filter to ${state.isOpen?'View All':'View Open Bugs'}`">
            {{state.isOpen?'View All':'View Open Bugs'}}
          </button>
        </div>
        <div class="col-6 col-md-2">
          <button v-if="account.name" class="btn btn-outline-dark" data-toggle="modal" data-target="#create-bug" title="Create New Bug">Add Bug</button>
        </div>
      </div>
      </div>
        <div class="mobile-off col-md-4 pb-2">
          <h3><b>Title</b></h3>
        </div>
        <div class="mobile-off col-md-4 pb-2">
          <h3><b>Reported By</b></h3>
        </div>
        <div class="mobile-off col-md-4 pb-2">
          <h3><b>Last Updated</b></h3>
        </div>
      <div class="col-12">
        <div v-if="state.isOpen">
          <BugThread :bugs="bugs.filter(b=> !b.closed)"/>
        </div>
          <div v-else>
            <BugThread  :bugs="bugs"/>
          </div>
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
