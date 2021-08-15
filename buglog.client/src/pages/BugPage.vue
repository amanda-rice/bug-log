<template>
  <div class="home container-fluid flex-grow-1 d-flex flex-column">
    <div class="row">
      <div class="my-2 col-12 p-3 d-flex justify-content-between">
        <h2 class="mx-2 text-dark">{{bug.title}}</h2>
      </div>
      <div class="col-12">
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
                <h2 @click="closeBug" title="Close Bug">🔴</h2>
                <div class="d-flex flex-column justify-content-end">
                  <h5 class="text-grey ">Status</h5>
                  <h5 class="">Open</h5>
                </div>
              </div>
              <div class="col-12 py-4"> 
                <p>{{bug.description}}</p> 
              </div>
              <div class="col-12">
              <form @submit.prevent="create">
                <div class="form-group">
                  <label class="pr-2" for="note-body">Add Note</label>
                  <textarea
                        id="note-body"
                        class="form-control"
                        placeholder="New note..."
                        maxlength="1000"
                        v-model="state.createNote.body"
                  ></textarea>
                </div>
                <div>
                  <button v-if="state.createNote.body" type="submit" class="btn btn-primary mr-3">
                    Save Note
                  </button>
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>
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
      bugId: route.params.bugId,
      createNote: {
        bugId : route.params.bugId
      }
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
      bug: computed(() => AppState.bugs.find(b => b.id === state.bugId)),
      notes: computed(()=> AppState.notes),
      async create() {
        try {
          await notesService.createNote(state.createNote)
          state.createNote = {bugId : state.bugId}
          Pop.toast('Created Note Successfully', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async closeBug(){
        try {
          if(await Pop.confirm())
          await bugsService.closeBug(state.bugId)
          Pop.toast('Closed Bug Successfully', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
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
textarea {
        width: 90vw;
        height: 10vh;
      }
</style>
