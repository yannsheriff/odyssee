import React from 'react'
import Svg,{ G, Rect, Image, Circle } from 'react-native-svg'
import screen from '../../helpers/ScreenSize'
import images, { backgrounds } from '../../assets/images'
import { AsyncStorage, View } from 'react-native';

export default class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.test = {
      visitedIsland:[
        {
          id: '1',
          screenReaded: [1,5,6]
        }
      ]
    }
    this.state = {}
  }


  async get(itemKey) {
    try {
      return await AsyncStorage.getItem(itemKey);
    } catch (error) {
      throw error;
    }
  }
  
  async set(itemKey, selectedValue) {
    try {
      let jsonValue = JSON.stringify(selectedValue);
      return await AsyncStorage.setItem(itemKey, jsonValue);
    } catch (error) {
      throw error;
    }
  }

  componentDidMount() {
    this.set('savedData', this.test)
    console.log('ok')
    this.consoleDataSaved()

      
        // 
      
  
    // console.log(data)
  }

  async consoleDataSaved() {
    let dataSaved = await this.get('savedData')
    let data = JSON.parse(dataSaved)
    console.log(data.visitedIsland[0].screenReaded)
  }
  

  render() {
    return (
      <View style={{backgroundColor: "white"}}>

      </View>
    );
  }
}