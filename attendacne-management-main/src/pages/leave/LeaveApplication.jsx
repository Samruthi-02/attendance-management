import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  IconButton,
  Tabs,
  Tab,
  Badge
} from '@mui/material'
import {
  Send,
  Cancel,
  CheckCircle,
  Schedule,
  Person,
  Event,
  Description,
  Analytics,
  Policy,
  Notifications,
  AccountBalance,
  TrendingUp,
  ArrowBack
} from '@mui/icons-material'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-hot-toast'

const LeaveApplication = () => {
  const { user } = useAuth()
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
      appliedDate: '2024-01-10',
      approvedBy: 'Jane Smith',
      approvedDate: '2024-01-12'
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
      appliedDate: '2024-01-19',
      approvedBy: null,
      approvedDate: null
    },
    {
      id: 3,
      employeeName: 'Mike Johnson',
      employeeId: 'EMP003',
      department: 'Marketing',
      leaveType: 'Personal Leave',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      days: 2,
      reason: 'Personal work',
      status: 'rejected',
      appliedDate: '2024-01-24',
      approvedBy: 'Jane Smith',
      approvedDate: '2024-01-25',
      rejectionReason: 'Insufficient notice period'
    }
  ])

  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    days: 0,
    isHalfDay: false,
    emergencyContact: '',
    attachment: null
  })

  const [openDialog, setOpenDialog] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  // Enhanced Leave Management Features
  const [leaveBalance, setLeaveBalance] = useState({
    annual: 15,
    sick: 10,
    personal: 5,
    maternity: 90,
    paternity: 30,
    used: 0
  })

  const [leavePolicies, setLeavePolicies] = useState({
    annualAdvanceNotice: 30,
    sickNoteRequired: true,
    personalMaxDays: 3,
    maternityMaxDays: 180,
    paternityMaxDays: 30,
    emergencyLeave: 5,
    carryForward: 10
  })

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      title: 'Leave Policy Update',
      message: 'Annual leave policy updated to 30 days advance notice',
      date: '2024-01-15',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Leave Balance Low',
      message: 'You have 2 days of sick leave remaining',
      date: '2024-01-10',
      read: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Request Approved',
      message: 'Your annual leave request has been approved',
      date: '2024-01-05',
      read: false
    }
  ])

  const [analytics, setAnalytics] = useState({
    totalRequests: 156,
    approvedRequests: 142,
    rejectedRequests: 8,
    pendingRequests: 6,
    averageProcessingTime: 2.5,
    peakRequestMonth: 'December',
    commonLeaveType: 'Sick Leave',
    departmentStats: [
      { department: 'Engineering', requests: 45, approved: 40 },
      { department: 'HR', requests: 32, approved: 28 },
      { department: 'Marketing', requests: 28, approved: 25 }
    ]
  })

  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showPolicies, setShowPolicies] = useState(false)
  const [showBalance, setShowBalance] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const isHR = user?.role === 'hr'
  const isAdmin = user?.role === 'admin'

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      
      const actualDays = formData.isHalfDay ? diffDays - 0.5 : diffDays
      
      setFormData(prev => ({
        ...prev,
        days: actualDays
      }))
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        attachment: file
      }))
    }
  }

  const removeAttachment = () => {
    setFormData(prev => ({
      ...prev,
      attachment: null
    }))
  }

  const handleSubmit = () => {
    if (!formData.leaveType || !formData.startDate || !formData.endDate || !formData.reason) {
      toast.error('Please fill all required fields')
      return
    }

    const newRequest = {
      id: leaveRequests.length + 1,
      employeeName: user?.name || 'Current User',
      employeeId: user?.employeeId || 'EMP000',
      department: user?.department || 'General',
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: formData.days,
      reason: formData.reason,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0],
      approvedBy: null,
      approvedDate: null
    }

    setLeaveRequests(prev => [newRequest, ...prev])
    toast.success('Leave application submitted successfully!')
    
    setFormData({
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
      days: 0,
      isHalfDay: false,
      emergencyContact: '',
      attachment: null
    })
  }

  const handleViewDetails = (request) => {
    setSelectedRequest(request)
    setOpenDialog(true)
  }

  const handleApprove = (requestId) => {
    setLeaveRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'approved', approvedBy: user?.name, approvedDate: new Date().toISOString().split('T')[0] }
          : req
      )
    )
    toast.success('Leave request approved!')
  }

  const handleReject = (requestId, rejectionReason = '') => {
    setLeaveRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'rejected', approvedBy: user?.name, approvedDate: new Date().toISOString().split('T')[0], rejectionReason }
          : req
      )
    )
    toast.success('Leave request rejected!')
  }

  const handleRequestChanges = (requestId, newStatus) => {
    setLeaveRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: newStatus, lastModified: new Date().toISOString().split('T')[0], modifiedBy: user?.name }
          : req
      )
    )
    toast.success(`Leave request ${newStatus}!`)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#4caf50'
      case 'pending': return '#ff9800'
      case 'rejected': return '#f44336'
      default: return '#757575'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle />
      case 'pending': return <Schedule />
      case 'rejected': return <Cancel />
      default: return <Event />
    }
  }

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
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
            sx={{ mr: 1 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h4">
            Leave Management
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit" onClick={() => setShowNotifications(true)}>
            <Badge badgeContent={unreadCount} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          {isHR && (
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Policy />}
              onClick={() => setShowPolicies(true)}
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
              }}
            >
              Policies
            </Button>
          )}
          {isHR && (
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Analytics />}
              onClick={() => setShowAnalytics(true)}
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
              }}
            >
              Analytics
            </Button>
          )}
          {isHR && (
            <Button
              variant="contained"
              color="inherit"
              startIcon={<AccountBalance />}
              onClick={() => setShowBalance(true)}
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
              }}
            >
              Balance
            </Button>
          )}
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        {/* Leave Application Form */}
        {(!isHR && !isAdmin) && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Apply for Leave
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Leave Type</InputLabel>
                    <Select
                      value={formData.leaveType}
                      onChange={(e) => handleInputChange('leaveType', e.target.value)}
                      label="Leave Type"
                    >
                      <MenuItem value="annual">Annual Leave</MenuItem>
                      <MenuItem value="sick">Sick Leave</MenuItem>
                      <MenuItem value="personal">Personal Leave</MenuItem>
                      <MenuItem value="maternity">Maternity Leave</MenuItem>
                      <MenuItem value="paternity">Paternity Leave</MenuItem>
                      <MenuItem value="emergency">Emergency Leave</MenuItem>
                      <MenuItem value="bereavement">Bereavement Leave</MenuItem>
                      <MenuItem value="compensatory">Compensatory Off</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Start Date"
                    value={formData.startDate}
                    onChange={(e) => {
                      handleInputChange('startDate', e.target.value)
                      calculateDays()
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    type="date"
                    label="End Date"
                    value={formData.endDate}
                    onChange={(e) => {
                      handleInputChange('endDate', e.target.value)
                      calculateDays()
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TextField
                      fullWidth
                      label="Number of Days"
                      value={formData.days}
                      InputProps={{ readOnly: true }}
                      helperText="Automatically calculated"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.isHalfDay}
                          onChange={(e) => handleInputChange('isHalfDay', e.target.checked)}
                          size="small"
                        />
                      }
                      label="Half Day"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    label="Emergency Contact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    placeholder="Contact person for urgent matters"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Reason"
                    value={formData.reason}
                    onChange={(e) => handleInputChange('reason', e.target.value)}
                    placeholder="Please provide detailed reason for leave..."
                    helperText="Be specific about dates and reason"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ border: '2px dashed #ccc', borderRadius: 1, p: 2, mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Attach Supporting Documents (Optional)
                    </Typography>
                    <input
                      type="file"
                      accept=".pdf,.doc,.doc,.jpg,.png"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      id="file-upload"
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {formData.attachment ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            📎 {formData.attachment.name}
                          </Typography>
                          <Button
                            size="small"
                            variant="text"
                            color="error"
                            onClick={removeAttachment}
                          >
                            Remove
                          </Button>
                        </Box>
                      ) : (
                        <label htmlFor="file-upload">
                          <Button
                            variant="outlined"
                            component="span"
                            startIcon={<Description />}
                          >
                            Choose File
                          </Button>
                        </label>
                      )}
                    </Box>
                  </Box>
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
        )}

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
                    <TableCell>Emergency Contact</TableCell>
                    <TableCell>Applied Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Days</TableCell>
                    {(isHR || isAdmin) && <TableCell>Actions</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaveRequests.map((request) => (
                    <TableRow key={request.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Person sx={{ fontSize: 16, color: '#666' }} />
                          <Box>
                            <Typography variant="body2" fontWeight={500}>
                              {request.employeeName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {request.employeeId}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{request.department}</TableCell>
                      <TableCell>{request.leaveType}</TableCell>
                      <TableCell>{request.days} days</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ maxWidth: 150 }}>
                          {request.reason}
                        </Typography>
                      </TableCell>
                      <TableCell>{request.emergencyContact || 'Not provided'}</TableCell>
                      <TableCell>{request.appliedDate}</TableCell>
                      <TableCell>
                        <Chip
                          label={request.status}
                          size="small"
                          icon={getStatusIcon(request.status)}
                          sx={{
                            backgroundColor: getStatusColor(request.status),
                            color: 'white'
                          }}
                        />
                      </TableCell>
                      <TableCell>{request.days}</TableCell>
                      {(isHR || isAdmin) && (
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {request.status === 'pending' && (
                              <>
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="success"
                                  onClick={() => handleApprove(request.id)}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  color="error"
                                  onClick={() => {
                                    const reason = prompt('Please enter rejection reason:')
                                    if (reason) {
                                      handleReject(request.id, reason)
                                    }
                                  }}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                            {request.status === 'approved' && (
                              <Button
                                size="small"
                                variant="outlined"
                                color="warning"
                                onClick={() => handleRequestChanges(request.id, 'cancelled')}
                              >
                                Cancel
                              </Button>
                            )}
                            {request.status === 'rejected' && (
                              <Button
                                size="small"
                                variant="contained"
                                color="info"
                                onClick={() => handleRequestChanges(request.id, 'pending')}
                              >
                                Reconsider
                              </Button>
                            )}
                            <Button
                              size="small"
                              variant="text"
                              onClick={() => handleViewDetails(request)}
                            >
                              View
                            </Button>
                          </Box>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Details Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Leave Request Details
        </DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2" gutterBottom>
                  Employee Information
                </Typography>
                <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
                  <Typography variant="body2"><strong>Name:</strong> {selectedRequest.employeeName}</Typography>
                  <Typography variant="body2"><strong>ID:</strong> {selectedRequest.employeeId}</Typography>
                  <Typography variant="body2"><strong>Department:</strong> {selectedRequest.department}</Typography>
                  <Typography variant="body2"><strong>Contact:</strong> {selectedRequest.emergencyContact || 'Not provided'}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2" gutterBottom>
                  Leave Details
                </Typography>
                <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
                  <Typography variant="body2"><strong>Type:</strong> {selectedRequest.leaveType}</Typography>
                  <Typography variant="body2"><strong>Duration:</strong> {selectedRequest.days} days</Typography>
                  <Typography variant="body2"><strong>Period:</strong> {selectedRequest.startDate} to {selectedRequest.endDate}</Typography>
                  <Typography variant="body2"><strong>Half Day:</strong> {selectedRequest.isHalfDay ? 'Yes' : 'No'}</Typography>
                  <Typography variant="body2"><strong>Reason:</strong> {selectedRequest.reason}</Typography>
                  {selectedRequest.attachment && (
                    <Typography variant="body2"><strong>Attachment:</strong> 📎 {selectedRequest.attachment.name}</Typography>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="subtitle2" gutterBottom>
                  Application Status
                </Typography>
                <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
                  <Typography variant="body2"><strong>Applied:</strong> {selectedRequest.appliedDate}</Typography>
                  <Typography variant="body2"><strong>Status:</strong> {selectedRequest.status}</Typography>
                  <Typography variant="body2"><strong>Processed by:</strong> {selectedRequest.approvedBy || 'Pending'}</Typography>
                  {selectedRequest.approvedDate && (
                    <Typography variant="body2"><strong>Processed Date:</strong> {selectedRequest.approvedDate}</Typography>
                  )}
                  {selectedRequest.lastModified && (
                    <Typography variant="body2"><strong>Last Modified:</strong> {selectedRequest.lastModified}</Typography>
                  )}
                  {selectedRequest.modifiedBy && (
                    <Typography variant="body2"><strong>Modified by:</strong> {selectedRequest.modifiedBy}</Typography>
                  )}
                  {selectedRequest.rejectionReason && (
                    <Typography variant="body2" color="error"><strong>Rejection Reason:</strong> {selectedRequest.rejectionReason}</Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notifications Dialog */}
      <Dialog open={showNotifications} onClose={() => setShowNotifications(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Notifications
        </DialogTitle>
        <DialogContent>
          {notifications.map((notification) => (
            <Box key={notification.id} sx={{ p: 2, mb: 1, backgroundColor: notification.read ? '#f8f9fa' : '#e3f2fd', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle2" color={notification.read ? '#666' : '#1976d2'}>
                    {notification.title}
                  </Typography>
                  <Typography variant="body2" color={notification.read ? '#999' : '#666'}>
                    {notification.date}
                  </Typography>
                </Box>
                {!notification.read && (
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    Mark as read
                  </Button>
                )}
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {notification.message}
              </Typography>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNotifications(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Analytics Dashboard */}
      <Dialog open={showAnalytics} onClose={() => setShowAnalytics(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          Leave Analytics
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Request Statistics
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Total Requests:</strong> {analytics.totalRequests}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Approved:</strong> {analytics.approvedRequests}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Rejected:</strong> {analytics.rejectedRequests}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Pending:</strong> {analytics.pendingRequests}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Avg Processing:</strong> {analytics.averageProcessingTime} days</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Peak Month & Common Type
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Peak Month:</strong> {analytics.peakRequestMonth}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Common Type:</strong> {analytics.commonLeaveType}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Department Statistics
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Department</TableCell>
                          <TableCell>Requests</TableCell>
                          <TableCell>Approved</TableCell>
                          <TableCell>Approval Rate</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {analytics.departmentStats.map((dept, index) => (
                          <TableRow key={index}>
                            <TableCell>{dept.department}</TableCell>
                            <TableCell>{dept.requests}</TableCell>
                            <TableCell>{dept.approved}</TableCell>
                            <TableCell>
                              {((dept.approved / dept.requests) * 100).toFixed(1)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAnalytics(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Policies Dialog */}
      <Dialog open={showPolicies} onClose={() => setShowPolicies(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Leave Policies
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    General Policies
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Annual Notice:</strong> {leavePolicies.annualAdvanceNotice} days</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Sick Note:</strong> {leavePolicies.sickNoteRequired ? 'Required' : 'Not Required'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Carry Forward:</strong> {leavePolicies.carryForward} days</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Leave Type Limits
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Personal Max:</strong> {leavePolicies.personalMaxDays} days</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Maternity Max:</strong> {leavePolicies.maternityMaxDays} days</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Paternity Max:</strong> {leavePolicies.paternityMaxDays} days</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2"><strong>Emergency Leave:</strong> {leavePolicies.emergencyLeave} days</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPolicies(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Balance Dialog */}
      <Dialog open={showBalance} onClose={() => setShowBalance(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Leave Balance
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Card sx={{ backgroundColor: '#e3f2fd' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AccountBalance sx={{ fontSize: 32, color: '#1976d2' }} />
                    <Box>
                      <Typography variant="h6">Annual Leave</Typography>
                      <Typography variant="h4">{leaveBalance.annual} days</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ backgroundColor: '#f44336' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AccountBalance sx={{ fontSize: 32, color: '#fff' }} />
                    <Box>
                      <Typography variant="h6">Sick Leave</Typography>
                      <Typography variant="h4">{leaveBalance.sick} days</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ backgroundColor: '#ff9800' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AccountBalance sx={{ fontSize: 32, color: '#fff' }} />
                    <Box>
                      <Typography variant="h6">Personal Leave</Typography>
                      <Typography variant="h4">{leaveBalance.personal} days</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ backgroundColor: '#9c27b0' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AccountBalance sx={{ fontSize: 32, color: '#fff' }} />
                    <Box>
                      <Typography variant="h6">Maternity Leave</Typography>
                      <Typography variant="h4">{leaveBalance.maternity} days</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ backgroundColor: '#2196f3' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AccountBalance sx={{ fontSize: 32, color: '#fff' }} />
                    <Box>
                      <Typography variant="h6">Paternity Leave</Typography>
                      <Typography variant="h4">{leaveBalance.paternity} days</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowBalance(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default LeaveApplication
