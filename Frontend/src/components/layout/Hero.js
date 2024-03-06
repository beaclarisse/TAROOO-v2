import React from "react";
import "../../Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "spring",
              }}
            >
              Discover <br />
              The World of <br />
              Taro Cultivation
            </motion.h1>
          </div>
          <div className="flexColStart hero-des">
            <span className="secondaryText">
              {" "}
              Know about the benefits and nutrients from taro{" "}
            </span>
            <span className="secondaryText">
              {" "}
              Learn how to protect taro crops against diseases{" "}
            </span>
          </div>

          {/* <SearchBar /> */}

          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={8800} end={20000} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Taro Cultivators</span>
            </div>
            <div className="flexColCenter stat">
              <span>
                <CountUp end={50} />
                <span>%</span>
              </span>
              <span className="secondaryText">Known Diseases</span>
            </div>
            <div className="flexColCenter stat">
              <span>
                <CountUp end={50} />
                <span>%</span>
              </span>
              <span className="secondaryText">Unknown Diseases</span>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "spring",
            }}
            className="image-container"
          >
            <img src="..\images\hero-image.jpg" alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
