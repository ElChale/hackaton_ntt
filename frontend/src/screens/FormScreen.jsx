import React from 'react'
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Container, Row, Col, Form, FormControl, Card, Dropdown, Badge, Modal, Button, OverlayTrigger, Tooltip, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

//import { APIProvider, Map, AdvancedMarker, Pin, Marker, InfoWindow } from '@vis.gl/react-google-maps'

import { TileLayer, useMap, MapContainer, Popup, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import { crearPedido, getRuta } from '../reducers/productReducers'

//import { MapContainer } from 'react-leaflet/MapContainer'
//import { Popup } from 'react-leaflet/Popup'
//import { Marker } from 'react-leaflet/Marker'  


const HORARIOS = {
      1: 'mañana',
      2: 'tarde',
      3: 'noche'
}

const PRODUCTOS = {
      1: 'Leche',
      2: 'Papas',
      3: 'Arroz',
      4: 'Frijoles',
      5: 'Pan',
      6: 'Huevos',
      7: 'Aceite de cocina',
      8: 'Harina de trigo',
      9: 'Azúcar',
      10: 'Sal',
      11: 'Carne',
      12: 'Pollo',
      13: 'Pasta',
      14: 'Cebolla',
      15: 'Zanahorias',
      16: 'Papel higiénico',
      17: 'Jabón de lavar',
      18: 'Detergente',
      19: 'Cepillo de dientes',
      20: 'Pasta dental'
  };
  

function FormScreen({ product }) {
      const dispatch = useDispatch()
      //Lima, Perú coords
      const center = [-12.0464, -77.0428]
      const [position, setPosition] = useState({"lat":center[0], "lng":center[1]})
      const [address, setAdress] = useState('')
      const [horario, setHorario] = useState(null)
      const [pagoHecho, setPagoHecho] = useState(false)
      const [error, setError] = useState('')

      const getReverseGeocode = async (latitude, longitude) => {
            const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
          
            try {
              const response = await fetch(apiUrl);
              if (!response.ok) {
                throw new Error('Failed to fetch address information');
              }
              const data = await response.json();
              return data;
            } catch (error) {
              console.error('Error:', error.message);
              return null;
            }
      };

      const handleSubmit = (e) => {
            e.preventDefault();
            const form_data = new FormData(e.target)
            let alimentos = form_data.getAll('alimentos').map((str) => parseInt(str,10))
            dispatch(crearPedido({latitude:position.lat, longitude:position.lng, disponible:Object.keys(HORARIOS).find(key => HORARIOS[key] === horario), alimentos:alimentos}))
            .then((result) => {
                  if (result.payload) {
                        if (result.payload.error) {
                              setError(result.payload.error)
                        } else {
                              console.log('pedido creado')
                              dispatch(getRuta())
                              setError('')
                        }
                    
                  } else {
                        setError(result.error.message)
                        
                  }
            })
      }

      const markerRef = useRef(null)
      const eventHandlers = useMemo(() => ({
            dragend() {
                  const marker = markerRef.current
                  if (marker != null) {
                  setPosition(marker.getLatLng())
                  }
            },
      }), [],)

      useEffect(() => {
            getReverseGeocode(position.lat, position.lng)
            .then(data => {
            if (data) {
                  setAdress(data.display_name)
            }
            })
            .catch(error => {
                  setAdress('Dirección desconocida')
            });
      }, [position])
      
      useEffect(() => {
            dispatch(getRuta())
      }, [])

      return (
            <div className='bg-gray-800 min-h-screen text-white'>
                  <Container className='py-5'>
                        <Form onSubmit={(e) => {handleSubmit(e)}}>
                        <Row>
                              <Col>
                                    <h3>Hacer pedido</h3>
                                    <p>Bienvenido a Good Food, donde reducimos el costo de envio de sus alimentos usando modelos de optimización</p>
                              </Col>
                        </Row>
                        <Row className='border p-4 rounded-xl'>
                              <Col>
                                    <div className='mb-4'>
                                          <h4 className='font-bold'>Canasta de alimentos</h4>
                                          <p>Escoga los alimentos que desea recibir</p>
                                          <Form.Control as="select" name="alimentos" style={{border:"1px solid #c4c4c4"}} multiple required>
                                    
                                          {Object.keys(PRODUCTOS).map((key) => (
                                                            <option key={key} value={key}>
                                                                  {PRODUCTOS[key]}
                                                            </option>
                                                      ))}
                                          
                                          </Form.Control>
                                    </div>
                                    <div className='mb-4'>
                                          <h4 className='font-bold'>Dirección</h4>
                                          <p>Arrarstre el pin para marcar la ubicación en la que desea recibir el pedido</p>
                                          <MapContainer center={center} zoom={13}  className='w-full h-[400px] mb-3' scrollWheelZoom={false}>
                                          <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                          />
                                                <Marker
                                                      draggable={true}
                                                      eventHandlers={eventHandlers}
                                                      position={position}
                                                      ref={markerRef}>
                                                </Marker>                                    
                                          </MapContainer>
                                          <p className='text-xs'>Dirección: {address}</p>
                                    </div>
                                    <div className='mb-4'>
                                          <h4 className='font-bold'>Horario</h4>
                                          <p>Ingrese el horario en el que desea recibir el pedido</p>
                                          <Dropdown className='' onSelect={setHorario} >
                                                <Dropdown.Toggle variant='light' id="horario" className='w-full d-flex items-center justify-between'>
                                                      {(horario !== null) ? horario : (<div className="text-gray-500 overflow-x-hidden ">Seleccione un horario</div>)}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                      align="end"
                                                      onChange={(e) => setHorario(e.target.value)}                                                      >
                                                      <Dropdown.Header>Horario</Dropdown.Header>
                                                      {Object.keys(HORARIOS).map((key) => (
                                                            <Dropdown.Item key={key} eventKey={HORARIOS[key]}>
                                                                  {HORARIOS[key]}
                                                            </Dropdown.Item>
                                                      ))}
                                                </Dropdown.Menu>
                                          </Dropdown>  
                                    </div>
                                    <div className='mb-4'>
                                          <h4 className='font-bold'>Pago con Yape</h4>
                                          <p>Escanee el QR para pagar con Yape, el precio se actualiza automaticamente en el QR</p>
                                          {pagoHecho ?
                                                <div ><img className='md:w-1/2 lg:w-1/3' src='/QR2.jpeg'/></div>
                                          :
                                                <div onClick={() => {setPagoHecho(true)}}><img className='md:w-1/2 lg:w-1/3' src='/QR.jpeg'/></div>
                                          }
                                          
                                    </div>
                                    <div className='mb-5'>
                                          <Button type='submit'>Hacer pedido</Button>
                                    </div>

                              </Col>
                        </Row>
                        </Form>
                  </Container>
                  <Container>
                        <Row>
                              <Col className='mb-32'>
                                          <a href={product?.url?.URL} target="_blank">RUTA OPTIMA</a>
                                          <h5>N pedidos: {product?.url?.N_PEDIDOS}</h5>
                                          <h5>N clusters: {product?.url?.N_CLUSTERS}</h5>
                              </Col>
                        </Row>
                  </Container>
      
            </div>
      )
}

export default FormScreen