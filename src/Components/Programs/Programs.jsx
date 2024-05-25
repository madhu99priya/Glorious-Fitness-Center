
import React from 'react'
import './Programs.css'
import {programsData} from '../../data/programsData.jsx'
import Rightarrow from '../../assets/rightArrow.png'

const Programs = () => {
  return (
    <div className='Programs' id='Programs'>

        <div className="programs_header">
            <span className='stroke-text'>Explore our</span>
            <span>Programs</span>
            <span className='stroke-text'>to shape you</span>
        </div>

        <div className="program_categories">
          {programsData.map((program) => (

            <div className="category">
              <span>{program.image}</span>
              <span>{program.heading}</span>
              <span>{program.details}</span>
              <div className="join-now"><span>Join Now</span> <img src={Rightarrow} alt="#" /></div>
            </div>

          )

          )}
        </div>
        
    </div>
  )
}

export default Programs
