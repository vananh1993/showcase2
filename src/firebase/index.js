import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// ... other firebase imports

const app = initializeApp({
    apiKey: "AIzaSyChKritQv74m31-gBnx_tRjMQW-gNRAbo0",
    authDomain: "showcase-d7021.firebaseapp.com",
    projectId: "showcase-d7021",
    storageBucket: "showcase-d7021.appspot.com",
    messagingSenderId: "853481428137",
    appId: "1:853481428137:web:1e5c735307bc543b32c5b8",
    measurementId: "G-DKL9LYFYH7"
    // apiKey: "AIzaSyAJJ2JvhVSVUSPTyZwc08K1riJ6DRM-U3k",
    // authDomain: "still-minutia-278608.firebaseapp.com",
    // databaseURL: "https://still-minutia-278608-default-rtdb.firebaseio.com",
    // projectId: "still-minutia-278608",
    // storageBucket: "still-minutia-278608.appspot.com",
    // messagingSenderId: "810879938042",
    // appId: "1:810879938042:web:3339787a2ff2b9ca698843",
    // measurementId: "G-JPY5RTN8RD"
  })


// used for the firestore refs
const db = getFirestore(app)

export {
    db
}
// // here we can export reusable database references
// export const todosRef = collection('listshowcases')
