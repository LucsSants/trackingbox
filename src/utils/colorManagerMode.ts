import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorMode, StorageManager } from "native-base";

export const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem('@color-mode', String(value));
    } catch (e) {
      console.log(e);
    }
  },
};
