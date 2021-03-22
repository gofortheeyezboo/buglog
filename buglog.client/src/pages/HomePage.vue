<template>
  <div class="container">
    <div class="row text-center">
      <div class="col" v-if="state.user.isAuthenticated">
        <form class="form-inline" @submit.prevent="createBug">
          <div class="form-group">
            <input
              type="text"
              name="title"
              id="title"
              class="form-control"
              placeholder="Title"
              aria-describedby="helpId"
              v-model="state.newBug.title"
            />
            <input
              type="text"
              name="description"
              id="description"
              class="form-control"
              placeholder="Description"
              aria-describedby="helpId"
              v-model="state.newBug.description"
            />
          </div>
          <button class="btn btn-primary" type="submit">
            Report New Bug
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <Bug v-for="bug in state.bugs"
           :key="bug.id"
           :bug="bug"
      >
      </bug>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { reactive, computed } from 'vue'
import { bugService } from '../services/BugService'
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      user: computed(() => AppState.user),
      newBug: {}
    })
    onMounted(() => {
      bugService.getBugs()
    })
    return {
      state,
      createBug() {
        bugService.createBug(state.newBug)
        state.newBug = {}
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
</style>
