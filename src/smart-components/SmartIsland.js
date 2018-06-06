//  Import modules
// --------------------------------------------------------------
import {
  Button,
  SafeAreaView,
  Text,
  View, 
  TouchableOpacity,
  StyleSheet, 
  Image
} from 'react-native'
import { connect } from 'react-redux'
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
import { foundNewCollectable, saveCollectables } from '../redux/actions/collectables'
import { toggleMenu } from '../redux/actions/menu'

//  Import Data
// --------------------------------------------------------------
import islands from '../data'
import { collectables } from '../data'

//  Import Helpers
// --------------------------------------------------------------
import screen from '../helpers/ScreenSize'
import { storeService } from '../helpers/saveData'
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
  if (nextProps.island.actualSnippetId !== this.state.snippet) {
    this.updateSnippet(nextProps.island)
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

    const illustration = islands[currentIslandId].illustrations.steps.find((index) => {
      if (index.id === actualSnippetId) {
        return index
      }
    });

    const offsets = islands[currentIslandId].illustrations.steps.find((index) => {
      if (index.id === actualSnippetId) {
        return index.offsets
      }
    });


    const animation = islands[currentIslandId].illustrations.steps.find((index) => {
      if (index.id === actualSnippetId) {
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


    let snippetArray = []
    let haveAction = true

    if (snippet.haveAction) {
      snippet.actions.forEach(element => {
        islands[currentIslandId].writting.steps.find((index) => {
          if (index.id === element.id) {
            snippetArray.push(index) 
          }
        });
      });
    } else {
      haveAction = false 
      snippetArray = islands[currentIslandId].writting.steps.find((index) => {
        if (index.id === actualSnippetId) {
          return index
        }
      });
      snippetArray = [snippetArray]
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
      islandState: state, 
      isGoingForward: isGoingForward
    }, () => {
      setTimeout(()=>{
        this.isTransitionFinished = true
      }, 2000)
    })
  }

  /*
  *  Ask for new snippet and save old state
  */

  goToNextStep = (id) => {
    if(id === 0) {
      this.props.navigation.navigate('Home')
    } else if (this.isTransitionFinished) {
      this.state._saveData(this.state.islandState, id) 
      this.state._changeStep(id) 
    }
  }

  goToPreviousStep = () => {
    if(this.state.islandState.actualSnippetId > 1 && this.isTransitionFinished ) {
      this.state._goToPreviousStep() 
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
          offsets={ this.state.offsets.offsets }
          animation={ this.state.animation.animation }
          swipBackward={ !this.state.isGoingForward }
        />
        <Narration snippet = { this.state.snippet } /> 
        <InteractionMenu 
          actions = { this.state.actions } 
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
