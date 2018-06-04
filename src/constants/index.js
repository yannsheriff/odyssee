export const mapSize = {
    x: 2000,
    y: 2000
}

// Actual max speed is max speed + min speed
export const speedModifiers = {
    min: 0.75,
    max: 2.5,
    wind: Math.random() * 2.25,
    direction: Math.floor(Math.random() * 360),
    acceleration: 0.075
}

export const boatStates = {
    stopped: {
      frames:[0, 1],
      up: {
        trans: 'toRowing',
        goal: 'rowing'
      }
    },
    toRowing: {
      frames:[30, 60]
    },
    rowing: {
      frames:[60, 89],
      up: {
        trans: 'toSailing',
        goal: 'sailing'
      },
      down: {
        trans: 'toRowing',
        goal: 'stopped'
      },
      stop: 'toRowing'
    },
    toSailing: {
      frames:[89, 108]
    },
    sailing: {
      frames:[108, 122],
      up: {
        trans: 'toMaxSpeed',
        goal: 'maxSpeed'
      },
      down: {
        trans: 'toSailing',
        goal: 'rowing'
      },
      stop: 'toStopped'
    },
    toMaxSpeed: {
      frames:[153, 163]
    },
    maxSpeed: {
      frames:[182, 199],
      down: {
        trans: 'toMaxSpeed',
        goal: 'sailing'
      },
      stop: 'toStopped'
    },
    toStopped: {
      frames:[240, 255]
    }
}