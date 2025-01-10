import { ref, reactive, toRefs } from 'vue'
export default function useAPI(callback) {
  const state = reactive({
    isLoading: false,
    isError: false,
    isSuccess: false,
  })
  const data = ref()

  const fetchData = async (...param) => {
    try {
      state.isError = false
      state.isSuccess = false
      state.isLoading = true

      data.value = await callback(...param)
      state.isSuccess = true
    
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      state.isError = true
    } finally {
      state.isLoading = false
    }
  }

  const execute = async (...params) => await fetchData(...params)
  return {
    execute,
    ...toRefs(state),
    data,
  }
}
