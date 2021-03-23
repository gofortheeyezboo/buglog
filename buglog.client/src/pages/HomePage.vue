<template>
  <div class="container my-1">
    <div class="row text-center">
      <div class="col" v-if="state.user.isAuthenticated">
        <form class="form-inline mb-2" @submit.prevent="createBug">
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
          <button class="btn btn-success" type="submit">
            Report New Bug
          </button>
        </form>
        <span class="cursor-pointer float-left mx-2" @click="sortByStatus">
          <i class="fa fa-chevron-down float-left" aria-hidden="true"></i> Sort By Status
        </span>
        <span class="cursor-pointer float-left mx-2" @click="filterBugsByClosed">
          <i class="fa fa-chevron-down float-left" aria-hidden="true"></i> Filter By Closed
        </span>
        <span class="cursor-pointer float-left mx-2" @click="filterBugsByOpen">
          <i class="fa fa-chevron-down float-left" aria-hidden="true"></i> Filter By Open
        </span>
        <span class="cursor-pointer float-left mx-2" @click="removeFilters">
          <i class="fa fa-chevron-down float-left" aria-hidden="true"></i> Remove Filters
        </span>
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
import { useRouter } from 'vue-router'
import { bugService } from '../services/BugService'
import { onMounted } from '@vue/runtime-core'
export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      user: computed(() => AppState.user),
      sortedBugs: computed(() => AppState.bugs.sort(function(a, b) {
        return a.closed - b.closed
      })),
      filteredBugsByClosed: computed(() => AppState.bugs.filter(b => b.closed)),
      filteredBugsByOpen: computed(() => AppState.bugs.filter(b => !b.closed)),
      newBug: {}
    })
    onMounted(() => {
      bugService.getBugs()
    })
    return {
      state,
      router,
      async createBug() {
        const bug = await bugService.createBug(state.newBug)
        state.newBug = {}
        router.push({ name: 'BugDetails', params: { id: bug.id } })
      },
      sortByStatus() {
        AppState.bugs = state.sortedBugs
      },
      async filterBugsByClosed() {
        await bugService.getBugs()
        AppState.bugs = state.filteredBugsByClosed
      },
      async filterBugsByOpen() {
        await bugService.getBugs()
        AppState.bugs = state.filteredBugsByOpen
      },
      async removeFilters() {
        await bugService.getBugs()
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
.cursor-pointer{
    cursor: pointer
}
</style>
