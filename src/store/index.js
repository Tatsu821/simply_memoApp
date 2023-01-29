import { createStore } from 'vuex'
import { VuexPersistence } from 'vuex-persist' //vuex-persistのおまじない

const vuexPersist = new VuexPersistence({
  storage: localStorage
})
//vuex-persistのおまじない

export default createStore({
  //データの定義
  state: {
    count: 0,
    memos: []
  },
  //データをstoreから取得
  getters: {
    getCount: (state) => {
      return state.memos.length
    },

    getAll: (state) => {
      return state.memos
    },

    getMemoById: (state) => (id) => {
      return state.memos.find(memo => memo.id === id)
    }
  },
  //データの変更・削除
  mutations: {

    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION, //vuex-persistのおまじない

    save (state, newmemo) {
      if(newmemo.id) {
        let x = state.memos.find(memo => memo.id === newmemo.id)
        x.title = newmemo.title
        x.content = newmemo.content
      }
      else {
      newmemo.id = ++state.count
      state.memos.unshift(newmemo)
      }
    },

    delete (state, id) {
      state.memos = state.memos.filter(memo => memo.id !== id)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    vuexPersist.plugin
  ] //vuex-persistのおまじない
})
