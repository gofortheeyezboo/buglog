<template>
  <div class="col-4 card mt-1 bg-darkgrey">
    <router-link :to="{name: 'BugDetails', params: { id: bug.id } }">
      <div class="card-body">
        <h4 class="card-title text-color">
          {{ bug.title }}
        </h4>
        <img :src="bug.creator ? bug.creator.picture : 'https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg'" alt="">
        <p class="text-color">
          Author: {{ (bug.creator.name) }}
        </p>
        <p class="text-color">
          {{ bug.description }}
        </p>
        <p :class="{'text-danger': bug.closed == true, 'text-success' : bug.closed == false} ">
          Closed: {{ bug.closed }}
        </p>
      </div>
    </router-link>
    <div class="z-2">
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { reactive, computed } from 'vue'
export default {
  name: 'Bug',
  props: {
    bug: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.z-2 {
  z-index: 2;
}
.bg-darkgrey{
  background-color: darkgray;
}
.text-color{
  color:ghostwhite !important
}
</style>
