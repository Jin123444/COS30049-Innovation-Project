import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from '../src/footer';

const RecruitParkGuide = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.background}>
      <ScrollView>
          <View style = {styles.content}>
          <Text style={styles.title}>Become a Park Guide</Text>
          <Text style={styles.header}>About the Position</Text>
          <Text style={styles.description}>
            Park Guides play an essential role in creating a safe, enjoyable, and educational experience for visitors.
            Yor'll assist in guiding tours, protecting nature, and sharing the beauty of our parks.
          </Text>
        </View>

        <View style = {styles.content}>
          <Text style={styles.header}>Prerequisite payment</Text>
          <Text style={styles.description}>RM 10 for park guide registration</Text>
        </View>

        <View style = {styles.content}>
          <Text style={styles.header}>Responsibilities</Text>
          <Text style={styles.description}>{`\u25AA Leading guided tours`}</Text>
          <Text style={styles.description}>{`\u25AA Ensuring visitor safety`}</Text>
          <Text style={styles.description}>{`\u25AA Providing information about wildlife and plants`}</Text>
          <Text style={styles.description}>{`\u25AA Supporting park events`}</Text>
        </View>

        <View style = {styles.content}>
          <Text style={styles.header}>Requirements</Text>
          <Text style={styles.description}>{`\u25AA Friendly and approachable`}</Text>
          <Text style={styles.description}>{`\u25AA Passion for nature and education`}</Text>
          <Text style={styles.description}>{`\u25AA Able to work weekends`}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Register as Park Guide"
            color="#2C2C2C"
            onPress={() => navigation.navigate('ParkGuideRegistration')}
          />
        </View>

        <Footer/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FCFCFF',
  },

  content: {
    paddingHorizontal: 20, 
    marginTop: 30,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  header:{
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5
  },

  description: {
    fontSize: 16,
    marginBottom: 20,
  },

  buttonContainer: {
    marginTop: 20,
    padding: 20
  },
});

export default RecruitParkGuide;
