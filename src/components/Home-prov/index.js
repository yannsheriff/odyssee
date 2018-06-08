
//  Import modules
// --------------------------------------------------------------
import React, { Component } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
} from 'react-native'
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native';
import { requestStore } from '../../redux/actions/loading'
import { NavigationActions } from "react-navigation";


//  Import Helpers
// --------------------------------------------------------------
import images from '../../assets/images'
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
            this.navigateToIsland()
        }
    }

    navigateToSailing = () => {
        const navigate = NavigationActions.navigate({
          routeName: 'Sailing',
          params: {}
        });
        this.props.navigation.dispatch(navigate);
      };

      navigateToIsland = () => {
        const navigate = NavigationActions.navigate({
          routeName: 'Island',
          params: { islandId: 1 }
        });
        this.props.navigation.dispatch(navigate);
      };
    

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.background}
                    source={images.homeScreen}
                    resizeMethod="scale"
                />
                <View style={styles.center}>
                    {/* <View style={styles.buttonBorder}>
                        <Button
                            onPress={this.navigateToSailing}
                            title={'Aller a la navigation'}
                            color="#fff"
                        />
                    </View> */}
                    <TouchableOpacity style={styles.buttonPlain}
                     onPress={ this.navigateToIsland }>
                            <Text style={[styles.buttonText, {color:"#e3e7eb"}]} >Continuer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonBorder}
                    onPress={ this.newGame.bind(this) }>

                            <Text style={[styles.buttonText, {color:"#9c75d7"} ]} >Nouvelle partie</Text>
                        </TouchableOpacity>

                    {/* <View style={styles.buttonBorder}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Test')}
                        title={'Test'}
                        color="#fff"
                    />
                    </View> */}
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