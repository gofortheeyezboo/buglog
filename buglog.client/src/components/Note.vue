<template>
  <div class="col-4 card mt-1 bg-darkgrey">
    <div class="card-body">
      <p class="text-color">
        {{ note.body }} <span class="float-right cursor-pointer" @click="deleteNote"><i class="fa fa-trash text-light" aria-hidden="true"></i></span>
      </p>
      <p>
        Author: {{ }}
      </p>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { reactive, computed } from 'vue'
import { noteService } from '../services/NoteService'
export default {
  name: 'Note',
  props: {
    note: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      deleteNote() {
        noteService.deleteNote(props.note.id, props.note.bug)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

.bg-darkgrey{
  background-color: rgb(19, 9, 48);
}
.text-color{
  color:ghostwhite !important
}
.cursor-pointer{
    cursor: pointer
}
</style>
