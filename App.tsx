import React, { useEffect, useState } from 'react';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackScreenProps,} from '@react-navigation/native-stack';
import {View, Text, Button, StyleSheet, TouchableOpacity, SafeAreaView, TextInput} from 'react-native';

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
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    // padding: 8,
    // margin: 24,
  },
  containerView: {
     padding: 8,
    margin: 24,
  },
  SignHeader: {
    alignItems: 'center'
  },
  inputView : {
    gap : 15,
    width : "100%",
    paddingHorizontal : 40,
    marginBottom  :5
  },
  input : {
    height : 50,
    paddingHorizontal : 20,
    borderColor : "red",
    borderWidth : 1,
    borderRadius: 7
  },
  /* Here style the text of your button */
  customBtnText: {
    fontSize: 23,
    textAlign:'center',
    fontWeight: '400',
    color: "#fff",
},

/* Here style the background of your button */
customBtnBG: {
backgroundColor: 'green',//"#007aff",
// paddingHorizontal: 30,
// paddingVertical: 5,
borderRadius: 30,
marginTop: 30,
width: 300, height: 40
},
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
    <SafeAreaView style={myStyles.container} >
     {/* style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}> */}
     <View style={myStyles.containerView}>
     <View style={myStyles.SignHeader}>
     <Text style={myStyles.signInHeader}>Sign In Here</Text>
     <Text style={myStyles.headerSub}>Enter Details To Sign-In Below: </Text>
     <View style={myStyles.inputView}>
            <TextInput style={myStyles.input} placeholder='EMAIL OR USERNAME' autoCorrect={false}
        autoCapitalize='none' />
            <TextInput style={myStyles.input} placeholder='PASSWORD'  autoCorrect={false}
        autoCapitalize='none'/>
        </View>
     </View>
      
      {/* <Button
        title="Sign In Now"
        onPress={() => navigation.navigate('Home', {id: 'name', age: 45})}
      /> */}
       {/* Custom Button  */}
        <TouchableOpacity
          style={myStyles.customBtnBG}
          onPress={() => navigation.navigate('Home', {id: 'name', age: 45})} 
        >
          <Text style={myStyles.customBtnText}>Sign In Now</Text>
        </TouchableOpacity>
      <View style={{marginTop: 30}}>
        <Button
        title="Sign Up Instead"
        onPress={() => navigation.navigate('SignUp')}
      />
      </View>
     </View>
    </SafeAreaView>
  );
}

function SignUpScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={myStyles.signInHeader}>Sign Up Here</Text>
      <Text style={myStyles.headerSub}>Enter Your Details Below: </Text>
      {/* <Button
        title="Sign Up Now"
        onPress={() => navigation.navigate('Home', {id: 'name', age: 45})}
      /> */}
      <TouchableOpacity
          style={myStyles.customBtnBG}
          onPress={() => navigation.navigate('Home', {id: 'name', age: 45})} 
        >
          <Text style={myStyles.customBtnText}>Sign Up Now</Text>
        </TouchableOpacity>
      <View style={{marginTop: 30}}>
        <Button
        title="Sign In Here"
        onPress={() => navigation.navigate('SignIn')}
      />
      </View>
    </SafeAreaView>
  );
}

function HomeScreen() {

  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={myStyles.tMargin}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', {id: '1234', age: 20})}
      />
      <View style={{marginTop: 50}}>
      <Button
        title="Log Out"
        onPress={() => navigation.navigate('SignIn')}
      />
      </View>
    </SafeAreaView>
  );
}

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

function DetailsScreen({route}: DetailsScreenProps) {
  const {id} = route.params;
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Welcome To Your Profile Screen</Text>
      <Text>The values recieved: {id}</Text>
    </SafeAreaView>
  );
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="SignIn" options={{title: 'Sign-In', headerShown: false}} 
       component={SignInScreen}/>
      <Stack.Screen name="SignUp" options={{title: 'Sign Up', headerShown: false}}
       component={SignUpScreen}/>
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