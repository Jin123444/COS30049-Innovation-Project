import { useState } from "react";

const FeedbackForm = () => {
    const [ratings, setRatings] = useState({});
    const [parkGuideName, setParkGuideName] = useState("");
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const setRating = (questionId, value) => {
        setRatings(prev => ({ ...prev, [questionId]: value }));
    };

    const sections = [
        {
            title: "Personality",
            questions: [
                "Was the park guide friendly and approachable?",
                "Did the guide show enthusiasm and passion for the tour?",
                "Was the guide patient and polite when answering questions?"
            ]
        },
        {
            title: "Professionalism",
            questions: [
                "Did the guide demonstrate knowledge about biodiversity and eco-tourism?",
                "Was the guide well-prepared and organized during the tour?",
                "Did the guide maintain a professional and respectful attitude throughout the tour?"
            ]
        },
        {
            title: "Communication",
            questions: [
                "How clearly did the guide explain the information?",
                "Was the guide engaging and interactive with visitors?",
                "Could the guide answer questions confidently and accurately?"
            ]
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
          alert(" You must be logged in to submit feedback.");
          window.location.href = "/login";
          return;
        }
      
        const formData = {
            parkguide_name: parkGuideName.trim(),  
            ratings: {
              s1q1: ratings.s1q1,
              s1q2: ratings.s1q2,
              s1q3: ratings.s1q3,
              s2q1: ratings.s2q1,
              s2q2: ratings.s2q2,
              s2q3: ratings.s2q3,
              s3q1: ratings.s3q1,
              s3q2: ratings.s3q2,
              s3q3: ratings.s3q3,
            },
            comment: comment.trim() === '' ? null : comment.trim()
          };

          const requiredRatings = ['s1q1', 's1q2', 's1q3', 's2q1', 's2q2', 's2q3', 's3q1', 's3q2', 's3q3'];
          const missingRatings = requiredRatings.filter(id => !ratings[id]);
          
          if (missingRatings.length > 0) {
            setMessage(`Please provide ratings for: ${missingRatings.join(', ')}`);
            return;
          }
        
          // 4. Debug output
          console.log("Submitting:", JSON.stringify(formData, null, 2));
        
        
        try {
            const response = await fetch('http://localhost:5000/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                  
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(`🎉 Thank you! Feedback submitted successfully.`);
                setSubmitted(true);
              } else {
                if (response.status === 401 || response.status === 403) {
                    alert("Your session has expired or you are unauthorized. Please log in again.");
                    localStorage.removeItem("token");
                    
                    setTimeout(() => {
                      window.location.href = "/login";
                    }, 100); // waits 100ms after alert
                    
                  return;
                }
              
                setMessage(result.error || "❌ Feedback submission failed.");
                setSubmitted(false);
              }
              
        } catch (error) {
            setMessage("🚫 Error connecting to server.");
            setSubmitted(false);
        }
    };

    return (
        <div style = {styles.container}>
            <div style = {styles.header}>
                <h2 style = {styles.title}>Feedback Form</h2>
                <p style = {styles.introText}>
                    Below is a feedback form designed to assess the park guide's performance during the tour. 
                    Visitors are kindly asked to rate the guide’s performance on a scale of 1 to 5, where 1 represents 
                    the lowest rating (needs improvement) and 5 represents the highest rating (excellent performance). 
                    Your feedback is greatly appreciated and will help enhance the overall experience. Thank you!
                </p>
            </div>

            <form onSubmit={handleSubmit} style = {styles.form}>
                <div style = {styles.formGroup}>
                    <label style = {styles.label}>What is the name of the park guide?</label>
                    <input
                        type="text"
                        value={parkGuideName}
                        onChange={(e) => setParkGuideName(e.target.value)}
                        required
                        placeholder="Enter the guide's name"
                        style = {styles.input}
                    />
                </div>

                {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} style = {styles.section}>
                        <h3 style = {styles.sectionTitle}>Section {sectionIndex + 1}: {section.title}</h3>
                        {section.questions.map((question, questionIndex) => {
                            const questionId = `s${sectionIndex + 1}q${questionIndex + 1}`;
                            return (
                                <div key={questionId} style = {styles.questionGroup}>
                                    <label style = {styles.questionText}>{question}</label>
                                    <div style={styles.ratingScale}>
                                        <span style={styles.scaleLabel}>Needs Improvement</span>
                                        <div style={styles.ratingOptions}>
                                            {[1, 2, 3, 4, 5].map(value => (
                                                <label key={value} style={styles.ratingOption}>
                                                    <input
                                                        type="radio"
                                                        name={questionId}
                                                        value={value}
                                                        onChange={() => setRating(questionId, value)}
                                                        style={styles.radioInput}
                                                    />
                                                    <span style={{
                                                        ...styles.ratingNumber,
                                                        ...(ratings[questionId] === value ? styles.ratingNumberSelected : {})
                                                    }}>{value}</span>
                                                </label>
                                            ))}
                                        </div>    
                                        <span style={styles.scaleLabel}>Excellent</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}

                <div style={styles.formGroup}>
                    <label htmlFor="feedback" style = {styles.label}>Comment:</label><br />
                    <textarea
                        id="feedback"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Do you have any additional feedback or comments about your experience with the park guide?"
                        style={styles.textarea}
                    />
                </div>
                
                <div style={styles.formActions}>
                    <button type="submit" style = {styles.submitButton}>Submit</button><br /><br />
                </div>

                {message && (
                    <div style={{
                        ...styles.message,
                        ...(submitted ? styles.messageSuccess : styles.messageError)
                    }}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '32px',
        color: '#333'
    },
  
    header: {
        textAlign: 'center',
        marginBottom: '32px'
    },

    title: {
        fontSize: '32px',
        marginBottom: '8px'
    },

    introText: {
        color: '#666',
        lineHeight: '1.6',
        textAlign: 'justify'
    },

    form: {
        background: '#fff',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    },

    formGroup: {
        marginBottom: '24px'
    },

    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '600',
        color: '#2E7D32',
        textAlign: 'left'
    },

    input: {
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
        transition: 'border-color 0.3s'
    },

    inputFocus: {
        outline: 'none',
        borderColor: '#4CAF50',
        boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.2)'
    },

    section: {
        marginBottom: '32px',
        paddingBottom: '24px',
        borderBottom: '1px solid #eee'
    },

    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        color: '#2E7D32',
        marginBottom: '24px',
    },

    sectionNumber: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        height: '28px',
        backgroundColor: '#4CAF50',
        color: 'white',
        borderRadius: '50%',
        marginRight: '12px',
        fontSize: '14px'
    },

    questionGroup: {
        marginBottom: '24px'
    },

    questionText: {
        display: 'block',
        marginBottom: '12px',
        fontWeight: '500',
        textAlign: 'left'
    },

    ratingScale: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '8px'
    },

    scaleLabel: {
        fontSize: '12px',
        color: '#666',
        whiteSpace: 'nowrap',
    },

    ratingOptions: {
        display: 'flex',
        gap: '8px',
        flexGrow: '1',
        justifyContent: 'center'
    },
    
    ratingOption: {
        position: 'relative'
    },

    radioInput: {
        position: 'absolute',
        opacity: '0'
    },

    ratingNumber: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '36px',
        height: '36px',
        backgroundColor: '#f5f5f5',
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontWeight: '500'
    },

    ratingNumberSelected: {
        backgroundColor: '#4CAF50',
        color: 'white',
        transform: 'scale(1.1)'
    },

    textarea: {
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
        transition: 'border-color 0.3s',
        minHeight: '120px',
        resize: 'vertical'
    },

    formActions: {
        textAlign: 'center',
        marginTop: '32px'
    },

    submitButton: {
        backgroundColor: '#2C2C2C',
        color: 'white',
        border: 'none',
        padding: '12px 32px',
        fontSize: '15px',
        fontWeight: '600',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    },

    submitButtonHover: {
        backgroundColor: '#3d8b40'
    },

    message: {
        padding: '16px',
        borderRadius: '4px',
        marginTop: '24px',
        textAlign: 'center',
        fontWeight: '500'
    },

    messageSuccess: {
        backgroundColor: '#e8f5e9',
        color: '#2E7D32',
        border: '1px solid #a5d6a7'
    },

    messageError: {
        backgroundColor: '#ffebee',
        color: '#c62828',
        border: '1px solid #ef9a9a'
    }
};

export default FeedbackForm;