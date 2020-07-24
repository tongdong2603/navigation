import React from 'react';
import {Platform, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-ionicons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import {CATEGORIES, MEALS} from '../data/dummy-data';

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
};

const CategoriesScreenNavigationOptions = (navData) => {
  return {
    headerTitle: 'Meal Categories',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const CategoryMealScreenNavigationOptions = (navigationData) => {
  const catId = navigationData.route.params?.categoryId ?? 'defaultValue';

  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const MealDetailScreenNavigationOptions = (navigationData) => {
  const mealId = navigationData.route.params?.mealId ?? 'defaultValue';
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  return {
    headerTitle: selectedMeal.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-star"
          onPress={() => {
            console.log('Mark as favorite!');
          }}
        />
      </HeaderButtons>
    ),
  };
};

const FavoritesScreenNavigationOptions = (navData) => {
  return {
    headerTitle: 'Your Favorites',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const FiltersScreenNavigationOptions = (navData) => {
  return {
    headerTitle: 'Filter Meals',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={navData.route.params?.save ?? 'defaultValue'}
        />
      </HeaderButtons>
    ),
  };
};

const Meals = createStackNavigator();
const MealsNavigator = () => {
  return (
    <Meals.Navigator
      //Khai báo component khoi tao
      initialRouteName="Categories"
      //Khai báo khởi tạo mặc định
      screenOptions={defaultStackNavOptions}>
      <Meals.Screen
        name="Categories"
        component={CategoriesScreen}
        options={CategoriesScreenNavigationOptions}
      />
      <Meals.Screen
        name="Category Meals"
        component={CategoryMealScreen}
        options={CategoryMealScreenNavigationOptions}
      />
      <Meals.Screen
        name="Meal Detail"
        component={MealDetailScreen}
        options={MealDetailScreenNavigationOptions}
      />
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
const FavStackNavigator = () => {
  return (
    <Fav.Navigator
      initialRouteName="Favorites"
      screenOptions={defaultStackNavOptions}>
      <Fav.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={FavoritesScreenNavigationOptions}
      />
      <Fav.Screen name="MealDetail" component={MealDetailScreen} />
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

// const tabScreenConfig = {
//   Meals: {
//     screen: MealsNavigator,
//     navigationOptions: {
//       tabBarIcon: (tabInfo) => {
//         return (
//           <Icon name="ios-restaurant" size={25} color={tabInfo.tintColor} />
//         );
//       },
//       tabBarColor: Colors.primaryColor,
//       tabBarLabel:
//         Platform.OS === 'android' ? (
//           <Text style={{fontFamily: 'OpenSans-Bold'}}>Meals</Text>
//         ) : (
//           'Meals'
//         ),
//     },
//   },
//   Favorites: {
//     screen: FavNavigator,
//     navigationOptions: {
//       tabBarIcon: (tabInfo) => {
//         return <Icon name="ios-star" size={25} color={tabInfo.tintColor} />;
//       },
//       tabBarColor: Colors.accentColor,
//       tabBarLabel:
//         Platform.OS === 'android' ? (
//           <Text style={{fontFamily: 'OpenSans-Bold'}}>Favorites</Text>
//         ) : (
//           'Favorites'
//         ),
//     },
//   },
// };
const tabMealsConfig = {
  tabBarIcon: ({color}) => {
    return <Icon name="ios-restaurant" size={25} color={color} />;
  },
  tabBarColor: Colors.primaryColor,
  tabBarLabel:
    Platform.OS === 'android' ? (
      <Text style={{fontFamily: 'OpenSans-Bold'}}>Meals</Text>
    ) : (
      'Meals'
    ),
};
const tabFavConfig = {
  tabBarIcon: ({color}) => {
    return <Icon name="ios-star" size={25} color={color} />;
  },
  tabBarColor: Colors.accentColor,
  tabBarLabel:
    Platform.OS === 'android' ? (
      <Text style={{fontFamily: 'OpenSans-Bold'}}>Favorites</Text>
    ) : (
      'Favorites'
    ),
};
const MaterialBottomTabConfig = {
  activeTintColor: 'white',
  shifting: true,
  barStyle: {
    backgroundColor: Colors.primaryColor,
  },
};
const BottomTabConfig = {
  tabBarOptions: {
    labelStyle: {
      fontFamily: 'OpenSans-Bold',
    },
  },
};
const MaterialBottomTab = createMaterialBottomTabNavigator();
const BottomTab = createBottomTabNavigator();
const MaterialBottomTabNavigator = () => {
  return (
    <MaterialBottomTab.Navigator
      shifting={true}
      activeColor="white"
      barStyle={{backgroundColor: Colors.primaryColor}}>
      <MaterialBottomTab.Screen
        name="Meals"
        component={MealsNavigator}
        options={tabMealsConfig}
      />
      <MaterialBottomTab.Screen
        name="Favorites"
        component={FavStackNavigator}
        options={tabFavConfig}
      />
    </MaterialBottomTab.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator tabBarOptions={BottomTabConfig}>
      <BottomTab.Screen name="Meals" component={MealsNavigator} />
      <BottomTab.Screen
        name="Favorites"
        component={FavStackNavigator}
        options={tabMealsConfig}
      />
    </BottomTab.Navigator>
  );
};
// const MealsFavNavigator = (Platform.OS = 'android'
//   ? createMaterialBottomTabNavigator(tabScreenConfig, {
//       activeTintColor: 'white',
//       shifting: true,
//       barStyle: {
//         backgroundColor: Colors.primaryColor,
//       },
//     })
//   : createBottomTabNavigator(tabScreenConfig, {
//       tabBarOptions: {
//         labelStyle: {
//           fontFamily: 'OpenSans-Bold',
//         },
//       },
//     }));
const MealsFavTabNavigator =
  Platform.OS === 'android' ? MaterialBottomTabNavigator : BottomTabNavigator;
const Filter = createStackNavigator();
const FilterStackNavigator = () => {
  return (
    <Filter.Navigator
      initialRouteName="Filters"
      screenOptions={defaultStackNavOptions}>
      <Filter.Screen
        name="Filters"
        component={FiltersScreen}
        options={FiltersScreenNavigationOptions}
      />
    </Filter.Navigator>
  );
};
// const FiltersNavigation = createStackNavigator(
//   {
//     Filters: FiltersScreen,
//   },
//   {
//     defaultNavigationOptions: defaultStackNavOptions,
//   },
// );

// const MainNavigator = createDrawerNavigator(
//   {
//     MealsFavs: {
//       screen: MealsFavTabNavigator,
//       navigationOptions: {
//         drawerLabel: 'Meals',
//       },
//     },
//     Filters: FiltersNavigation,
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.accentColor,
//       labelStyle: {
//         fontFamily: 'OpenSans-Bold',
//       },
//     },
//   },
// );
const Main = createDrawerNavigator();
const MainDrawerNavigator = () => {
  return (
    <Main.Navigator initialRouteName="Home">
      <Main.Screen name="Meals" component={MealsFavTabNavigator} />
      <Main.Screen name="Filters" component={FilterStackNavigator} />
    </Main.Navigator>
  );
};

export default MainDrawerNavigator;
