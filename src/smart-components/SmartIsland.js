//  Import modules
// --------------------------------------------------------------
import { 
  Button, 
  Text, 
  View, 
} from 'react-native'
import { connect } from 'react-redux'
import React, { Component } from 'react';

//  Import Components
// --------------------------------------------------------------
import Narration from '../components/Island/narration'

//  Import Actions
// --------------------------------------------------------------
import { goToStep } from '../actions/island'

//  Import Data
// --------------------------------------------------------------
import { cyclopes } from '../data'


class SmartIsland extends Component {

  constructor(props) {
    super(props)
    const actualSnippet = this.getSnippetData(this.props.island.actualSnippet)
    console.log(actualSnippet)
    
    this.state = {
      snippet: actualSnippet
    }
  }

  getSnippetData(id) { 
    const snippet = cyclopes.steps.find((index) => {
      if(index.id === id) {
        return index
      }
    });
    return snippet
  }

  goToSnippet(id) {
    const snip = this.getSnippetData(id)
    this.setState({ snippet: snip })
  }

    render() {
        return (
            <View>
                
                <Button
                  title={'console'}
                  onPress={ () => this.goToSnippet(3) } 
                /> 
                <Narration snippet={ this.state.snippet }/>
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