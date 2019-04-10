import React from 'react'
import { database } from './firebaseConfig'

const courseRef = database.ref('/JFDDL7')

courseRef.on(                                   //nie można wywołać na on then (to nie jest promise), once tak
    'value',
    snapshot => console.log(snapshot.val())
    )

const App = () => (
    <div>

    </div>
)

export default App
