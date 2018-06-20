import React, { Component } from 'react';


export default class CustomNavigationView extends Component {
    render() {
      const { navigation, router, descriptors } = this.props;
  
      return (
        <Transitioner
          configureTransition={this._configureTransition}
          descriptors={descriptors}
          navigation={navigation}
          render={this._render}
        />
      );
    }
  
    _configureTransition(transitionProps, prevTransitionProps) {
      return {
        duration: 200,
        easing: Easing.out(Easing.ease),
      };
    }
  
    _render = (transitionProps, prevTransitionProps) => {
      const scenes = transitionProps.scenes.map(scene =>
        this._renderScene(transitionProps, scene)
      );
      return <View style={{ flex: 1 }}>{scenes}</View>;
    };
  
    _renderScene = (transitionProps, scene) => {
      const { navigation, router } = this.props;
      const { routes } = navigation.state;
      const { position } = transitionProps;
      const { index } = scene;
  
      const animatedValue = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0, 1, 0],
      });
  
      const animation = {
        opacity: animatedValue,
        transform: [{ scale: animatedValue }],
      };
  
      const Scene = scene.descriptor.getComponent();
      return (
        <Animated.View key={index} style={[styles.view, animation]}>
          <Scene navigation={scene.descriptor.navigation} />
        </Animated.View>
      );
    };
  }