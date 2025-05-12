import React, { useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, TextInput, Modal, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = () => {
  const mapRef = useRef(null);

  const [region, setRegion] = useState({
    latitude: 1.402145,
    longitude: 110.314945,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [markers, setMarkers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newMarker, setNewMarker] = useState({
    latitude: null,
    longitude: null,
    title: '',
    description: '',
  });

  const zoom = (zoomIn = true) => {
    const factor = zoomIn ? 0.5 : 2; // smaller delta = more zoom
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * factor,
      longitudeDelta: region.longitudeDelta * factor,
    };
    setRegion(newRegion);
    mapRef.current.animateToRegion(newRegion, 300);
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setNewMarker({ ...newMarker, latitude, longitude });
    setModalVisible(true);
  };

  const handleSubmit = () => {
    if (!newMarker.title || !newMarker.description) {
      Alert.alert('Error', 'Please fill in both title and description.');
      return;
    }
    setMarkers([...markers, newMarker]);
    setModalVisible(false); // Close modal after submission
    setNewMarker({ latitude: null, longitude: null, title: '', description: '' }); // Reset form
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onPress={handleMapPress} // Detect map tap
        scrollEnabled={true}
        zoomEnabled={true}
        maxZoomLevel={30}
        minZoomLevel={18}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>

      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.button} onPress={() => zoom(true)}>
          <Text style={styles.buttonText}>＋</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => zoom(false)}>
          <Text style={styles.buttonText}>－</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for adding marker details */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Marker Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newMarker.title}
              onChangeText={(text) => setNewMarker({ ...newMarker, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newMarker.description}
              onChangeText={(text) => setNewMarker({ ...newMarker, description: text })}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  zoomControls: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Map;
