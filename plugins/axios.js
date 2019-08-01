export default ({ app }) => {
  app.$axios.defaults.baseURL = 'https://dog.ceo/api'
}
