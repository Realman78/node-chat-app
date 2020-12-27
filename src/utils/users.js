const users = []

const addUser = ({id, username, room}) =>{
    //Clean data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate data
    if (!username || !room){
        return {
            error: 'Username and room are required'
        }
    }
    //Check for existing user
    const exists = users.find((user)=>{
        return user.room === room && user.username === username
    })

    //validate username
    if (exists){
        return {
            error: 'Username is already in use'
        }
    }

    //Store user
    const user = { id, username, room }
    users.push(user)
    return {user}
}

const removeUser = (id)=>{
    const index = users.findIndex((user)=>user.id === id)

    if (index !== -1){
        return users.splice(index,1)[0]
    }
}

const getUser = (id) =>{
    return users.find((user)=> user.id===id)
}

const getUsersInRoom = (room) =>{
    if (!room){
        return 0
    }
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

const getActiveRooms = ()=>{
    const activeRooms = []
    users.forEach((user)=>{
        const exists = activeRooms.find((room) => room === user.room)
        if (!exists){
            activeRooms.push(user.room)
        }
    })
    return activeRooms
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    getActiveRooms
}