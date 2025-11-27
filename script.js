let btn_start = document.querySelector(".btn-3")
let main = document.querySelector(".btn-start")
let container = document.querySelector(".container")
let board = document.querySelector(".board")
let input = document.querySelector("input")
let draw = document.querySelector(".draw")
let delete_btn = document.querySelector(".delete")
let reset = document.querySelector(".reset")
let fill = document.querySelector(".fill")
let save = document.querySelector(".save")


let current_color = "#EDA43B"
let is_erasing = false
let is_mousedown = false

input.addEventListener("input", function(){
    current_color = input.value
})

draw.addEventListener("click", function(){
    is_erasing = false
    is_mousedown = true
})

delete_btn.addEventListener("click", function(){
    is_erasing = true
})

btn_start.addEventListener("click", function(){
    anime({
    targets:'.btn-start',
    translateX: -1800,
    duration: 1000,
    easing: "linear",
    complete: function(){
        main.style.display = "none"
        container.style.display = "flex"
        createBoard()
    }
})
})


function createBoard(){
    board.innerHTML = ""
    for (let i = 0; i < 1500; i++){
        let div = document.createElement("div")
        div.classList.add("cell")
        board.appendChild(div)

        div.addEventListener("mousedown", function(){
            if (is_mousedown){
                div.style.backgroundColor = is_erasing ? "#ffffff" : current_color
            }
        })
    }
    let arr_color = JSON.parse(localStorage.getItem("save picture"))
    if (arr_color){
        let cells = document.querySelectorAll(".cell")
        cells.forEach((item, index) => {
        item.style.backgroundColor = arr_color[index]
    })
    }
}

function paint(e){
    if (!is_mousedown) return
    if (e.target.classList.contains("cell")){
        e.target.style.backgroundColor = is_erasing ? "#ffffff" : current_color
    }
}
document.addEventListener("mousedown", function(){
    document.addEventListener("mouseover", paint)
})

document.addEventListener("mouseup", function(){
    document.addEventListener("mouseover", paint)
})
fill.addEventListener("click", function(){
    let cells = document.querySelectorAll(".cell")
    anime({
        targets: cells,
        backgroundColor: current_color,
        duration: 1000,
        easing: "linear",
        delay: (item, index)=> index*1
})
})

reset.addEventListener("click", function(){
    let cells = document.querySelectorAll(".cell")
    let arr = [...cells].reverse()
    anime({
        targets: arr,
        backgroundColor: "#ffffff",
        duration: 1000,
        easing: "linear",
        delay: (item, index)=> index*1
})
})

save.addEventListener("click", function(){
    let cells = document.querySelectorAll(".cell")
    let cell_colors = []
    cells.forEach(item => {
        cell_colors.push(item.style.backgroundColor || "#ffffff")
    })
    localStorage.setItem("save picture", JSON.stringify(cell_colors))

    domtoimage.toPng(board)
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        let link = document.createElement("a")
        link.download = "pixel.png"
        link.href = dataUrl
        link.click()
    })
    .catch(function (error) {
        console.error('Ошибка, картинка не загрузилась!', error);
    });
})