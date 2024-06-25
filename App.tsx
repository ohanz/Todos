import React, { useEffect } from 'react';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackScreenProps,} from '@react-navigation/native-stack';
import {View, Text, Button, StyleSheet} from 'react-native';

type DetailsScreenParams = {id: string};

type RootStackParamList = {
  Splash: undefined;
  Home: DetailsScreenParams;
  Details: DetailsScreenParams;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const myStyles = StyleSheet.create({
  tMargin: {
    marginBottom: 30,
  },
  sMargin:{
    marginBottom: 50, fontSize: 30, fontWeight: 'bold', color: 'green'
  },
  fMargin:{
   fontSize: 18, fontWeight: 'bold'
  }
})

function SplashScreen(){
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home', {id: '10s'}); // 10secs
    }, 3000);
  }, []);
    
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={myStyles.sMargin}>Todoz App</Text>
      <Text style={myStyles.fMargin}>Your Everyday Assistant.</Text>
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', {id: '1234'})}
      /> */}
    </View>
  );
}

function HomeScreen() {

  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={myStyles.tMargin}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', {id: '1234'})}
      />
    </View>
  );
}

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

function DetailsScreen({route}: DetailsScreenProps) {
  const {id} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text>The values recieved: {id}</Text>
    </View>
  );
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Overview', headerShown: false}}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;