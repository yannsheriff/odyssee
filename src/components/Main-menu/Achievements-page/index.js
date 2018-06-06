//  Import modules
// --------------------------------------------------------------
import React from "react";
import { SafeAreaView, ScrollView, Text, View, Image } from "react-native";
import { connect } from "react-redux";

//  Import data
// --------------------------------------------------------------
import images from "../../../assets/images"
import { collectables } from "../../../data";
import { achievement } from "../../../data";

//  Import redux
// --------------------------------------------------------------
import { equipGlyph, unequipGlyph } from "../../../redux/actions/menu";
import CollectableItem from '../Collectable-item';
import styles from "./styles";


class Menu_achivement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectableEquipped: this.props.state.menu.collectableEquipped,
      collectables: this.prepareCollectablesData(this.props.state.collectables.glyphs, this.props.state.menu.collectableEquipped),
      achievement: this.prepareAchievementsData(),
      _equipGlyph: this.props.equipGlyph,
      _unEquipGlyph: this.props.unequipGlyph
    };
  }

  /*
  * If Redux is updated
  */
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

  /*
  * Format data for Render 
  * Take : Array[all the founded glyphs id], Array [all the selected glyphs id]
  * return Array 
  */
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


  prepareAchievementsData() {
    let collectablesArray = achievement.list.map(element => {
      return {
        name: element.name,
      };
    });
    return collectablesArray;
  }


   /*
  * Toggle a glyphe if it's founded 
  * send a redux action
  */
  toggleSelectedGlyphe = id => {
    if ( this.state.collectables.some(elementSelected => elementSelected.id === id && elementSelected.found)) {
      if (this.state.collectableEquipped.some(elementSelected => elementSelected === id)) {
        this.state._unEquipGlyph(id);
      } else {
        this.state._equipGlyph(id);
      }
    }
  };

  render() {

    // ===== Render collectables ===== // 

    var collectablesToDisplay = this.state.collectables.map(element => {
      return (
        <CollectableItem 
          id={element.id}
          selected={element.selected}
          found={element.found}
          name={element.name}
          icon={element.icon}
          onPress={ this.toggleSelectedGlyphe }
        />
      );
    });


     // ===== Render collectables ===== // 

     var achievementToDisplay = this.state.achievement.map(element => {
      return (
        <View style={styles.achievementContainer}>
          <Text style={styles.achievementText}> { element.name } </Text>
          <Image 
            style={styles.achievementImage}
            source={images.glyphes}
          />
        </View>
      );
    });


     // ===== Render page ===== //

    return (
      <SafeAreaView>
        <View style={styles.header} /> 
        <View>

          {/*====== Glyphes ======*/}
          <View >
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

          {/*====== Achievements ======*/}
          <View style={{ marginTop: 20 }}>
            <View style={styles.partContainer}>
              <Text style={styles.partTitle}> Achievements </Text>
              <View style={styles.lineTitle} />
            </View>
            <ScrollView
              style={styles.scrollview}
              contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
              showsHorizontalScrollIndicator={false}
            >
              { achievementToDisplay }
              
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
