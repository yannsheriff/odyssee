//  Import modules
// --------------------------------------------------------------
import {
  Text,
  View, 
  TouchableOpacity,
  StyleSheet, 
  Image
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from "react-navigation"
import React, { Component } from 'react';
import ReactNativeHaptic from 'react-native-haptic'

//  Import Components
// --------------------------------------------------------------
import Loader from '../components/Loader'
import Narration from '../components/Island/narration'
import Collectables from '../components/Island/Collectables'
import Illustrations from '../components/Island/Illustrations'
import InteractionMenu from '../components/Island/interaction-menu'

//  Import Actions
// --------------------------------------------------------------
import { goToStep, saveIslandData, requestIslandData, goToPreviousStep } from '../redux/actions/island'
import { navigateTo } from '../redux/actions/navigation'
import { collision } from '../redux/actions/sailing'
import { toggleMenu } from '../redux/actions/menu'

//  Import Data
// --------------------------------------------------------------
import islands from '../data'
import { collectables } from '../data'

//  Import Helpers
// --------------------------------------------------------------
import screen from '../helpers/ScreenSize'
import images from '../assets/images';
import renderIf from '../helpers/renderIf'



class SmartIsland extends Component {


  constructor(props) {
    super(props)
    const { params } = this.props.navigation.state;
    this.actualSnippetId = this.props.island.actualSnippetId ? this.props.island.actualSnippetId : 1
    this.islandId = params.islandId
    this.isTransitionFinished = true
    
    // var payload = this.getSnippetData(this.islandId , this.actualSnippetId)
    // console.log("Payload : ", payload)
    this.state = {
      snippet: undefined,
      actions: undefined,
      offsets: undefined,
      animation: undefined,
      currentIslandId: undefined,
      narration: undefined,
      haveMultipleText: undefined,
      currentText: undefined,
      islandState: this.props.island,
      loader: true,
      _changeStep: this.props.goToStep,
      _goToPreviousStep: this.props.goToPreviousStep,
      _saveData: this.props.saveData,
      _requestIslandData: this.props.requestIslandData,
      _toggleMenu: this.props.toggleMenu
    }
    
  }


componentWillMount(){
  this.state._requestIslandData(this.islandId)
  
  setTimeout(() => {
    this.setState({ loader: false })
  }, 3000)
}

  
 /*
  *  Update the current snippet 
  */
componentWillReceiveProps(nextProps) {
  if(nextProps.island.currentIslandId) {
    if (nextProps.island.actualSnippetId !== this.state.snippet) {
      this.updateSnippet(nextProps.island)
    } 
  } else {
    this.state._requestIslandData(this.islandId)
  
    setTimeout(() => {
      this.setState({ loader: false })
    }, 3000)
  }
}

 /*
  *  Load the data of the wanted Snippet
  */
  getSnippetData(currentIslandId, actualSnippetId) { 

    const snippet = islands[currentIslandId].writting.steps.find((index) => {
      if (index.id === actualSnippetId) {
        return index
      }
    });

    if (Array.isArray(snippet.text)) {
      var haveMultipleText = true
      if(snippet.actionPosition) {
        var actionPosition = snippet.actionPosition
      }
    } else {
      var haveMultipleText = false
    }
    const narration = snippet.text


    const illustration = islands[currentIslandId].illustrations.steps.find((index) => {
      if (index.id === snippet.illustration) {
        return index
      }
    });

    const offsets = islands[currentIslandId].illustrations.steps.find((index) => {
      if (index.id === snippet.illustration) {
        return index.offsets
      }
    });


    const animation = islands[currentIslandId].illustrations.steps.find((index) => {
      if (index.id === snippet.illustration) {
        return index.animation
      }
    })


    const collectableIds = illustration.collectables ? illustration.collectables : undefined
    var collectableData = []
    if ( collectableIds ) {
      collectableIds.forEach(index => {
        let collectable = collectables.fragments.find(element => index === element.id)
        if(collectable) { collectableData.push(collectable) }
      })
    } 



    let haveAction = true
    if (snippet.haveAction) {
      var snippetArray = snippet.actions.map(element => {
        return {
          title: element.title,
          id: element.id,
          choiceImgId: element.choiceImgId
        }
      })
    } else {
      haveAction = false 
      var snippetArray = snippet.actions.map(element => {
        return {
          id: element.id,
        }
      })
    }


    let bundleAction = {
      haveAction: haveAction,
      snippets: snippetArray
    }

    const payload = {
      snippet: snippet,
      actions: bundleAction, 
      offsets: offsets,
      animation: animation,
      collectables: collectableData,
      narration: narration,
      haveMultipleText: haveMultipleText,
      actionPosition: actionPosition ? actionPosition : false
    }

    return payload
  }


 /*
  *  Update the current snippet 
  */
  updateSnippet(state) {
    const payload = this.getSnippetData(state.currentIslandId, state.actualSnippetId)

    if (this.state.islandState.actualSnippetId !== 1)  {
      var isGoingForward = payload.snippet.id > this.state.islandState.actualSnippetId ? true : false
    } else {
      var isGoingForward = true
    }



    this.isTransitionFinished = false     
    this.setState({
      currentIslandId: state.currentIslandId,
      snippet: payload.snippet,
      actions: payload.actions,
      offsets: payload.offsets,
      animation: payload.animation,
      collectables: payload.collectables,
      narration: payload.narration,
      haveMultipleText: payload.haveMultipleText,
      actionPosition: payload.actionPosition,
      currentText: isGoingForward ? 0 : payload.narration.length - 1,
      islandState: state, 
      isGoingForward: isGoingForward,
    }, () => {
      setTimeout(()=>{
        this.isTransitionFinished = true
      }, 1500)
    })
  }

  /*
  *  Ask for new snippet and save old state
  */

  goToNextStep = (id) => {
    if(id === 0) {
      this.state._reverseCollisionOnNavigation()
      this.state._navigateTo("Sailing")
    } else if (this.isTransitionFinished) {
        if(this.state.haveMultipleText && this.state.currentText < this.state.narration.length - 1  ) {
          this.setState({ currentText: this.state.currentText + 1})
        } else {
          this.state._saveData(this.state.islandState, id) 
          this.state._changeStep(id) 
        }
    }
  }

  goToPreviousStep = () => {
    if(this.state.haveMultipleText && this.state.currentText > 0  ) {
      this.setState({ currentText: this.state.currentText - 1})
    } else {
      if(this.state.islandState.actualSnippetId > 1 && this.isTransitionFinished ) {
        this.state._goToPreviousStep() 
      }
    }
  }

  collectableFound = (id) => {
    //do something
  }

  toggleMenu = () => {
    ReactNativeHaptic.generate('impact')
    this.state._toggleMenu(1);
  }


  render() {

    if (this.state.actionPosition) {
      if ( this.state.actionPosition === this.state.currentText + 1) {
        var actions = this.state.actions
      } else {
        var actions = false
      }
    } else {
      var actions =  this.state.actions
    }
    

    if (  this.state.actions 
          && this.state.offsets 
          && this.state.animation 
          && this.state.snippet ) 
    {

      var view = (<View style={{
        backgroundColor: '#fff',
        height: screen.height
      }}>
        <Illustrations 
          images = {this.loadedImage}
          offsets={ this.state.offsets.offsets }
          animation={ this.state.animation.animation }
          swipBackward={ !this.state.isGoingForward }
        />
        
        <Narration text = { this.state.haveMultipleText ? this.state.narration[this.state.currentText] : this.state.narration } /> 
        <InteractionMenu 
          actions = { actions } 
          changeStep={ this.goToNextStep }  
          prevStep={ this.goToPreviousStep }  
        /> 
        <Collectables 
          array={ this.state.collectables }
          collectablePressed={ this.collectableFound }
        />
        <TouchableOpacity 
          onPress={ this.toggleMenu }
          style={ styles.menuContainer}
        >
          <Image 
            source={images.burger}
            resizeMethod="contain"
            style={styles.menu}
          />
        </TouchableOpacity>
        {renderIf(this.state.loader,
          <Loader />
        )}
      </View> )
    } else {
      var view = (<View><Text style={{color: 'white', textAlign: "center", marginTop: 300}}> Loading ... </Text></View>)
    }
    
    return view
  }
}


/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => {
  return {
    island: state.island,
    isOnIsland: state.isOnIsland,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goToStep: (id) => {
      dispatch(goToStep(id))
    },
    saveData: (state, id) => {
      dispatch(saveIslandData(state, id))
    },
    requestIslandData: (id) => {
      dispatch(requestIslandData(id))
    },
    goToPreviousStep: () => {
      dispatch(goToPreviousStep())
    },
    toggleMenu: (page) => {
      dispatch(toggleMenu(page));
    },
    navigateTo: (routeName)=> {
      dispatch(navigateTo(routeName))
    }, 
    reverseCollisionOnNavigation: () => {
      dispatch(collision(null))
    }
  }
}


const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SmartIsland)

export default componentContainer



const styles = StyleSheet.create({

  menu: {
    width: 30,
    height: 30,
  },
  menuContainer: {
    position: "absolute",
    top: 35,
    right: 20,
    width: 30,
    height: 30,
  },
});
