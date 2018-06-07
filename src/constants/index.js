import screen from '../helpers/ScreenSize'

export const mapSize = {
    x: screen.width * 20,
    y: screen.width * 20
}

// Actual max speed is max speed + min speed
export const speedModifiers = {
    min: 0.75,
    max: 2.25,
    wind: Math.random() * 2.25,
    direction: Math.floor(Math.random() * 360),
    acceleration: 0.02
}

export const boatStates = {
    stopped: {
      frames:[0, 1],
      up: {
        trans: 'toRowing',
        goal: 'rowing'
      },
      cap: {
        min: 0,
        max: 0.00001
      }
    },
    toRowing: {
      frames:[30, 60],
      stop: 'stopped',
      cap: {
        min: 0,
        max: 0.33
      }
    },
    rowing: {
      frames:[60, 89],
      up: {
        trans: 'toSailing',
        goal: 'sailing'
      },
      stop: 'stopped',
      cap: {
        min: 0,
        max: 0.33
      }
    },
    toSailing: {
      frames:[89, 122],
      stop: 'toStopped',
      cap: {
        min: 0.33,
        max: 0.66
      }
    },
    toSailingReverse: {
      frames:[122, 89],
      stop: 'toStopped',
      cap: {
        min: 0.33,
        max: 0.66
      }
    },
    sailing: {
      frames:[122, 153],
      up: {
        trans: 'toMaxSpeed',
        goal: 'maxSpeed'
      },
      down: {
        trans: 'toSailingReverse',
        goal: 'rowing'
      },
      stop: 'toStopped',
      cap: {
        min: 0.33,
        max: 0.66
      }
    },
    toMaxSpeed: {
      frames:[153, 163],
      stop: 'toStopped',
      cap: {
        min: 0.66,
        max: 1
      }
    },
    toMaxSpeedReverse: {
      frames:[163, 153],
      stop: 'toStopped',
      cap: {
        min: 0.66,
        max: 1
      }
    },
    maxSpeed: {
      frames:[182, 199],
      down: {
        trans: 'toMaxSpeedReverse',
        goal: 'sailing'
      },
      stop: 'toStopped',
      cap: {
        min: 0.66,
        max: 1
      }
    },
    toStopped: {
      frames:[240, 255]
    }
}