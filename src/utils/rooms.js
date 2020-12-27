const rooms = []

const addRoom = (roomName)=>{
    const exists = rooms.find((room)=>{
        return roomName === room
    })
    if (!exists){
        rooms.push(roomName)
    }
    
}

const getRooms = ()=>{
    return rooms
}

const removeRoom = (room)=>{
    const index = rooms.indexOf(room)
    if (index > -1) {
        rooms.splice(index, 1);
    }
}


module.exports = {
    addRoom, getRooms, removeRoom
}