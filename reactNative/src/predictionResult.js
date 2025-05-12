import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const PlantDetails = () => {
  const route = useRoute();
  const { details } = route.params;
  const navigation = useNavigation();

  const handleReturnPress = () => {
    navigation.navigate('Plant');
  }

  if (!details) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No plant details available.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
        {details.ImageURL && (
        <Image
          source={{ uri: details.ImageURL }}
          style={styles.image}
          resizeMode="cover"
        />
        )}
        <Text style={styles.title}>{details.ScientificName}</Text>
        
        <Text style={styles.label}>Common Name:</Text>
        <Text style={styles.subtitle}>{details.CommonName}</Text>

        <Text style={styles.label}>Family:</Text>
        <Text style={styles.text}>{details.Family}</Text>

        <Text style={styles.label}>Description:</Text>
        <Text style={styles.text}>{details.Description}</Text>

        <Text style={styles.label}>Functions:</Text>
        <Text style={styles.text}>{details.Functions}</Text>

        <Text style={styles.label}>Habitat:</Text>
        <Text style={styles.text}>{details.Habitat}</Text>

       <View style = {styles.button}>
            <Button
            title="Return"
            color="#4CAF50"
            onPress={handleReturnPress}
            />
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fbfaf5',
    flexGrow: 1,
  },

  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 18,
    color: '#000000',
    fontStyle: 'italic',
    marginBottom: 15,
  },

  label: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 10,
  },

  text: {
    fontSize: 16,
    color: '#00000',
  },

  errorText: {
    fontSize: 18,
    color: 'red',
    alignSelf: 'center',
  },

  button: {
    marginTop: 20,
    width: '100%', 
    borderRadius: 16,
    overflow: 'hidden',
  }
});

export default PlantDetails;
