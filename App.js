
import "react-native-gesture-handler";
import * as React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  Alert
} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {RNCamera} from "react-native-camera";
import {useCamera} from "react-native-camera-hooks";
import RNFS from "react-native-fs";
import Icon from "react-native-vector-icons/FontAwesome";


function HomeScreen({navigation}){
  
  return(
    <View style={styles.container} >
      <Image source={require('./a2.jpg')}  style={styles.backgroundImage} />
      <View style={styles.frame}>
      <View style={[styles.headingPart,styles.spacing]} >
          <Text style={styles.textInHeading} >Welcome to Automatic Vehicle Number Plate Detection</Text>
      </View>
      <View style={[styles.contentPart,styles.spacing]} >
          <Text style={styles.textInContent} >Let's get started.
            Click 'start' to scan the vehicle's number plate.
          </Text>
          <View style={styles.imagediv}>
            <Image  source={require("./a6.png")} 
                    style={styles.image}
            />
          </View>
          <Button onPress={() => navigation.navigate("Camera")} 
                  title="Start" 
          />
      </View>
      </View>
  </View>
  ); 
}

function CameraScreen({navigation}){
  
  const [{cameraRef},{takePicture}] = useCamera(null);
  const handleCapture =async () =>{
    try{
      const data = await takePicture();
      console.log(data.uri);
      const filePath = data.uri;
      const newFilePath = RNFS.ExternalDirectoryPath+"/MyTest.jpg";
      RNFS.moveFile(filePath,newFilePath)
          .then(()=>{
            console.log("Image Moved",filePath,"TO",newFilePath);
          })
    }catch(error){
      console.log(error);
    }
  }

  return(
    <View style={styles.cameraContainer}>
      <RNCamera ref={cameraRef}
                type={RNCamera.Constants.Type.back}
                style={styles.preview}
      >
        <View style={styles.bottom}>
          <Icon name="arrow-circle-left" size={30} color="white"
                onPress={() => navigation.navigate("Home")}
          />
          <Icon name="camera" size={40} color="white" 
                onPress={() => handleCapture()} 
          />
          <Icon name="arrow-circle-right" size={30} color="white"
                onPress={() => navigation.navigate("About")}
          />
        </View>
      
      </RNCamera>
    </View>
  )
  
}

function AboutScreen({navigation}){
  return(
    <View style={styles.aboutContainer}>
      <Text style={styles.aboutText}>This Application allows you to scan the
            number plate of a vehicle and gives you the 
            information like to whom does this vehicle belongs
            with their name.
            <Text>{"\n"}</Text>
      </Text>
      <Text style={styles.creator}>
          Creator: Insalatta Priyadharshini s
          <Text>{"\n"}</Text>
          email: insalattapriya@gmail.com
      </Text>
      <Button 
        title="Go Back"
        onPress={ () => navigation.goBack()}
      />
    </View>
  );
}


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" 
                      component={HomeScreen} 
        />
        <Drawer.Screen name="Camera" 
                      component={CameraScreen} 
        />
        <Drawer.Screen name="About" 
                      component={AboutScreen} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
  
const styles = StyleSheet.create({
  container:{
      flex:1,
  },
  frame:{
      position:"absolute",
      flex:1,
      height:"100%",
      width:"100%"
  },
  headingPart:{
      flex:3,
      justifyContent:"center",
      padding:20
  },
  contentPart:{
      flex:7,
      padding:20,
  },
  spacing:{
      margin:20
  },
  textInHeading:{
      fontSize:25,
      textAlign:"center",
      color:"white"
  },
  textInContent:{
      flex:2,
      fontSize:18,
      textAlign:"center",
      color:"black",
      
  },
  backgroundImage:{
      width:"100%",
      height:"100%"   
  },
  image:{
      width:200,
      height:100
  },
  imagediv:{
    width:300,
    height:200,
    justifyContent:"center",
    alignItems:"center"
  },
  aboutContainer:{
    flex:1,
    margin:20,
  },
  aboutText:{
    fontSize:18,
    textAlign:"center",
    flex:1,
  },
  creator:{
    flex:3,
    textAlign:"center",
    fontSize:18
  },
  cameraContainer:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    margin:20,
  },
  preview:{
    flex:1,
    alignItems:"center",
    justifyContent:"flex-end",
    padding:15
  },
  bottom:{
    width:500,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center"
  }

}); 



export default App;


