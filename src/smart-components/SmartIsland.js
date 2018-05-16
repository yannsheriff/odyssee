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
import { goToStep, saveIslandData } from '../actions/island'

//  Import Data
// --------------------------------------------------------------
import islands from '../data'

//  Import Helpers
// --------------------------------------------------------------
import screen from '../helpers/ScreenSize'



class SmartIsland extends Component {


  constructor(props) {
    super(props)
    const payload = this.getSnippetData(this.props.island.currentIslandId, this.props.island.actualSnippetId)
    this.state = {
      snippet: payload.snippet,
      actions: payload.actions,
      offsets: payload.offsets,
      animation: payload.animation,
      islandState: this.props.island,
      _changeStep: this.props.goToStep,
      _saveData: this.props.saveData
    }
  }

  
 /*
  *  Update the current snippet 
  */
componentWillReceiveProps(nextProps) {
  if (nextProps.island.actualSnippet !== this.state.snippet) {
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
    this.state._saveData(this.state.islandState, id) 
    this.state._changeStep(id) 
  }

  render() {
    return ( 

        <View style={{
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
        </View>

    );
  }
}


/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => {
  return {
    island: state.island
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goToStep: (id) => {
      dispatch(goToStep(id))
    },
    saveData: (state, id) => {
      dispatch(saveIslandData(state, id))
    }
  }
}


const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SmartIsland)

export default componentContainer