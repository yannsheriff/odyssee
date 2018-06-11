
//  Import modules
// --------------------------------------------------------------
import React, { Component } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Button,
} from 'react-native'
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native';
import { requestStore } from '../../redux/actions/loading'
import { firstOpening } from "../../redux/actions/isFirstOpening";
import { NavigationActions } from "react-navigation";
import LottieView from "lottie-react-native";

//  Import assets
// --------------------------------------------------------------
import images from '../../assets/images'
import { menuAnimation } from "../../assets/anim";
import styles from './styles'


//  Import Helpers
// --------------------------------------------------------------
import renderIf from '../../helpers/renderIf'



class Accueil extends Component {

    constructor(props) {
        super(props)
        this.requestFlushData = false 
        this.state = {
            reduxState: this.props.state,
            _populateStore: this.props.populateStore,
            _isFirstOpening: this.props.firstOpening
        }
    }



    componentDidMount() {
        this.animation.play()
    }

    componentWillReceiveProps(nextProps) {
        if(this.requestFlushData) {
            this.requestFlushData = false
            this.navigateVideo()
        }
        if(nextProps.state !== this.state.reduxState) {
            this.setState({reduxState: nextProps.state})
        }
    }
    async newGame() {
        await AsyncStorage.removeItem('saved')
        this.requestFlushData = true
        this.state._populateStore()
        this.state._isFirstOpening()

    }

    continueGame = () => {
        console.log(this.state.reduxState)
        if (this.state.reduxState.isOnIsland !== false) {
            this.navigateToIsland(this.state.reduxState.isOnIsland)
        } else {
            this.navigateToSailing()
        }
    }


    navigateToSailing = () => {
        const navigate = NavigationActions.navigate({
          routeName: 'Sailing',
          params: {}
        });
        this.props.navigation.dispatch(navigate);
    };

    navigateVideo = () => {
        const navigate = NavigationActions.navigate({
            routeName: 'Introduction',
        });
        this.props.navigation.dispatch(navigate);
    };

    navigateToIsland = (id) => {
        const navigate = NavigationActions.navigate({
            routeName: 'Island',
          params: { islandId: id }
        });
        this.props.navigation.dispatch(navigate);
    };

    navigateToTest = (id) => {
        const navigate = NavigationActions.navigate({
            routeName: 'Test',
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
                <View style={styles.animation}> 
                    <LottieView 
                    style={styles.animation}
                    source={ menuAnimation } 
                    speed={0.5}
                    loop={true}
                    ref={animation => this.animation = animation }
                    />
                </View>
                <View style={styles.center}>
                    {/* <View style={styles.buttonBorder}>
                        <Button
                            onPress={this.navigateToSailing}
                            title={'Aller a la navigation'}
                            color="#fff"
                        />
                    </View> */}
                    {renderIf( !this.state.reduxState.isFirstOpening,
                    <TouchableOpacity style={styles.buttonPlain}
                     onPress={ this.continueGame }>
                            <Text style={[styles.buttonText, {color:"#e3e7eb"}]} >Continuer</Text>
                    </TouchableOpacity>)}

                    <TouchableOpacity style={ !this.state.reduxState.isFirstOpening ? styles.buttonBorder : styles.buttonPlain }
                    onPress={ this.newGame.bind(this) }>

                            <Text style={[styles.buttonText, !this.state.reduxState.isFirstOpening ? {color:"#9c75d7"} : {color:"#e3e7eb"}]} >Nouvelle partie</Text>
                        </TouchableOpacity>

                    <Button
                        onPress={this.navigateToTest}
                        title={'Test'}
                        color="#fff"
                    />
                    {/* <View style={styles.buttonBorder}>
                    
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
        firstOpening: ()=> {
            dispatch(firstOpening())
        },
      }
    }
  
  const componentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Accueil)
  
  export default componentContainer