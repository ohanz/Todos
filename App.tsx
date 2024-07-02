import React, { useEffect } from 'react';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackScreenProps,} from '@react-navigation/native-stack';
import {View, Text, Button, StyleSheet} from 'react-native';

type DetailsScreenParams = {id: string; age: number};

type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
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
  ,
  signInHeader: {
    fontSize: 30, fontWeight: 'bold'
  },
  headerSub: {
   fontSize: 25, textDecorationStyle: 'solid'
  }
})

function SplashScreen(){
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate('Home', {id: '10s', age: 0}); // 10secs
      // subsequent updates will check if loggedIn 
      //so as to take to home directly using ReactStorage mechanism
      navigation.navigate('SignIn'); // 10secs
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


function SignInScreen() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={myStyles.signInHeader}>Sign In Here</Text>
      <Text style={myStyles.headerSub}>Enter Details To Sign-In Below: </Text>
      <Button
        title="Sign In Now"
        onPress={() => navigation.navigate('Home', {id: 'name', age: 45})}
      />
      <View style={{marginTop: 30}}>
        <Button
        title="Sign Up Instead"
        onPress={() => navigation.navigate('SignUp')}
      />
      </View>
    </View>
  );
}

function SignUpScreen() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={myStyles.signInHeader}>Sign Up Here</Text>
      <Text style={myStyles.headerSub}>Enter Your Details Below: </Text>
      <Button
        title="Sign Up Now"
        onPress={() => navigation.navigate('Home', {id: 'name', age: 45})}
      />
      <View style={{marginTop: 30}}>
        <Button
        title="Sign In Here"
        onPress={() => navigation.navigate('SignIn')}
      />
      </View>
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
        onPress={() => navigation.navigate('Details', {id: '1234', age: 20})}
      />
    </View>
  );
}

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

function DetailsScreen({route}: DetailsScreenProps) {
  const {id} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Welcome To Your Profile Screen</Text>
      <Text>The values recieved: {id}</Text>
    </View>
  );
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen}/>
      <Stack.Screen name="SignUp" component={SignUpScreen}/>
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