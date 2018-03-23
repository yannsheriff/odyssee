export const mapSize = {
    x: 2000,
    y: 2000
}

export const speedRadius = 2

function circles() {
    const circles = []
    for (let i = 0; i <= 100; i++) {
      circles.push({
        id: i,
        x: Math.floor(Math.random() * mapSize.x),
        y: Math.floor(Math.random() * mapSize.y)
      })
    }
    return circles
}

export const circles = circles()