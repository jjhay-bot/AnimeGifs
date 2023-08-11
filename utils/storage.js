import AsyncStorage from "@react-native-async-storage/async-storage";
// limitation max total size 6MB or max 2MB per call
export const storeData = async (key, value) => {
  try {
    if (typeof value === "string") {
      await AsyncStorage.setItem(key, value);
    } else {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    }
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) return value;
  } catch (e) {
    console.log(e);
  }
};

export const removeValue = async (keys) => {
  try {
    if (typeof value === "string") {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.multiRemove(keys);
    }
  } catch (e) {
    console.log(e);
  }

  console.log("Done.");
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};
