
import React from 'react'
import './Programs.css'
import {programsData} from '../../data/programsData.jsx'
import Rightarrow from '../../assets/rightArrow.png'
import { Link } from 'react-router-dom'

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

            <div className="category" key={program.id}>
              <span>{program.image}</span>
              <span>{program.heading}</span>
              <span>{program.details}</span>
              <div className="join-now">
                <span>Join Now</span> 
                <Link to = '/registrationform'><img className = "image" src={Rightarrow } alt="#" /></Link>
              </div>
            </div>

          )

          )}
        </div>
        
    </div>
  )
}

export default Programs
