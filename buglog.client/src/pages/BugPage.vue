<template>
  <div class="home container-fluid flex-grow-1 d-flex flex-column">
    <div class="row">
      <div class="my-2 col-12 p-3 d-flex justify-content-between">
        <h2 class="mx-2 text-dark">{{bug.title}}</h2>
        <i v-if="!bug.closed && account.id === bug.creator.id" 
        class="far fa-edit fa-3x hoverable"
         data-toggle="modal" 
         data-target="#edit-bug" 
        :title="`Edit ${bug.title}`" 
        :aria-label="`Edit ${bug.title}`"></i>
      </div>
      <div class="col-12">
        <div class="row" >
          <div class="col-12 pt-3 pb-2 px-5">
            <div class="row text-left justify-content-between">
              <div class="col-md-6 col-lg-4 d-flex align-items-end">
                <img class="image-circle mr-2 creator-image" :src="bug.creator.picture" :alt="bug.creator.name">
                <div class="pl-2 text-break">
                  <h5 class=""><em>Reported By</em></h5>
                  <h5 class="">{{bug.creator.name}}</h5>
                </div>
              </div>
              <div class="col-6 col-md-2 d-flex flex-column justify-content-end align-items-start pt-2">
                <h5 class=""><em>Last Updated</em></h5>
                <h5><em>{{createdDate}}</em></h5>
              </div>
              <div v-if="bug.closed" class="col-6 col-md-2 d-flex align-items-end justify-content-end pt-2 .ml-md-auto">
                <h2
                    :title="`${bug.title} is closed`"
                    :aria-label="`${bug.title} is closed`">
                🟢</h2>
                <div class="text-right">
                  <h5 class=""><em>Status</em></h5>
                  <h5>Closed</h5>
                </div>
              </div>
              <div v-else class="col-6 col-md-2 d-flex align-items-end justify-content-end pt-2 .ml-md-auto">
                <h2 @click="closeBug" 
                    v-if="account.name === bug.creator.name"
                    class="hoverable" 
                    :title="`Close ${bug.title}`"
                    :aria-label="`Close ${bug.title}`">🔴</h2>
                <h2 v-else
                    class="" 
                    :title="`${bug.title} is open`"
                    :aria-label="`${bug.title} is open`">🔴</h2>
                <div class="d-flex flex-column justify-content-end">
                  <h5 class=" "><em>Status</em></h5>
                  <h5 class="">Open</h5>
                </div>
              </div>
              <div class="col-12 py-4"> 
                <p>{{bug.description}}</p> 
              </div>
              <div v-if="account.name" class="col-12 d-flex justify-content-center">
              <form @submit.prevent="create">
                <div class="form-group">
                  <label class="" for="note-body">Add Note</label>
                  <textarea
                        id="note-body"
                        class="form-control"
                        placeholder="New note..."
                        maxlength="1000"
                        v-model="state.createNote.body"
                        required
                        title="Add text to create a new note"
                        aria-label="Add text to create a new note"
                  ></textarea>
                </div>
                <div>
                  <button v-if="state.createNote.body" 
                        type="submit" 
                        id="create-note-button"
                        class="btn btn-primary mr-3"
                        title="Submit note"
                        aria-label="Submit note">
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
  <EditBugModal/>
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
      account: computed(() => AppState.account),
      thisBug: computed(()=> AppState.thisBug),
      notes: computed(()=> AppState.notes),
      createdDate: computed(() => {
        // NOTE why doesn't this.bug work? Also, isn't updating
        let theBug = AppState.bugs.find(b => b.id === state.bugId)
        let date = theBug.updatedAt
        console.log(date, 'thebug')
        const updated = new Date(date)
        return new Intl.DateTimeFormat('en-US').format(updated)
       }),
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
    height: 10vh;
    width: 80vw;
      }
img{
  height: 150px;
  width: 150px;
}
@media only screen and (max-width: 768px) {
  img{
    height:75px;
    width:75px;
  }
}
</style>
