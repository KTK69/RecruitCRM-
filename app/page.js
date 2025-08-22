'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, Phone, Mail, FileText, Calendar, 
  Building2, MapPin, Edit, Star, Filter,
  Search, Trash2, Users, Briefcase, 
  MessageSquare, Target, ChevronDown,
  ExternalLink, UserPlus, Eye, Moon, Sun,
  Menu, X
} from 'lucide-react'
import './globals.css'

// Utility function for consistent date formatting to prevent hydration issues
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })
}

const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

// Mock data
const initialData = {
  company: {
    name: 'Dunder Mifflin',
    location: 'San Francisco',
    website: 'recruitcrm.io',
    industry: 'Business Supplies and Equipment',
    address: '705 Parnassus Ave San Francisco',
    owner: 'Tanveer Krishna Kristam',
    state: 'California',
    postalCode: '94122',
    locality: 'Richmond District',
    country: 'United States',
    linkedinId: 'dunder-mifflin-paper',
    monsterBoard: 'DM-PAPER-2024',
    indeedOptedOut: 'No',
    aboutCompany: 'Dunder Mifflin Paper Company is a mid-size regional paper and office supply distributor with headquarters in Scranton, Pennsylvania. Founded in 1949, the company has been serving businesses across the Northeast with quality paper products and exceptional customer service.'
  },
  jobs: [
    { 
      id: 1, 
      title: 'Paper Sales Executive', 
      location: 'San Francisco',
      contact: 'Michael Scott',
      owner: 'Tanveer Krishna Kristam',
      status: 'Open',
      pipeline: 3,
      placed: 1
    },
    { 
      id: 2, 
      title: 'Regional Sales Manager', 
      location: 'Oakland',
      contact: 'Jim Halpert',
      owner: 'Michael Scott',
      status: 'Open',
      pipeline: 2,
      placed: 0
    },
    { 
      id: 3, 
      title: 'Customer Service Representative', 
      location: 'San Francisco',
      contact: 'Pam Beesly',
      owner: 'Tanveer Krishna Kristam',
      status: 'Closed',
      pipeline: 0,
      placed: 2
    }
  ],
  contacts: [
    { id: 1, name: 'Michael Scott', role: 'Regional Manager', email: 'michael.scott@dundermifflin.com', phone: '(415) 555-0123' },
    { id: 2, name: 'Pam Beesly', role: 'Receptionist', email: 'pam.beesly@dundermifflin.com', phone: '(415) 555-0124' },
    { id: 3, name: 'Jim Halpert', role: 'Sales Representative', email: 'jim.halpert@dundermifflin.com', phone: '(415) 555-0125' },
    { id: 4, name: 'Dwight Schrute', role: 'Assistant Regional Manager', email: 'dwight.schrute@dundermifflin.com', phone: '(415) 555-0126' }
  ],
  activities: [
    {
      id: 1,
      type: 'call',
      content: 'Initial consultation call with Michael Scott regarding the Paper Sales Executive position. Discussed salary expectations and start date preferences.',
      timestamp: '2024-08-20T14:30:00Z',
      user: 'Tanveer Krishna Kristam'
    },
    {
      id: 2,
      type: 'email',
      content: 'Sent job description and company benefits package to potential candidate. Awaiting response on interview availability.',
      timestamp: '2024-08-19T09:15:00Z',
      user: 'Pam Beesly'
    },
    {
      id: 3,
      type: 'meeting',
      content: 'Team meeting to discuss Q3 hiring goals and budget allocation for new positions. Approved 3 additional sales roles.',
      timestamp: '2024-08-18T11:00:00Z',
      user: 'Michael Scott'
    },
    {
      id: 4,
      type: 'note',
      content: 'Updated candidate requirements based on client feedback. Looking for candidates with 3+ years B2B sales experience.',
      timestamp: '2024-08-17T16:45:00Z',
      user: 'Jim Halpert'
    }
  ],
  files: [
    {
      id: 1,
      name: 'Company_Overview_2024.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedBy: 'Michael Scott',
      uploadDate: '2024-08-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'Job_Requirements_Sales.docx',
      type: 'Word Document',
      size: '156 KB',
      uploadedBy: 'Pam Beesly',
      uploadDate: '2024-08-14T14:20:00Z'
    },
    {
      id: 3,
      name: 'Salary_Structure_2024.xlsx',
      type: 'Excel Spreadsheet',
      size: '298 KB',
      uploadedBy: 'Tanveer Krishna Kristam',
      uploadDate: '2024-08-13T09:15:00Z'
    }
  ],
  tasks: [
    {
      id: 1,
      title: 'Follow up with candidate Sarah Johnson',
      description: 'Send interview scheduling email and company brochure',
      dueDate: '2024-08-23T17:00:00Z',
      status: 'pending',
      assignedTo: 'Pam Beesly'
    },
    {
      id: 2,
      title: 'Review Q3 hiring budget',
      description: 'Analyze spending and adjust allocation for remaining positions',
      dueDate: '2024-08-25T12:00:00Z',
      status: 'in-progress',
      assignedTo: 'Michael Scott'
    }
  ],
  meetings: [
    {
      id: 1,
      title: 'Client Requirements Review',
      description: 'Weekly sync with Dunder Mifflin team to review hiring needs',
      date: '2024-08-22T15:00:00Z',
      attendees: ['Michael Scott', 'Jim Halpert', 'Tanveer Krishna Kristam'],
      location: 'Conference Room A'
    },
    {
      id: 2,
      title: 'Candidate Interview - Regional Sales Manager',
      description: 'Second round interview for Oakland sales position',
      date: '2024-08-24T10:00:00Z',
      attendees: ['Jim Halpert', 'Tanveer Krishna Kristam'],
      location: 'Zoom Meeting'
    }
  ],
  hotlists: [
    {
      id: 1,
      name: 'Top Sales Candidates Q3 2024',
      description: 'High-performing sales professionals with 5+ years experience',
      candidateCount: 12,
      createdBy: 'Tanveer Krishna Kristam',
      createdDate: '2024-08-10T09:00:00Z',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Regional Managers - West Coast',
      description: 'Experienced regional managers for California and Nevada territories',
      candidateCount: 8,
      createdBy: 'Michael Scott',
      createdDate: '2024-08-05T14:30:00Z',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Customer Service Specialists',
      description: 'Customer-focused professionals with excellent communication skills',
      candidateCount: 15,
      createdBy: 'Pam Beesly',
      createdDate: '2024-07-28T11:15:00Z',
      status: 'Archived'
    }
  ],
  relatedDeals: [
    {
      id: 1,
      title: 'Q3 Sales Team Expansion',
      value: '$450,000',
      stage: 'Negotiation',
      probability: '75%',
      expectedCloseDate: '2024-09-15T00:00:00Z',
      owner: 'Michael Scott',
      description: 'Multi-role hiring contract for 6 sales positions across West Coast'
    },
    {
      id: 2,
      title: 'Management Consulting Services',
      value: '$180,000',
      stage: 'Proposal Sent',
      probability: '60%',
      expectedCloseDate: '2024-08-30T00:00:00Z',
      owner: 'Jim Halpert',
      description: 'Strategic consulting for organizational restructuring'
    },
    {
      id: 3,
      title: 'Temporary Staffing Agreement',
      value: '$95,000',
      stage: 'Closed Won',
      probability: '100%',
      expectedCloseDate: '2024-08-01T00:00:00Z',
      owner: 'Tanveer Krishna Kristam',
      description: 'Short-term staffing solution for seasonal customer service needs'
    }
  ],
  relatedEmails: [
    {
      id: 1,
      subject: 'RE: Paper Sales Executive Position - Interview Scheduling',
      from: 'michael.scott@dundermifflin.com',
      to: 'tanveer.kristam@recruitcrm.com',
      date: '2024-08-21T10:45:00Z',
      status: 'Read',
      preview: 'Thank you for sending the candidate profiles. I would like to schedule interviews for the top 3 candidates...'
    },
    {
      id: 2,
      subject: 'Updated Job Requirements - Regional Sales Manager',
      from: 'jim.halpert@dundermifflin.com',
      to: 'team@recruitcrm.com',
      date: '2024-08-20T16:20:00Z',
      status: 'Read',
      preview: 'Please find attached the updated job requirements. We have increased the salary range and added...'
    },
    {
      id: 3,
      subject: 'Contract Amendment - Q3 Hiring Goals',
      from: 'pam.beesly@dundermifflin.com',
      to: 'tanveer.kristam@recruitcrm.com',
      date: '2024-08-19T14:15:00Z',
      status: 'Unread',
      preview: 'Following our discussion yesterday, please review the attached contract amendment for additional positions...'
    },
    {
      id: 4,
      subject: 'Candidate Feedback - Sarah Johnson Interview',
      from: 'michael.scott@dundermifflin.com',
      to: 'recruiter@recruitcrm.com',
      date: '2024-08-18T09:30:00Z',
      status: 'Read',
      preview: 'Sarah performed exceptionally well in the interview. The team was impressed with her sales experience...'
    }
  ],
  candidatesPitched: [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Paper Sales Executive',
      pitchDate: '2024-08-18T00:00:00Z',
      status: 'Interview Scheduled',
      experience: '6 years',
      currentCompany: 'Staples Inc.',
      salary: '$75,000',
      location: 'San Francisco, CA',
      notes: 'Strong B2B sales background, excellent client relationship management'
    },
    {
      id: 2,
      name: 'Robert Chen',
      position: 'Regional Sales Manager',
      pitchDate: '2024-08-15T00:00:00Z',
      status: 'Client Review',
      experience: '8 years',
      currentCompany: 'Office Depot',
      salary: '$95,000',
      location: 'Oakland, CA',
      notes: 'Proven track record in team leadership and territory expansion'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Customer Service Representative',
      pitchDate: '2024-08-12T00:00:00Z',
      status: 'Offer Extended',
      experience: '4 years',
      currentCompany: 'FedEx Office',
      salary: '$52,000',
      location: 'San Francisco, CA',
      notes: 'Exceptional customer service skills and conflict resolution experience'
    },
    {
      id: 4,
      name: 'David Williams',
      position: 'Paper Sales Executive',
      pitchDate: '2024-08-10T00:00:00Z',
      status: 'Declined',
      experience: '5 years',
      currentCompany: 'Xerox Corporation',
      salary: '$70,000',
      location: 'San Jose, CA',
      notes: 'Declined due to relocation requirements'
    }
  ],
  candidatesEmployed: [
    {
      id: 1,
      name: 'Jennifer Adams',
      position: 'Customer Service Representative',
      hireDate: '2024-07-15T00:00:00Z',
      salary: '$48,000',
      startDate: '2024-07-29T00:00:00Z',
      status: 'Active',
      manager: 'Pam Beesly',
      location: 'San Francisco, CA',
      placementFee: '$12,000',
      notes: 'Excellent onboarding, exceeded first month targets'
    },
    {
      id: 2,
      name: 'Mark Thompson',
      position: 'Paper Sales Executive',
      hireDate: '2024-06-20T00:00:00Z',
      salary: '$72,000',
      startDate: '2024-07-01T00:00:00Z',
      status: 'Active',
      manager: 'Jim Halpert',
      location: 'San Francisco, CA',
      placementFee: '$18,000',
      notes: 'Top performer in Q3, generated $150K in new business'
    },
    {
      id: 3,
      name: 'Lisa Garcia',
      position: 'Customer Service Representative',
      hireDate: '2024-05-10T00:00:00Z',
      salary: '$50,000',
      startDate: '2024-05-20T00:00:00Z',
      status: 'Promoted',
      manager: 'Michael Scott',
      location: 'San Francisco, CA',
      placementFee: '$12,500',
      notes: 'Promoted to Senior Customer Service Representative after 3 months'
    }
  ]
}

