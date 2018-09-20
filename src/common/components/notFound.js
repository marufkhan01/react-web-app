import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/notFound.css'

const NotFound = ({ match }) => (
  <div style={{ textAlign: 'center' }}>
    <h1>404</h1>
    <p>Sidan {match.url} du sökte hittades inte</p>
    <Link to={{ pathname: '/' }}>
      <p>Tillbaka till startsidan</p>
    </Link>
  </div>
)
export default NotFound
