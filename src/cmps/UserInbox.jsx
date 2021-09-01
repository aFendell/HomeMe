import { Component } from 'react'
import { connect } from 'react-redux'
import { socketService } from '../services/socketService'
import { loadOrders } from '../store/actions/order.actions'



class _UserInbox extends Component {

    state = {
        msg: { txt: '' },
        msgs: [],
        chatTopic: [],
        selectedOrder: null,
        users: [],
        markedUser: false
    }

    componentDidMount() {

        this.props.loadOrders()
        const { orders } = this.props
        const userChatTopic = orders.filter(order => order.buyer._id === this.props.loggedInUser._id)
        const hostChatTopic = orders.filter(order => order.hostId === this.props.loggedInUser._id)
        const chatTopic = (this.props.loggedInUser.isHost) ? hostChatTopic : userChatTopic
        this.setState({ chatTopic })

        socketService.setup()
        socketService.on('chat topic', chatTopic)
        socketService.on('chat newMsg', this.addMsg)
        // socketService.on('chat newMsg', newMsg => {
        //     console.log('newMsg', newMsg)
        //     this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }))
        // })
        socketService.on("connect", () => {
            this.state.users.forEach((user) => {
                if (user.self) {
                    user.connected = true;
                }
            });
        });
        socketService.on("disconnect", () => {
            this.state.users.forEach((user) => {
                if (user.self) {
                    user.connected = false;
                }
            });
        });


        const initReactiveProperties = (user) => {
            user.hasNewMsgs = false;
        }
        socketService.on('users', (users) => {
            console.log('users', users);
            users.forEach((user) => {
                if (user.msgs) {
                    user.msgs.forEach((msg) => {
                        msg.fromSelf = msg.from === this.props.loggedInUser.fullname
                    })
                    for (let i = 0; i < this.state.users.length; i++) {
                        const existingUser = this.state.users[i]
                        // console.log('existingUser', existingUser);
                        if (existingUser.userId === user.userId) {
                            existingUser.connected = user.connected
                            existingUser.msgs = user.msgs
                            return;
                        }
                    }
                    user.self = user.userId === this.props.loggedInUser._id
                    initReactiveProperties(user)
                    this.state.users.push(user)
                }
            })
            this.state.users.sort((a, b) => {
                if (a.self) return -1
                if (b.self) return 1
                if (a.username < b.username) return -1
                return a.username > b.username ? 1 : 0
            })

            users.forEach((user) => {
                console.log('user render', user)
                if (user.userId === this.props.loggedInUser._id) {
                    (user.msgs.map((msg) => {
                        this.state.msgs.push(msg)
                    }))
                    console.log('user.msgs', user.msgs)
                } else {
                    console.log('nopppee')
                }
                console.log('this.state.msgs', this.state.msgs)
            }
            )
        })

        socketService.on("user connected", (user) => {
            for (let i = 0; i < this.state.users.length; i++) {
                const existingUser = this.state.users[i];
                if (existingUser.userId === user.userId) {
                    existingUser.connected = true;
                    return;
                }
            }
            initReactiveProperties(user);
            this.users.push(user);
        });

        socketService.on("user disconnected", (id) => {
            for (let i = 0; i < this.users.state.length; i++) {
                const user = this.state.users[i];
                if (user.userId === id) {
                    user.connected = false;
                    break;
                }
            }
        });

    }

    componentWillUnmount() {
        // socketService.off('chat addMsg', this.addMsg)
        // socketService.off('chat topic', this.state.chatTopic)
        socketService.off("user disconnected")
        socketService.off("user connected")
        // socketService.off('users')
        socketService.off("disconnect")
        socketService.off("connect")


        socketService.terminate()
    }


    sendMsg = ev => {
        ev.preventDefault()
        const host = this.state.selectedOrder[0]?.hostName
        const loggedInUser = this.props.loggedInUser.fullname
        const buyer = this.state.selectedOrder[0].buyer.fullname
        const from = (loggedInUser === buyer) ? buyer : host
        const to = (loggedInUser === buyer) ? host : buyer
        const getId = this.props.loggedInUser._id 
        // const getBuyerId = (getId === this.state.selectedOrder[0].buyer._id) ? getBuyerId : this.state.selectedOrder[0].hostId
        console.log('this.state.selectedOrder[0]', this.state.selectedOrder[0])
        socketService.emit('chat newMsg', { from, to, txt: this.state.msg.txt, topic: getId })
        console.log('from', from, 'to', to, 'txt', this.state.msg.txt, 'topic:', getId);
        // this.state.selectedOrder.msgs.push({from, to, txt: this.state.msg.txt})
        this.setState({ msg: { from: 'Me', txt: '' } })

    }


