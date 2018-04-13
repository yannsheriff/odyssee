export const mapSize = {
    x: 2000,
    y: 2000
}

// Actual max speed is max speed + min speed
export const speedModifiers = {
    min: 0.5,
    wind: Math.random() * 4.5,
    direction: Math.floor(Math.random() * 360),
    acceleration: 0.02
}

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