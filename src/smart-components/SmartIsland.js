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
      actions: payload.actions
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.island.actualSnippet !== this.state.snippet) {
      this.updateSnippet(nextProps.island.actualSnippetId)
    }
  }

  getSnippetData(id) { 
    let actions = [];
    const snippet = cyclopes.steps.find((index) => {
      if (index.id === id) {
        return index
      }
    });

    if (snippet.haveAction) {
      snippet.actions.forEach(element => {
        cyclopes.steps.find((index) => {
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
      actions: actions
    }

    return payload
  }


  updateSnippet(id) {
    const payload = this.getSnippetData(id)
    this.setState({
      snippet: payload.snippet,
      actions: payload.actions
    })
  }

  render() {
    return ( 
      <SafeAreaView style={{ backgroundColor: '#fff' }} >
        <View style={{
          backgroundColor: '#fff',
          height: screen.height
        }}>

          {/* <Button 
          title = {'console'}
          onPress = {() => this.updateSnippet(3)}
          />   */}
          <Narration snippet = { this.state.snippet } /> 
          <InteractionMenu actions = { this.state.actions } /> 
        </View>
      </SafeAreaView>
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