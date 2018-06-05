
//  Import modules
// --------------------------------------------------------------
import React, { Component } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native'
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native';
import { requestStore } from '../../redux/actions/loading'


//  Import Helpers
// --------------------------------------------------------------
import images from '../../assets/images'
import screen from '../../helpers/ScreenSize'
import styles from './styles'



class Accueil extends Component {

    constructor(props) {
        super(props)
        this.requestFlushData = false 
        this.state = {
            _populateStore: this.props.populateStore
        }
    }

    async newGame() {
        await AsyncStorage.removeItem('saved')
        this.requestFlushData = true
        this.state._populateStore()
    }

    componentWillReceiveProps(nextProps) {
        if(this.requestFlushData) {
            this.requestFlushData = false
            this.props.navigation.navigate('Island', { islandId: 1})
        }
    }
    

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.background}
                    source={images.homeScreen}
                    resizeMethod="scale"
                />
                <View style={styles.center}>
                    <View style={styles.buttonBorder}>
                        <Button
                            onPress={() => this.props.navigation.navigate('Sailing')}
                            title={'Aller a la navigation'}
                            color="#fff"
                        />
                    </View>
                    <View style={styles.buttonBorder}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Island', { islandId: 1})} // props news on this island
                        title={'Aller a l\'ile'}
                        color="#fff"
                    />
                    </View>
                    <View style={styles.buttonBorder}>
                    <Button
                        onPress={ this.newGame.bind(this) }
                        title={'Nouvelle partie'}
                        color="#fff"
                    />
                    </View>
                    <View style={styles.buttonBorder}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Test')}
                        title={'Test'}
                        color="#fff"
                    />
                    </View>
                </View>
            </View>
        );
    }
}


/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */
  
  const mapStateToProps = state => {
    return {
        state: state
    }
  }
  
  const mapDispatchToProps = dispatch => {
      return {
        populateStore: () => {
          dispatch(requestStore())
        },
      }
    }
  
  const componentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Accueil)
  
  export default componentContainer