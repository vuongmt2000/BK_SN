import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = {
    getItem: async function (key: string) {
        try {
            let item: string = await AsyncStorage.getItem(key) || '';
            if (!item) return null
            //You'd want to error check for failed JSON parsing...
            return JSON.parse(item);
        } catch (error) {
            console.log(`error`, error)
            return null;
        }
    },
    setItem: async function (key: string, value: any) {
        try {
            return await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(`error`, error)
        }
    },
    removeItem: async function (key: string) {
        try {
            return await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log(`error`, error)
        }
    },
    clearAll: async function () {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            // clear error
        }
    }
};

export default Storage;
