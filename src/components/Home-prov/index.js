
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


//  Import Helpers
// --------------------------------------------------------------
import images from '../../assets/images'
import screen from '../../helpers/ScreenSize'
import styles from './styles'



export default class Accueil extends Component {

    constructor(props) {
        super(props)

        this.state = {
            _updateOrientation: this.props.updateOrientation,
            _toggleSailing: this.props.toggleSailing,
            compassSensitivity: 1,
            orientation: 0,
            isCompassLocked: true
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
                        onPress={() => this.props.navigation.navigate('Island')}
                        title={'Aller a l\'ile'}
                        color="#fff"
                    />
                    </View>
                    <View style={styles.buttonBorder}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Test')}
                        title={'Test animations'}
                        color="#fff"
                    />
                    </View>
                </View>
            </View>
        );
    }
}


