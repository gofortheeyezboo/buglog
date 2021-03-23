<template>
  <div class="col-4 card my-1 bg-darkgrey text-color">
    <div class="card-body">
      <h5>
        Note:
      </h5>
      <p>
        {{ note.body }} <span class="float-right cursor-pointer" @click="deleteNote"><i class="fa fa-trash text-light" aria-hidden="true"></i></span>
      </p>
      <img :src="note.creator ? note.creator.picture : 'https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg'" alt="">
      <p>
        Author: {{ note.creator.name }}
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
        if (window.confirm('Are You Sure?')) {
          noteService.deleteNote(props.note.id, props.note.bug)
        }
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
