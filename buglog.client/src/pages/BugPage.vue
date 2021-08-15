<template>
  <div class="home container-fluid flex-grow-1 d-flex flex-column">
    <div class="row">
      <div class="my-2 col-12 p-3 d-flex justify-content-between">
        <h2 class="mx-2 text-dark">{{bug.title}}</h2>
      </div>
      <div class="col-12">
        <OpenBugCard :bug="bug"/>
      </div>
      <div class="col-12">
         <NoteThread :notes="notes"/>
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
import {notesService} from '../services/NotesService'

export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      bugId: route.params.bugId
    })
    onMounted(async() => {
      try {
        await bugsService.getBugById(state.bugId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    onMounted(async() => {
      try {
        await notesService.getNotesByBugId(state.bugId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      state,
      bug: computed(() => AppState.thisBug),
      notes: computed(()=> AppState.notes)
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
