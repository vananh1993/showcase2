

// import { initializeApp } from 'firebase/app'
// import { getFirestore, collection } from 'firebase/firestore'
// // ... other firebase imports

// export const firebaseApp = initializeApp({
//   apiKey: "AIzaSyAJJ2JvhVSVUSPTyZwc08K1riJ6DRM-U3k",
//   authDomain: "still-minutia-278608.firebaseapp.com",
//   databaseURL: "http://127.0.0.1:5173/",
//   projectId: "still-minutia-278608",
//   storageBucket: "still-minutia-278608.appspot.com",
//   messagingSenderId: "810879938042",
//   appId: "1:810879938042:web:3339787a2ff2b9ca698843",
//   measurementId: "G-JPY5RTN8RD"
// })

// // used for the firestore refs
// const db = getFirestore(firebaseApp)

// // here we can export reusable database references
// export const todosRef = collection('listshowcases')




// // import firebase from 'firebase'
// // import { ref, onUnmounted } from 'vue'

// // const config = {
// //   apiKey: "AIzaSyAJJ2JvhVSVUSPTyZwc08K1riJ6DRM-U3k",
// //   authDomain: "still-minutia-278608.firebaseapp.com",
// //   databaseURL: "http://127.0.0.1:5173/",
// //   projectId: "still-minutia-278608",
// //   storageBucket: "still-minutia-278608.appspot.com",
// //   messagingSenderId: "810879938042",
// //   appId: "1:810879938042:web:3339787a2ff2b9ca698843",
// //   measurementId: "G-JPY5RTN8RD"
// // };

// // const firebaseApp = firebase.initializeApp(config)

// // const db = firebaseApp.firestore()
// // const showcasesCollection = db.collection('listshowcases')

// // export const createUser = user => {
// //   return showcasesCollection.add(user)
// // }

// // export const getUser = async id => {
// //   const user = await showcasesCollection.doc(id).get()
// //   return user.exists ? user.data() : null
// // }

// // export const updateUser = (id, user) => {
// //   return showcasesCollection.doc(id).update(user)
// // }

// // export const deleteUser = id => {
// //   return showcasesCollection.doc(id).delete()
// // }

// // export const useLoadshowcases = () => {
// //   const showcases = ref([])
// //   const close = showcasesCollection.onSnapshot(snapshot => {
// //     showcases.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
// //   })
// //   onUnmounted(close)
// //   return showcases
// // }