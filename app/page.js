'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, Phone, Mail, FileText, Calendar, 
  Building2, MapPin, Edit, Star, Filter,
  Search, Trash2, Users, Briefcase, 
  MessageSquare, Target, ChevronDown,
  ExternalLink, UserPlus, Eye
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

  const counts = getActivityCounts()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-blue-700 text-white px-4 py-2 text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Building2 size={18} />
            <span>Companies &gt; Page 1</span>
            <span className="text-blue-200">10 - 1</span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-blue-600 hover:bg-blue-500 px-4 py-1 rounded text-sm">
              Book a Demo
            </button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-semibold">
              TK
            </div>
          </div>
        </div>
      </div>

      {/* Company Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="text-blue-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{data.company.name}</h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin size={16} className="mr-1" />
                  {data.company.location}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                <Edit size={18} />
              </button>
              <button className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-gray-100 rounded">
                <Star size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto max-h-screen">
          {/* Contacts Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                CONTACTS
              </h3>
              <div className="flex items-center space-x-2">
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">MS</span>
                <button className="text-blue-600 hover:text-blue-700">
                  <UserPlus size={16} />
                </button>
                <button className="text-blue-600 hover:text-blue-700 text-xs">
                  View All Contacts
                </button>
              </div>
            </div>

            {/* Contact List */}
            <div className="mb-6 space-y-3">
              {data.contacts.slice(0, 3).map(contact => (
                <div key={contact.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{contact.name}</p>
                    <p className="text-gray-500 text-xs">{contact.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-600 text-xs hover:underline cursor-pointer">{contact.email}</p>
                    <p className="text-gray-500 text-xs">{contact.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Company Details */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">About Company</h4>
              <p className="text-gray-600 text-sm">{data.company.aboutCompany}</p>
            </div>

            {/* Detail Fields */}
            {[
              { label: 'Website', value: data.company.website, isLink: true },
              { label: 'Company Industry', value: data.company.industry },
              { label: 'Company State', value: data.company.state },
              { label: 'Company Postal Code', value: data.company.postalCode },
              { label: 'Monster Board Company', value: data.company.monsterBoard },
              { label: 'Company Full Address', value: data.company.address },
              { label: 'Company Locality', value: data.company.locality },
              { label: 'Company Country', value: data.company.country },
              { label: 'LinkedIn Company ID', value: data.company.linkedinId },
              { label: 'Indeed Opted Out', value: data.company.indeedOptedOut }
            ].map((field, index) => (
              <div key={index} className="flex justify-between items-start text-sm py-1">
                <span className="text-gray-700 font-medium">{field.label}</span>
                <span className={`text-right max-w-48 ${
                  field.isLink ? 'text-blue-600' : 'text-gray-900'
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

        {/* Center Content */}
        <div className="flex-1 bg-white">
          {/* Content Tabs */}
          <div className="border-b border-gray-200 px-6">
            <div className="flex space-x-8">
              {[
                { key: 'jobs', label: 'Jobs' },
                { key: 'hotlists', label: 'Hotlists' },
                { key: 'deals', label: 'Related Deals' },
                { key: 'emails', label: 'Related Emails' },
                { key: 'pitched', label: 'Candidate(s) Pitched' },
                { key: 'employed', label: 'Candidates Employed' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs Content */}
          {activeTab === 'jobs' && (
            <div className="p-6">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                    <Filter size={16} />
                    <span>Filter Jobs</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">4</span>
                    <ChevronDown size={16} />
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                    View All Jobs
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setShowViewAssigned(!showViewAssigned)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium ${
                      showViewAssigned 
                        ? 'bg-blue-600 text-white' 
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Eye size={16} />
                    <span>View Assigned Candidates</span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">0</span>
                  </button>
                  <button 
                    onClick={() => setShowAddJobModal(true)}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                  >
                    <Plus size={16} />
                    <span>Add Job</span>
                  </button>
                </div>
              </div>

              {/* Job Cards */}
              <div className="space-y-3">
                {data.jobs.map(job => (
                  <div key={job.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                    {/* Job Header */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="p-2 bg-blue-50 rounded-md">
                            <Briefcase className="text-blue-600" size={16} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-base font-semibold text-gray-900">{job.title}</h3>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                job.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {job.status}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3 text-xs text-gray-600">
                              <div className="flex items-center space-x-1">
                                <MapPin size={12} />
                                <span>{job.location}</span>
                              </div>
                              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                              <div className="flex items-center space-x-1">
                                <Users size={12} />
                                <span>{job.contact}</span>
                              </div>
                              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                              <div>{job.owner}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button 
                            onClick={() => deleteJob(job.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Job Metrics */}
                      <div className="grid grid-cols-3 gap-3 mt-3">
                        <div className="text-center p-2.5 bg-gray-50 rounded-md">
                          <div className="text-lg font-bold text-blue-600">{job.pipeline}</div>
                          <div className="text-xs text-gray-600">In Pipeline</div>
                        </div>
                        <div className="text-center p-2.5 bg-gray-50 rounded-md">
                          <div className="text-lg font-bold text-green-600">{job.placed}</div>
                          <div className="text-xs text-gray-600">Placed</div>
                        </div>
                        <div className="text-center p-2.5 bg-gray-50 rounded-md">
                          <div className="text-lg font-bold text-purple-600">{job.pipeline + job.placed}</div>
                          <div className="text-xs text-gray-600">Total</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Bar */}
                    <div className="bg-gray-50 px-4 py-2.5 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors">
                            <Users size={12} />
                            <span>View Candidates</span>
                          </button>
                          <button className="flex items-center space-x-1.5 px-3 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-50 transition-colors">
                            <Plus size={12} />
                            <span>Add Candidate</span>
                          </button>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors">
                            <Edit size={14} />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-yellow-500 hover:bg-gray-200 rounded transition-colors">
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
                <p className="text-gray-500">That's all the jobs 😊</p>
              </div>
            </div>
          )}

          {/* Hotlists Content */}
          {activeTab === 'hotlists' && (
            <div className="p-6">
              <div className="space-y-4">
                {data.hotlists.map(hotlist => (
                  <div key={hotlist.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{hotlist.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{hotlist.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{hotlist.candidateCount} candidates</span>
                          <span>Created by {hotlist.createdBy}</span>
                          <span>{formatDate(hotlist.createdDate)}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        hotlist.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
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
                  <div key={deal.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{deal.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{deal.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{deal.value}</div>
                        <div className="text-sm text-gray-500">{deal.probability}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className={`px-3 py-1 rounded-full font-medium ${
                        deal.stage === 'Closed Won' ? 'bg-green-100 text-green-800' :
                        deal.stage === 'Negotiation' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {deal.stage}
                      </span>
                      <div className="text-gray-500">
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
                  <div key={email.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        email.status === 'Unread' ? 'bg-blue-500' : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-gray-900 text-sm">{email.subject}</h4>
                          <span className="text-xs text-gray-500">{formatDate(email.date)}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          <span>From: {email.from}</span>
                          <span className="mx-2">•</span>
                          <span>To: {email.to}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{email.preview}</p>
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
                  <div key={candidate.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-600">{candidate.position}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                          <span>{candidate.experience} experience</span>
                          <span>{candidate.currentCompany}</span>
                          <span>{candidate.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{candidate.salary}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium mt-1 inline-block ${
                          candidate.status === 'Interview Scheduled' ? 'bg-blue-100 text-blue-800' :
                          candidate.status === 'Offer Extended' ? 'bg-green-100 text-green-800' :
                          candidate.status === 'Client Review' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {candidate.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Pitched:</span> {formatDate(candidate.pitchDate)}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{candidate.notes}</p>
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
                  <div key={candidate.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-600">{candidate.position}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                          <span>Manager: {candidate.manager}</span>
                          <span>{candidate.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{candidate.salary}</div>
                        <div className="text-xs text-gray-500">Fee: {candidate.placementFee}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium mt-1 inline-block ${
                          candidate.status === 'Active' ? 'bg-green-100 text-green-800' :
                          candidate.status === 'Promoted' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {candidate.status}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
                      <div><span className="font-medium">Hired:</span> {formatDate(candidate.hireDate)}</div>
                      <div><span className="font-medium">Started:</span> {formatDate(candidate.startDate)}</div>
                    </div>
                    <p className="text-sm text-gray-600">{candidate.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-80 bg-gray-50 border-l border-gray-200 p-6">
          {/* Activity Tabs */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All', count: counts.all },
                { key: 'calls', label: 'Notes & Calls', count: counts.calls },
                { key: 'tasks', label: 'Tasks', count: counts.tasks },
                { key: 'meetings', label: 'Meetings', count: counts.meetings },
                { key: 'files', label: 'Files', count: counts.files }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveActivityTab(tab.key)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeActivityTab === tab.key 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-600 hover:text-gray-800 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={`flex flex-col items-center space-y-2 p-4 rounded-lg text-white transition-colors ${action.color}`}
                >
                  <action.icon size={24} />
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search & Filter */}
          <div className="mb-6">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search in Notes, Call Log, Task, Meeting..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
              <Filter size={16} />
              <span className="text-sm">Filter</span>
            </button>
          </div>

          {/* Activities */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">
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
                  <div className="text-center py-12">
                    <FileText className="mx-auto text-gray-300 mb-4" size={48} />
                    <p className="text-gray-500">No activities associated with this record yet!</p>
                  </div>
                ) : (
                  data.activities.map(activity => (
                    <div key={activity.id} className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-gray-100 rounded">
                          {activity.type === 'call' && <Phone size={16} />}
                          {activity.type === 'email' && <Mail size={16} />}
                          {activity.type === 'note' && <FileText size={16} />}
                          {activity.type === 'meeting' && <Calendar size={16} />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.content}</p>
                          <p className="text-xs text-gray-500 mt-1">
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
        </div>
      </div>

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