    addMsg = newMsg => {
        console.log('newMsg', newMsg)
        this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }))
    }

    msgHandleChange = ev => {
        const { name, value } = ev.target
        this.setState(prevState => {
            return {
                msg: {
                    ...prevState.msg,
                    [name]: value
                }
            }
        })
    }

    onSelectUser = topicId => {
        socketService.emit('chat topic', topicId)
        // console.log('chatTopic', this.state.chatTopic);
        // console.log('topicId', topicId);
        const selectedOrder = this.state.chatTopic.filter(order => order._id === topicId)
        console.log('selectedOrder', selectedOrder);
        // console.log('users', this.state.users);
        this.setState({ selectedOrder })

        this.setState(prevState => ({ markedUser: !prevState.markedUser }))        
    }
    
    render() {
        const { chatTopic, msgs, msg, users, selectedOrder } = this.state
        const {loggedInUser} = this.props
        const foundUser = []
        let selUser = {}

        return (
            <div className="main-inbox">
                <h1>USER INBOX</h1>

                <div className="user-inbox">
                    <div className="msg-panel">
                        {selectedOrder && <div className="panel-top">
                            <h1>{selectedOrder[0]?.stay.name}</h1>

                            {loggedInUser.isHost && <h2><span>Guest:</span> {selectedOrder[0]?.buyer.fullname}</h2>}
                            {!loggedInUser.isHost && <h2><span>Host:</span> {selectedOrder[0]?.hostName}</h2>}
                            <h2><span>From:</span> {selectedOrder[0]?.startDate.substr(0,10)} - <span>To:</span> {selectedOrder[0]?.endDate.substr(0,10)}</h2>
                            <h2><span>Total nights: </span>{selectedOrder[0]?.nightCount}</h2>
                            <h2><span>Guests: </span>Adults: {selectedOrder[0]?.guests.adults}, Kids: {selectedOrder[0]?.guests.kids} </h2>
                            <h2><span>Total Price: </span>{selectedOrder[0]?.totalPrice}$</h2>
                            <h2><span>Status: </span>{selectedOrder[0]?.status}</h2>
                        </div>}
                        <div className="msg-board">
                            <div className="msg-list">
                                <ul>
                                    {msgs.map((msg, idx) => (
                                        <li key={idx} className={(loggedInUser.fullname === msg.from) ? 'outgoing': 'incoming'}>
                                            <h3>{msg.from}:</h3> {msg.txt}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <form onSubmit={this.sendMsg}>
                                <input
                                    type="text"
                                    value={msg.txt}
                                    onChange={this.msgHandleChange}
                                    name="txt"
                                    autoComplete="off"
                                    placeholder="Your message..."
                                />
                                <button>Send</button>
                            </form>
                        </div>
                    </div>

                    <div className="chat-list">
                        <ul>
                            {chatTopic.map((topic, idx) => (
                                <li key={idx} className={this.state.markedUser ? 'selected' : ''}>
                                    <div  onClick={() => this.onSelectUser(topic._id)}>
                                        <h6>{topic.hostName} : </h6> <p>{topic.stay.name}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* <div className="incoming-msgs">
                    <ul >
                        {this.findMsgs(users)}
                    </ul>
                </div> */}
                

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
        orders: state.orderModule.orders

    }
}
const mapDispatchToProps = {
    loadOrders,
}


export const UserInbox = connect(mapStateToProps, mapDispatchToProps)(_UserInbox)



//     changeTopic = () => {
//         socketService.emit('chat topic', this.state.chatTopic)
//         console.log('change topic', this.state.chatTopic)
//     }
//     handleChange = ev => {
//         const { name, value } = ev.target
//         this.setState({ [name]: value }, this.changeTopic)
//     }

//     <label>
//     <input
//         type="radio"
//         name="topic"
//         value={topic.stay.name}
//         checked={chatTopic === topic.stay.name}
//         onChange={this.handleChange}
//     />

// </label>

// ************** findMsgs ***********
// for (let i = 0; i < users.length; i++) {
//     const user = users[i];
//     console.log('user loop', user)
//     for (let i = 0; i < user.msgs.length; i++) {
//         const msg = user.msgs[i];
//         if (msg.to === this.props.loggedInUser.fullname) {
//             console.log('waka loop', msg)
//             return `${msg.from} : ${msg.txt}`
//         }
//     }
// }

// {users.map(user => {
//     console.log('user loop', user)
//     user.msgs.forEach((msg, idx) => (
//         <li key={idx}>
//                 <h3>{msg.from}:</h3> {msg.txt}
//             </li>
//         ))
//         console.log('user loop', user)
//     })}

// users.map(user => user.msgs.forEach((mwow, idx) => {
//     { console.log('mwow', mwow, 'idx', idx); }
//     <ul>
//         <li key={idx}>
//             <h2>{mwow.from} : {mwow.txt}</h2>
//         </li>
//     </ul>
// }))




        // console.log('users loop', users)
        // const foundUser = users.filter(user => user.userId === this.props.loggedInUser._id)
        // let selUser = foundUser[0]
        // if (selUser) {
        //     console.log('sels', selUser)
        //     selUser.msgs.map((msg, idx) => {
        //         //    console.log('msg', msg.from , 'idx', idx) 
        //         <ul>

        //             <li key={idx}>
        //                 <h2>{msg.from}</h2>
        //             </li>
        //         </ul>

        //     }
        //     )

        // for (let i = 0; i < users.length; i++) {
        //     const user = users[i];
        //     console.log('user loop', user)
        //     for (let i = 0; i < user.msgs.length; i++) {
        //         const coco = user.msgs[i];
        //         console.log('waka loop', coco)
        //         if (coco.to === this.props.loggedInUser.fullname) {
        //             return (
        //                 <li>
        //                     {coco.from} : {coco.txt}
        //                 </li>
        //             )
        //         }
        //     }
        // }