import React from 'react';
import {Platform, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-ionicons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';

// khai báo mặc định của Navigator;
const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
  },
  headerTitleStyle: {
    fontFamily: 'OpenSans-Bold',
  },
  headerBackStyle: {
    fontFamily: 'OpenSans-Regular',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'A Screen',
};

const Meals = createStackNavigator();
const MealsNavigator = () => {
  return (
    <Meals.Navigator
      //Khai báo component khoi tao
      initialRouteName="Categories"
      //Khai báo khởi tạo mặc định
      screenOptions={defaultStackNavOptions}>
      <Meals.Screen name="Categories" component={CategoriesScreen} />
      <Meals.Screen name="Category Meals" component={CategoryMealsScreen} />
      <Meals.Screen name="Meal Detail" component={MealDetailScreen} />
    </Meals.Navigator>
  );
};

// const MealsNavigator = createStackNavigator(
//   {
//     Categories: {
//       screen: CategoriesScreen,
//     },
//     CategoryMeals: {
//       screen: CategoryMealsScreen,
//     },
//     MealDetail: {
//       screen: MealDetailScreen,
//     },
//   },
//   // defined default components
//   {
//     defaultNavigationOptions: defaultStackNavOptions,
//   },
// );

// defined for display fav
const Fav = createStackNavigator();
const FavNavigator = () => {
  return (
    <Fav.Navigator
      initialRouteName="Favorites"
      screenOptions={defaultStackNavOptions}>
      <Fav.Screen name="Favorites" component={FavoritesScreen}></Fav.Screen>
      <Fav.Screen name="MealDetail" component={MealDetailScreen}></Fav.Screen>
    </Fav.Navigator>
  );
};
//     createStackNavigator(
//   {
//     Favorites: FavoritesScreen,
//     MealDetail: MealDetailScreen,
//   },
//   {
//     defaultNavigationOptions: defaultStackNavOptions,
//   },
// );

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Icon name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{fontFamily: 'OpenSans-Bold'}}>Meals</Text>
        ) : (
          'Meals'
        ),
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Icon name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={{fontFamily: 'OpenSans-Bold'}}>Favorites</Text>
        ) : (
          'Favorites'
        ),
    },
  },
};
const MealsFavNavigator = (Platform.OS = 'android'
  ? createMaterialBottomTabNavigator(tabScreenConfig, {
      activeTintColor: 'white',
      shifting: true,
      barStyle: {
        backgroundColor: Colors.primaryColor,
      },
    })
  : createBottomTabNavigator(tabScreenConfig, {
      tabBarOptions: {
        labelStyle: {
          fontFamily: 'OpenSans-Bold',
        },
      },
    }));
const FiltersNavigation = createStackNavigator(
  {
    Filters: FiltersScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);
const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavNavigator,
      navigationOptions: {
        drawerLabel: 'Meals',
      },
    },
    Filters: FiltersNavigation,
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'OpenSans-Bold',
      },
    },
  },
);

export default MainNavigator;
