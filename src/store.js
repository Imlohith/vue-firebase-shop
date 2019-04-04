import Vue from "vue";
import Vuex from "vuex";
const fb = require("./firebase");

Vue.use(Vuex);

// handle page reload
fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit("setCurrentUser", user);
    console.log(user.email);
    store.dispatch("fetchUserProfile");

    fb.usersCollection.doc(user.uid).onSnapshot(doc => {
      store.commit("setUserProfile", doc.data());
    });

    // fb.productsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
  
    //   let productsArray = []
    //     querySnapshot.forEach(doc => {
    //       let product = doc.data();
    //       product.id = doc.id
    //       productsArray.push(product)
    //     })
    //     console.log(productsArray)
    //     store.commit('setPosts', productsArray)
    // })
    fb.productsCollection.where('userId', '==' , user.uid).onSnapshot(querySnapShot => {
      let productsArray = [];
      querySnapShot.forEach(doc => {
        if(doc.data()){
          let product = doc.data()
          product.id = doc.id;
          productsArray.push(product)
          store.commit('setPosts', productsArray)
        } 
      })
    })
  }
});

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    products: [],
    userProfile: {},
    hiddenPosts: [],
    loading: false,
  },
  actions: {
    clearData({commit}){
      commit('setCurrentUser' , null)
    },
    fetchUserProfile({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          commit("setUserProfile", res.data());
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchProducts({ commit, state }) {
      fb.productsCollection.doc(state.currentUser.uid).get();
    }
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setLoading(state, val) {
      state.loading = val;
    },
    setPosts(state, val) {
      if (val) {
        state.products = val;
      } else {
        state.products = [];
      }
    },
    setHiddenPosts(state, val) {
      if (val) {
        // make sure not to add duplicates
        if (!state.hiddenPosts.some(x => x.id === val.id)) {
          state.hiddenPosts.unshift(val);
        }
      } else {
        state.hiddenPosts = [];
      }
    }
  },
  getters: {
    loadSingle(state) {
       return (id) => {
         return state.products.find((product) => {
           return product.userId === id
         })
       }
    }
  }
});
