export const MOCK_ISSUES = [
  {
    id: 'CIV-901',
    title: 'Severe Asphalt Depression & Pothole',
    location: '4th Ave & Main Street, Downtown',
    category: 'Road Hazards',
    status: 'In Progress',
    statusType: 'in_progress',
    reportedDate: '2 hours ago',
    upvotes: 48,
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop',
    description: 'Deep pavement fracture on the northbound lane. Dispatched road crew scheduled for asphalt repair.',
    department: 'Department of Transportation',
    coordinates: { x: 35, y: 40 }
  },
  {
    id: 'CIV-894',
    title: 'Broken Solar Pedestrian Lighting',
    location: 'Pine Park Promenade Pathway',
    category: 'Public Safety',
    status: 'Acknowledged',
    statusType: 'acknowledged',
    reportedDate: 'Yesterday',
    upvotes: 31,
    image: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop',
    description: 'Pathway lighting cluster non-functional after wind storm. Ticket acknowledged by municipal utilities team.',
    department: 'Public Works & Lighting',
    coordinates: { x: 62, y: 25 }
  },
  {
    id: 'CIV-888',
    title: 'Pressurized Water Main Leak',
    location: '550 West End Boulevard',
    category: 'Utilities',
    status: 'Submitted',
    statusType: 'submitted',
    reportedDate: '3 hours ago',
    upvotes: 19,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=800&auto=format&fit=crop',
    description: 'Clean water bubbling through curb seam. Initial report verified and queued for emergency valve inspection.',
    department: 'Water Bureau Dispatch',
    coordinates: { x: 45, y: 70 }
  }
];

export const STORY_STAGES = [
  {
    number: '01',
    title: 'SEE',
    headline: 'Every neighborhood has problems that deserve to be seen.',
    description: 'From a hidden pothole on your morning commute to a dark corner with a broken streetlight, silent hazards affect thousands of residents daily.',
    accentColor: '#38bdf8'
  },
  {
    number: '02',
    title: 'REPORT',
    headline: 'Capture the problem. Add a location. Send it.',
    description: 'Zero registration friction. Snap a photo, auto-detect precise location coordinates, and submit directly to city maintenance systems in under 15 seconds.',
    accentColor: '#fbbf24'
  },
  {
    number: '03',
    title: 'TRACK',
    headline: 'Follow your report from submission to resolution.',
    description: 'No black holes. Receive automatic status updates as your report moves from municipal triage to active work-crew dispatch.',
    accentColor: '#a855f7'
  },
  {
    number: '04',
    title: 'RESOLVE',
    headline: 'Make progress visible to everyone.',
    description: 'When work is completed, verified before-and-after photo records are published to your neighborhood map, building community trust.',
    accentColor: '#34d399'
  }
];
