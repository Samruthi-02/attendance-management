import React, { useState, useEffect } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  LinearProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import {
  People,
  AccessTime,
  TrendingUp,
  Assignment,
  CheckCircle,
  Warning,
  Schedule,
  LocationOn,
  Event,
  ArrowBack
} from '@mui/icons-material'
import { useNavigate, Link } from 'react-router-dom'
import { mockUsers, mockAttendance, mockReports } from '../../services/mockData'

const HRDashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    averageHours: 0,
    pendingLeaves: 5
  })

  const [topPerformers, setTopPerformers] = useState([])
  const [attendanceTrend, setAttendanceTrend] = useState([])
  const [departmentStats, setDepartmentStats] = useState([])

  useEffect(() => {
    // Calculate stats
    const presentToday = mockAttendance.filter(a => 
      a.date === new Date().toISOString().split('T')[0] && a.status === 'present'
    ).length

    setStats({
      totalEmployees: mockUsers.length,
      presentToday,
      averageHours: 8.5,
      pendingLeaves: 5
    })

    // Set top performers
    const performers = [
      { name: 'John Smith', completedTasks: 45, score: 95 },
      { name: 'Sarah Johnson', completedTasks: 42, score: 88 },
      { name: 'Mike Wilson', completedTasks: 38, score: 76 }
    ]
    setTopPerformers(performers)

    // Set attendance trend data
    const trendData = [
      { month: 'Jan', present: 142, absent: 8 },
      { month: 'Feb', present: 138, absent: 12 },
      { month: 'Mar', present: 145, absent: 5 },
      { month: 'Apr', present: 140, absent: 10 },
      { month: 'May', present: 148, absent: 7 },
      { month: 'Jun', present: 135, absent: 15 }
    ]
    setAttendanceTrend(trendData)

    // Set department stats
    const deptStats = [
      { department: 'Engineering', score: 92 },
      { department: 'Sales', score: 78 },
      { department: 'Marketing', score: 85 },
      { department: 'HR', score: 88 },
      { department: 'Finance', score: 95 }
    ]
    setDepartmentStats(deptStats)
  }, [])

  const statCards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      icon: <People />,
      color: '#1976d2',
      change: '+2%',
      changeType: 'increase'
    },
    {
      title: 'Present Today',
      value: stats.presentToday,
      icon: <AccessTime />,
      color: '#2e7d32',
      change: '+5%',
      changeType: 'increase'
    },
    {
      title: 'Average Hours',
      value: stats.averageHours,
      icon: <Schedule />,
      color: '#ed6c02',
      change: '+0.5',
      changeType: 'increase'
    },
    {
      title: 'Pending Leaves',
      value: stats.pendingLeaves,
      icon: <Warning />,
      color: '#d32f2f',
      change: '-1',
      changeType: 'decrease'
    }
  ]

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
          HR Dashboard
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" mb={3}>
        Welcome back! Here's an overview of your team.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
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
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attendance Trend (Last 6 Months)
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Month</TableCell>
                      <TableCell>Present</TableCell>
                      <TableCell>Absent</TableCell>
                      <TableCell>Rate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendanceTrend.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.month}</TableCell>
                        <TableCell>{row.present}</TableCell>
                        <TableCell>{row.absent}</TableCell>
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
                Department Performance
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Department</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {departmentStats.map((dept, index) => (
                      <TableRow key={index}>
                        <TableCell>{dept.department}</TableCell>
                        <TableCell>{dept.score}%</TableCell>
                        <TableCell>
                          <Chip 
                            label={dept.score >= 80 ? 'Excellent' : dept.score >= 60 ? 'Good' : 'Needs Improvement'}
                            size="small"
                            color={dept.score >= 80 ? 'success' : dept.score >= 60 ? 'warning' : 'error'}
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
      </Grid>

      {/* Top Performers Table */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Performers
              </Typography>
              <List>
                {topPerformers.map((performer, index) => (
                  <ListItem key={performer.name}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#1976d2' }}>
                        {index + 1}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={performer.name}
                      secondary={`${performer.completedTasks} tasks completed`}
                    />
                    <Box textAlign="right">
                      <Typography variant="h6" color="primary">
                        {performer.score}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={performer.score}
                        sx={{ width: 100, mt: 1 }}
                      />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Attendance
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
                to="/hr/employee-records"
              >
                Employee Records
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                startIcon={<Assignment />}
                component={Link}
                to="/hr/attendance-reports"
              >
                Attendance Reports
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                startIcon={<TrendingUp />}
                component={Link}
                to="/hr/performance"
              >
                Performance Reviews
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
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="info"
                fullWidth
                startIcon={<Event />}
                component={Link}
                to="/hr/leave-application"
              >
                Leave Application
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default HRDashboard
