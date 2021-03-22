<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="border border-dark my-1 mx-1 p-1 ">
          <h4 v-if="state.bug">
            {{ state.bug.title }}
          </h4>
          <p>Closed: {{ state.bug.closed }}</p>
          <p>
            {{ state.bug.description }} <span><button class="btn btn-primary" @click="closeBug">Close Bug</button></span>
          </p>
        </div>
        <form class="form-inline" @submit.prevent="createNote">
          <div class="form-group">
            <input
              type="text"
              name="title"
              id="title"
              class="form-control"
              placeholder="Note Title.."
              aria-describedby="helpId"
              v-model="state.newNote.title"
            />
            <input
              type="text"
              name="body"
              id="title"
              class="form-control"
              placeholder="Note Body..."
              aria-describedby="helpId"
              v-model="state.newNote.body"
            />
          </div>
          <button class="btn btncolor text-light" type="submit">
            Add New Note
          </button>
        </form>
      </div>
    </div>
    <div class="row mt-1" v-if="state.bug">
      <Note v-for="note in state.notes"
            :key="note.id"
            :note="note"
            :bug="bug"
      >
      </note>
    </div>
  </div>
</template>
<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { useRoute, onBeforeRouteLeave, useRouter } from 'vue-router'
import { noteService } from '../services/NoteService'
import { bugService } from '../services/BugService'
export default {
  name: 'BugDetailsPage',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      bug: computed(() => AppState.activeBug),
      user: computed(() => AppState.user),
      notes: computed(() => AppState.notes),
      newNote: {}
    })
    onMounted(async() => {
      await bugService.getBug(route.params.id)
      await noteService.getNotes(route.params.id)
    })
    onBeforeRouteLeave((to, from, next) => {
      if (window.confirm('You sure bro?')) {
        AppState.activeCar = {}
        next()
      }
    })
    return {
      state,
      route,
      createNote() {
        noteService.createNote(state.newNote, route.params.id)
        state.newNote = {}
      },
      closeBug() {
        bugService.delete(state.bug.id)
        router.push({ name: 'Home' })
      }
    }
  },
  components: {}
}
</script>

    <style lang="scss" scoped>
    .btncolor{
      background-color: magenta;
    }
    </style>
