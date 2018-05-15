const islands = [
  {
    id: 0,
    position: {
      x: 1000,
      y: 1500
    },
    size: {
      x: 30,
      y: 30
    },
    collisionDist: 150
  },
  {
    id: 1,
    position: {
      x: 1000,
      y: 1800
    },
    size: {
      x: 30,
      y: 30
    },
    collisionDist: 150
  },
  {
    id: 2,
    position: {
      x: 1500,
      y: 850
    },
    size: {
      x: 30,
      y: 30
    },
    collisionDist: 150
  },
  {
    id: 3,
    position: {
      x: 900,
      y: 500
    },
    size: {
      x: 30,
      y: 30
    },
    collisionDist: 150
  },
  {
    id: 4,
    position: {
      x: 450,
      y: 850
    },
    size: {
      x: 30,
      y: 30
    },
    collisionDist: 150
  }
]

islands.forEach(island => {
  const nb = Math.floor(Math.random() * 10) + 15
  for (let i = 0; i < nb.length; i++) {

  }
})

export const IslandsData = islands
