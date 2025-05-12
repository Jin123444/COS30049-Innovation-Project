import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const PlantIdentification = () => {
  const [photo, setPhoto] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  //const [predictionResult, setPredictionResult] = useState(null);
  const navigation = useNavigation();

  const fetchPlant = async (scientificName) => {
    try {
      const response = await fetch(`http://192.168.0.105:5000/api/predict/plant/${encodeURIComponent(scientificName)}`);
      const data = await response.json();
      navigation.navigate('PlantDetails', { details: data });
    } catch (error) {
      console.error('Error fetching plant details:', error);
    }
    };

  const uploadPhoto = async (photoUri) => {
    const formData = new FormData();
    formData.append('file', {
      uri: photoUri,
      name: 'plant.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await fetch('http://192.168.0.105:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      const result = await response.json();
      console.log("Prediction:", result.prediction);
      //setPredictionResult(result.prediction); 
      fetchPlant(result.prediction);

    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  
  const takePic = async () => {
    if (cameraRef.current) {
      try {
        const options = {
          quality: 1,
          base64: true,
          skipProcessing: true,
        };
        const result = await cameraRef.current.takePictureAsync(options);
        setPhoto(result);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  const handleReset = () => {
    setPhoto(null);
    //setPredictionResult(null);
  };

  const handleUsePhoto = () => {
    uploadPhoto(photo.uri);
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  if (photo) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: photo.uri }}
          style={styles.fullImage}
          resizeMode="cover"
        />

        <TouchableOpacity style={styles.retakeButton} onPress={handleReset}>
          <Text style={styles.text}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.usePhotoButton} onPress={handleUsePhoto}>
          <Text style={styles.text}>Use Photo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        ref={cameraRef}
        type="back"
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePic}>
          <Text style={styles.text}>Take Picture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    flex: 1,
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#00000088',
    padding: 12,
    borderRadius: 8,
  },

  text: {
    fontSize: 18,
    color: 'white',
  },

  fullImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  retakeButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#00000088',
    padding: 12,
    borderRadius: 8,
  },

  usePhotoButton: {
    position: 'absolute',
    alignSelf: 'right',
    borderRadius: 8,
    right: 10,
    padding: 12,
    backgroundColor: '#00000088',
    marginTop: 25
  }
});

export default PlantIdentification;