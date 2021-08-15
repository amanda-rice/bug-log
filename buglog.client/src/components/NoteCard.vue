<template>
    <div class="col-12 d-flex flex-column pt-3 pb-2 px-5 border-top border-primary">
      <div class="justify-content-start align-items-center d-flex">
        <img :src="note.creator.picture" :alt="note.creator.name">
        <p class="pl-2"><i>{{note.creator.name}}</i></p>
        <button class="btn btn-primary" @click="destroy">Delete</button>
      </div>
      <p class="py-2">{{note.body}}</p>
    </div>
</template>


<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { notesService } from '../services/NotesService'

export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
       createdDate: computed(() => {
        const updated = new Date(props.note.createdAt)
        return new Intl.DateTimeFormat('en-US').format(updated)
       }),
      async destroy() {
        try {
          if (await Pop.confirm()) {
            await notesService.destroy(props.note.id)
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