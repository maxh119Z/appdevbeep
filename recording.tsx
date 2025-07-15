import React, { useCallback, useEffect, useState } from 'react';
import HumanPose from 'react-native-human-pose';
import { View, StyleSheet, Platform, Dimensions, AppState, Button, TouchableOpacity, Text } from 'react-native';
import { request, PERMISSIONS, RESULTS, check, PermissionStatus } from 'react-native-permissions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const recording = () => {
  const [cameraPermission, setCameraPermission] = useState<PermissionStatus | null>(null);
  const [isBackCamera, setIsBackCamera] = useState(false);
  const [elbowAngle, setElbowAngle] = useState<number | null>(null);
  const [elbowPos, setElbowPos] = useState<{ x: number, y: number } | null>(null);

  const navigation = useNavigation<HomeScreenNavigationProp>();
  

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const handlePermissions = async () => {
        const platformPermission = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
        
        let result = await check(platformPermission);
        if (result !== RESULTS.GRANTED) {
          result = await request(platformPermission);
        }
        
        if (isMounted) {
          setCameraPermission(result);
        }
      };

      handlePermissions();

      // Cleanup function runs when the screen loses focus
      return () => {
        isMounted = false;
        // You might also want to set the permission to null to show a loader on refocus
        // setCameraPermission(null); 
      };
    }, [])
  );


  const onPoseDetected = (pose: any) => {
    //console.log('Pose data human pose:', JSON.stringify(pose, null, 2));
    const keypoints = pose;
    if (!keypoints || keypoints.length === 0) return;

    const ls = keypoints[11]; 
    const rs = keypoints[12]; 
    const le = keypoints[13]; 
    //console.log(ls)
    const lw = keypoints[15]; 

    //anglec
    const rlshoulder = {x: ls.x-rs.x, y:ls.y-rs.y}
    const elshoulder = { x: le.x - ls.x, y: le.y - ls.y };
    const lewrist = { x: le.x - lw.x, y: le.y - lw.y };
    const angle = (lewrist.x * elshoulder.x + lewrist.y * elshoulder.y) / (Math.sqrt(lewrist.x ** 2 + lewrist.y ** 2)*Math.sqrt(elshoulder.x ** 2 + elshoulder.y ** 2))
    const angleRad = Math.acos(Math.min(Math.max(angle, -1), 1));
    const DEGREESC = (angleRad * 180) / Math.PI;
    console.log(DEGREESC);
    
    //drawing the usestate part just saves a variable I think globally
    setElbowAngle(DEGREESC);
    const screenX = width - le.x * width;
    const screenY = le.y * height;
    setElbowPos({ x: screenX, y: screenY });

    if ([ls, rs, le, lw].some(kp => kp.visibility < 0.6)) {
      console.log("Low confidence on key joints, skipping.");
      return;
    }
  };

  return (
    <View style={{flex: 1}}>
        <TouchableOpacity style={StyleSheet.flatten([styles.customButton])} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>
              &lt;
            </Text>
        </TouchableOpacity>
      {cameraPermission === RESULTS.GRANTED ? (
        <>
          <HumanPose
         
            height={height}
            width={width}
            // Show the dots on the body
            enableKeyPoints={true}
            mode = {"single"}
            scoreThreshold={0.64}
            model="blazePose"
            enableSkeleton={true}
            // Use the state to control the camera
            isBackCamera={false}
            // The color of the dots and lines
            color={'255, 0, 0'}
            onPoseDetected={onPoseDetected}
          />
       
        </>
      ) : (
        // If permission is not granted, we show nothing, just a blank screen.
        <View />
      )}

        {elbowAngle !== null && elbowPos && (
        <Text style={{
          position: 'absolute',
          left: elbowPos.x,
          top: elbowPos.y,
          color: (elbowAngle < 35.0 || elbowAngle > 98.1) ? 'red' : 'white',
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: 4,
          fontWeight: "bold",
          fontSize: 25,
        }}>
        {elbowAngle.toFixed(2)}
      </Text>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
    customButton:{
        backgroundColor: "#9fc9ae",
        paddingVertical: 22,
        justifyContent: "center",
        borderRadius: 12,
        marginTop: 20,
        width: "75%",
    },
    buttonText: {
        color: "black",
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default recording;
