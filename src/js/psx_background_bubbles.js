const psx_bubble_svg = document.getElementById("psx_bubble")
const spawn_number = 6
const max_radius = 300
const min_radius = 150

function addBubble() {
    let bubble = psx_bubble_svg.cloneNode()
    bubble.removeAttribute("id", "")

    let radius = getRadius()
    let [x, y] = getPosition(radius)

    bubble.setAttribute("width", radius)
    bubble.setAttribute("height", radius)

    let style = `position: absolute; top: ${y}px; left: ${x}px;`
    bubble.setAttribute("style", style)

    let src = document.querySelector("body");
    src.appendChild(bubble)
}


// Return a radius size between the defined minimum and maximum
function getRadius() {
    let radius = Math.floor(Math.random() * (max_radius - min_radius) + min_radius)
    return radius
}


// Return a random [X, Y] coordinate inside bounds of screen
function getPosition(radius) {
    let devWidth = window.innerWidth
    let devHeight = window.innerHeight

    let xRange = devWidth - radius
    let yRange = devHeight - radius
    let x = Math.floor(Math.random() * xRange)
    let y = Math.floor(Math.random() * yRange)

    return [x, y]
}

window.addEventListener('load', () => {
    for (let i = 0; i < spawn_number; i++) {
        addBubble()
    }
})