import React from "react"
import { Heading } from "../common/Heading"
import { about } from "../data/dummydata"

export const About = () => {
  return (
    <>
      <section className='about'>
        <div className='container flex'>
          {about.map((val) => (
            <>
              <div className='right' data-aos='fade-down-left'>
                <Heading title='About Software' />
                <p>{val.desc}</p>
                <p>{val.desc1}</p>
                <button>Submit</button>
                <button className='primaryBtn'>Submit</button>
              </div>
            </>
          ))}
        </div>
      </section>
    </>
  )
}
