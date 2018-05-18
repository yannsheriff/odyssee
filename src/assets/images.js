

const images = {
    boussole: require('./img/bb.png'),
    aiguille: require('./img/Aiguille.png'),
    bateau: require('./img/Bateau.png'),
    home: require('./img/home.png'),
    homeScreen: require('./img/home.jpg'),
    iles: {
      cyclope: require('./img/ile_cyclope.png'),
      cyclope_1: require('./img/cyclope_1.png'),
      cyclope_2: require('./img/cyclope_2.png'),
      cyclope_3: require('./img/cyclope_3.png'),
      cyclope_4: require('./img/cyclope_4.png')
    },
    closeMenu: require('./img/Close.png'),
    openMenu: require('./img/plus.png')
};

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
            image: require('./img/Plan1.png'),
            height: 2433,
            width: 9989,
        },
        p2: {
            image: require('./img/Plan2.png'),
            height: 2541,
            width: 5219,
        },
        p3: {
            image: require('./img/Plan3.jpg'),
            height: 2437,
            width: 3500,
        } 
    }
}

export default images;