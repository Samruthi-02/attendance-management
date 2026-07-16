import React, { useState, useEffect } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  LinearProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import {
  People,
  Assignment,
  LocationOn,
  TrendingUp,
  AccessTime,
  CheckCircle,
  Pending,
  Error,
  ArrowBack
} from '@mui/icons-material'
import { useNavigate, Link } from 'react-router-dom'
import { mockUsers, mockServices, mockAttendance, mockReports } from '../../services/mockData'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    activeServices: 0,
    liveLocations: 0
  })

  const [recentActivities, setRecentActivities] = useState([])
  const [attendanceData, setAttendanceData] = useState([])
  const [serviceData, setServiceData] = useState([])

  useEffect(() => {
    // Calculate stats
    const presentToday = mockAttendance.filter(a =>
      a.date === new Date().toISOString().split('T')[0] && a.status === 'present'
    ).length

    const activeServices = mockServices.filter(s =>
      s.status === 'pending' || s.status === 'in_progress'
    ).length

    setStats({
      totalEmployees: mockUsers.length,
      presentToday,
      activeServices,
      liveLocations: 3 // Mock live locations
    })

    // Set recent activities
    const activities = [
      {
        id: 1,
        user: 'Mike Employee',
        action: 'Checked in',
        time: '09:00 AM',
        avatar: 'https://i.pravatar.cc/150?img=3',
        type: 'attendance'
      },
      {
        id: 2,
        user: 'Jane Developer',
        action: 'Completed service',
        time: '08:30 AM',
        avatar: 'https://i.pravatar.cc/150?img=4',
        type: 'service'
      },
      {
        id: 3,
        user: 'Sarah HR',
        action: 'Created new service',
        time: '08:00 AM',
        avatar: 'https://i.pravatar.cc/150?img=5',
        type: 'service'
      }
    ]
    setRecentActivities(activities)

    // Set table data
    setAttendanceData(mockReports.attendanceStats.monthlyData)
    setServiceData(mockReports.serviceStats.monthlyData)
  }, [])

  const statCards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      icon: <People />,
      color: '#1976d2',
      change: '+5%',
      changeType: 'increase'
    },
    {
      title: 'Present Today',
      value: stats.presentToday,
      icon: <AccessTime />,
      color: '#2e7d32',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Active Services',
      value: stats.activeServices,
      icon: <Assignment />,
      color: '#ed6c02',
      change: '-3%',
      changeType: 'decrease'
    },
    {
      title: 'Live Locations',
      value: stats.liveLocations,
      icon: <LocationOn />,
      color: '#9c27b0',
      change: '+8%',
      changeType: 'increase'
    }
  ]

  const pieData = [
    { name: 'Present', value: stats.presentToday, color: '#2e7d32' },
    { name: 'Absent', value: stats.totalEmployees - stats.presentToday, color: '#d32f2f' }
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'attendance':
        return <AccessTime color="primary" />
      case 'service':
        return <Assignment color="secondary" />
      default:
        return <TrendingUp />
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton 
          color="primary" 
          onClick={() => window.history.back()}
          sx={{ mr: 2 }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">
          Admin Dashboard
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Welcome back! Here's an overview of your organization.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                      {card.title}
                    </Typography>
                    <Typography variant="h4" component="div">
                      {card.value}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                      <TrendingUp 
                        sx={{ 
                          color: card.changeType === 'increase' ? '#2e7d32' : '#d32f2f',
                          mr: 0.5,
                          fontSize: 16
                        }} 
                      />
                      <Typography 
                        variant="body2" 
                        color={card.changeType === 'increase' ? '#2e7d32' : '#d32f2f'}
                      >
                        {card.change} from last month
                      </Typography>
                    </Box>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: card.color,
                      width: 56,
                      height: 56
                    }}
                  >
                    {card.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tables Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attendance Overview (Last 6 Months)
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Month</TableCell>
                      <TableCell>Present</TableCell>
                      <TableCell>Absent</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Rate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendanceData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.month}</TableCell>
                        <TableCell>{row.present}</TableCell>
                        <TableCell>{row.absent}</TableCell>
                        <TableCell>{row.present + row.absent}</TableCell>
                        <TableCell>
                          <Chip 
                            label={`${Math.round((row.present / (row.present + row.absent)) * 100)}%`}
                            size="small"
                            color={((row.present / (row.present + row.absent)) * 100) > 90 ? 'success' : 'warning'}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Attendance Summary
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>Count</TableCell>
                      <TableCell>Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Chip label="Present" color="success" size="small" />
                      </TableCell>
                      <TableCell>{stats.presentToday}</TableCell>
                      <TableCell>
                        {Math.round((stats.presentToday / stats.totalEmployees) * 100)}%
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Chip label="Absent" color="error" size="small" />
                      </TableCell>
                      <TableCell>{stats.totalEmployees - stats.presentToday}</TableCell>
                      <TableCell>
                        {Math.round(((stats.totalEmployees - stats.presentToday) / stats.totalEmployees) * 100)}%
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Service Statistics Table */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Service Priority Distribution
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Priority</TableCell>
                      <TableCell>Count</TableCell>
                      <TableCell>Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Chip label="High" color="error" size="small" />
                      </TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>40%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Chip label="Medium" color="warning" size="small" />
                      </TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>33%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Chip label="Low" color="success" size="small" />
                      </TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>27%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              <List>
                {recentActivities.map((activity) => (
                  <ListItem key={activity.id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={activity.avatar}>
                        {activity.user.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Typography variant="subtitle2">
                            {activity.user}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {activity.time}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box display="flex" alignItems="center" mt={0.5}>
                          {getActivityIcon(activity.type)}
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {activity.action}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<People />}
                component={Link}
                to="/admin/manage-employees"
              >
                Manage Employees
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                startIcon={<Assignment />}
                component={Link}
                to="/services"
              >
                View Services
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                startIcon={<TrendingUp />}
                component={Link}
                to="/admin/system-reports"
              >
                View Reports
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="warning"
                fullWidth
                startIcon={<LocationOn />}
                component={Link}
                to="/location/tracking"
              >
                Live Tracking
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default AdminDashboard
