//  Import modules
// --------------------------------------------------------------
import {
  Button,
  SafeAreaView,
  Text,
  View, 
} from 'react-native'
import { connect } from 'react-redux'
import React, { Component } from 'react';

//  Import Components
// --------------------------------------------------------------
import Narration from '../components/Island/narration'
import InteractionMenu from '../components/Island/interaction-menu'
import Illustrations from '../components/Island/Illustrations'

//  Import Actions
// --------------------------------------------------------------
import { goToStep, saveIslandData, requestIslandData } from '../redux/actions/island'

//  Import Data
// --------------------------------------------------------------
import islands from '../data'

//  Import Helpers
// --------------------------------------------------------------
import screen from '../helpers/ScreenSize'
import { storeService } from '../helpers/saveData'



class SmartIsland extends Component {


  constructor(props) {
    super(props)
    const { params } = this.props.navigation.state;
    this.actualSnippetId = this.props.island.actualSnippetId ? this.props.island.actualSnippetId : 1
    this.islandId = params.islandId
    
    // var payload = this.getSnippetData(this.islandId , this.actualSnippetId)
    // console.log("Payload : ", payload)
    this.state = {
      snippet: undefined,
      actions: undefined,
      offsets: undefined,
      animation: undefined,
      currentIslandId: undefined,
      islandState: this.props.island,
      _changeStep: this.props.goToStep,
      _saveData: this.props.saveData,
      _requestIslandData: this.props.requestIslandData,
    }
    
  }


componentWillMount(){
  this.state._requestIslandData(this.islandId)
}

  
 /*
  *  Update the current snippet 
  */
componentWillReceiveProps(nextProps) {
  console.log("Data is arriving !")
  if (nextProps.island.actualSnippetId !== this.state.snippet) {
    console.log("let's update")
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
    }

    return payload
  }


 /*
  *  Update the current snippet 
  */
  updateSnippet(state) {
    const payload = this.getSnippetData(state.currentIslandId, state.actualSnippetId)
    this.setState({
      currentIslandId: state.currentIslandId,
      snippet: payload.snippet,
      actions: payload.actions,
      offsets: payload.offsets,
      animation: payload.animation,
      islandState: state
    })
  }

  /*
  *  Ask for new snippet and save old state
  */

  goToNextStep = (id) => {
    console.log("Smart Islant => goToNextStep", id)
    if(id === 0) {
      this.props.navigation.navigate('Home')
    } else {
      this.state._saveData(this.state.islandState, id) 
      this.state._changeStep(id) 
    }
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
        />
        <Narration snippet = { this.state.snippet } /> 
        <InteractionMenu 
          actions = { this.state.actions } 
          changeStep={ this.goToNextStep }  
        /> 
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
    isOnIsland: state.isOnIsland
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
    
  }
}


const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SmartIsland)

export default componentContainer