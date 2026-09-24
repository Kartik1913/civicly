export const INITIAL_ISSUES = [
  {
    id: 'CIV-1042',
    title: 'Hazardous Large Pothole on Main St',
    description: 'Deep pavement fracture across the northbound lane causing severe wheel impact and bicyclist danger during evening commute.',
    category: 'Roads',
    location: '4th Ave & Main Street',
    ward: 'Ward 4 (Downtown)',
    priority: 'High',
    status: 'In Progress',
    reportedDate: '2 hours ago',
    upvotes: 24,
    upvotedByMe: false,
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop',
    resolutionNotes: 'Road repair team dispatched with cold-mix asphalt.',
    resolutionImage: null,
    coordinates: { lat: 37.7749, lng: -122.4194 }
  },
  {
    id: 'CIV-1038',
    title: 'Broken Solar Pedestrian Streetlight',
    description: 'Pathway lighting cluster dead for 3 nights leaving the pedestrian park entrance unlit.',
    category: 'Electricity',
    location: 'Pine Park Promenade Pathway',
    ward: 'Ward 2 (West End)',
    priority: 'Medium',
    status: 'Acknowledged',
    reportedDate: 'Yesterday',
    upvotes: 17,
    upvotedByMe: false,
    image: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop',
    resolutionNotes: 'Queued for municipal electrical team line inspection.',
    resolutionImage: null,
    coordinates: { lat: 37.7833, lng: -122.4167 }
  },
  {
    id: 'CIV-1035',
    title: 'Pressurized Clean Water Main Leak',
    description: 'Water leaking out from curb seam into cycle lane causing standing water hazard.',
    category: 'Water',
    location: '550 West End Boulevard',
    ward: 'Ward 1 (Central)',
    priority: 'Emergency',
    status: 'Submitted',
    reportedDate: '3 hours ago',
    upvotes: 9,
    upvotedByMe: false,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=800&auto=format&fit=crop',
    resolutionNotes: '',
    resolutionImage: null,
    coordinates: { lat: 37.7600, lng: -122.4350 }
  },
  {
    id: 'CIV-1029',
    title: 'Overflowing Commercial Garbage Hub',
    description: 'Multiple uncollected commercial waste boxes blocking sidewalk and creating sanitation risk.',
    category: 'Sanitation',
    location: '88 Valencia Street & 14th',
    ward: 'Ward 7 (North East)',
    priority: 'High',
    status: 'In Progress',
    reportedDate: '1 day ago',
    upvotes: 31,
    upvotedByMe: true,
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop',
    resolutionNotes: 'Heavy waste disposal truck scheduled for morning pickup.',
    resolutionImage: null,
    coordinates: { lat: 37.7689, lng: -122.4280 }
  }
];

export const CATEGORIES = ['All', 'Roads', 'Electricity', 'Sanitation', 'Water'];
export const WARDS = ['All Wards', 'Ward 1 (Central)', 'Ward 2 (West End)', 'Ward 4 (Downtown)', 'Ward 7 (North East)'];
export const STATUSES = ['All Statuses', 'Submitted', 'Acknowledged', 'In Progress', 'Resolved'];
export const PRIORITIES = ['All Priorities', 'Low', 'Medium', 'High', 'Emergency'];
