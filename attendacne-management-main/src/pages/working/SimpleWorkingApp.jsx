import React, { useState } from 'react'
import { Box, Typography, Button, Card, CardContent, TextField, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material'
import { ArrowBack, Event, Send, CheckCircle, Cancel, Schedule } from '@mui/icons-material'

const SimpleWorkingApp = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'Engineering',
      leaveType: 'Annual Leave',
      startDate: '2024-01-15',
      endDate: '2024-01-19',
      days: 5,
      reason: 'Family vacation',
      status: 'approved',
      appliedDate: '2024-01-10'
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      employeeId: 'EMP002',
      department: 'HR',
      leaveType: 'Sick Leave',
      startDate: '2024-01-20',
      endDate: '2024-01-21',
      days: 2,
      reason: 'Medical appointment',
      status: 'pending',
      appliedDate: '2024-01-19'
    }
  ])

  const [formData, setFormData] = useState({
    leaveType: 'annual',
    startDate: '',
    endDate: '',
    reason: '',
    days: 0
  })

  const handleSubmit = () => {
    if (!formData.leaveType || !formData.startDate || !formData.endDate || !formData.reason) {
      alert('Please fill all fields')
      return
    }

    const newRequest = {
      id: leaveRequests.length + 1,
      employeeName: 'Current User',
      employeeId: 'EMP000',
      department: 'General',
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: 1,
      reason: formData.reason,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    }

    setLeaveRequests([newRequest, ...leaveRequests])
    setFormData({
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
      days: 0
    })
    alert('Leave application submitted successfully!')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#4caf50'
      case 'pending': return '#ff9800'
      case 'rejected': return '#f44336'
      default: return '#757575'
    }
  }

  return (
    <Box sx={{ p: 3, minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Header */}
      <Box sx={{ 
        backgroundColor: '#1976d2', 
        color: 'white', 
        p: 3, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            color="inherit" 
            onClick={() => window.history.back()}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h4">
            Simple Working Leave Application
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        {/* Leave Application Form */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Apply for Leave
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Leave Type"
                  value={formData.leaveType}
                  onChange={(e) => setFormData(prev => ({ ...prev, leaveType: e.target.value }))}
                  select
                >
                  <option value="annual">Annual Leave</option>
                  <option value="sick">Sick Leave</option>
                  <option value="personal">Personal Leave</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  type="date"
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  type="date"
                  label="End Date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Reason"
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="Please provide detailed reason for leave..."
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Send />}
                  onClick={handleSubmit}
                >
                  Submit Leave Application
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Leave Requests Table */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Leave Requests
            </Typography>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Leave Type</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Applied Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaveRequests.map((request) => (
                    <TableRow key={request.id} hover>
                      <TableCell>{request.employeeName}</TableCell>
                      <TableCell>{request.department}</TableCell>
                      <TableCell>{request.leaveType}</TableCell>
                      <TableCell>{request.days} days</TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>{request.appliedDate}</TableCell>
                      <TableCell>
                        <Chip
                          label={request.status}
                          size="small"
                          sx={{
                            backgroundColor: getStatusColor(request.status),
                            color: 'white'
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default SimpleWorkingApp
