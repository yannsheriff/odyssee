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
import { goToStep } from '../actions/island'

//  Import Data
// --------------------------------------------------------------
import { cyclopes } from '../data'

//  Import Helpers
// --------------------------------------------------------------
import screen from '../helpers/ScreenSize'



class SmartIsland extends Component {

  constructor(props) {
    super(props)
    const payload = this.getSnippetData(this.props.island.actualSnippetId)
    this.state = {
      snippet: payload.snippet,
      actions: payload.actions,
      offsets: payload.offsets
    }
  }

  
 /*
  *  Update the current snippet 
  */
componentWillReceiveProps(nextProps) {
  if (nextProps.island.actualSnippet !== this.state.snippet) {
    this.updateSnippet(nextProps.island.actualSnippetId)
  }
}


 /*
  *  Load the data of the wanted Snippet
  */
  getSnippetData(id) { 
    let actions = [];
    const snippet = cyclopes.writting.steps.find((index) => {
      if (index.id === id) {
        return index
      }
    });

    const offsets = cyclopes.illustrations.steps.find((index) => {
      if (index.id === id) {
        return index
      }
    });

    if (snippet.haveAction) {
      snippet.actions.forEach(element => {
        cyclopes.writting.steps.find((index) => {
          if (index.id === element.id) {
            actions.push(index) 
          }
        });
      });
    } else {
      actions = false;
    }

    const payload = {
      snippet: snippet,
      actions: actions, 
      offsets: offsets
    }

    return payload
  }


 /*
  *  Update the current snippet 
  */
  updateSnippet(id) {
    const payload = this.getSnippetData(id)
    this.setState({
      snippet: payload.snippet,
      actions: payload.actions,
      offsets: payload.offsets
    })
  }

  render() {
    return ( 

        <View style={{
          backgroundColor: '#fff',
          height: screen.height
        }}>
          <Illustrations offsets={this.state.offsets}/>
          <Narration snippet = { this.state.snippet } /> 
          <InteractionMenu actions = { this.state.actions } /> 
        </View>

    );
  }
}


const mapStateToProps = state => {
  return {
    island: state.island
  }
}


const componentContainer = connect(
  mapStateToProps
)(SmartIsland)

export default componentContainer