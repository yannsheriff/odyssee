export const mapSize = {
    x: 10000,
    y: 10000
}

// Actual max speed is max speed + min speed
export const speedModifiers = {
    min: 0.5,
    wind: 2+Math.random() * 2.5,
    direction: Math.floor(Math.random() * 360),
    acceleration: 0.02
}

function circles() {
    const circles = []
    for (let i = 0; i <= 5000; i++) {
      circles.push({
        id: i,
        x: Math.floor(Math.random() * mapSize.x),
        y: Math.floor(Math.random() * mapSize.y)
      })
    }
    return circles
}

export const circles = circles()