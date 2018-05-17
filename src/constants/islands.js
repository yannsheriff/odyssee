const islands = [
  {
    id: 0,
    position: {
      x: 1000,
      y: 700
    },
    size: {
      x: 271,
      y: 534
    },
    collisionDist: 200,
    image: 'cyclope',
    biomeLength: 4,
    isIsland: true,
    isTarget: false
  }
]

const biomesElements = []
islands.forEach(island => {
  const nb = Math.floor(Math.random() * 10) + 10
  for (let i = 0; i < nb; i++) {
    const dist = Math.random() * 500 + 200
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
