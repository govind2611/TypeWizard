import React from 'react'
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import TypingBox from "../Components/TypingBox";
const Homepage = () => {
  return (
    <div>
      <div className="canvas">
        <Header />
        <TypingBox />
        <Footer />
      </div>
    </div>
  )
}

export default Homepage