export default function CompanyProfile() {
  const [activeTab, setActiveTab] = useState('jobs')
  const [activeActivityTab, setActiveActivityTab] = useState('all')
  const [data, setData] = useState(initialData)
  const [showAddJobModal, setShowAddJobModal] = useState(false)
  const [showActivityModal, setShowActivityModal] = useState(false)
  const [activityType, setActivityType] = useState('')
  const [showViewAssigned, setShowViewAssigned] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)

  // Calculate activity counts
  const getActivityCounts = () => {
    const activities = data.activities
    const calls = activities.filter(a => a.type === 'call').length
    const emails = activities.filter(a => a.type === 'email').length
    const notes = activities.filter(a => a.type === 'note').length
    const meetings = data.meetings.length
    const tasks = data.tasks.length
    const files = data.files.length
    
    return {
      all: activities.length,
      calls: calls + emails, // Notes & Calls combined
      tasks: tasks,
      meetings: meetings,
      files: files
    }
  }

  // Quick Actions
  const quickActions = [
    { 
      icon: Phone, 
      label: 'Log Call', 
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => openActivityModal('call')
    },
    { 
      icon: Mail, 
      label: 'Log Email', 
      color: 'bg-green-500 hover:bg-green-600',
      action: () => openActivityModal('email')
    },
    { 
      icon: FileText, 
      label: 'Add Note', 
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => openActivityModal('note')
    },
    { 
      icon: Calendar, 
      label: 'Schedule Meeting', 
      color: 'bg-orange-500 hover:bg-orange-600',
      action: () => openActivityModal('meeting')
    }
  ]

  const openActivityModal = (type) => {
    setActivityType(type)
    setShowActivityModal(true)
  }

  const addJob = (jobData) => {
    const newJob = {
      id: Date.now(),
      ...jobData,
      status: 'Open',
      pipeline: 0,
      placed: 0
    }
    setData(prev => ({
      ...prev,
      jobs: [newJob, ...prev.jobs]
    }))
    setShowAddJobModal(false)
  }

  const logActivity = (activityData) => {
    if (activityType === 'task') {
      const newTask = {
        id: Date.now(),
        ...activityData,
        status: 'pending',
        assignedTo: 'You'
      }
      setData(prev => ({
        ...prev,
        tasks: [newTask, ...prev.tasks]
      }))
    } else if (activityType === 'meeting') {
      const newMeeting = {
        id: Date.now(),
        ...activityData,
        attendees: [data.company.owner, 'You'],
        location: 'Office'
      }
      setData(prev => ({
        ...prev,
        meetings: [newMeeting, ...prev.meetings]
      }))
    } else {
      const newActivity = {
        id: Date.now(),
        ...activityData,
        type: activityType,
        timestamp: new Date().toISOString(),
        user: 'You'
      }
      setData(prev => ({
        ...prev,
        activities: [newActivity, ...prev.activities]
      }))
    }
    setShowActivityModal(false)
  }

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      status: 'pending',
      assignedTo: 'You'
    }
    setData(prev => ({
      ...prev,
      tasks: [newTask, ...prev.tasks]
    }))
  }

  const addMeeting = (meetingData) => {
    const newMeeting = {
      id: Date.now(),
      ...meetingData,
      attendees: [data.company.owner, 'You'],
      location: 'Office'
    }
    setData(prev => ({
      ...prev,
      meetings: [newMeeting, ...prev.meetings]
    }))
  }

  const deleteJob = (jobId) => {
    setData(prev => ({
      ...prev,
      jobs: prev.jobs.filter(job => job.id !== jobId)
    }))
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Apply dark class to document for global dark mode styles
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen)
  }

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen)
  }

  const counts = getActivityCounts()

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      {/* Top Navigation */}
      <div className={`px-4 py-3 text-sm shadow-lg transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white' 
          : 'bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Mobile menu button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu size={20} />
            </button>
            
            <div className={`p-1 rounded-md backdrop-blur-sm ${
              isDarkMode ? 'bg-white/10' : 'bg-white/10'
            }`}>
              <Building2 size={18} />
            </div>
            <span className="font-medium hidden sm:inline">Companies &gt; Page 1</span>
            <span className="font-medium sm:hidden">Companies</span>
            <span className={`px-2 py-1 rounded-full text-xs hidden sm:inline ${
              isDarkMode 
                ? 'text-slate-300 bg-white/10' 
                : 'text-blue-200 bg-white/10'
            }`}>10 - 1</span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-3">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-slate-600 hover:bg-slate-500 text-yellow-400' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="hidden sm:inline-flex bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Book a Demo
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center font-semibold shadow-md ring-2 ring-white/20">
              TK
            </div>
          </div>
        </div>
      </div>

      {/* Company Header */}
      <div className={`backdrop-blur-sm border-b shadow-sm transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-slate-800/80 border-slate-700/60' 
          : 'bg-white/80 border-gray-200/60'
      }`}>
        <div className="px-4 md:px-6 py-4 md:py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-slate-600 to-slate-700 ring-4 ring-slate-600/20' 
                  : 'bg-gradient-to-br from-blue-500 to-indigo-600 ring-4 ring-blue-50'
              }`}>
                <Building2 className="text-white" size={24} />
              </div>
              <div>
                <h1 className={`text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'
                }`}>{data.company.name}</h1>
                <div className={`flex items-center mt-1 md:mt-2 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  <div className={`p-1 rounded-md mr-2 transition-colors duration-300 ${
                    isDarkMode ? 'bg-slate-700' : 'bg-blue-50'
                  }`}>
                    <MapPin size={14} className={isDarkMode ? 'text-slate-400' : 'text-blue-500'} />
                  </div>
                  <span className="font-medium text-sm md:text-base">{data.company.location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2">
              {/* Mobile sidebar toggles */}
              <button 
                onClick={toggleLeftSidebar}
                className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-blue-400 hover:bg-slate-700' 
                    : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Users size={18} />
              </button>
              <button 
                onClick={toggleRightSidebar}
                className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-blue-400 hover:bg-slate-700' 
                    : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <MessageSquare size={18} />
              </button>
              
              <button className={`p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-200 group ${
                isDarkMode 
                  ? 'text-slate-400 hover:text-blue-400 hover:bg-slate-700' 
                  : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
              }`}>
                <Edit size={18} className="group-hover:scale-110 transition-transform" />
              </button>
              <button className={`p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-200 group ${
                isDarkMode 
                  ? 'text-slate-400 hover:text-yellow-400 hover:bg-slate-700' 
                  : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
              }`}>
                <Star size={18} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex relative">
        {/* Left Sidebar */}
        <div className={`w-80 backdrop-blur-sm border-r p-4 md:p-6 overflow-y-auto max-h-screen shadow-xl transition-all duration-300 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-rounded-full ${
          isDarkMode 
            ? 'bg-slate-800/90 border-slate-700/60 scrollbar-thumb-slate-600 hover:scrollbar-thumb-slate-500' 
            : 'bg-white/90 border-gray-200/60 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400'
        } ${
          isLeftSidebarOpen 
            ? 'fixed inset-y-0 left-0 z-50 md:relative md:translate-x-0' 
            : 'hidden md:block'
        }`}>
          {/* Mobile close button */}
          <div className="md:hidden flex justify-end mb-4">
            <button 
              onClick={toggleLeftSidebar}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <X size={20} />
            </button>
          </div>
          {/* Contacts Section */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center transition-colors duration-300 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <Users size={14} className={`mr-2 ${isDarkMode ? 'text-slate-400' : 'text-blue-500'}`} />
                CONTACTS
              </h3>
              <div className="flex items-center space-x-1 md:space-x-2">
                <span className={`px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium shadow-sm transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-slate-700 to-slate-600 text-slate-300' 
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700'
                }`}>MS</span>
                <button className={`p-1.5 md:p-2 rounded-lg transition-all duration-200 ${
                  isDarkMode 
                    ? 'text-blue-400 hover:text-blue-300 hover:bg-slate-700' 
                    : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                }`}>
                  <UserPlus size={14} />
                </button>
                <button className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hidden sm:inline-block ${
                  isDarkMode 
                    ? 'text-blue-400 hover:text-blue-300 hover:bg-slate-700' 
                    : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                }`}>
                  View All Contacts
                </button>
              </div>
            </div>

            {/* Contact List */}
            <div className="mb-4 md:mb-6 space-y-3 md:space-y-4">
              {data.contacts.slice(0, 3).map(contact => (
                <div key={contact.id} className={`p-4 md:p-5 rounded-2xl border transition-all duration-300 group cursor-pointer transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-600 hover:border-blue-400 hover:shadow-blue-500/30 hover:bg-slate-750' 
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-blue-200/60 hover:bg-blue-50/30'
                }`}>
                  <div className="flex items-start space-x-3">
                    {/* Avatar */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-300 group-hover:scale-110 shadow-lg flex-shrink-0 ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 group-hover:from-blue-400 group-hover:to-blue-500 group-hover:shadow-blue-400/50' 
                        : 'bg-gradient-to-br from-blue-500 to-indigo-600 group-hover:from-blue-400 group-hover:to-indigo-500 group-hover:shadow-blue-500/60'
                    }`}>
                      {contact.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                    
                    {/* Contact Information */}
                    <div className="flex-1">
                      {/* Name */}
                      <h4 className={`text-lg font-bold mb-1 transition-all duration-300 ${
                        isDarkMode 
                          ? 'text-white group-hover:text-blue-200' 
                          : 'text-gray-900 group-hover:text-blue-900'
                      }`}>{contact.name}</h4>
                      
                      {/* Role */}
                      <p className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
                        isDarkMode 
                          ? 'text-slate-300 group-hover:text-slate-200' 
                          : 'text-gray-700 group-hover:text-gray-800'
                      }`}>{contact.role}</p>
                      
                      {/* Contact Details */}
                      <div className="space-y-2">
                        {/* Email */}
                        <div className="flex items-center space-x-2">
                          <Mail size={14} className={`flex-shrink-0 transition-colors duration-300 ${
                            isDarkMode 
                              ? 'text-blue-400 group-hover:text-blue-300' 
                              : 'text-blue-600 group-hover:text-blue-700'
                          }`} />
                          <p className={`text-sm font-medium hover:underline cursor-pointer transition-all duration-300 break-all ${
                            isDarkMode 
                              ? 'text-blue-300 hover:text-white group-hover:text-blue-200' 
                              : 'text-blue-700 hover:text-blue-900 group-hover:text-blue-800'
                          }`}>{contact.email}</p>
                        </div>
                        
                        {/* Phone */}
                        <div className="flex items-center space-x-2">
                          <Phone size={14} className={`flex-shrink-0 transition-colors duration-300 ${
                            isDarkMode 
                              ? 'text-green-400 group-hover:text-green-300' 
                              : 'text-green-600 group-hover:text-green-700'
                          }`} />
                          <p className={`text-sm font-medium transition-colors duration-300 ${
                            isDarkMode 
                              ? 'text-slate-200 group-hover:text-white' 
                              : 'text-gray-800 group-hover:text-gray-900'
                          }`}>{contact.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Company Details */}
          <div className="space-y-6">
            <div className={`p-4 rounded-xl border shadow-sm transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600' 
                : 'bg-gradient-to-r from-white to-blue-50 border-blue-100'
            }`}>
              <h4 className={`font-semibold mb-3 flex items-center transition-colors duration-300 ${
                isDarkMode ? 'text-slate-200' : 'text-gray-900'
              }`}>
                <div className={`p-1 rounded-md mr-2 transition-colors duration-300 ${
                  isDarkMode ? 'bg-slate-600' : 'bg-blue-100'
                }`}>
                  <Building2 size={14} className={isDarkMode ? 'text-slate-300' : 'text-blue-600'} />
                </div>
                About Company
              </h4>
              <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-600'
              }`}>{data.company.aboutCompany}</p>
            </div>

            {/* Detail Fields */}
            <div className={`space-y-3 p-4 rounded-xl border shadow-sm transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600' 
                : 'bg-gradient-to-r from-white to-gray-50 border-gray-100'
            }`}>
              <h4 className={`font-semibold mb-3 text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-slate-200' : 'text-gray-900'
              }`}>Company Details</h4>
              {[
                { label: 'Website', value: data.company.website, isLink: true },
                { label: 'Industry', value: data.company.industry },
                { label: 'State', value: data.company.state },
                { label: 'Postal Code', value: data.company.postalCode },
                { label: 'Monster Board', value: data.company.monsterBoard },
                { label: 'Full Address', value: data.company.address },
                { label: 'Locality', value: data.company.locality },
                { label: 'Country', value: data.company.country },
                { label: 'LinkedIn ID', value: data.company.linkedinId },
                { label: 'Indeed Opted Out', value: data.company.indeedOptedOut }
              ].map((field, index) => (
                <div key={index} className="flex justify-between items-start text-sm py-2 border-b border-opacity-20 last:border-b-0 border-gray-400">
                  <span className={`font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-300' : 'text-gray-700'
                  }`}>{field.label}</span>
                  <span className={`text-right max-w-48 transition-colors duration-300 ${
                    field.isLink 
                      ? isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                      : isDarkMode ? 'text-slate-200' : 'text-gray-900'
                  }`}>
                    {field.isLink ? (
                      <a href={`https://${field.value}`} className="hover:underline">
                        {field.value}
                      </a>
                    ) : field.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className={`flex-1 shadow-lg transition-colors duration-300 min-w-0 ${
          isDarkMode ? 'bg-slate-800/60' : 'bg-white/60'
        } backdrop-blur-sm`}>
          {/* Content Tabs */}
          <div className={`border-b px-4 md:px-6 backdrop-blur-sm transition-colors duration-300 overflow-x-auto ${
            isDarkMode 
              ? 'border-slate-700/70 bg-slate-800/80' 
              : 'border-gray-200/70 bg-white/80'
          }`}>
            <div className="flex space-x-4 md:space-x-8 min-w-max">
              {[
                { key: 'jobs', label: 'Jobs' },
                { key: 'hotlists', label: 'Hotlists' },
                { key: 'deals', label: 'Deals' },
                { key: 'emails', label: 'Emails' },
                { key: 'pitched', label: 'Pitched' },
                { key: 'employed', label: 'Employed' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-3 md:py-4 px-1 border-b-3 font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.key
                      ? isDarkMode 
                        ? 'border-blue-400 text-blue-400 bg-blue-400/10' 
                        : 'border-blue-500 text-blue-600 bg-blue-50/50'
                      : isDarkMode 
                        ? 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="hidden lg:inline">{
                    tab.key === 'deals' ? 'Related Deals' :
                    tab.key === 'emails' ? 'Related Emails' :
                    tab.key === 'pitched' ? 'Candidate(s) Pitched' :
                    tab.key === 'employed' ? 'Candidates Employed' :
                    tab.label
                  }</span>
                  <span className="lg:hidden">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Jobs Content */}
          {activeTab === 'jobs' && (
            <div className="p-4 md:p-6">
              {/* Toolbar */}
              <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 p-3 md:p-4 rounded-xl border transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600' 
                  : 'bg-gradient-to-r from-white to-gray-50 border-gray-200'
              }`}>
                <div className="flex flex-wrap items-center gap-2 md:gap-4">
                  <button className={`flex items-center space-x-2 px-3 md:px-4 py-2 md:py-2.5 border rounded-lg md:rounded-xl text-sm transition-all duration-200 shadow-sm ${
                    isDarkMode 
                      ? 'border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-slate-500' 
                      : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }`}>
                    <Filter size={16} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                    <span className="font-medium hidden sm:inline">Filter Jobs</span>
                    <span className="font-medium sm:hidden">Filter</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                        : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700'
                    }`}>4</span>
                    <ChevronDown size={16} className="hidden sm:inline" />
                  </button>
                  <button className={`px-3 md:px-4 py-2 md:py-2.5 border rounded-lg md:rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hidden md:block ${
                    isDarkMode 
                      ? 'border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-slate-500' 
                      : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }`}>
                    View All Jobs
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <button 
                    onClick={() => setShowViewAssigned(!showViewAssigned)}
                    className={`flex items-center space-x-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl text-sm font-medium transition-all duration-200 shadow-sm ${
                      showViewAssigned 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                        : isDarkMode 
                          ? 'border border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    <Eye size={16} />
                    <span className="hidden lg:inline">View Assigned Candidates</span>
                    <span className="lg:hidden">Assigned</span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">0</span>
                  </button>
                  <button 
                    onClick={() => setShowAddJobModal(true)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl text-sm font-medium hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Plus size={16} />
                    <span>Add Job</span>
                  </button>
                </div>
              </div>

              {/* Job Cards */}
              <div className="space-y-3 md:space-y-4">
                {data.jobs.map(job => (
                  <div key={job.id} className={`border rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border-l-4 border-l-blue-500 ${
                    isDarkMode 
                      ? 'border-slate-600/60 bg-gradient-to-r from-slate-800 via-slate-800 to-slate-700/50' 
                      : 'border-gray-200/60 bg-gradient-to-r from-white via-white to-blue-50/30'
                  }`}>
                    {/* Job Header */}
                    <div className="p-4 md:p-5">
                      <div className="flex items-start justify-between mb-3 md:mb-4">
                        <div className="flex items-start space-x-3 md:space-x-4 flex-1 min-w-0">
                          <div className={`p-2 md:p-3 rounded-lg md:rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-gradient-to-br from-slate-600 to-slate-700' 
                              : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                          }`}>
                            <Briefcase className="text-white" size={16} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className={`text-base font-semibold ${isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>{job.title}</h3>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                job.status === 'Open' 
                                  ? isDarkMode 
                                    ? 'bg-green-800/70 text-green-200 border border-green-600/50' 
                                    : 'bg-green-100 text-green-800' 
                                  : isDarkMode 
                                    ? 'bg-slate-700 text-slate-300 border border-slate-600' 
                                    : 'bg-gray-100 text-gray-600'
                              }`}>
                                {job.status}
                              </span>
                            </div>
                            <div className={`flex items-center space-x-3 text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                              <div className="flex items-center space-x-1">
                                <MapPin size={12} />
                                <span>{job.location}</span>
                              </div>
                              <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-slate-600' : 'bg-gray-300'}`}></div>
                              <div className="flex items-center space-x-1">
                                <Users size={12} />
                                <span>{job.contact}</span>
                              </div>
                              <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-slate-600' : 'bg-gray-300'}`}></div>
                              <div>{job.owner}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button 
                            onClick={() => deleteJob(job.id)}
                            className={`p-1.5 rounded transition-colors ${
                              isDarkMode 
                                ? 'text-slate-400 hover:text-red-400 hover:bg-red-900/20' 
                                : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Job Metrics */}
                      <div className="grid grid-cols-3 gap-3 mt-3">
                        <div className={`text-center p-2.5 rounded-md ${isDarkMode ? 'bg-slate-700/60' : 'bg-gray-50'}`}>
                          <div className={`text-lg font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{job.pipeline}</div>
                          <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>In Pipeline</div>
                        </div>
                        <div className={`text-center p-2.5 rounded-md ${isDarkMode ? 'bg-slate-700/60' : 'bg-gray-50'}`}>
                          <div className={`text-lg font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>{job.placed}</div>
                          <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Placed</div>
                        </div>
                        <div className={`text-center p-2.5 rounded-md ${isDarkMode ? 'bg-slate-700/60' : 'bg-gray-50'}`}>
                          <div className={`text-lg font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>{job.pipeline + job.placed}</div>
                          <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Total</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Bar */}
                    <div className={`px-4 py-2.5 border-t ${
                      isDarkMode 
                        ? 'bg-slate-800/60 border-slate-700/60' 
                        : 'bg-gray-50 border-gray-100'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                            isDarkMode 
                              ? 'bg-blue-600 text-white hover:bg-blue-700' 
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}>
                            <Users size={12} />
                            <span>View Candidates</span>
                          </button>
                          <button className={`flex items-center space-x-1.5 px-3 py-1.5 border rounded text-xs font-medium transition-colors ${
                            isDarkMode 
                              ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-200' 
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}>
                            <Plus size={12} />
                            <span>Add Candidate</span>
                          </button>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button className={`p-1.5 rounded transition-colors ${
                            isDarkMode 
                              ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700' 
                              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'
                          }`}>
                            <Edit size={14} />
                          </button>
                          <button className={`p-1.5 rounded transition-colors ${
                            isDarkMode 
                              ? 'text-slate-400 hover:text-yellow-400 hover:bg-slate-700' 
                              : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-200'
                          }`}>
                            <Star size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="text-center py-8">
                <p className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>That's all the jobs 😊</p>
              </div>
            </div>
          )}

          {/* Hotlists Content */}
          {activeTab === 'hotlists' && (
            <div className="p-6">
              <div className="space-y-4">
                {data.hotlists.map(hotlist => (
                  <div key={hotlist.id} className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
                    isDarkMode 
                      ? 'border-slate-600/60 bg-gradient-to-r from-slate-800/80 to-slate-700/50 hover:border-slate-500/60' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>{hotlist.name}</h3>
                        <p className={`text-sm mb-3 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{hotlist.description}</p>
                        <div className={`flex items-center space-x-4 text-sm ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                          <span>{hotlist.candidateCount} candidates</span>
                          <span>Created by {hotlist.createdBy}</span>
                          <span>{formatDate(hotlist.createdDate)}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        hotlist.status === 'Active' 
                          ? isDarkMode 
                            ? 'bg-green-800/70 text-green-200 border border-green-600/50' 
                            : 'bg-green-100 text-green-800'
                          : isDarkMode 
                            ? 'bg-slate-700 text-slate-300 border border-slate-600' 
                            : 'bg-gray-100 text-gray-600'
                      }`}>
                        {hotlist.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Deals Content */}
          {activeTab === 'deals' && (
            <div className="p-6">
              <div className="space-y-4">
                {data.relatedDeals.map(deal => (
                  <div key={deal.id} className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
                    isDarkMode 
                      ? 'border-slate-600/60 bg-gradient-to-r from-slate-800/80 to-slate-700/50 hover:border-slate-500/60' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>{deal.title}</h3>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{deal.description}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>{deal.value}</div>
                        <div className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>{deal.probability}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className={`px-3 py-1 rounded-full font-medium ${
                        deal.stage === 'Closed Won' 
                          ? isDarkMode 
                            ? 'bg-green-800/70 text-green-200 border border-green-600/50' 
                            : 'bg-green-100 text-green-800'
                          : deal.stage === 'Negotiation' 
                            ? isDarkMode 
                              ? 'bg-blue-800/70 text-blue-200 border border-blue-600/50' 
                              : 'bg-blue-100 text-blue-800'
                            : isDarkMode 
                              ? 'bg-yellow-800/70 text-yellow-200 border border-yellow-600/50' 
                              : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {deal.stage}
                      </span>
                      <div className={isDarkMode ? 'text-slate-500' : 'text-gray-500'}>
                        <span>Owner: {deal.owner}</span>
                        <span className="ml-4">Close: {formatDate(deal.expectedCloseDate)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Emails Content */}
          {activeTab === 'emails' && (
            <div className="p-6">
              <div className="space-y-3">
                {data.relatedEmails.map(email => (
                  <div key={email.id} className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
                    isDarkMode 
                      ? 'border-slate-600/60 bg-gradient-to-r from-slate-800/80 to-slate-700/50 hover:border-slate-500/60' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        email.status === 'Unread' 
                          ? isDarkMode 
                            ? 'bg-blue-400' 
                            : 'bg-blue-500'
                          : isDarkMode 
                            ? 'bg-slate-600' 
                            : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className={`font-medium text-sm ${isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>{email.subject}</h4>
                          <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>{formatDate(email.date)}</span>
                        </div>
                        <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                          <span>From: {email.from}</span>
                          <span className="mx-2">•</span>
                          <span>To: {email.to}</span>
                        </div>
                        <p className={`text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{email.preview}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Candidates Pitched Content */}
          {activeTab === 'pitched' && (
            <div className="p-6">
              <div className="space-y-4">
                {data.candidatesPitched.map(candidate => (
                  <div key={candidate.id} className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
                    isDarkMode 
                      ? 'border-slate-600/60 bg-gradient-to-r from-slate-800/80 to-slate-700/50 hover:border-slate-500/60' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>{candidate.name}</h3>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{candidate.position}</p>
                        <div className={`flex items-center space-x-4 text-xs mt-2 ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                          <span>{candidate.experience} experience</span>
                          <span>{candidate.currentCompany}</span>
                          <span>{candidate.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>{candidate.salary}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium mt-1 inline-block ${
                          candidate.status === 'Interview Scheduled' 
                            ? isDarkMode 
                              ? 'bg-blue-800/70 text-blue-200 border border-blue-600/50' 
                              : 'bg-blue-100 text-blue-800'
                            : candidate.status === 'Offer Extended' 
                              ? isDarkMode 
                                ? 'bg-green-800/70 text-green-200 border border-green-600/50' 
                                : 'bg-green-100 text-green-800'
                              : candidate.status === 'Client Review' 
                                ? isDarkMode 
                                  ? 'bg-yellow-800/70 text-yellow-200 border border-yellow-600/50' 
                                  : 'bg-yellow-100 text-yellow-800'
                                : isDarkMode 
                                  ? 'bg-red-800/70 text-red-200 border border-red-600/50' 
                                  : 'bg-red-100 text-red-800'
                        }`}>
                          {candidate.status}
                        </span>
                      </div>
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                      <span className="font-medium">Pitched:</span> {formatDate(candidate.pitchDate)}
                    </div>
                    <p className={`text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{candidate.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Candidates Employed Content */}
          {activeTab === 'employed' && (
            <div className="p-6">
              <div className="space-y-4">
                {data.candidatesEmployed.map(candidate => (
                  <div key={candidate.id} className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
                    isDarkMode 
                      ? 'border-slate-600/60 bg-gradient-to-r from-slate-800/80 to-slate-700/50 hover:border-slate-500/60' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>{candidate.name}</h3>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{candidate.position}</p>
                        <div className={`flex items-center space-x-4 text-xs mt-2 ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
                          <span>Manager: {candidate.manager}</span>
                          <span>{candidate.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>{candidate.salary}</div>
                        <div className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>Fee: {candidate.placementFee}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium mt-1 inline-block ${
                          candidate.status === 'Active' 
                            ? isDarkMode 
                              ? 'bg-green-800/70 text-green-200 border border-green-600/50' 
                              : 'bg-green-100 text-green-800'
                            : candidate.status === 'Promoted' 
                              ? isDarkMode 
                                ? 'bg-blue-800/70 text-blue-200 border border-blue-600/50' 
                                : 'bg-blue-100 text-blue-800'
                              : isDarkMode 
                                ? 'bg-slate-700 text-slate-300 border border-slate-600' 
                                : 'bg-gray-100 text-gray-600'
                        }`}>
                          {candidate.status}
                        </span>
                      </div>
                    </div>
                    <div className={`grid grid-cols-2 gap-4 text-sm mb-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                      <div><span className="font-medium">Hired:</span> {formatDate(candidate.hireDate)}</div>
                      <div><span className="font-medium">Started:</span> {formatDate(candidate.startDate)}</div>
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{candidate.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className={`w-80 border-l p-4 md:p-6 shadow-xl backdrop-blur-sm transition-all duration-300 overflow-y-auto max-h-screen scrollbar-thin scrollbar-track-transparent scrollbar-thumb-rounded-full ${
          isDarkMode 
            ? 'bg-gradient-to-b from-slate-800/95 to-slate-900/95 border-slate-700/60 scrollbar-thumb-slate-600 hover:scrollbar-thumb-slate-500' 
            : 'bg-gradient-to-b from-gray-50/95 to-white/95 border-gray-200/60 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400'
        } ${
          isRightSidebarOpen 
            ? 'fixed inset-y-0 right-0 z-50 md:relative md:translate-x-0' 
            : 'hidden md:block'
        }`}>
          {/* Mobile close button */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <h2 className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>Activities</h2>
            <button 
              onClick={toggleRightSidebar}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Activity Tabs */}
          <div className="mb-4 md:mb-6">
            <div className="flex flex-wrap gap-1 md:gap-2">
              {[
                { key: 'all', label: 'All', count: counts.all },
                { key: 'calls', label: 'Calls', count: counts.calls },
                { key: 'tasks', label: 'Tasks', count: counts.tasks },
                { key: 'meetings', label: 'Meetings', count: counts.meetings },
                { key: 'files', label: 'Files', count: counts.files }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveActivityTab(tab.key)}
                  className={`px-2 md:px-3 py-1.5 md:py-2.5 rounded-lg md:rounded-xl text-xs font-semibold transition-all duration-200 shadow-sm ${
                    activeActivityTab === tab.key 
                      ? isDarkMode 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform -translate-y-0.5' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform -translate-y-0.5'
                      : isDarkMode 
                        ? 'bg-slate-700 text-slate-300 hover:text-slate-100 hover:bg-slate-600 border border-slate-600 hover:border-slate-500' 
                        : 'bg-white text-gray-600 hover:text-gray-800 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="hidden sm:inline">{tab.key === 'calls' ? 'Notes & Calls' : tab.label}</span>
                  <span className="sm:hidden">{tab.label}</span> ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6 md:mb-8">
            <h3 className={`font-semibold mb-3 md:mb-4 flex items-center transition-colors duration-300 ${
              isDarkMode ? 'text-slate-200' : 'text-gray-900'
            }`}>
              <div className={`p-1 rounded-md mr-2 transition-colors duration-300 ${
                isDarkMode ? 'bg-slate-600' : 'bg-blue-100'
              }`}>
                <Target size={14} className={isDarkMode ? 'text-slate-300' : 'text-blue-600'} />
              </div>
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={`flex flex-col items-center space-y-1 p-2 md:p-3 rounded-lg md:rounded-xl text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-102 ${action.color}`}
                >
                  <action.icon size={16} className="md:w-[18px] md:h-[18px]" />
                  <span className="text-xs font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search & Filter */}
          <div className="mb-6">
            <div className="relative mb-3">
              <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-400'
              }`}>
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search in Notes, Call Log, Task, Meeting..."
                className={`w-full pl-12 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 hover:shadow-md ${
                  isDarkMode 
                    ? 'border-slate-600 bg-slate-700 text-slate-200 placeholder-slate-400' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
            </div>
            <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
              isDarkMode 
                ? 'text-slate-400 hover:text-blue-400 hover:bg-slate-700' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}>
              <Filter size={16} />
              <span className="text-sm font-medium">Filter</span>
            </button>
          </div>

          {/* Activities */}
          <div>
            <h3 className={`font-medium mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-slate-200' : 'text-gray-900'
            }`}>
              {activeActivityTab === 'all' ? 'All Activities' :
               activeActivityTab === 'calls' ? 'Notes & Calls' :
               activeActivityTab === 'tasks' ? 'Tasks' :
               activeActivityTab === 'meetings' ? 'Meetings' :
               'Files'}
            </h3>
            
            {/* Activity Content */}
            {activeActivityTab === 'all' && (
              <div className="space-y-3">
                {data.activities.length === 0 ? (
                  <div className={`text-center py-12 rounded-xl border transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600' 
                      : 'bg-gradient-to-br from-gray-50 to-white border-gray-100'
                  }`}>
                    <FileText className={`mx-auto mb-4 ${isDarkMode ? 'text-slate-500' : 'text-gray-300'}`} size={48} />
                    <p className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>No activities associated with this record yet!</p>
                  </div>
                ) : (
                  data.activities.map(activity => (
                    <div key={activity.id} className={`p-4 rounded-xl border shadow-sm transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600/60 hover:shadow-lg hover:border-blue-500' 
                        : 'bg-gradient-to-r from-white to-gray-50 border-gray-200/60 hover:shadow-md hover:border-blue-200'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm">
                          {activity.type === 'call' && <Phone size={16} className="text-white" />}
                          {activity.type === 'email' && <Mail size={16} className="text-white" />}
                          {activity.type === 'note' && <FileText size={16} className="text-white" />}
                          {activity.type === 'meeting' && <Calendar size={16} className="text-white" />}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                            isDarkMode ? 'text-slate-200' : 'text-gray-900'
                          }`}>{activity.content}</p>
                          <p className={`text-xs mt-2 font-medium transition-colors duration-300 ${
                            isDarkMode ? 'text-slate-400' : 'text-gray-500'
                          }`}>
                            {activity.user} • {formatDateTime(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tasks Content */}
            {activeActivityTab === 'tasks' && (
              <div className="space-y-3">
                {data.tasks.map(task => (
                  <div key={task.id} className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-orange-100 rounded">
                        <Target size={16} className="text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            Due: {formatDate(task.dueDate)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {task.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Meetings Content */}
            {activeActivityTab === 'meetings' && (
              <div className="space-y-3">
                {data.meetings.map(meeting => (
                  <div key={meeting.id} className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-green-100 rounded">
                        <Calendar size={16} className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{meeting.title}</h4>
                        <p className="text-sm text-gray-600">{meeting.description}</p>
                        <div className="mt-2">
                          <p className="text-xs text-gray-500">
                            {formatDateTime(meeting.date)} • {meeting.location}
                          </p>
                          <p className="text-xs text-gray-500">
                            Attendees: {meeting.attendees.join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Files Content */}
            {activeActivityTab === 'files' && (
              <div className="space-y-3">
                {data.files.map(file => (
                  <div key={file.id} className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-purple-100 rounded">
                        <FileText size={16} className="text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{file.name}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            {file.type} • {file.size}
                          </span>
                          <button className="text-blue-600 hover:text-blue-700">
                            <ExternalLink size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Uploaded by {file.uploadedBy} • {formatDate(file.uploadDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Notes & Calls Content */}
            {activeActivityTab === 'calls' && (
              <div className="space-y-3">
                {data.activities.filter(a => a.type === 'call' || a.type === 'email' || a.type === 'note').map(activity => (
                  <div key={activity.id} className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded">
                        {activity.type === 'call' && <Phone size={16} className="text-blue-600" />}
                        {activity.type === 'email' && <Mail size={16} className="text-blue-600" />}
                        {activity.type === 'note' && <FileText size={16} className="text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.user} • {formatDateTime(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Copyright Notice */}
          <div className={`mt-8 pt-4 border-t transition-colors duration-300 ${
            isDarkMode ? 'border-slate-700/50' : 'border-gray-200/50'
          }`}>
            <p className={`text-xs text-center opacity-60 transition-colors duration-300 ${
              isDarkMode ? 'text-slate-400' : 'text-gray-400'
            }`}>
              © Tanveer Krishna Kristam
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Overlays */}
      {isLeftSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleLeftSidebar}
        />
      )}
      {isRightSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleRightSidebar}
        />
      )}

      {/* Add Job Modal */}
      {showAddJobModal && (
        <Modal
          title="Add New Job"
          onClose={() => setShowAddJobModal(false)}
        >
          <AddJobForm
            onSubmit={addJob}
            onCancel={() => setShowAddJobModal(false)}
          />
        </Modal>
      )}

      {/* Activity Modal */}
      {showActivityModal && (
        <Modal
          title={`Log ${activityType.charAt(0).toUpperCase() + activityType.slice(1)}`}
          onClose={() => setShowActivityModal(false)}
        >
          <ActivityForm
            type={activityType}
            onSubmit={logActivity}
            onCancel={() => setShowActivityModal(false)}
          />
        </Modal>
      )}
    </div>
  )
}

// Modal Component
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

// Add Job Form
function AddJobForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    contact: '',
    owner: 'Tanveer Krishna Kristam'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title && formData.location) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Title *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location *
        </label>
        <input
          type="text"
          required
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contact
        </label>
        <input
          type="text"
          value={formData.contact}
          onChange={(e) => setFormData({...formData, contact: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Job
        </button>
      </div>
    </form>
  )
}

// Activity Form
function ActivityForm({ type, onSubmit, onCancel }) {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [meetingDate, setMeetingDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (type === 'task' && title.trim() && content.trim()) {
      onSubmit({ 
        title: title.trim(), 
        description: content.trim(),
        dueDate: dueDate || new Date(Date.now() + 86400000).toISOString() // Default to tomorrow
      })
    } else if (type === 'meeting' && title.trim() && content.trim()) {
      onSubmit({ 
        title: title.trim(), 
        description: content.trim(),
        date: meetingDate || new Date(Date.now() + 86400000).toISOString()
      })
    } else if (content.trim()) {
      onSubmit({ content: content.trim() })
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'call': return <Phone size={20} />
      case 'email': return <Mail size={20} />
      case 'note': return <FileText size={20} />
      case 'meeting': return <Calendar size={20} />
      case 'task': return <Target size={20} />
      default: return <FileText size={20} />
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        {getIcon()}
        <span className="font-medium capitalize">{type}</span>
      </div>
      
      {(type === 'task' || type === 'meeting') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {type === 'task' ? 'Task Title' : 'Meeting Title'} *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`Enter ${type} title...`}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {type === 'task' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {type === 'meeting' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meeting Date & Time
          </label>
          <input
            type="datetime-local"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {type === 'call' ? 'Call Notes' : 
           type === 'email' ? 'Email Summary' :
           type === 'meeting' ? 'Meeting Agenda' : 
           type === 'task' ? 'Task Description' :
           'Note Content'} *
        </label>
        <textarea
          required
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Enter ${type} details...`}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      </div>
    </form>
  )
}
