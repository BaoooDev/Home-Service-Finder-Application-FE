import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import các màn hình xác thực
import SignIn from "../view/Authen/SignIn";
import SignUp from "../view/Authen/SignUp";
import ResetPassword from "../view/Authen/ResetPassword";
import Verification from "../view/Authen/Verification";
import RequestResetPassword from "../view/Authen/RequestResetPassword";
import Log from "../view/Authen/log";

// Import các màn hình chính
import Account from "../view/Main/Account";
import Home from "../view/Main/Home";
import Activity from "../view/Main/ActivityScreen";

import JobDetail from "../view/Main/JobDetail";

// Import các màn hình dịch vụ
import AddressSelection from '../view/Service/AddressSelection';
import ServicePackage from '../view/Service/ServicePackage';
import TimeSelection from '../view/Service/TimeSelection';
import Confirmation from '../view/Service/Confirmation';
import Success from '../view/Service/Success';
import Rating from '../view/Service/Rating';

import ServiceRating from '../view/Service/ServiceRating';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tab Navigation cho các màn hình chính
const TabNavigationContainer = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home-outline" size={size} color={color} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{
          tabBarLabel: "Hoạt động",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="document-text-outline" size={size} color={color} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: "Tài khoản",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="person-outline" size={size} color={color} />;
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

// Stack Navigation cho các màn hình xác thực
const AuthenNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RequestResetPassword"
        component={RequestResetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ServiceNavigation = ({route }) => {
  const { serviceType } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddressSelection"
        component={AddressSelection}
        options={{ headerShown: false }}
        initialParams={{ serviceType }}
      />
      <Stack.Screen
        name="ServicePackage"
        component={ServicePackage}  // Đảm bảo bạn đã khai báo đúng
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TimeSelection"
        component={TimeSelection}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Confirmation"
        component={Confirmation}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
};
const RatingScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Rating"
        component={Rating}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceRating"
        component={ServiceRating}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
// Navigation Stack chính
const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Điều hướng đến màn hình xác thực */}
        <Stack.Screen
          name="Log"
          component={Log}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthenNavigation"
          component={AuthenNavigation}
          options={{ headerShown: false }}
        />

        {/* Điều hướng đến màn hình Tab chính */}
       
        <Stack.Screen
          name="TabNavigationContainer"
          component={TabNavigationContainer}
          options={{ headerShown: false }}
        />
        {/* Điều hướng đến AddressSelection */}
        <Stack.Screen
          name="ServiceNavigation"
          component={ServiceNavigation}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="Success"
          component={Success}
          options={{ headerShown: false }}
        />
         <Stack.Screen
        name="JobDetails"
        component={JobDetail}
        options={{ headerShown: false }}
      />
       <Stack.Screen
          name="RatingScreen"
          component={RatingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
