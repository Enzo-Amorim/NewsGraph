import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NewsPage from './pages/NewsPage'
import NewDetail from './pages/NewDetail';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
        <Stack.Navigator headerMode='none' initialRouteName="NewsPage">
          <Stack.Screen name="NewsPage" component={NewsPage} />
          <Stack.Screen name="NewDetail" component={NewDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}
