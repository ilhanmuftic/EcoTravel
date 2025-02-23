import React from "react";
import "../AboutUs.css";
import Navbar from "./Navbar";

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
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
        {/* Title */}
        <h1 className="hover-underline" style={{ color: "white", fontSize: "2.5rem", marginBottom: "20px" }}>
          About Us
        </h1>

        {/* Welcome Text */}
        <p style={{ fontSize: "1.1rem", marginBottom: "20px", color: "white" }}>
          Welcome to <strong>EcoTravel</strong>, an exciting and eco-friendly initiative combining technology, tourism, and environmental awareness.
        </p>

        {/* Project History */}
        <h2 className="hover-underline" style={{ color: "white", fontSize: "2rem", marginTop: "30px" }}>
          Our Story
        </h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "20px", color: "white" }}>
          Our project, <strong>EcoTravel</strong>, began during the <strong>Hackathon</strong> event in February 2025. As a team of passionate tech enthusiasts and advocates for eco-friendly tourism, we saw an opportunity to blend gaming, geography, and environmental consciousness in a meaningful way.
        </p>

        {/* Our Approach */}
        <h2 className="hover-underline" style={{ color: "white", fontSize: "2rem", marginTop: "30px" }}>
          Our Approach
        </h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "20px", color: "white" }}>
          We aim to build a unique platform where users can guess locations in Bosnia and Herzegovina while evaluating their eco-friendliness. Using a combination of Google ratings and an eco scale, we provide a rating system that guides users to the most sustainable and eco-friendly tourist destinations in the region.
        </p>

        {/* Key Features */}
        <h2 className="hover-underline" style={{ color: "white", fontSize: "2rem", marginTop: "30px", color: "white" }}>
          Key Features
        </h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "20px", color: "white" }}>
          Our platform includes three categories based on ratings and eco-friendliness:
        </p>
        <ul style={{ marginLeft: "20px", fontSize: "1.1rem", color: "white" }}>
          <li><strong>High Rating + High Eco</strong> = Recommended (Great for users)</li>
          <li><strong>High/Mid Rating + Low/Mid Eco</strong> = High Touristic Potential (Perfect for NGOs, tourist agencies, eco agencies, and governments)</li>
          <li><strong>Low Rating + Low Eco</strong> = Hazard (A concern for eco NGOs and governments)</li>
        </ul>

        <p style={{ fontSize: "1.1rem", marginBottom: "20px", color: "white" }}>
          Additionally, we take into account factors such as air quality in cities, making our recommendations more informed and aligned with eco-friendly values.
        </p>

        {/* Closing Message */}
        <p style={{ fontSize: "1.1rem", marginTop: "20px", color: "white" }}>
          Our mission is to help you discover the best sustainable travel spots while making a positive impact on the environment. As we grow, we aim to include more features, user feedback, and environmental data for a more robust experience.
        </p>

        <p className="center-underline"
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginTop: "30px",
            textAlign: "center",
            color: "white",
          }}
        >
          – The EcoTravelBiH Team
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
