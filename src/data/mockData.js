export const CATEGORIES = [
  { id: 'pothole', name: 'Roads & Potholes', icon: 'Construction', color: '#e11d48', bg: '#ffe4e6', dept: 'Department of Transportation' },
  { id: 'lighting', name: 'Street Lighting', icon: 'Zap', color: '#d97706', bg: '#fef3c7', dept: 'Public Works & Utilities' },
  { id: 'sanitation', name: 'Trash & Sanitation', icon: 'Trash2', color: '#059669', bg: '#d1fae5', dept: 'Sanitation & Waste Management' },
  { id: 'water', name: 'Water & Sewer', icon: 'Droplets', color: '#2563eb', bg: '#dbeafe', dept: 'Water Resources Bureau' },
  { id: 'traffic', name: 'Traffic & Signals', icon: 'AlertTriangle', color: '#7c3aed', bg: '#ede9fe', dept: 'Traffic Engineering' },
  { id: 'parks', name: 'Parks & Trees', icon: 'Trees', color: '#16a34a', bg: '#dcfce7', dept: 'Parks & Recreation' },
  { id: 'vandalism', name: 'Vandalism & Graffiti', icon: 'Paintbrush', color: '#db2777', bg: '#fce7f3', dept: 'Code Enforcement' },
];

export const STATUS_OPTIONS = [
  { id: 'reported', label: 'Reported', color: '#64748b', bg: '#f1f5f9' },
  { id: 'in_progress', label: 'In Progress', color: '#d97706', bg: '#fef3c7' },
  { id: 'resolved', label: 'Resolved', color: '#16a34a', bg: '#dcfce7' },
];

export const PRIORITY_OPTIONS = [
  { id: 'low', label: 'Low', color: '#64748b' },
  { id: 'medium', label: 'Medium', color: '#2563eb' },
  { id: 'high', label: 'High', color: '#d97706' },
  { id: 'emergency', label: 'Emergency', color: '#dc2626' },
];

