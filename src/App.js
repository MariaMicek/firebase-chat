import React from 'react'
import { database } from './firebaseConfig'

const courseRef = database.ref('/JFDDL7')

courseRef.once(
    'value',
    snapshot => console.log(snapshot.val())
    )

const App = () => (
    <div>

    </div>
)

export default App
