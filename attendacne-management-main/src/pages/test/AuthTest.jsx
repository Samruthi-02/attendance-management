import React from 'react'
import { Box, Typography, Button } from '@mui/material'

const AuthTest = () => {
  return (
    <Box sx={{ p: 3, minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Typography variant="h4" gutterBottom>
        Authentication Test Page
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        This page bypasses authentication to test if routing works.
      </Typography>
      <Button 
        variant="contained" 
        color="primary"
        onClick={() => window.location.href = '/simple-test'}
        sx={{ mr: 2 }}
      >
        Go to Simple Test
      </Button>
      <Button 
        variant="outlined" 
        color="secondary"
        onClick={() => window.location.href = '/hr/leave-application'}
        sx={{ ml: 2 }}
      >
        Go to Leave Application
      </Button>
      <Typography variant="body2" sx={{ mt: 3 }}>
        If you can see this page, the routing is working but there's an authentication issue.
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Frontend: http://localhost:3000 | Backend: http://localhost:5000
      </Typography>
    </Box>
  )
}

export default AuthTest
