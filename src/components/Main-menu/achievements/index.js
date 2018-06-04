import React from "react";
import {
  Animated,
  Easing,
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import LottieView from "lottie-react-native";
import { connect } from "react-redux";
import screen from "../../../helpers/ScreenSize";
import { collectables } from "../../../data";
import { equipGlyph, unequipGlyph } from "../../../redux/actions/menu";
import images from "../../../assets/images";
import styles from "./styles"

import Swiper from "react-native-swiper";

// import styles from './styles';\

class Menu_achivement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectableEquipped: this.props.state.menu.collectableEquipped,
      collectables: this.prepareCollectablesData(
        this.props.state.collectables.glyphs,
        this.props.state.menu.collectableEquipped
      ),
      _equipGlyph: this.props.equipGlyph,
      _unEquipGlyph: this.props.unequipGlyph
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.state.collectables.glyphs &&
      nextProps.state.menu.collectableEquipped
    ) {
      this.setState({
        collectableEquipped: nextProps.state.menu.collectableEquipped,
        collectables: this.prepareCollectablesData(
          nextProps.state.collectables.glyphs,
          nextProps.state.menu.collectableEquipped
        )
      });
    }
  }

  prepareCollectablesData(foundedGlyphs, selectedGlyphs) {
    let collectablesArray = collectables.glyphs.map(element => {
      if (foundedGlyphs) {
        var founded = foundedGlyphs.some(
          elementFounded => elementFounded === element.id
        );
        if (selectedGlyphs) {
          var selected = selectedGlyphs.some(
            elementSelected => elementSelected === element.id
          );
        }
      }
      return {
        name: element.name,
        icon: element.icon,
        id: element.id,
        found: founded ? founded : false,
        selected: selected ? selected : false
      };
    });
    return collectablesArray;
  }

  indexDidChange = id => {
    Animated.timing(
      // Animate value over time
      this.state.paginationPosition, // The value to drive
      {
        toValue: id * (screen.width / 3),
        duration: 200 // Animate to final value of 1
      }
    ).start();
  };

  toggleSelectedGlyphe = id => {
    if (
      this.state.collectables.some(
        elementSelected => elementSelected.id === id && elementSelected.found
      )
    ) {
      if (
        this.state.collectableEquipped.some(
          elementSelected => elementSelected === id
        )
      ) {
        this.state._unEquipGlyph(id);
      } else {
        this.state._equipGlyph(id);
      }
    }
  };

  render() {
    var collectablesToDisplay = this.state.collectables.map(element => {
      return (
        <View style={styles.collectablesContainer}>
          <TouchableOpacity
            style={[
              styles.touchable,
              {
                backgroundColor: element.found
                  ? "rgba(255, 255, 255, 0.3)"
                  : null,
                borderColor: element.selected ? "red" : null,
                borderWidth: element.selected ? 1 : 0
              }
            ]}
            onPress={() => {
              this.toggleSelectedGlyphe(element.id);
            }}
          >
            <View style={{ position: "absolute" }}>
              <Image
                style={{
                  height: element.selected ? 58 : 60,
                  width: element.selected ? 58 : 60
                }}
                source={images.glyphes}
              />
              <Text style={[styles.glyphsFont, { opacity: element.found ? 1 : 0 }]}>
                {element.icon}
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.glyphesName}>{element.name}</Text>
        </View>
      );
    });
    return (
      <SafeAreaView>
        <View style={{ height: 70 }} />
        <View>
          <View>
            <View style={styles.partContainer}>
              <Text style={styles.partTitle}> Glyphes </Text>
              <View style={styles.lineTitle} />
            </View>
            <ScrollView
              style={{ marginTop: 20 }}
              contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {collectablesToDisplay}
            </ScrollView>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={styles.partConatiner}>
              <Text style={styles.partTitle}>Achievements</Text>
              <View style={styles.lineTitle} />
            </View>
            <ScrollView
              style={{ marginTop: 20 }}
              contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  height: 60,
                  width: 60,
                  backgroundColor: "black",
                  borderRadius: 50,
                  marginRight: 15
                }}
              />
              <View
                style={{
                  height: 60,
                  width: 60,
                  backgroundColor: "black",
                  borderRadius: 50,
                  marginRight: 15
                }}
              />
              <View
                style={{
                  height: 60,
                  width: 60,
                  backgroundColor: "black",
                  borderRadius: 50,
                  marginRight: 15
                }}
              />
              <View
                style={{
                  height: 60,
                  width: 60,
                  backgroundColor: "black",
                  borderRadius: 50,
                  marginRight: 15
                }}
              />
              <View
                style={{
                  height: 60,
                  width: 60,
                  backgroundColor: "black",
                  borderRadius: 50,
                  marginRight: 15
                }}
              />
              <View
                style={{
                  height: 60,
                  width: 60,
                  backgroundColor: "black",
                  borderRadius: 50,
                  marginRight: 15
                }}
              />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => {
  return { state: state };
};

const mapDispatchToProps = dispatch => {
  return {
    equipGlyph: id => {
      dispatch(equipGlyph(id));
    },
    unequipGlyph: id => {
      dispatch(unequipGlyph(id));
    }
  };
};

const componentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu_achivement);

export default componentContainer;
