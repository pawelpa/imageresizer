const imageFile = document.querySelector("#image")
const downloadLink = document.querySelector("#download")
const drop_area = document.querySelector(".drop_area")
const uploaded_image_div = document.querySelector("#uploaded_image_div")
const resize_width = document.querySelector("#resize_width")
const resize_height = document.querySelector("#resize_height")
const quality = document.querySelector('#quality')
const resized_image = document.querySelector("#resized_image")
const size = document.querySelectorAll('.size')
const canvas = document.querySelector('#canvas')
const resizedLink = document.querySelector('#resized_link')

const img = new Image()
const ctx = canvas.getContext('2d')

function updateImageSizeValues(width,height) {
    resize_width.value = width
    resize_height.value = height
    quality.value = 100
}

function updateCanvasAndUrl(image, quality_flag=false) {
 
    canvas.width = parseInt(resize_width.value)
    canvas.height = parseInt(resize_height.value)
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    ctx.drawImage(image, 0, 0, parseInt(resize_width.value), parseInt(resize_height.value))
   
    const imageQuality = parseInt(quality.value) / 100

    canvas.toBlob(function(blob) {
        downloadLink.href = URL.createObjectURL(blob)
        resizedLink.style.display = 'inline'
        if(quality_flag){
            const img_r = new Image()
            img_r.src = URL.createObjectURL(blob)
            img_r.onload = function() {
                updateCanvasAndUrl(img_r, false)
            }
        }
        }, "image/jpeg", imageQuality)
}

imageFile.addEventListener('change', (e) => {
    img.onload = function() {
        updateImageSizeValues(img.width, img.height)
        updateCanvasAndUrl(img)
    }
    img.src = URL.createObjectURL(e.target.files[0])
    uploaded_image_div.appendChild(img)
})

//detect every change of size values
resize_width.addEventListener('input', (e) => {
    if(!e.target.value) return
    updateCanvasAndUrl(img)
})
resize_height.addEventListener('input', (e) => {
    if(!e.target.value) return
    updateCanvasAndUrl(img)
})

quality.addEventListener('input', (e) => {
    if(!e.target.value) return
    updateCanvasAndUrl(img, true)
})

drop_area.addEventListener('dragover', function(e) {
    this.classList.add('dragover')
})

drop_area.addEventListener('dragleave', function(e)  {
    e.preventDefault()
    this.classList.remove('dragover')  
})

drop_area.addEventListener('drop', function(e)  {
    this.classList.remove('dragover')
})