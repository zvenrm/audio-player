const setting = document.querySelector('.change-color')
const inputColor = document.querySelector('.color-input')
let color = document.documentElement

function colorRemove(e){
    if (!e.target.classList.contains('change-color') && !e.target.classList.contains('color-input')){
        inputColor.classList.remove('color-display')
    }
}

document.body.addEventListener('click', colorRemove)

setting.addEventListener('click', () => {
    inputColor.classList.toggle('color-display')
})
inputColor.addEventListener('input', () => {
    color.style.setProperty('--color', inputColor.value)
})


