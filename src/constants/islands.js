const islands = [
  {
    id: 1,
    position: {
      x: 3750,
      y: 7000
    },
    size: {
      x: 275,
      y: 543
    },
    collisionDist: 200,
    image: 'cyclope',
    biomeLength: 5,
    isIsland: true,
    isTarget: false,
    opacity: 1,
    grad: '#01c1b2'
  },
  {
    id: 2,
    position: {
      x: 5000,
      y: 3000
    },
    size: {
      x: 275,
      y: 608
    },
    collisionDist: 230,
    image: 'eol',
    biomeLength: 4,
    isIsland: true,
    isTarget: false,
    opacity: 1,
    grad: '#B760FF'
  },
  {
    id: 3,
    position: {
      x: 2000,
      y: 12000
    },
    size: {
      x: 275,
      y: 573
    },
    collisionDist: 215,
    image: 'lotophage',
    biomeLength: 2,
    isIsland: true,
    isTarget: false,
    opacity: 1,
    grad: '#8bcfef'
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
