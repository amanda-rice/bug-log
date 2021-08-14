<template>
  <div class="modal fade"
       id="create-bug"
       tabindex="-1"
       role="dialog"
       aria-labelledby="create-bug"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Add Bug
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createBug">
            <div class="form-group">
              <label class="pr-2" for="bug-title">Bug Title</label>
              <input type="text"
                     id="bug-title"
                     class="form-control"
                     placeholder="Bug title..."
                     maxlength="50"
                     v-model="state.createBug.title"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="bug-description">Description</label>
              <input type="text"
                     id="bug-description"
                     class="form-control"
                     placeholder="Description..."
                     maxlength="500"
                     v-model="state.createBug.description"
              >
            </div>
            <div>
              <button v-if="state.createBug" type="submit" class="btn btn-primary mr-3">
                Save
              </button>
              <button type="button" class="btn btn-secondary closeModal" data-dismiss="modal">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import $ from 'jquery'
import Pop from '../utils/Notifier'
import { bugsService } from '../services/BugsService'
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'Component',
  setup() {
    const state = reactive({
      createBug: {}
    })

    return {
      state,
      async createBug() {
        try {
          await bugsService.createBug(state.createBug)
          state.createBug = {}
          $('#create-bug').modal('hide')
          Pop.toast('Created Project Successfully', 'success')
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