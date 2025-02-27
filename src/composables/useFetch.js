import { ref } from 'vue'

export default (url) => {
  const loading = ref(false)
  const data = ref(null)
  const doFetch = async () => {
    loading.value = true
    data.value = null
    const fetch_response = await fetch(url)
    const res = await fetch_response.json()
    data.value = res
    loading.value = false
  }
  return { loading, data, doFetch }
}