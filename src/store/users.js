// import Vue from 'vue'
// import Vuex from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'
import { userLogin } from '@/api/app'
// Vue.use(Vuex)

const user = {

    state: {
      // 공통 변수
      id: '',
      loading: false
    },
  
    mutations: {
      // 동기로직 공통 함수
      SET_ID: (state, id) => {
        if(!id) return
        
        state.id = id

      },
      SET_LOADING: (state, loading) => {
        state.loading = loading
        
      }
    },

    actions: {
      // 비동기 로직 즉 통신
    
      Login({ commit }, userInfo) {
          
        // axios.post('http://localhost:3000/login', {
        //   data: userInfo
        // })
        userLogin({data:userInfo})
          .then(res => {
            console.log('==========  res  ==========')
            console.log(res);
            console.log('==========  res  ==========')
            
            // commit('SET_ID', res.data.body.email)
            commit('SET_ID', res.data.body)

            // Cookies.set('token', res.data.body.email, {expires:1})
            Cookies.set('token', res.data.body, {expires:1})

          })
          .catch(err => {
              console.log(err);
              alert(err.response.data.error)
          })
          .finally(_ => {
            // 로딩을 false로 여기서 바꾸어 준다
            commit('SET_LOADING', false)
            
          })
      }
    }
}

export default user

// export default new Vuex.Store({
//     modules: {
//       user
//     }
// })

