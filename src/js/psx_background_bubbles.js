const psx_bubble_svg = document.getElementById("psx_bubble")
const spawn_number = 6
const max_diameter = 300
const min_diameter = 100


function createBubble(x, y, diameter) {
    let bubble = psx_bubble_svg.cloneNode()
    bubble.removeAttribute("id", "")
    bubble.setAttribute("class", "dynamic_bubble")

    let pos = `position: absolute; left: ${x}px; top: ${y}px;`
    bubble.setAttribute("width", diameter)
    bubble.setAttribute("height", diameter)
    bubble.setAttribute("style", pos)

    let body = document.querySelector("body")
    body.appendChild(bubble)
}


// Return a radius size between the defined minimum and maximum
function getDiameter() {
    let diameter = Math.floor(Math.random() * (max_diameter - min_diameter) + min_diameter)
    return diameter
}


// Given a position map returns a set of coordinates that
// are within the specified bounds.
function getPositions(posMap) {
    let devWidth = window.innerWidth
    let devHeight = window.innerHeight

    let contentWidth = devWidth * 0.8
    let contentHeight = devHeight * 0.7

    let sectionWidth = Math.floor(contentWidth / posMap.length)
    let sectionHeight = Math.floor(contentHeight / posMap[0].length)

    // Generate coordinates with respect to the positions map
    let coordinates = []
    for (let x = 0; x < posMap.length; x++) {
        for (let y = 0; y < posMap[x].length; y++) {

            if (posMap[x][y] == true) {
                let xPos = Math.floor(Math.random() * sectionWidth + (devWidth * 0.1))
                let yPos = Math.floor(Math.random() * sectionHeight + (devHeight * 0.1))
                xPos = xPos + (x * sectionWidth)
                yPos = yPos + (y * sectionHeight)
                coordinates.push([xPos, yPos])
            }

        }
    }

    return coordinates
}


// Generate position map for landscape screens.
// Browser window is divided into a 3x3 grid and three coordinates for background
// bubbles are generated and split uniformly amongst X and Y positions.
function genLandscapePosMap() {
    let xPos = [0, 1, 2]
    let yPos = [0, 1, 2].sort(() => Math.random() - 0.5);

    // Generate blank map
    let coordinates = []
    for (let x = 0; x < 3; x++) {
        let row = []
        for (let y = 0; y < 3; y++) {
            row.push(false)
        }
        coordinates.push(row)
    }

    // Add occupied positions
    for (let i = 0; i < 3; i++) {
        coordinates[xPos[i]][yPos[i]] = true
    }

    return coordinates
}


// Generate position map for portrait screens.
// Browser window is divided into a 2x3 grid and three coordinates for background
// bubbles are generated and split uniformly on Y, with one X position being duplicated.
function genPortraitPosMap() {
    let xPos = [0, 1, 0]
    let yPos = [0, 1, 2].sort(() => Math.random() - 0.5);

    // Generate blank map
    let coordinates = []
    for (let x = 0; x < 2; x++) {
        let row = []
        for (let y = 0; y < 3; y++) {
            row.push(false)
        }
        coordinates.push(row)
    }

    // Add occupied positions
    for (let i = 0; i < 3; i++) {
        coordinates[xPos[i]][yPos[i]] = true
    }

    return coordinates
}


// On page load
window.addEventListener('load', () => {

    let port = genPortraitPosMap()
    let land = genLandscapePosMap()

    let posArr = getPositions(port)
    console.log(posArr)

    posArr.forEach(pos => {
        let diameter = getDiameter()
        createBubble(pos[0] - diameter/2, pos[1] - diameter/2, diameter)
    })

})