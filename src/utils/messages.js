const generateMessage = (username, text)=>{
    return{
        username, text, createdAt: new Date().getTime()
    }
}
const generateLocationMessage = (username, url)=>{
    return {
        username, url, createdAt: new Date().getTime()
    }
}

const generatePhotoMessage = (username, img_url)=>{
    return {
        username, img_url, createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage,
    generatePhotoMessage
}