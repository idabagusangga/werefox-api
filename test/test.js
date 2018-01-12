const socket = require('socket.io-client')("http://localhost:3000");

// let testEmit = 'hellow'
global.console = {
  warn: jest.fn(),
  log: jest.fn()
}

test('chat message emitted',()=>{
  socket.on('connection', () =>{
    
  })
  socket.emit('chat', 'Hello World')
    
    // console.log('helolhleheolo');
    socket.on('chat',async (msg)=>{
      // console.log(msg);
      const testEmit = await msg
      // console.log(testEmit);
      expect(testEmit).toBe('Hello World');
    })
})

test('invalid username (empty) validated', ()=>{
  // console.log('masuk invalid username test');
  socket.on('connection', () =>{})
  socket.emit('username','player1')
    socket.on('gagal', async (err)=>{
      const testErr = await err
      // console.log(testErr);
      expect(testErr).toBe("Username cannot empty")
    })
})
// 

test('at game start, array of players must contain property role' , () =>{
  socket.on('connection', () =>{})
  
  // socket.emit('gameStart')
    socket.on('gameStart', async (users) =>{
      const usersArray = await users
      for(let i = 0 ; i < usersArray.length ; i++){
        expect(usersArray[i]).objectContaining({
          role : expect.not.toMatch('')
        })
      }
  })
})


test('emit userId when player is connected', () =>{
  socket.on('connection', ()=>{})
  socket.on('userId' , async (id)=>{
    const checkUserId = await id
    expect(checkUserId).not.toMatch('')
  })
})

test('expect client to pass /skill',()=>{
  socket.on('connection', ()=>{})
  socket.on('useSkill', async (data)=>{
    const checkSkill = await data
    expect(checkSkill).not.toMatch('')
  })
})

test('expect user to use appropriate skill', ()=>{
  socket.on('connection' , ()=>{})
  socket.on('useSkill', async(data)=>{
    const userRole = data
    
  })
})

test('expect cron to start when game start and emit msg', ()=>{
  socket.on('connection', ()=>{})
  socket.emit('username','player1')
  socket.emit('chat', '/start')
  socket.on('chat', async (msg)=>{
    const checkMsg = await msg
    console.log(msg);
  })
})

test('expect cron to emit day status to client', ()=>{
  socket.on('connection' , ()=>{})
  socket.emit('username','player1')
  socket.on('isDay', async (status)=>{
    const checkStatus = await status
    expect(checkStatus).toBe(true)
  })
})

test('expect server to emit user array', ()=>{
  socket.on('connection' , ()=>{})
  socket.emit('username','player1')
  // socket.emit('username','player2')
  socket.on('gameStart', async (user)=>{
    const userArray = await user
    console.log('ini user array -------------------->', userArray);
    expect(typeof userArray).toBe('object')
  })
})

// test('expect to see username after login' , ()=>{
//   socket.on('connection' , ()=>{})
//   socket.emit('username' , 'player1')
//   socket.on
// })

test('expect cron to emit welcome message' , ()=>{
  socket.on('connection',()=>{})
  socket.emit('username' , 'player1')
  // socket.emit('username' , 'player2')
  socket.on('werewolfWelcome' , async (msg)=>{
    const wolfMsg = await msg
    console.log(msg);
    expect(msg).toBe('Kamu adalah werewolf! ketik /skill (username) untuk memburu teman kalian')
  })
  socket.on('villagerWelcome' , async (msgV)=>{
    const vilMsg = await msgV
    console.log(msgV);
    expect(msgV).toBe('test')
  })
})

test('expect to see night message through cron' , ()=>{
  socket.on('connection' , ()=>{})
  socket.emit('username' , 'player1')
  // socket.emit('username' , 'player2')
  socket.on('chatNight', async (niteMsgs)=>{
    const niteMsg = await niteMsgs
    console.log(niteMsg);
    expect(niteMsg).toBe('hello')
  })
})


  
