import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = 'http://localhost:3000/api'
// const API_ROOT = 'https://safe-crag-15458.herokuapp.com/api'

const responseBody = res => res.body

let token = null
const tokenPlugin = req => {
    if(token){
        req.set('authorization', `Token ${token}`)
    }
}

const requests = {
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    del: url =>
        superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody)
}

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`
const omitSlug = article => Object.assign(article, { slug: undefined })
const Articles = {
    all: page =>
        requests.get(`/articles?${limit(3, page)}`),
    get: slug =>
        requests.get(`/articles/${slug}`),
    postedBy: (username, page) =>
        requests.get(`/articles?author=${username}&${limit(3, page)}`),
    create: article =>
        requests.post('/articles', { article }),
    update: article =>
        requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
    del: slug =>
        requests.del(`/articles/${slug}`)
}

const Auth = {
    register: (username, password) =>
        requests.post('/users', { user: { username, password } }),
    login: (username, password) =>
        requests.post('/users/login', { user: { username, password } }),
    current: () =>
        requests.get('/user'),
    save: user =>
        requests.put('/user', { user })
}

const Comments = {
    forArticle: slug =>
        requests.get(`/articles/${slug}/comments`),
    create: (slug, comment) =>
        requests.post(`/articles/${slug}/comments`, { comment }),
    update: (slug, commentId, comment) =>
        requests.put(`/articles/${slug}/comments/${commentId}`, { comment }),
    delete: (slug, commentId) =>
        requests.del(`/articles/${slug}/comments/${commentId}`)
}

const Profile = {
    get: username =>
        requests.get(`/profiles/${username}`)
}

export default {
    Articles,
    Auth,
    Comments,
    Profile,
    setToken: _token => { token = _token }
}