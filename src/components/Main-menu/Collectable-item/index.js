import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import images from "../../../assets/images"
import styles from "./styles"
import ReactNativeHaptic from 'react-native-haptic'



export default class CollectableItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      found: this.props.found,
      selected: this.props.selected,
      id: this.props.id,
      name: this.props.name,
      icon: this.props.icon,
      onPress: this.props.onPress
    };
  }

 componentWillReceiveProps(nextProps) {
  this.setState({
    found: nextProps.found,
    selected: nextProps.selected,
    id: nextProps.id,
    name: nextProps.name,
    icon: nextProps.icon,
    onPress: nextProps.onPress
  })
 }

  toggleSelectedGlyphe = id => {
    ReactNativeHaptic.generate('selection')
    this.state.onPress(id)
  }


  render() {
    return (
      <View style={styles.collectablesContainer}>
        <TouchableOpacity
          style={[
            styles.touchable,
            {
              backgroundColor: this.state.found
                ? "rgba(255, 255, 255, 0.3)"
                : null,
              borderColor: this.state.selected ? "white" : null,
              borderWidth: this.state.selected ? 2 : 0
            }
          ]}
          onPress={() => {
            this.toggleSelectedGlyphe(this.state.id);
          }}
        >
          <View style={{ position: "absolute" }}>
            <Image
              style={{
                height: this.state.selected ? 56 : 60,
                width: this.state.selected ? 56 : 60
              }}
              source={images.glyphes}
            />
            <Text style={[styles.glyphsFont, {
              top: this.state.selected ? 20 : 22,
              width: this.state.selected ? 56 : 60,
              opacity: this.state.found ? 1 : 0 }]
            }>
              {this.state.icon}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.glyphesName}>{this.state.name}</Text>
      </View>
    );
  }
}