import React from 'react'
import "./Navbar.css"
import {
  Link
} from "react-router-dom";

const Navbar =()=> {
    return (
        <div className="navbarContainer">
            <label className='title header'>NewsBite</label>
            <div className="categories">
              <Link to="/" className="links" id="homelink">Home</Link>
              <Link to="/business" className="links" id="businesslink">Business</Link>
              <Link to="/entertainment" className="links" id="entertainmentlink">Entertainment</Link>
              <Link to="/health" className="links" id="healthlink">Health</Link>
              <Link to="/science" className="links" id="sciencelink">Science</Link>
              <Link to="/sports" className="links" id="sportslink">Sports</Link>
              <Link to="/technology" className="links" id="technologylink">Technology</Link>
            </div>
            </div>
    )
}
export default Navbar