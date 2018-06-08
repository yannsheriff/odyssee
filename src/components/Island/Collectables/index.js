
//  Import modules
// --------------------------------------------------------------
import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
  TouchableHighlight,
  Alert
} from 'react-native'
import { connect } from 'react-redux'


//  Import Helpers
// --------------------------------------------------------------
import screen from '../../../helpers/ScreenSize'
import styles from './styles'
import renderIf from '../../../helpers/renderIf'

//  Import assets
// --------------------------------------------------------------
import { backgrounds } from '../../../assets/images'
import {animations} from '../../../assets/anim'
import { microInteraction } from '../../../assets/anim'

//  Import Actions
// --------------------------------------------------------------
import { foundNewCollectable, saveCollectables, foundNewGlyphe } from '../../../redux/actions/collectables'
import { printNotification } from '../../../redux/actions/notification'

//  Import data
// --------------------------------------------------------------
import { collectables } from '../../../data'

//  Import components
// --------------------------------------------------------------
import ParallaxLayout from '../ParallaxLayout'
import AnimationLayout from '../AnimationLayout'



class Collectables extends Component {

  constructor(props) {
    super(props)
    this.state = {
      collectablePressed: props.collectablePressed,
      collectableState: this.props.collectables,
      collectables: props.array ? this.filterCollectables(props.array, this.props.collectables) : [],
      glypheArray: this.getGlyphesArray(),
      _fragementFound: this.props.fragementFound,
      _glypheFound: this.props.glypheFound,
      _saveCollectables: this.props.saveCollectables,
      _dispatchNotification: this.props.callnotification
    }
  }

 /*
  *  if there is fragement filter it and add it to state
  */
  componentWillReceiveProps(nextProps) {
    if(nextProps.array) {
      const collectablesNotAlreadyFound = this.filterCollectables(nextProps.array, this.state.collectableState)
      if (collectablesNotAlreadyFound) {
        this.setState({ 
          collectables: collectablesNotAlreadyFound
        })
      }
    } else {
      this.setState({
        collectables: []
      })
    }
    if(nextProps.collectables !== this.state.collectables) {
      this.setState({collectableState: nextProps.collectables})
    }
  }

 /*
  *  Format glyphe array
  */
  getGlyphesArray() {
    const glypheArray = collectables.glyphs.map(element => {
      return element.fragments
    })
    return glypheArray
  }

 /*
  *  Take  fragement to display, compare it with redux already found fragement
  *  Return the fragement that are not in redux
  */
  filterCollectables(collectablesArray, collectableState) {
    const collactableToReturn =  collectablesArray.filter(collectbaleToDisplay => {
      var alreadyExist = collectableState.fragments.find( collectableAlreadyFound =>  { 
        if (collectbaleToDisplay.id === collectableAlreadyFound) { return collectableAlreadyFound } 
      });
      if (alreadyExist === undefined) { return collectbaleToDisplay }
    });
    return collactableToReturn
  }

 /*
  *  Take new fragement id, add it to already found fragement and check if it make a glyphe
  *  Return the glyphe that are not in redux
  */
  isAnObjectCompleted(id) {
    var objectsFound = [].concat(this.state.collectableState.fragments, id)
    var glyphsFoundedArray =  this.state.glypheArray.map((completeFragmentsArray, glypheIndex) => {
      var fragmentArrayFilteredByGlyph = completeFragmentsArray.filter(fragmentsId => {
        for (let index = 0; index < objectsFound.length; index++) {
          if (objectsFound[index] === fragmentsId ) { 
            return objectsFound[index]
          }
        }
      })
      if (fragmentArrayFilteredByGlyph.length === completeFragmentsArray.length) { 
        return glypheIndex 
      } else { 
        return false
      }
    });

    if(glyphsFoundedArray.some(element => element !== false)) {
      let newGlyphe = this.newCompletedGlyphs(glyphsFoundedArray) 
      if(newGlyphe.length > 0) {
        return newGlyphe
      }
    } else {
      return false
    }
  }
  
