const islands = [
  {
    id: 1,
    position: {
      x: 3750,
      y: 7500
    },
    size: {
      x: 275,
      y: 543
    },
    collisionDist: 200,
    image: 'cyclope',
    biomeLength: 4,
    isIsland: true,
    isTarget: false,
    opacity: 1,
    grad: '#01c1b2'
  }
]

const biomesElements = []
islands.forEach(island => {
  const nb = 100
  for (let i = 0; i < nb; i++) {
    const dist = Math.random() * 3000 + 200
    const deg = Math.random() * 360
    const element = {
      id: island.id + '_' + i,
      position: {
        x: island.position.x + (dist) * Math.sin(deg * 0.0174533),
        y: island.position.y + (dist) * Math.cos(deg * 0.0174533)
      },
      size: {
        x: 100,
        y: 100
      },
      collisionDist: 75,
      image: island.image + '_' + (Math.floor(Math.random() * island.biomeLength + 1)),
      isIsland: false,
      opacity: 1
    }
    biomesElements.push(element)
  }
})

const elements = islands.concat(biomesElements)

export const IslandsData = elements
