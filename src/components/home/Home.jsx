import React from "react"
import { About } from "../pages/About"
import { Contact } from "../pages/Contact"
import { Counter } from "../pages/Counter"
import { Services } from "../pages/Services"
import { Hero } from "./Hero"
import Photo from "../Photo"
import Img5 from '../data/images/Img5.png'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Photo2 from "../pages/Photo2"
import Photo3 from "../pages/Photo3"
export const Home = () => {
  return (
    <>
      <Hero />
      <p style={{fontSize:'12px',fontWeight:'10em'}}>Upload Image Here</p>
      {/* <Photo2/> */}
      <Row>
        <Col><img src={Img5} height={'400px'} width={'1300px'}></img></Col>
      </Row>
      <Photo/>
      <Photo3/>
      <About />
      <Services/>
      <Counter />
      <Contact />
    </>
  )
}
