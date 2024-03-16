import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function Header() {
      return (
            <div className='w-full py-3 bg-gray-900 text-white'>
                  <Container>
                        <Row>
                              <Col>
                                    <h5>Cheap Quality Food App </h5>
                              </Col>
                        </Row>
                  </Container>
            </div>
      )
}

export default Header
