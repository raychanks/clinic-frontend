import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ConsultationRecords from '../screens/ConsultationRecords';
import ConsultationDetail from '../screens/ConsultationDetail';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Register" headerMode="none">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="ConsultationRecords"
        component={ConsultationRecords}
      />
      <Stack.Screen name="ConsultationDetail" component={ConsultationDetail} />
    </Stack.Navigator>
  );
}
