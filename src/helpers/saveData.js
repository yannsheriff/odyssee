import { AsyncStorage } from 'react-native';

let instance = null;
class StoreService {
  constructor() {
    if(!instance){
      instance = this;
    }
    return instance;
  }


  async get(itemKey) {
    try {
      return await AsyncStorage.getItem(itemKey);
    } catch (error) {
      throw error;
    }
  }
  
  async getData() {
    try {
      return await AsyncStorage.getItem("saved");
    } catch (error) {
      throw error;
    }
  }
  
  async save(selectedValue) {
    try {
      let jsonValue = JSON.stringify(selectedValue);
      return await AsyncStorage.setItem("saved", jsonValue);
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

  async remove(itemKey) {
    try {
      return await AsyncStorage.removeItem(itemKey);
    } catch (error) {
      throw error;
    }
  }
}

export let storeService = new StoreService();
