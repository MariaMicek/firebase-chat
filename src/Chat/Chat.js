import React from 'react'
import { database } from '../firebaseConfig'
import moment from 'moment'
import 'moment/locale/pl'

moment.locale('pl')

class Chat extends React.Component {
    state = {
        messages: null,
        newMessageText: ''
    }

    componentDidMount() {
        database.ref('/JFDDL7/messages')
            .on(
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

        database.ref('/JFDDL7/messages')
            .push(newMessage)

    }

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
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}

export default Chat
