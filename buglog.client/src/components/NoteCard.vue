<template>
    <div class="col-11 d-flex flex-column pt-4 pb-1 px-5 my-2 bg-light shadow border-primary rounded-lg">
      <div class="justify-content-between d-flex">
        <div class="d-flex align-items-end">
          <img class="image-circle text-break text-wrap" :src="note.creator.picture" :alt="note.creator.name">
          <p class="pl-2 text-break text-wrap"><i>{{note.creator.name}}</i></p>
        </div>
        <div>
          <i v-if="bug && account.name === note.creator.name && !bug.closed" 
          class="fa fa-times fa-lg hoverable pt-2" 
          @click="destroy"
          title="Delete Note"
          aria-label="Delete Note"
          ></i>
        </div>
      </div>
      <p class="pt-4 pb-2 text-left text-break text-wrap">{{note.body}}</p>
    </div>
</template>


<script>
import { computed, onMounted, reactive} from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { notesService } from '../services/NotesService'
import {bugsService} from '../services/BugsService'

export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      bugId: route.params.bugId,
      createNote: {
        bugId : route.params.bugId
      }
    })
    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.bugId)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      bug: computed(()=> AppState.thisBug),
       createdDate: computed(() => {
        const updated = new Date(props.note.createdAt)
        return new Intl.DateTimeFormat('en-US').format(updated)
       }),
      async destroy() {
        try {
          if (await Pop.confirm()) {
            await notesService.destroy(props.note.id)
            Pop.toast('Deleted Note Successfully', 'success')
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
img{
  height: 50px;
  width:50px;
}

</style>