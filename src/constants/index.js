export const mapSize = {
    x: 2000,
    y: 2000
}

// Actual max speed is max speed + min speed
export const speedModifiers = {
    min: 0.5,
    wind: 2 + Math.random() * 2.5,
    direction: Math.floor(Math.random() * 360),
    acceleration: 0.075
}