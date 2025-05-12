import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';

const FeedbackForm = () => {
    const [visitorName, setVisitorName] = useState('');
    const [guideName, setGuideName] = useState('');
    const [ratings, setRatings] = useState({});
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({});

    const setRating = (questionId, value) => {
        setRatings(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = () => {
        console.log('Submitted Data:', { visitorName, guideName, ratings, comment });
        Alert.alert('Submitted', 'Your feedback has been submitted. Thank you!');
    };

    const validateForm=()=>
    {
        let errors={
            ratings: {}
        };
        
        if(!visitorName)
        {
            errors.visitorName = "Please enter your name";
        }
        
        if(!guideName)
        {
            errors.guideName = "Please enter park guide's name";
        }

        sections.forEach((section, sectionIndex) => {
            section.questions.forEach((_, questionIndex) => {
                const questionId = `s${sectionIndex + 1}q${questionIndex + 1}`;
                if (!ratings[questionId]) {
                errors.ratings[questionId] = "Please rate this question";
                }
            });
        });


        setErrors(errors);
        if(!errors.visitorName && !errors.guideName && !errors.ratings)
        {
            handleSubmit();
        }
    }

    const sections = [
    {
      title: 'Personality',
      questions: [
        'Was the park guide friendly and approachable?',
        'Did the guide show enthusiasm and passion for the tour?',
        'Was the guide patient and polite when answering questions?',
      ],
    },
    {
      title: 'Professionalism',
      questions: [
        'Did the guide demonstrate knowledge about biodiversity and eco-tourism?',
        'Was the guide well-prepared and organized during the tour?',
        'Did the guide maintain a professional and respectful attitude throughout the tour?',
      ],
    },
    {
      title: 'Communication',
      questions: [
        'How clearly did the guide explain the information?',
        'Was the guide engaging and interactive with visitors?',
        'Could the guide answer questions confidently and accurately?',
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      <Text style={styles.title}>Feedback Form</Text>
      <Text style={styles.description}>
        Below is a feedback form designed to assess the park guide's performance during the tour. 
        Visitors are kindly asked to rate the guide’s performance on a scale of 1 to 5, where 1 represents 
        the lowest rating (needs improvement) and 5 represents the highest rating (excellent performance). 
        Your feedback is greatly appreciated and will help enhance the overall experience. Thank you!
      </Text>

      <Text style={styles.label}>What is your name?</Text>
      <TextInput
        style={styles.input}
        value={visitorName}
        onChangeText={setVisitorName}
        placeholder="Your name"
      />
       {
        errors.visitorName?<Text style={styles.errorText}>
        {errors.visitorName}</Text>: null
       }

      <Text style={styles.label}>What is the name of the park guide?</Text>
      <TextInput
        style={styles.input}
        value={guideName}
        onChangeText={setGuideName}
        placeholder="Park guide's name"
      />
      {
        errors.guideName?<Text style={styles.errorText}>
        {errors.guideName}</Text>: null
      }

      {sections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>
            Section {sectionIndex + 1} – {section.title}
          </Text>

          {section.questions.map((question, questionIndex) => {
            const questionId = `s${sectionIndex + 1}q${questionIndex + 1}`;
            return (
              <View key={questionId} style={styles.questionBlock}>
                <Text style={styles.question}>{question}</Text>
                <View style={styles.ratingRow}>
                  {[1, 2, 3, 4, 5].map(value => (
                    <TouchableOpacity
                      key={value}
                      style={[
                        styles.ratingButton,
                        ratings[questionId] === value && styles.ratingSelected,
                      ]}
                      onPress={() => setRating(questionId, value)}
                    >
                      <Text style={styles.ratingText}>{value}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {errors.ratings && errors.ratings[questionId] && (
                <Text style={styles.errorText}>
                    {errors.ratings[questionId]}
                </Text>
                )}
              </View>
            );
          })}
        </View>
      ))}

      <Text style={styles.label}>Comment:</Text>
      <TextInput
        style={styles.textarea}
        value={comment}
        onChangeText={setComment}
        placeholder="Do you have any additional feedback?"
        multiline
        numberOfLines={6}
      />

      <TouchableOpacity style={styles.submitButton} onPress={validateForm}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  description: {
    fontSize: 14,
    marginBottom: 20,
    color: '#555',
  },

  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2C2C2C',
  },

  questionBlock: {
    marginBottom: 12,
  },

  question: {
    fontSize: 15,
    marginBottom: 6,
  },

  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  ratingButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
    width: 40,
    alignItems: 'center',
  },

  ratingSelected: {
    backgroundColor: '#4CAF50',
  },

  ratingText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  textarea: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },

  submitButton: {
    backgroundColor: '#2C2C2C',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  errorText: {
    color: 'red',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
});

export default FeedbackForm;