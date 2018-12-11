import Api from './Api'

export async function getAnimes () {
  return Api.get('/animes')
}

export async function getAnimesByQuery (query) {
  return Api.get(`/animes?q=${query}`)
}

export async function getAnimeById (id) {
  return Api.get(`/animes/${id}`)
}
