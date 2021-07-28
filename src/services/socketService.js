import io from 'socket.io-client'

const baseUrl = (process.env.NODE_ENV === 'production')? '' : '//localhost:3030'
export const socketService = createSocketService()
// export const socketService = createDummySocketService()

window.socketService = socketService
// socketService.setup()


function createSocketService() {
  var socket
  const socketService = {
    setup() {
      socket = io(baseUrl)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
      console.log('new conection front');
    },
    off(eventName, cb) {
      socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
      console.log('emitted (front): event-', eventName, 'data-', data);
    },
    terminate() {
      socket = null
    }
  }
  return socketService
}


function createDummySocketService() {
  var listenersMap = {}
  const socketService = {
    setup() {
      listenersMap = {}
    },
    terminate() {
      this.setup()
    },
    on(eventName, cb) {
      listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
    },
    off(eventName, cb) {
      if (!listenersMap[eventName]) return
      listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
    },
    emit(eventName, data) {
      console.log('eventName:', eventName, 'data:', data);
      if (!listenersMap[eventName]) {
        console.log('!listenersMap[eventName]');
        return
      }
      listenersMap[eventName].forEach(listener => {
        listener(data)
      })
    },
    debugMsg() {
      this.emit('chat addMsg', {from: 'Someone', txt: 'Aha it worked!'})
    },
  }
  return socketService
}


// Basic Tests
// function cb(x) {console.log(x)}
// socketService.on('baba', cb)
// socketService.on('mama', cb)
// socketService.emit('baba', 'DATA')
// socketService.off('baba', cb)
