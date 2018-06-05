import anim from '../../assets/anim/etoiles/data.json'
import perso from '../../assets/anim/perso/perso.json'
import ulysse from './ulysse_maquette.json'



// In this array Id == Index
export const animations = [
    {
        modo: "Silence is golden."
    },
    {
        id: 1,
        animation: anim
    }, 
    {
        id: 2,
        animation: ulysse
    }, 
]

export const microInteraction = {
    actionMenu: require('./MenuAction.json'),
    findFragment:  require('./GlyphAnim.json'),
    findGlyphe:  require('./trophy.json')
}