const imageFile = document.querySelector("#image")
const downloadLink = document.querySelector("#download")
const drop_area = document.querySelector(".drop_area")
const uploaded_image = document.querySelector("#uploaded_image")
const resize_width = document.querySelector("#resize_width")
const resize_height = document.querySelector("#resize_height")
const quality = document.querySelector('#quality')
const resized_image = document.querySelector("#resized_image")
const size = document.querySelectorAll('.size')
const canvas = document.querySelector('#canvas')
const resizedLink = document.querySelector('#resized_link')
const original_image = document.querySelector('#original_image')
const imageFormat = document.querySelector('#image_format')
const original_size = document.querySelector("#original_size")
const custom_size = document.querySelector("#custom_size")

const img = new Image()
const ctx = canvas.getContext('2d')

function updateImageSizeValues(width,height) {
    resize_width.value = width
    resize_height.value = height
    quality.value = 100
}

function calculateImageSize(size) {
    return (Number(size) / 1024).toFixed(2) + " KB"
}


function updateCanvas(image) {
    canvas.width = parseInt(resize_width.value)
    canvas.height = parseInt(resize_height.value) 
    ctx.clearRect(0, 0, canvas.width, canvas.height)  
    ctx.drawImage(image, 0, 0, parseInt(resize_width.value), parseInt(resize_height.value))
}

function updateUrl(image, quality_flag = true) {
    const imageQuality = parseInt(quality.value) / 100
    canvas.toBlob(
      function (blob) {
        downloadLink.href = URL.createObjectURL(blob);
        resizedLink.style.display = "inline";
        custom_size.textContent = calculateImageSize(blob.size);
        if(quality_flag) {
            const img_r = new Image();
            img_r.src = URL.createObjectURL(blob);
            img_r.onload = function () {
                updateCanvas(img_r);
                updateUrl(img_r, false)
                URL.revokeObjectURL(img_r.src);
            }
        }
      },
      imageFormat.value,
      imageQuality
    );
}

imageFile.addEventListener('change', (e) => {
    img.onload = function() {
        
        original_image.style.display = 'inline'
        updateImageSizeValues(img.naturalWidth, img.naturalHeight)
        updateCanvas(img)
        updateUrl(img)
        URL.revokeObjectURL(img.src)
    }
    img.src = URL.createObjectURL(e.target.files[0])
    original_size.textContent =  calculateImageSize(e.target.files[0].size)
    uploaded_image.appendChild(img)
})


imageFormat.addEventListener('change', (e) => {
    
    if(e.target.value ==='image/png') {
        quality.classList.add('disabled')
        quality.setAttribute('disabled', true)
    } else {
        quality.classList.remove('disabled')
        quality.removeAttribute('disabled')
    }
    // updateCanvasAndUrl(img, true)
    updateCanvas(img)
    updateUrl(img)
})

resize_width.addEventListener('input', (e) => {
    if(!e.target.value) return
    // updateCanvasAndUrl(img, true)
    updateCanvas(img)
    updateUrl(img)
})
resize_height.addEventListener('input', (e) => {
    if(!e.target.value) return
    // updateCanvasAndUrl(img, true)
    updateCanvas(img)
    updateUrl(img)
})

quality.addEventListener('input', (e) => {
    if(!e.target.value) return
    // updateCanvasAndUrl(img, true)
    updateCanvas(img)
    updateUrl(img)
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