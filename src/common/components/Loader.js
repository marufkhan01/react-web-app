import React from 'react'
import '../assets/loader.css'

export default ({ show }) => (
    <div className="loader" style={{ display: show ? 'inherit' : 'none' }}></div>
)