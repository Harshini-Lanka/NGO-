import {
  Target,
  Eye,
  HeartHandshake,
  Heart, Users, Calendar, MapPin, CheckCircle, Clock, Search, Filter,
  Menu, X, Bell, LogOut, ChevronRight, Download, QrCode, Plus, Edit,
  Trash2, Shield, User, FileText, Settings, Award, ArrowRight, Activity,
  Mail, Phone, Info, LayoutDashboard, CheckSquare, Map, ClipboardList, DownloadCloud, Check
} from 'lucide-react';


const MOCK_EVENTS = [
  { id: 1, title: 'Mega Food Drive', category: 'Food Donation', date: '2026-07-15', time: '10:00 AM', location: 'City Square, Hyderabad', volunteersReq: 50, volunteersReg: 35, participantsReg: 120, capacity: 500, status: 'Upcoming', image: 'https://images.unsplash.com/photo-1593113565214-80afcb4dd15a?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Slum Education Camp', category: 'Education', date: '2026-07-20', time: '09:00 AM', location: 'Banjara Hills, Hyderabad', volunteersReq: 20, volunteersReg: 20, participantsReg: 45, capacity: 50, status: 'Full', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Free Medical Checkup', category: 'Medical', date: '2026-08-05', time: '08:00 AM', location: 'Community Hall, Secunderabad', volunteersReq: 30, volunteersReg: 12, participantsReg: 80, capacity: 200, status: 'Upcoming', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Tree Plantation Drive', category: 'Environment', date: '2026-06-10', time: '07:00 AM', location: 'KBR Park', volunteersReq: 100, volunteersReg: 100, participantsReg: 200, capacity: 200, status: 'Completed', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800' },
];

const MOCK_STATS = [
  { label: 'Volunteers', value: 5000, suffix: '+', icon: Users, color: 'text-blue-500', bg: 'bg-blue-100' },
  { label: 'Events Organized', value: 450, suffix: '+', icon: Calendar, color: 'text-[#FF8C42]', bg: 'bg-[#FF8C42]/20' },
  { label: 'Meals Distributed', value: 1000000, suffix: '+', icon: Heart, color: 'text-red-500', bg: 'bg-red-100' },
  { label: 'Communities Served', value: 120, suffix: '+', icon: MapPin, color: 'text-[#4CAF50]', bg: 'bg-[#4CAF50]/20' },
];
const MOCK_REGISTRATIONS = [
  { id: 'REG-8472', name: 'Alice Smith', email: 'alice@example.com', phone: '+91 9876543210', event: 'Mega Food Drive', type: 'Participant', peopleCount: 2, status: 'Confirmed', date: '2026-06-28' },
  { id: 'REG-9102', name: 'Bob Johnson', email: 'bob@example.com', phone: '+91 8765432109', event: 'Slum Education Camp', type: 'Volunteer', peopleCount: 1, status: 'Pending', date: '2026-06-29' },
  { id: 'REG-3341', name: 'Charlie Davis', email: 'charlie@example.com', phone: '+91 7654321098', event: 'Free Medical Checkup', type: 'Participant', peopleCount: 4, status: 'Confirmed', date: '2026-06-29' },
];

const MOCK_CHART_DATA = [
  { name: 'Jan', volunteers: 400, events: 24 },
  { name: 'Feb', volunteers: 300, events: 18 },
  { name: 'Mar', volunteers: 550, events: 35 },
  { name: 'Apr', volunteers: 480, events: 28 },
  { name: 'May', volunteers: 600, events: 42 },
  { name: 'Jun', volunteers: 750, events: 50 },
];

export {
    MOCK_EVENTS,
    MOCK_STATS,
    MOCK_REGISTRATIONS,
    MOCK_CHART_DATA
}