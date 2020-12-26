const dropdownList = document.querySelector('datalist')


function myFunction() {
     console.log('heok')
    const opt = document.createElement('option')
    opt.value = 'More'
    document.getElementById("rooms").append(opt)
}