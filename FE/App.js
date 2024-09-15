import { StatusBar } from "expo-status-bar";
import NavigationStack from "./src/navigation/NavigationStack";
import SplashScreen from "./splashScreen/SplashScreen";
import { useState, useEffect } from "react";

export default function App() {
  return <NavigationStack />;
  // const [isShowSplash, setIsShowSplash] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsShowSplash(false);
  //   }, 3000);
  // }, []);

  // return <>{isShowSplash ? <SplashScreen /> : <NavigationStack />}</>;
}
