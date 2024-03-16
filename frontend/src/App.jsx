import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes,  Route } from 'react-router-dom'
import { Header } from './components/Header'
import { FormScreen } from './screens/FormScreen'
import { AdminScreen } from './screens/AdminScreen'

import { Container, Row, Col, Form, FormControl, Card, Dropdown, Badge, Modal, Button, OverlayTrigger, Tooltip, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import viteLogo from '/vite.svg'

function App() {


      return (
            <div>
                  <BrowserRouter>
                        <Header/>
                        <Routes >
                              <Route path="/" element={<FormScreen/>} />
                              <Route path="/admin" element={<AdminScreen/>} /> 
                        </Routes>
                  </BrowserRouter>
            </div>
      )
}

export default App
