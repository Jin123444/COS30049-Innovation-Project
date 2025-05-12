import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

//import Footer from './footer';
import slidePic1 from "./assets/slidePic1.jpg";
import slidePic2 from "./assets/slidePic2.png";
import slidePic3 from "./assets/slidePic3.jpg";

const images = [
  { id: "1", source:slidePic1, caption: "Explore the beauty of Semenggoh Wildlife" },
  { id: "2", source: slidePic2, caption: "Meet our rehabilitated orangutans" },
  { id: "3", source: slidePic3, caption: "Experience nature at its finest" },
];

const Homepage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  
  const handleBookingPress = () => {
    navigate('/booking');
  }

  // Function to auto-scroll the carousel
  const autoScroll = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  useEffect(() => {
    // Set interval for auto-scrolling
    const interval = setInterval(() => {
      autoScroll();
    }, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [currentIndex]);

   // Render the dots at the bottom for the current slide
  const renderDots = () => {
    return images.map((_, index) => (
      <div
        key={index}
        style={{
          ...styles.carouselDot,
          ...(index === currentIndex ? styles.activeDot : {}),
        }}
      />
    ));
  };

  // useEffect(() => {
  //   if (carouselRef.current) {
  //     carouselRef.current.scrollTo({
  //       left: carouselRef.current.offsetWidth * currentIndex,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [currentIndex]);

  return (
    <div style={styles.container}>
      {/* Carousel */}
      <div style={styles.carousel}>
        <div
          style={{
            ...styles.carouselItem,
            backgroundImage: `url(${images[currentIndex].source})`,
          }}
        />
        {/* Caption inside carousel */}
        <div style={styles.carouselCaption}>
          <h2 style={styles.captionText}>{images[currentIndex].caption}</h2>
        </div>

        {/* Dots inside carousel */}
        <div style={styles.dots}>{renderDots()}</div>

      </div>

      {/* Welcome Section */}
      <section style={styles.section}>
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Welcome to Semenggoh Wildlife Centre</h2>
          <div style={styles.divider}></div>
          <p style={styles.paragraph}>
            Established in 1975, the Semenggoh Wildlife Centre cares for wild animals 
            that are injured, orphaned, or previously kept as illegal pets. Located 
            24 km from Kuching within the Semenggoh Nature Reserve, we are dedicated 
            to wildlife conservation and rehabilitation.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section style={{...styles.section, backgroundColor: "#f5f5f5"}}>
        <div style={styles.content}>
          <div style={styles.twoColumn}>
            <div style={styles.column}>
              <h2 style={styles.sectionTitle}>Our Mission</h2>
              <div style={styles.divider}></div>
              <ul style={styles.list}>
                <li style={styles.listItem}>Rehabilitate injured and orphaned wildlife</li>
                <li style={styles.listItem}>Provide sanctuary for animals that cannot be released</li>
                <li style={styles.listItem}>Conduct research on orangutan biology and behavior</li>
                <li style={styles.listItem}>Educate the public about wildlife conservation</li>
              </ul>
            </div>
            <div style={styles.column}>
              <img 
                src={require("./assets/orangutan.jpg")} 
                alt="Orangutan at Semenggoh" 
                style={styles.roundedImage} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Orangutan Section */}
      <section style={styles.section}>
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>The Orangutan</h2>
          <div style={styles.divider}></div>
          <p style={styles.paragraph}>
            The orangutan (Pongo pygmaeus), found in the rainforests of Borneo and Sumatra, 
            is one of the world's most intelligent primates and an iconic species of the 
            Southeast Asian rainforests.
          </p>
          
          <div style={styles.cardContainer}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Physical Characteristics</h3>
              <p>Mature males can reach 150 cm in height and weigh up to 100 kg, with females being significantly smaller. Both have distinctive reddish hair.</p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Diet</h3>
              <p>Primarily frugivorous (fruit-eating), but also consume leaves, insects, bark, flowers, eggs, and small lizards.</p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Conservation Status</h3>
              <p>Endangered, with only 20,000-27,000 remaining in the wild due to habitat loss and hunting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Information */}
      <section style={{...styles.section, backgroundColor: "#f5f5f5"}}>
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Plan Your Visit</h2>
          <div style={styles.divider}></div>
          
          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <h3 style={styles.infoTitle}>Opening Hours</h3>
              <p style={styles.infoText}>8:00 AM - 10:00 AM</p>
              <p style={styles.infoText}>2:00 PM - 4:00 PM</p>
              <p style={styles.infoNote}>Daily, except weekends and public holidays</p>
            </div>
            
            <div style={styles.infoCard}>
              <h3 style={styles.infoTitle}>Feeding Times</h3>
              <p style={styles.infoText}>9:00 AM - 10:00 AM</p>
              <p style={styles.infoText}>3:00 PM - 4:00 PM</p>
              <p style={styles.infoNote}>Best time to observe the orangutans</p>
            </div>
            
            <div style={styles.infoCard}>
              <h3 style={styles.infoTitle}>Contact Information</h3>
              <p style={styles.infoText}>Phone: 082-610 088</p>
              <p style={styles.infoText}>Email: info@sarawakforestry.com</p>
              <p style={styles.infoNote}>24-hour emergency line available</p>
            </div>
          </div>
          
          <div style={styles.ctaContainer}>
            <button style={styles.ctaButton} onClick={handleBookingPress}>Book a Guided Tour</button>
          </div>
        </div>
      </section>


    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Open Sans', sans-serif",
    backgroundColor: "#FCFCFF",
    color: "#333",
    lineHeight: 1.6,
  },

  carousel: {
    position: 'relative',
    width: '100%',
    height: '550px',
    overflow: 'hidden',
    transition: "transform 0.5s ease-in-out",

  },

  carouselItem: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    filter: "brightness(0.7)",

  },

  dotsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',
    padding: '10px 0',
  },

  carouselDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#bbb',
    margin: '0 5px',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
  },

  activeDot: {
    backgroundColor: '#4CAF50',
  },
  
  carouselCaption: {
    position: "absolute",
    bottom: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    color: "white",
    width: "80%",
    maxWidth: "800px",
  },

  captionText: {
    fontSize: "40px",
    fontWeight: "700",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    marginBottom: "16px",
  },

  dots: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: "20px",
    width: "100%",
    zIndex: 10,
  },

  section: {
    padding: "60px 0",
  },

  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },

  sectionTitle: {
    fontSize: "32px",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: "24px",
    fontWeight: "700",
  },

  divider: {
    width: "80px",
    height: "4px",
    backgroundColor: "#4CAF50",
    margin: "0 auto 32px auto",
    borderRadius: "2px",
  },

  paragraph: {
    fontSize: "18px",
    marginBottom: "24px",
    textAlign: "center",
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto",
  },

  twoColumn: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "40px",
  },

  column: {
    flex: "1",
    minWidth: "300px",
  },

  roundedImage: {
    width: "100%",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },

  list: {
    paddingLeft: "20px",
  },

  listItem: {
    marginBottom: "12px",
    fontSize: "18px",
    position: "relative",
    paddingLeft: "15px",
    textAlign: 'left'
  },

  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
    marginTop: "40px",
  },

  card: {
    flex: "1",
    minWidth: "250px",
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "25px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease",
  },

  cardTitle: {
    color: "#2E7D32",
    marginBottom: "15px",
    fontSize: "21px",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    marginTop: "40px",
  },

  infoCard: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "25px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  infoTitle: {
    color: "#2E7D32",
    marginBottom: "15px",
    fontSize: "21px",
  },

  infoText: {
    fontSize: "18px",
    marginBottom: "10px",
    fontWeight: "600",
  },

  infoNote: {
    fontSize: "14px",
    color: "#666",
    fontStyle: "italic",
  },

  ctaContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "40px",
    flexWrap: "wrap",
  },

  ctaButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "12px 25px",
    borderRadius: "4px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },

  // secondbutton {
  //   backgroundColor: "transparent",
  //   color: "#4CAF50",
  //   border: "2px solid #4CAF50",
  //   padding: "12px 25px",
  //   borderRadius: "4px",
  //   fontSize: "18px",
  //   fontWeight: "600",
  //   cursor: "pointer",
  //   transition: "all 0.3s ease",
  // },

  quoteBox: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "40px",
    borderRadius: "8px",
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
  },

  quote: {
    fontSize: "24px",
    fontStyle: "italic",
    marginBottom: "20px",
  },

  quoteAuthor: {
    fontWeight: "600",
  },
};

export default Homepage;