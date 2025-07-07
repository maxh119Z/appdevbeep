import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';

import { Camera, useCameraDevice, useFrameProcessor } from 'react-native-vision-camera';
import { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { Svg, Circle } from 'react-native-svg';

import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded] = useFonts({ Poppins_500Medium });

  const device = useCameraDevice('front');
  const poses = useSharedValue<poseDetection.Pose[]>([]);

  useEffect(() => {
    const setup = async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');

      await tf.ready();
      const detectorConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
      };
      const model = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        detectorConfig
      );
      setDetector(model);
      setIsReady(true);
      console.log('Pose Detector ready.');
    };

    setup();
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    if (detector) {
      try {
        detector.estimatePoses(frame as any, { flipHorizontal: true }).then((results) => {
          poses.value = results;
        });
      } catch (err) {
        console.log('Pose detection error:', err);
      }
    }
  }, [detector]);

  const animatedStyle = useAnimatedStyle(() => {
    // This hook triggers a re-render when the poses shared value changes.
    return {};
  });

  if (!isReady || !fontsLoaded || !hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <ActivityIndicator size="large" color="#9fc9ae" />
        <Text style={styles.message}>
          {!hasPermission ? "Requesting Camera Access..." : "Loading Pose Model..."}
        </Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>No front camera found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        pixelFormat="yuv"

      />

      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <Svg style={StyleSheet.absoluteFill} viewBox={`0 0 ${screenWidth} ${screenHeight}`}>
          {poses.value.map((pose: poseDetection.Pose) =>
            pose.keypoints.map((point: poseDetection.Keypoint) => {
              if (point.score && point.score > 0.5) {
                return (
                  <AnimatedCircle
                    key={point.name}
                    cx={point.x}
                    cy={point.y}
                    r={8}
                    strokeWidth={2}
                    stroke="white"
                    fill="aqua"
                  />
                );
              }
              return null;
            })
          )}
        </Svg>
      </Animated.View>

      <View style={styles.overlay}>
        <Link href="/form" asChild style={styles.linkWrapper}>
          <TouchableOpacity style={[styles.customButton, styles.shadowBox]}>
            <Text style={styles.buttonText}>{'<'}</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fdf6ec",
  },
  overlay: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 5,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  customButton: {
    backgroundColor: "#9fc9ae",
    paddingVertical: 4,
    justifyContent: "center",
    borderRadius: 12,
  },
  buttonText: {
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },
  linkWrapper: {
    width: 75,
  }
});
