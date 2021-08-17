<template>
  <div class="home container-fluid flex-grow-1 bg-dark d-flex flex-column" v-if="bug">
    <div class="row">
      <div class="col-12 pt-2 d-flex justify-content-between">
        <h1 class="text-left text-break">{{bug.title}}</h1>
        <div v-if="account && account.id && bug.creator">
          <button @click="closeBug" 
              v-if="account && account.id === bug.creator.id && !bug.closed"
              class="btn btn-primary mr-2 mobile-off"
              :title="`Close ${bug.title}`"
              :aria-label="`Close ${bug.title}`">Close Bug</button>
          <button class="btn btn-secondary mobile-off" v-if="account && account.id === bug.creator.id && !bug.closed" data-toggle="modal" data-target="#edit-bug" title="Edit This Bug">Edit</button>
        </div>
        </div>
        <div class="col-12 d-flex justify-content-start" v-if="account && account.id && bug.creator">
        <button @click="closeBug" 
              v-if="account && account.id === bug.creator.id && !bug.closed"
              class="btn btn-primary mr-2 mobile-on"
              :title="`Close ${bug.title}`"
              :aria-label="`Close ${bug.title}`">Close Bug</button>
        <button class="btn btn-secondary mobile-on" v-if="account && account.id === bug.creator.id && !bug.closed" data-toggle="modal" data-target="#edit-bug" title="Edit This Bug">Edit</button>
      </div>
      <div class="col-12" >
        <div class="row" >
          <div class="col-12 pt-3 pb-2 padding-l-s">
            <div class="row text-left justify-content-between" v-if='bug.creator'>
              <div class="col-md-6 col-lg-4 py-2 d-flex align-items-end">
                <img class="image-circle mr-2 creator-image" :src="bug.creator.picture" :alt="bug.creator.name">
                <div class="pl-2 text-break align-items-center justify-content-end">
                  <h5 class="">Reported By</h5>
                  <p class=""><em>{{bug.creator.name}}</em></p>
                </div>
              </div>
              <div class="col-6 col-md-2 d-flex py-2 flex-column lign-items-center justify-content-end pt-2">
                <h5 class="">Last Updated</h5>
                <p><em>{{new Intl.DateTimeFormat('en-US').format(new Date(bug.updatedAt))}}</em></p>
              </div>
              <div v-if="bug.closed" class="col-6 col-md-2 d-flex align-items-center justify-content-end pt-2 .ml-md-auto">
                <h2
                    class="px-2"
                    :title="`${bug.title} is closed`"
                    :aria-label="`${bug.title} is closed`">
                🟢</h2>
                <div class="text-right">
                  <h5 class=""><em>Status</em></h5>
                  <p><i>Closed</i></p>
                </div>
              </div>
              <div v-else class="col-6 col-md-2 d-flex align-items-end justify-content-end pt-2 .ml-md-auto">
                <div class="d-flex" v-if="account.name === bug.creator.name">
                    <h2 class="px-2 pb-3">🔴</h2>
                  </div>
                <h2 v-else
                    class="px-2 pb-3" 
                    :title="`${bug.title} is open`"
                    :aria-label="`${bug.title} is open`">🔴</h2>
                <div class="d-flex flex-column justify-content-end">
                  <h5 class=" "><em>Status</em></h5>
                  <p class="">Open</p>
                </div>
              </div>
              <div class="col-12 py-4"> 
                <p>{{bug.description}}</p> 
              </div>
              <div v-if="account.name && !bug.closed" class="col-12 d-flex justify-content-center">
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
                        class="btn btn-success mr-3"
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
      account: computed(() => AppState.account),
      bug: computed(()=> AppState.thisBug),
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
          if(await Pop.confirm('Are you sure you want to close this bug?', "You won't be able to revert this!", 'warning', 'Yes, close it!')){
          await bugsService.closeBug(state.bugId)
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
