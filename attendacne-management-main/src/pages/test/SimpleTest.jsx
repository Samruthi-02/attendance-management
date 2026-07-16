import React from 'react'

const SimpleTest = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <h1 style={{ color: '#1976d2' }}>Simple Test Page</h1>
      <p style={{ color: '#2196f3' }}>If you can see this, React is working properly.</p>
      <p style={{ color: '#666' }}>Frontend URL: http://localhost:3000</p>
      <p style={{ color: '#666' }}>Backend URL: http://localhost:5000</p>
    </div>
  )
}

export default SimpleTest
