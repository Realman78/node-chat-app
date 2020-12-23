const socket = io()

const $form = document.querySelector('#message-form')
const $input = document.querySelector('input')
const $button = document.querySelector('#sendButton')
const $sendLocationButton = document.querySelector('#sendLocation')
const $messages = document.querySelector('#messages')

//templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options
const { username, room } = Qs.parse(location.search, {ignoreQueryPrefix: true})

const autoScroll = ()=>{
    //New message element
    const $newMessage = $messages.lastElementChild
    //Get height of new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    //Visible height
    const visibleHeight = $messages.offsetHeight

    //Height od messages container
    const containerHeight = $messages.scrollHeight

    //How far have i scrolled
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset){
        $messages.scrollTop = $messages.scrollHeight
    }
}

socket.on('message', (message)=>{
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text, 
        createdAt: moment(message.createdAt).format('HH:mm')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

socket.on('locationMessage', (locationMessage)=>{
    locationTemplate.href = locationMessage.url
    const html = Mustache.render(locationTemplate, {
        username: locationMessage.username,
        url: locationMessage.url, 
        createdAt: moment(locationMessage.createdAt).format('HH:mm')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

socket.on('roomData', ({room,users})=>{
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})

$form.addEventListener('submit', (e)=>{
    e.preventDefault()
    $button.setAttribute('disabled', 'disabled')
    socket.emit('sendMessage', $input.value, (error)=>{
        $button.removeAttribute('disabled')
        $input.value = ''
        $input.focus() 
        if (error){
            return console.log(error)
        }
        console.log('Delivered')
    })
})

$sendLocationButton.addEventListener('click', ()=>{
    if(!navigator.geolocation){
        return alert('Doesnt work')
    }
    $sendLocationButton.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((pos)=>{
        socket.emit('sendLocation', {
            latitude: pos.coords.latitude,
            longitude : pos.coords.longitude
        }, ()=>{
            $sendLocationButton.removeAttribute('disabled')
            console.log('Location shared')
        })
    })
})

socket.emit('join', { username, room}, (error)=>{
    if (error){
        alert(error)
        location.href = '/'
    }
})