 /*
  *  Take an array of glyphs and compare it with redux state glyphs
  *  Return the glyphe that are not in redux
  */
  newCompletedGlyphs(completedGlyphsArray) {
    let completedGlyphes = completedGlyphsArray.filter(element => element !== false)
    let newGlyphes = completedGlyphes.filter(element => {
      if(this.state.collectableState.glyphs.some(el => element === el) === false ) {
        return true
      }
    })
    return newGlyphes
  }


  getGlypheCompletion(fragmentId) {
    var objectsFound = [].concat(this.state.collectableState.fragments, fragmentId)
    let glyphIds = this.state.glypheArray.filter(completeFragmentsArray => {
      if(completeFragmentsArray.some(fragement => fragement === fragmentId)) {
        return completeFragmentsArray
      }
    })
    var fragmentFound= glyphIds[0].filter(fragmentsId => {
      for (let index = 0; index < objectsFound.length; index++) {
        if (objectsFound[index] === fragmentsId ) { 
          return objectsFound[index]
        }
      }
    })
    return {
      all: glyphIds[0].length,
      completed: fragmentFound.length
    }
  }

 /*
  *  When a collectable is pressed
  *  check if it make a full glyphe 
  *  => if true save it and display something
  *  => else add new fragment
  */
  collectablePressed = (fragmentId, collectableData) => {
    let glypheArray= this.isAnObjectCompleted(fragmentId)
    console.log(glypheArray)
    if ( Array.isArray(glypheArray) ) {
      let newGlyphe = glypheArray[0]
      this.state._dispatchNotification(
        "Nouvelle bénédiction !", null,
        "Bravo vous avez obtenu la bénédiction d'" + collectables.glyphs[newGlyphe].name, 
        microInteraction.findGlyphe
      )
      this.state._glypheFound(newGlyphe, fragmentId)
    } else {
      let glypheCompletion = this.getGlypheCompletion(fragmentId)
      console.log(glypheCompletion)
      this.state._dispatchNotification(
        "Nouveaux fragement !",
        glypheCompletion.completed+"/"+glypheCompletion.all,
        collectableData.name,
        microInteraction.findFragment
      )
      this.state._fragementFound(fragmentId)
    }
    this.state.collectablePressed(fragmentId)
  }

 /*
  *  When component update because of redux Reload collectables
  *  and save the new state ! 
  */
  componentDidUpdate(prevProps){
    if(prevProps.collectables.fragments !== this.state.collectableState.fragments) {
      this.state._saveCollectables(this.state.collectableState)
      const collectablesNotAlreadyFound = this.filterCollectables(this.state.collectables, this.state.collectableState)
      if (collectablesNotAlreadyFound) {
        this.setState({ 
          collectables: collectablesNotAlreadyFound
        })
      }
    }
  }

  render() {

    if (this.state.collectables.length > 0 ) {
      var collectables = this.state.collectables.map((collectable) => {
         if (this.state.collectables.length > 0) {
           return (
            <View 
              onStartShouldSetResponder={ (evt) => true }
              onResponderGrant={  (evt) => { 
                this.collectablePressed(collectable.id, collectable)
              } }
              
              style={{
                position: "absolute",
                width: 20,                
                height: 20,
                top: collectable.y,
                left: collectable.x,
                backgroundColor: 'white',
              }}
            />  
           )
         }
       })
     }
     
    return (
        <View style={ styles.container }>
            { collectables }
        </View>
    )
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

  const mapStateToProps = state => {
    return {
      collectables: state.collectables
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      fragementFound: (id) => {
        dispatch(foundNewCollectable(id))
      },
      glypheFound: (glyphe, fragment ) => {
        dispatch(foundNewGlyphe(glyphe, fragment))
      },
      saveCollectables: (state)=> {
        dispatch(saveCollectables(state))
      },
      callnotification: (title, sub, sub2, anim) => {
        dispatch(printNotification(title, sub, sub2, anim))
      },
    }
  }
  
  
  const componentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Collectables)
  
  export default componentContainer
