<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="border border-dark my-1 mx-1 p-1 ">
          <img :src="state.bug.creator ? state.bug.creator.picture : 'https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg'" alt="">
          <h4 v-if="state.bug">
            {{ state.bug.title }}
          </h4>
          <p>
            Author: {{ state.bug.creator ? state.bug.creator.name : 'NoAuthor' }}
          </p>
          <p>Closed: {{ state.bug.closed }}</p>
          <p>
            {{ state.bug.description }} <span><button class="btn btn-success" @click="closeBug">Close Bug</button></span>
          </p>
          <div v-if="state.bug.creator">
            <form class="form-inline" v-if="state.bug.creator.email == state.user.email" @submit.prevent="editBug">
              <div class="form-group">
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control"
                  placeholder="Title"
                  aria-describedby="helpId"
                  v-model="state.bug.title"
                />
                <input
                  type="text"
                  name="description"
                  id="description"
                  class="form-control"
                  placeholder="Description"
                  aria-describedby="helpId"
                  v-model="state.bug.description"
                />
              </div>
              <button class="btn btn-success" type="submit">
                Save Changes to Bug
              </button>
            </form>
          </div>
        </div>
        <form class="form-inline" @submit.prevent="createNote">
          <input
            type="text"
            name="body"
            id="title"
            class="form-control"
            placeholder="Note Body..."
            aria-describedby="helpId"
            v-model="state.newNote.body"
          />
          <button class="btn btn-success text-light" type="submit">
            Add New Note
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Note v-for="note in state.notes"
              :key="note.id"
              :note="note"
              :bug="bug"
        >
        </note>
      </div>
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
      },
      editBug() {
        bugService.editBug(state.bug.id, state.bug)
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
