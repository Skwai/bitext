import Firebase from 'firebase'
import 'firebase/firestore'
import config from '@/config'

const app = Firebase.initializeApp(config.FIREBASE)
const db = app.firestore()

export default db
