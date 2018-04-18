//  Import modules
// --------------------------------------------------------------
import {
  Button,
  Text,
  View,
} from 'react-native'
import {
  connect
} from 'react-redux'
import React, {
  Component
} from 'react';

//  Import Components
// --------------------------------------------------------------
import Narration from '../components/Island/narration'

//  Import Actions
// --------------------------------------------------------------
import {
  goToStep
} from '../actions/island'

//  Import Data
// --------------------------------------------------------------
import {
  cyclopes
} from '../data'


class SmartIsland extends Component {

  constructor(props) {
    super(props)
    const payload = this.getSnippetData(this.props.island.actualSnippet)
    this.state = {
      snippet: payload.snippet
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.island.actualSnippet !== this.state.snippet) {
      goToSnippet(nextProps.island.actualSnippet.id)
    }
  }

  getSnippetData(id) { 
    const actions = [];
    const snippet = cyclopes.steps.find((index) => {
      if (index.id === id) {
        return index
      }
    });

    snippet.actions.forEach(element => {
      cyclopes.steps.find((index) => {
        if (index.id === element.id) {
          actions.push(index) 
        }
      });
    });

    const payload = {
      snippet: snippet,
      actions: actions
    }

    return payload
  }


  goToSnippet(id) {
    const payload = this.getSnippetData(id)
    this.setState({
      snippet: payload.snippet,
      actions: payload.actions
    })
  }

  render() {
    return ( <View >

      <Button 
      title = {'console'}
      onPress = {() => this.goToSnippet(3)}
      />  
      <Narration snippet = { this.state.snippet } /> 
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