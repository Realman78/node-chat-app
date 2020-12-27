const inp = document.querySelector('input')
const datalist = document.querySelector('datalist')

const f = function(){
    fetch('/getRooms').then((res)=>{
        res.json().then((data)=>{
            const rooms = data.rooms
            datalist.innerHTML = ""
            rooms.forEach((room)=>{
                const opt = document.createElement('option')
                opt.value = room
                datalist.append(opt)
            })
        })
    })
}

window.setInterval(function(){
  f()
<<<<<<< HEAD
}, 5000);
=======
}, 5000);

inp.onfocus = f()
>>>>>>> 9d76033d067604e414e745d64518d12d6dc6a522
