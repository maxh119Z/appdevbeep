import React, { useCallback, useState } from 'react';
import HumanPose from 'react-native-human-pose';
import { Modal, View, StyleSheet, Platform, Dimensions, TouchableOpacity, Text, useWindowDimensions, } from 'react-native';
import { request, PERMISSIONS, RESULTS, check, PermissionStatus } from 'react-native-permissions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NoticePopup from './noticepopup'

// const { width, height } = Dimensions.get('window');
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Recording = () => {
  const [isNoticeVisible, setNoticeVisible] = useState(true);
  const { width, height } = useWindowDimensions();

  const [isLeftyMode, setIsLeftyMode] = useState(false);

  const [cameraPermission, setCameraPermission] = useState<PermissionStatus | null>(null);
  const [elbowAngle, setElbowAngle] = useState<number | null>(null);
  const [elbowPos, setElbowPos] = useState<{ x: number, y: number } | null>(null);
  const [shoulderAngle, setShoulderAngle] = useState<number | null>(null);
  const [shoulderPos, setShoulderPos] = useState<{ x: number, y: number } | null>(null);
  const [isPoseReady, setIsPoseReady] = useState(false);

  const [elbowAngle2, setElbow2Angle] = useState<number | null>(null);
  const [elbowPos2, setElbow2Pos] = useState<{ x: number, y: number } | null>(null);//non dominant hand
  const [shoulder2Angle, setShoulder2Angle] = useState<number | null>(null);//non dominant handz
  const [shoulder2Pos, setShoulder2Pos] = useState<{ x: number, y: number } | null>(null);
  const [openProb, setPROB] = useState<number | null>(null);

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
      return () => {
        isMounted = false;
      };
    }, [])
  );

  const armProb = (p: number) => {
    console.log("armprob:" + p)
    if (!Number.isNaN(p)) setPROB(p);
  };
  const onPoseDetected = (pose: any) => {
    console.log("did I get a pose" + pose)
    const keypoints = pose;
    if (!keypoints || keypoints.length === 0) return;

    // const rs = keypoints[12];
    // const ls = keypoints[11];
    // const re = keypoints[14];
    // const rw = keypoints[16];

    // const le = keypoints[13]
    // const lw = keypoints[15]
    let rs, ls, re, le, rw, lw;
    if (isLeftyMode) {
      rs = keypoints[11]; // rs (right shoulder) gets LEFT_SHOULDER
      ls = keypoints[12]; // ls (left shoulder) gets RIGHT_SHOULDER
      re = keypoints[13]; // re gets LEFT_ELBOW
      le = keypoints[14]; // le gets RIGHT_ELBOW
      rw = keypoints[15]; // rw gets LEFT_WRIST
      lw = keypoints[16]; // lw gets RIGHT_WRIST
    } else {
      // Default: Right-Handed Mode
      rs = keypoints[12];
      ls = keypoints[11];
      re = keypoints[14];
      le = keypoints[13];
      rw = keypoints[16];
      lw = keypoints[15];
    }


    if ([rs, ls, re, rw].some(kp => kp.visibility < 0.6)) {
      return;
    }
    //nondominant hand
    //angle d for nondominant hand
    const lrshoulder = {x:rs.x-ls.x, y: rs.y-ls.y};
    const ellshoulder = {x:ls.x-le.x, y:ls.y-le.y};
    const ang = (lrshoulder.x * ellshoulder.x + lrshoulder.y * ellshoulder.y)/(Math.sqrt(lrshoulder.x ** 2 + lrshoulder.y ** 2) * Math.sqrt(ellshoulder.x ** 2 + ellshoulder.y ** 2));
    const angleRado = Math.acos(Math.min(Math.max(ang, -1), 1));
    let ndDEGREESD = (angleRado*180)/Math.PI;

    const nslope1 =  (rs.y - ls.y) / (rs.x - ls.x);
    const nslope2 = (le.y - ls.y) / (le.x - ls.x);
    if (nslope2 >= nslope1) {
      ndDEGREESD *= -1;
    }
    
    setShoulder2Angle(ndDEGREESD);
    const nscreenX2 = width - ls.x * width;
    const nscreenY2 = ls.y * height;
    setShoulder2Pos({ x: nscreenX2, y: nscreenY2 })

    //angleC for nondominant hand
    
    const lewrist = { x: lw.x - le.x, y: lw.y - le.y };
    const angl = (lewrist.x * ellshoulder.x + lewrist.y * ellshoulder.y) /
      (Math.sqrt(lewrist.x ** 2 + lewrist.y ** 2) * Math.sqrt(ellshoulder.x ** 2 + ellshoulder.y ** 2));
    const angleRadio = Math.acos(Math.min(Math.max(angl, -1), 1));
    const ndDEGREESC = (angleRadio * 180) / Math.PI;
   
    setElbow2Angle(ndDEGREESC);
    const ndscreenX = width - le.x * width;
    const ndscreenY = le.y * height;
    setElbow2Pos({ x: ndscreenX, y: ndscreenY });
    console.log(ndDEGREESC)

    //anglec
    const elshoulder = { x: rs.x - re.x, y: rs.y - re.y }; 
    const rewrist = { x: rw.x - re.x, y: rw.y - re.y };
    const angle = (rewrist.x * elshoulder.x + rewrist.y * elshoulder.y) /
      (Math.sqrt(rewrist.x ** 2 + rewrist.y ** 2) * Math.sqrt(elshoulder.x ** 2 + elshoulder.y ** 2));
    const angleRad = Math.acos(Math.min(Math.max(angle, -1), 1));
    const DEGREESC = (angleRad * 180) / Math.PI;
   
    setElbowAngle(DEGREESC);
    const screenX = width - re.x * width;
    const screenY = re.y * height;
    setElbowPos({ x: screenX, y: screenY });

    //angled
    const rlshoulder = { x: ls.x - rs.x, y: ls.y - rs.y };
    const angle2 = (rlshoulder.x * elshoulder.x + rlshoulder.y * elshoulder.y) /
      (Math.sqrt(rlshoulder.x ** 2 + rlshoulder.y ** 2) * Math.sqrt(elshoulder.x ** 2 + elshoulder.y ** 2));
    const angleRad2 = Math.acos(Math.min(Math.max(angle2, -1), 1));
    let DEGREESD = (angleRad2 * 180) / Math.PI;
   

    const slope1 =  (ls.y - rs.y) / (ls.x - rs.x);
    const slope2 = (re.y - rs.y) / (re.x - rs.x);
    if (slope2 < slope1) {
      DEGREESD *= -1;
    }
  //console.log(DEGREESD)
    setShoulderAngle(DEGREESD);
    const screenX2 = width - rs.x * width;
    const screenY2 = rs.y * height;
    setShoulderPos({ x: screenX2, y: screenY2 });


    if (!isPoseReady) {
    setIsPoseReady(true);
  }
  };

  

  return (
    <View style={{ flex: 1 }}>
      <NoticePopup
        visible={isNoticeVisible}
        onClose={() => setNoticeVisible(false)}
        title="Tips for Best Use"
        message="Intentional attempts to “break” the AI will succeed, but the app is designed to give effective feedback when you practice with genuine badminton form. Having a basic grasp of effective form can be useful for determining AI hallucination."
      />
      <View style={styles.headerButtonsContainer}>
        <TouchableOpacity style={StyleSheet.flatten([styles.customButton])} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>&lt;</Text>
      </TouchableOpacity>
       <TouchableOpacity 
        style={[styles.customButton, styles.leftyButton]} 
        onPress={() => setIsLeftyMode(prev => !prev)}
      >
        
        <Text style={styles.buttonText}>
          
          {isLeftyMode ? 'L' : 'R'}
        </Text>
      </TouchableOpacity>
      {openProb !== null && (
      <Text style={styles.customText}>
          {openProb}
      </Text>)}
      </View>
      
      {!isPoseReady && (
        <Text style={{ margin: "auto", alignSelf: "center", position: "absolute", zIndex: 999, top: "50%" }}>
          Camera Loading
        </Text>
      )}
      {cameraPermission === RESULTS.GRANTED ? (
        <HumanPose
          height={height}
          width={width}
          enableKeyPoints={true}
          mode="single"
          scoreThreshold={0.64}
          model="blazePose"
          enableSkeleton={true}
          isBackCamera={false}
          color={'255, 0, 0'}
          onPoseDetected={onPoseDetected}
          armProb={armProb}
        />
      ) : (
        <View />
      )}

      {elbowPos && elbowAngle !== null && (
        <View
          style={{
            position: 'absolute',
            left: elbowPos.x - 16,
            top: elbowPos.y - 16,
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: elbowAngle < 35.0 || elbowAngle > 98.1 ? 'red' : '#0FFF50',
          }}
        />
      )}

      {shoulderPos && shoulderAngle !== null && (
        <View
          style={{
            position: 'absolute',
            left: shoulderPos.x - 16,
            top: shoulderPos.y - 16,
            width: 32,
            height: 32,
            borderRadius: 16,
            // --- THIS IS THE MODIFIED LINE ---
            backgroundColor: isLeftyMode 
              ? (shoulderAngle < -10 || shoulderAngle > 30 ? 'red' : '#0FFF50') // Lefty Mode Rules
              : (shoulderAngle < -31.3 || shoulderAngle > 16.7 ? 'red' : '#0FFF50'), // Righty Mode Rules
          }}
        />
      )}

      {shoulder2Pos && shoulder2Angle !== null && (
        <View
          style={{
            position: 'absolute',
            left: shoulder2Pos.x - 16,
            top: shoulder2Pos.y - 16,
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: isLeftyMode 
              ? (shoulder2Angle < -31.3 || shoulder2Angle > 16.7 ? 'red' : '#0FFF50') // Lefty Mode Rules
              : (shoulder2Angle < -10 || shoulder2Angle > 30 ? 'red' : '#0FFF50'), // Righty Mode Rules
      
          }}
        />
      )}
      {elbowPos2 && elbowAngle2 && elbowAngle!== null && (
        <View
          style={{
            position: 'absolute',
            left: elbowPos2.x - 16,
            top: elbowPos2.y - 16,
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: elbowAngle2 < 90 || elbowAngle2 > 180 || elbowAngle2 + elbowAngle <120 || elbowAngle2 + elbowAngle > 240? 'red' : '#0FFF50',
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  customButton: {
  backgroundColor: '#9fc9ae',
  paddingVertical: 12,
  paddingHorizontal: 20,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 12,
},
customText:{
  width: 80,
  height:50,
  backgroundColor: "gray",
  color: "white",
  justifyContent: 'center',
  textAlign:"center",
  alignItems: 'center',
  fontSize:26,
  borderRadius: 12,
},

  headerButtonsContainer: {
  position: 'absolute',
  top: 50,
  left: 20,
  flexDirection: 'row',
  gap: 10,
  zIndex: 1000,
},

  headerButtons: {
    position: 'absolute',
    top: 60,
    left: 25,
    zIndex: 1000,
    flexDirection: 'row', // Arrange buttons side-by-side
  },
  leftyButton: {
    marginLeft: 10, 
    backgroundColor: '#c99fae',
  },
  buttonText: {
    color: 'black',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Recording;
