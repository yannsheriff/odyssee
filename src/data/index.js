import Collectables from './collectables.json'
import Achievement from './achievement.json'
import illu_cyclope from './illustrations/cyclopes.json'
import writ_cyclope from './writing/cyclopes.json'

export default islands = [
    {/* Id === array position */},
    { 
        id: 1,
        title: "Cyclope Island",
        illustrations: illu_cyclope, 
        writting: writ_cyclope,
    }
]

export const collectables = Collectables
export const achievement = Achievement
