export const getBreeds = async ({ $axios }) => {
  const response = await $axios.$get('/breeds/list/all')
  const { message: breeds } = response
  return breeds
}

export const getImage = async ({ $axios }, breed, subbreed) => {
  const route = subbreed
    ? `/breed/${breed}/${subbreed}/images/random`
    : `/breed/${breed}/images/random`
  const response = await $axios.$get(route)
  const { message: image } = response
  return image
}
