import React from 'react'
import { database } from '../firebaseConfig'
import moment from 'moment'
import 'moment/locale/pl'

moment.locale('pl')

const messageRef = database.ref('/JFDDL7/messages')

class Chat extends React.Component {
    state = {
        messages: null,
        newMessageText: ''
    }

    componentDidMount() {
        messageRef.on(
            'value',
            (snapshot) => {
                this.setState({ messages: snapshot.val() })
            }
        )
    }

    onNewMessageTextChange = (event) => this.setState({ newMessageText: event.target.value })

    onSendClick = () => {
        const newMessage = {
            text: this.state.newMessageText,
            date: Date.now(),
            author: 'Marysia Micek'
        }

        // fetch(
        //     'https://ad-snadbox.firebaseio.com/JFDDL7/messages.json',
        //     {
        //         method: 'POST',
        //         body: JSON.stringify(newMessage)
        //     }
        // )

        messageRef.push(newMessage)

    }

    onDeleteClick = (key) => {

        // fetch(
        //     'https://ad-snadbox.firebaseio.com/JFDDL7/messages/' + key + '.json',
        //     {
        //         method: 'DELETE'
        //     }
        // )

        // database.ref('/JFDDL7/messages/' + key).remove()

        // database.ref('/JFDDL7/messages/' + key).set(null)

        messageRef.child(key).remove()
    }

    componentWillUnmount = () => messageRef.off() 

    render() {
        return (
            <div>
                <div>
                    <input
                        value={this.state.newMessageText}
                        onChange={this.onNewMessageTextChange}
                    />
                    <button
                        onClick={this.onSendClick}
                    >
                        WYŚLIJ
                    </button>
                </div>
                {
                    this.state.messages &&
                    Object.entries(this.state.messages).map(
                        ([key, message]) => (
                            <div key={key}>
                                <p><b>{message.author}</b></p>
                                <p>{moment(message.date).fromNow()}</p>
                                <p>{message.text}</p>
                                <button
                                    onClick={() => this.onDeleteClick(key)}
                                >
                                    USUŃ
                                </button>
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}

export default Chat
