import React from "react";
import "../assets/css/footer.css";
import {Link} from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
function Footer() {
  return (
    <footer>
      <div className="content">
        <div className="left box">
          <div className="upper">
            <div className="topic">About us</div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
              id, ea reiciendis in dolore suscipit sapiente harum modi quae,
              ullam pariatur sed quia possimus quo officiis. Excepturi magni
              harum itaque?
            </p>
          </div>
          <div className="lower">
            <div className="topic">Contact us</div>
            <div className="phone">
              <Link to="/">
                <i className="fas fa-phone-volume"></i>+007 9089 XXXX
              </Link>
            </div>
            <div className="email">
              <Link to="/">
                <i className="fas fa-envelope"></i>abc@gmail.com
              </Link>
            </div>
          </div>
        </div>
        <div className="middle box">
          <div className="topic">Our Services</div>
          <div className="mid-topic">
            <Link to="/">Link 1</Link>
          </div>
          <div className="mid-topic">
            <Link to="/">Link 2</Link>
          </div>
          <div className="mid-topic">
            <Link to="/">Link 3</Link>
          </div>
          <div className="mid-topic">
            <Link to="/">Link 4</Link>
          </div>
          <div className="mid-topic">
            <Link to="/">Link 5</Link>
          </div>
          <div className="mid-topic">
            <Link to="/">Link 6</Link>
          </div>
        </div>
        <div className="right box">
          <div className="topic">Subscribe us</div>
          <form >
            <input type="text" placeholder="Enter email address" />
            <input type="submit" name="" value="Send" />
            <div className="media-icons">
              <Link to="/">
                <FacebookIcon sx={{fontSize:45,color:"white"}} />
              </Link>
              <Link to="/">
                <InstagramIcon sx={{fontSize:45,color:"white"}}/>
              </Link>
              <Link to="/">
                <TwitterIcon sx={{fontSize:45,color:"white"}}/>
              </Link>
              <Link to="/">
                <YouTubeIcon sx={{fontSize:45,color:"white"}}/>
              </Link>
              <Link to="/">
                <LinkedInIcon sx={{fontSize:45,color:"white"}}/>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="bottom">
        <p>
          Copyright © 2021 <Link to="/">Gandhi India</Link> All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
