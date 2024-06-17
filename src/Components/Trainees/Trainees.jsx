import React from 'react'
import './Trainees.css'
import Trainer1 from '../../assets/Trainer1.jpg'
import Trainer2 from '../../assets/Trainer2.jpg'
import Trainer3 from '../../assets/Trainer3.jpg'
import { FaFacebook, FaInstagram, FaWhatsapp , FaYoutube } from 'react-icons/fa';

const Trainees = () => {
  return (
    <div className='traineres-container' >
        <div className="blureffect"></div>
      <div className="programs_header" style={{ gap: '2.4rem' }}>
        <span className='stroke-text'>Meet</span>
        <span>YOUR</span>
        <span className='stroke-text'>Trainers</span>
      </div>
      <div className="img-container">
        <div className="trainers-col">
          <img className='images' src={Trainer1} alt="" />
          <div className="col">
            <span>Mark Strong</span>
            <span>Cardio Trainer</span>
            <div className="trainer-socials">
              <a href="#"><FaFacebook size={20}/></a>
              <a href="#"><FaInstagram size={20}/></a>
              <a href="#"><FaWhatsapp size={20}/></a>
              <a href="#"><FaYoutube size={20}/></a>
            </div>
          </div>
        </div>
        <div className="trainers-col">
          <img className='images' src={Trainer2} alt="" />
          <div className="col">
            <span>John Doe</span>
            <span>Fitness Trainer</span>
            <div className="trainer-socials">
              <a href="#"><FaFacebook size={20}/></a>
              <a href="#"><FaInstagram size={20}/></a>
              <a href="#"><FaWhatsapp size={20}/></a>
              <a href="#"><FaYoutube size={20}/></a>
            </div>
          </div>
        </div>
        <div className="trainers-col">
          <img className='images' src={Trainer3} alt="" />
          <div className="col">
            <span>Maike Brown</span>
            <span>Fitness Trainer</span>
            <div className="trainer-socials">
              <a href="#"><FaFacebook size={20}/></a>
              <a href="#"><FaInstagram size={20}/></a>
              <a href="#"><FaWhatsapp size={20}/></a>
              <a href="#"><FaYoutube size={20}/></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trainees
