import React from "react";
import "../assets/css/footer.css";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import foot from '../assets/footer.jpg';

function Footer() {
  return (
    <div className="main-footer">
      <div
        className="footer-ab"
        style={{
          position: "absolute",
          width: "90%",
          height: "50vh",
          margin: "0 auto",
          zIndex: 21,
          marginTop: "-300px",
          marginLeft: "5%",
          borderRadius:'20px'
        }}
      >
        <img src={foot} alt="digital-india" style={{position:'absolute', height:'50vh', width:'100%', objectFit:'cover', borderRadius:'20px', border:'5px solid #FFB700'}} />
        <div style={{position:'absolute',display:'flex', flexDirection:'column',justifyContent:'space-around', padding:'20px'}}>
          <h3 style={{color:'#fff'}}>GANDHI INDIA INITIATE</h3>
          <h1 style={{color:' #FFB700', fontSize:'45px'}}>Digital Villages</h1>
          <p style={{color:'#fff'}}>In this highly developed era, the rural market relatively rules the Indian economy. So, most marketers try to reach the rural market and rural consumers in India. This blog will provide you information about the best rural marketing strategies to target rural consumers. Rural India is one of the essential and huge markets which is changing fast with time. The rural market in India is not a separate entity in itself and is highly influenced by the social and behavioural factors operating in the country. The rural market encompasses all marketing activities, facilitating demand, product planning, distribution and the entire marketing process aimed at the satisfaction of the rural consumer. A rural market includes all those business activities involved in the flow of goods and services from producers to rural consumers. Rural marketing is also much easier than the pioneers as the means of transport and communication have improved a lot during the last decade. Many ways help marketers to reach the rural market and rural consumers.</p>
        </div>
      </div>
      <footer>
        <div className="content">
          <div className="left box">
            <div className="upper">
              <div className="topic">About us</div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Quisquam id, ea reiciendis in dolore suscipit sapiente harum
                modi quae, ullam pariatur sed quia possimus quo officiis.
                Excepturi magni harum itaque?
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input type="text" placeholder="Enter email address" />
              <input type="submit" name="" value="Send" />
              <div className="media-icons">
                <Link to="/">
                  <FacebookIcon sx={{ fontSize: 45, color: "white" }} />
                </Link>
                <Link to="/">
                  <InstagramIcon sx={{ fontSize: 45, color: "white" }} />
                </Link>
                <Link to="/">
                  <TwitterIcon sx={{ fontSize: 45, color: "white" }} />
                </Link>
                <Link to="/">
                  <YouTubeIcon sx={{ fontSize: 45, color: "white" }} />
                </Link>
                <Link to="/">
                  <LinkedInIcon sx={{ fontSize: 45, color: "white" }} />
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="bottom">
          <p>
            Copyright © 2021 <Link to="/">Gandhi India</Link> All rights
            reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