// Initial mock issues focused on a central metro area (e.g. San Francisco coordinates for clear map rendering)
export const INITIAL_ISSUES = [
  {
    id: 'CIV-2026-001',
    title: 'Hazardous Pothole on Main St & 4th Ave',
    description: 'Deep pothole in the right lane causing vehicle wheel damage and cyclist danger during night commute.',
    category: 'pothole',
    priority: 'high',
    status: 'in_progress',
    lat: 37.7749,
    lng: -122.4194,
    address: '402 Main St, Downtown Central',
    reportedBy: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    createdAt: '2026-09-22T09:30:00Z',
    upvotes: 42,
    upvotedByMe: true,
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop',
    assignedDept: 'Department of Transportation',
    timeline: [
      { status: 'reported', label: 'Issue Submitted by Citizen', date: '2026-09-22T09:30:00Z', note: 'Report logged with 3 attached photos.' },
      { status: 'verified', label: 'Verified by Dispatch', date: '2026-09-22T11:15:00Z', note: 'Assigned inspection ticket #DOT-8842.' },
      { status: 'in_progress', label: 'Crew Dispatched', date: '2026-09-23T08:00:00Z', note: 'Asphalt repair crew scheduled for site work.' }
    ],
    comments: [
      { id: 1, user: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', text: 'My car rim was bent here yesterday! Glad this was reported.', date: '2026-09-22T10:15:00Z' },
      { id: 2, user: 'City DOT Response Team', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150', text: 'Crew is scheduled to fill this pothole by tomorrow morning.', date: '2026-09-23T08:05:00Z', isOfficial: true }
    ]
  },
  {
    id: 'CIV-2026-002',
    title: 'Broken Solar Streetlight at Pine Park Entrance',
    description: 'Streetlight has been flickering and completely dead for 3 nights, leaving the park pedestrian pathway unlit.',
    category: 'lighting',
    priority: 'medium',
    status: 'reported',
    lat: 37.7833,
    lng: -122.4167,
    address: '120 Pine Park Plaza',
    reportedBy: 'David Kim',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    createdAt: '2026-09-24T06:20:00Z',
    upvotes: 19,
    upvotedByMe: false,
    image: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop',
    assignedDept: 'Public Works & Utilities',
    timeline: [
      { status: 'reported', label: 'Issue Submitted by Citizen', date: '2026-09-24T06:20:00Z', note: 'Ticket routed to Electrical Infrastructure.' }
    ],
    comments: [
      { id: 1, user: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', text: 'It makes jogging in the evening uncomfortable. Hope it gets fixed quickly.', date: '2026-09-24T07:10:00Z' }
    ]
  },
  {
    id: 'CIV-2026-003',
    title: 'Overflowing Recycling Bins & Illegal Dumping',
    description: 'Large commercial boxes and furniture dumped around public recycling hub obstructing sidewalk access.',
    category: 'sanitation',
    priority: 'medium',
    status: 'resolved',
    lat: 37.7689,
    lng: -122.4280,
    address: '88 Valencia St & 14th',
    reportedBy: 'Anita Alvarez',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    createdAt: '2026-09-20T14:10:00Z',
    upvotes: 56,
    upvotedByMe: true,
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop',
    assignedDept: 'Sanitation & Waste Management',
    timeline: [
      { status: 'reported', label: 'Reported', date: '2026-09-20T14:10:00Z', note: 'Sanitation request generated.' },
      { status: 'in_progress', label: 'Truck Dispatched', date: '2026-09-21T07:30:00Z', note: 'Heavy waste crew dispatched.' },
      { status: 'resolved', label: 'Cleaned & Cleared', date: '2026-09-21T11:45:00Z', note: 'Debris cleared and recycling bins emptied.' }
    ],
    comments: [
      { id: 1, user: 'Sanitation Ops', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150', text: 'Site fully cleared. Thank you for reporting!', date: '2026-09-21T11:46:00Z', isOfficial: true }
    ]
  },
  {
    id: 'CIV-2026-004',
    title: 'Burst Water Pipe Creating Street Flooding',
    description: 'Clean water gushing from underground line near curb. Creating standing water in bicycle lane.',
    category: 'water',
    priority: 'emergency',
    status: 'in_progress',
    lat: 37.7600,
    lng: -122.4350,
    address: '550 Castro Street',
    reportedBy: 'Jordan Lee',
    userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    createdAt: '2026-09-24T18:00:00Z',
    upvotes: 78,
    upvotedByMe: true,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=800&auto=format&fit=crop',
    assignedDept: 'Water Resources Bureau',
    timeline: [
      { status: 'reported', label: 'Emergency Ticket Created', date: '2026-09-24T18:00:00Z', note: 'High priority flag raised.' },
      { status: 'in_progress', label: 'Valve Shutoff In Progress', date: '2026-09-24T18:45:00Z', note: 'Utility emergency team on scene.' }
    ],
    comments: [
      { id: 1, user: 'Jordan Lee', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150', text: 'Water pressure in surrounding buildings dropped slightly.', date: '2026-09-24T18:30:00Z' }
    ]
  },
  {
    id: 'CIV-2026-005',
    title: 'Malfunctioning Pedestrian Traffic Signal',
    description: 'Walk signal stays red continuously for crosswalk across 6th Street, causing pedestrians to jaywalk safely.',
    category: 'traffic',
    priority: 'high',
    status: 'reported',
    lat: 37.7810,
    lng: -122.4090,
    address: '6th St & Howard St',
    reportedBy: 'Carlos Mendez',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    createdAt: '2026-09-23T16:15:00Z',
    upvotes: 31,
    upvotedByMe: false,
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&auto=format&fit=crop',
    assignedDept: 'Traffic Engineering',
    timeline: [
      { status: 'reported', label: 'Reported', date: '2026-09-23T16:15:00Z', note: 'Queued for traffic signal controller diagnostic.' }
    ],
    comments: []
  },
  {
    id: 'CIV-2026-006',
    title: 'Fallen Tree Branch Damaging Park Bench',
    description: 'Heavy storm branch snapped off oak tree at Mission Dolores Park. Bench crushed and pathway partially blocked.',
    category: 'parks',
    priority: 'medium',
    status: 'resolved',
    lat: 37.7598,
    lng: -122.4260,
    address: 'Mission Dolores Park - South Lawn',
    reportedBy: 'Emma Watson',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    createdAt: '2026-09-18T10:00:00Z',
    upvotes: 64,
    upvotedByMe: false,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop',
    assignedDept: 'Parks & Recreation',
    timeline: [
      { status: 'reported', label: 'Reported', date: '2026-09-18T10:00:00Z', note: 'Arborist team assigned.' },
      { status: 'in_progress', label: 'Removal Crew Active', date: '2026-09-19T09:00:00Z', note: 'Chainsaw and wood chipper team deployed.' },
      { status: 'resolved', label: 'Cleared & Bench Assessed', date: '2026-09-19T14:30:00Z', note: 'Debris removed; bench scheduled for bench replacement next month.' }
    ],
    comments: []
  }
];

export const SAMPLE_SAMPLE_IMAGES = [
  { label: 'Road Pothole', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop' },
  { label: 'Broken Streetlight', url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop' },
  { label: 'Overfilled Waste', url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop' },
  { label: 'Water Leak', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=800&auto=format&fit=crop' },
  { label: 'Damaged Park Sign / Bench', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop' },
];
