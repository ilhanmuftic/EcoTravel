import React from "react";
import "../AboutUs.css"; 

const AboutUs = () => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        color: "#333",
        padding: "40px",
        backgroundColor: "#1e1e2f",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
        {/* Title */}
        <h1 className="hover-underline" style={{ color: "white", fontSize: "2.5rem", marginBottom: "20px" }}>
          About Us
        </h1>

        {/* Welcome Text */}
        <p style={{ fontSize: "1.1rem", marginBottom: "20px", color: "white" }}>
          Welcome to <strong>GeoGuessrBosnia</strong>, a fun and educational game
          that lets you explore the beautiful landscapes, cities, and hidden
          gems of Bosnia and Herzegovina.
        </p>

        {/* Project History */}
        <h2 className="hover-underline" style={{ color: "white", fontSize: "2rem", marginTop: "30px" }}>
          Our Story
        </h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "20px" ,color: "white"}}>
          Our project started in <strong>December 2024</strong> as part of our
          Computer Science studies at SSST in Sarajevo. As passionate students
          and proud explorers of our homeland, we wanted to create something
          that combines technology, geography, and fun.
        </p>

        {/* Who We Are */}
        <h2 className="hover-underline" style={{ color: "white", fontSize: "2rem", marginTop: "30px" }}>
          Who We Are
        </h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "20px" ,color: "white"}}>
          We are a team of Computer Science students who believe in making
          learning about Bosnia and Herzegovina both interactive and exciting.
          By showcasing real locations, we aim to help people discover the
          country’s unique culture, history, and scenery—whether they're locals
          or visitors.
        </p>

        {/* Ambition Section */}
        <h2 className="hover-underline"style={{ color: "white", fontSize: "2rem", marginTop: "30px" ,color: "white"}}>
          Our Ambition
        </h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "20px" ,color: "white"}}>
          Our goal is to develop a platform that not only entertains but also
          educates. Through <strong>GeoGuessrBosnia</strong>, we hope to:
        </p>
        <ul style={{ marginLeft: "20px", fontSize: "1.1rem" ,color: "white"}}>
          <li>Highlight the beauty of Bosnia and Herzegovina.</li>
          <li>
            Encourage curiosity about local geography and culture.
          </li>
          <li>
            Inspire learning and exploration through innovative technology.
          </li>
        </ul>

        {/* Closing Message */}
        <p style={{ fontSize: "1.1rem", marginTop: "20px" ,color: "white"}}>
          This is just the beginning, and we look forward to expanding our
          platform with more features, challenges, and surprises as we grow.
          Thank you for joining us on this journey.
        </p>

        <p class="center-underline"
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginTop: "30px",
            textAlign: "center",
            color: "white",
          }}
        >
          – The GeoGuessrBosnia Team
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
