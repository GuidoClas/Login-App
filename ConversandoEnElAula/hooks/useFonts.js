import * as Font from "expo-font";
import { Inter_900Black } from "@expo-google-fonts/inter";

export default useFonts = async () => {
  await Font.loadAsync({
    Inter_900Black: Inter_900Black ,
  });
};