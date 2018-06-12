const images = {
    boussole: require('./img/bb.png'),
    aiguille: require('./img/Aiguille.png'),
    bateau: require('./img/Bateau.png'),
    home: require('./img/home.png'),
    homeScreen: require('./img/home.jpg'),
    closeMainMenu: require('./img/icon-close.png'),
    burger: require('./img/icon-burger.png'),
    homeScreen: require('./img/Intro.jpg'),
    glyphes: require('./img/CercleGlyph.png'),
    iles: {
      cyclope: require('./img/ile_cyclope.png'),
      cyclope_1: require('./img/cyclope_1.png'),
      cyclope_2: require('./img/cyclope_2.png'),
      cyclope_3: require('./img/cyclope_3.png'),
      cyclope_4: require('./img/cyclope_4.png'),
      eol: require('./img/ile_eol.png'),
      eol_1: require('./img/eol_1.png'),
      eol_2: require('./img/eol_2.png'),
      eol_3: require('./img/eol_3.png'),
      eol_4: require('./img/eol_4.png'),
      lotophage: require('./img/ile_lotophage.png'),
      lotophage_1: require('./img/lotophage_1.png'),
      lotophage_2: require('./img/lotophage_2.png')
    },
    closeMenu: require('./img/Close.png'),
    openMenu: require('./img/plus.png'),
    iconPlay: require('./img/icon-play.png'),
    iconPause: require('./img/icon-pause.png'),
    iconLock: require('./img/icon-lock.png'),
    iconUnlock: require('./img/icon-unlock.png'),
    iconMap: require('./img/icon-map.png'),
    iconBoat: require('./img/icon-boat.png'),
    iconWind: require('./img/icon-wind.png'),
    iconWindForce: require('./img/icon-windforce.png'),
    iconEnterIsland: require('./img/icon-enter_island.png'),
    iconLeaveIsland: require('./img/icon-leave_island.png')
};

export const benediction = [
    {
        id: 0,
        img: require('./img/Eol.png')
    },
    {
        id: 1,
        img: require('./img/Athena.png')
    },
    {
        id: 2,
        img: require('./img/Elios.png')
    },
    {
        id: 3,
        img: require('./img/Hades.png')
    },
    {
        id: 4,
        img: require('./img/Chronos.png')
    },
    {
        id: 5,
        img: require('./img/Poseidon.png')
    }
]
export const choices = [
    {
        id: 0,
        img: require('./img/Lance.png')
    },
    {
        id: 1,
        img: require('./img/Continuer.png')
    },
    {
        id: 2,
        img: require('./img/Arc.png')
    },
    {
        id: 3,
        img: require('./img/appeler.png')
    },
    {
        id: 4,
        img: require('./img/Verite.png')
    },
    {
        id: 5,
        img: require('./img/SeTaire.png')
    },
    {
        id: 6,
        img: require('./img/SeCacher.png')
    },
    {
        id: 7,
        img: require('./img/Personne.png')
    },
    {
        id: 8,
        img: require('./img/NePasBouger.png')
    },
    {
        id: 9,
        img: require('./img/Motive.png')
    },
    {
        id: 10,
        img: require('./img/Mentir.png')
    },
    {
        id: 11,
        img: require('./img/Menace.png')
    },
    {
        id: 12,
        img: require('./img/Fils.png')
    }
]

export const backgrounds = {
    test: {
        p1: {
            image: require('./img/test-p1.png'),
            height: 1605,
            width: 3365,
        },
        p2: {
            image: require('./img/test-p2.png'),
            height: 1426,
            width: 3365,
        },
        p3: {
            image: require('./img/test-p3.png'),
            height: 1347,
            width: 3365,
        } 
    },
    foret: {
        p1: {
            image: require('./img/premier_plan.png'),
            height: 1624,
            width: 27751,

        },
        p2: {
            image: require('./img/second_plan.png'),
            height: 1625,
            width: 19580,
        },
        p3: {
            image: require('./img/arriere-plan.jpg'),
            height: 1625,
            width: 15160,
        } 
    }
}

export default images;