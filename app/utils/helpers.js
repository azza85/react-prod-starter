import axios from 'axios'

export default function getInfo(id){
  return axios.get(``)
    .then((arr) => ({data: arr.data}))
}