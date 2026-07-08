import { useEffect, useState } from "react";
import { MOCK_STATS } from "../utils/mockData";
import { getEvents } from "../api/eventApi";
import Button from "../components/Button";
import Card from "../components/Card";
import Badge from "../components/Badge";
import AnimatedNumber from "../components/AnimatedNumber";
import {
    Target,
    Eye,
    HeartHandshake,
    Heart, Users, Calendar, MapPin, CheckCircle, Clock, Search, Filter,
    Menu, X, Bell, LogOut, ChevronRight, Download, QrCode, Plus, Edit,
    Trash2, Shield, User, FileText, Settings, Award, ArrowRight, Activity,
    Mail, Phone, Info, LayoutDashboard, CheckSquare, Map, ClipboardList, DownloadCloud, Check,MessageCircle,
} from 'lucide-react';
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const getEventImage = (category) => {
  switch (category?.toLowerCase()) {
    case "education":
      return "/images/education.png";

    case "medical":
      return "/images/health.png";

    case "environment":
      return "/images/environment.png";

    case "community":
      return "/images/community.svg";

       case "food donation":
      return "/images/food donation.png";

      case "women empowerment":
      return "/images/women empowerment.png";

       case "animal welfare":
      return "/images/animal welfare.png";


    default:
      return "/images/default.png";
  }
};

const LandingPage = ({ navigate, onRegisterClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        loadEvents();
        return () => window.removeEventListener('scroll', handleScroll);

    }, []);


    const loadEvents = async () => {
        try {

            const res = await getEvents();

            setEvents(res.data.events);

        } catch (err) {

            console.log(err);

        }
    };
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
            {/* Navigation */}
            <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF8C42] to-[#4CAF50] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            EK
                        </div>
                        <span className={`text-2xl font-bold ${isScrolled ? 'text-gray-800' : 'text-gray-800 drop-shadow-sm'}`}>Ekk Kadam</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 font-medium">
                        <a href="#about" className="hover:text-[#FF8C42] transition-colors">About</a>
                        <a href="#events" className="hover:text-[#FF8C42] transition-colors">Events</a>
                        <a href="#impact" className="hover:text-[#FF8C42] transition-colors">Impact</a>
                        <a href="#contact" className="hover:text-[#FF8C42] transition-colors">Contact</a>
                        <Button onClick={() => navigate('auth')} variant="primary" className="px-6 rounded-full">
                            Login / Join
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-50/90 to-green-50/90 z-10" />
                    <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000" alt="Volunteers" className="w-full h-full object-cover" />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-[#FF8C42] font-semibold text-sm mb-6 animate-fade-in-up">
                        Be the change you wish to see
                    </span>
                    <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        Take a step towards <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C42] to-[#4CAF50]">Humanity.</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        Join Ekk Kadam Foundation to organize food drives, medical camps, and education initiatives. Your one step can change a life.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <Button onClick={() => navigate('auth')} className="w-full sm:w-auto px-8 py-4 text-lg rounded-full">
                            Become a Volunteer <ArrowRight className="ml-2" size={20} />
                        </Button>
                       <Button
    variant="outline"
    onClick={() =>
        document
            .getElementById("events")
            ?.scrollIntoView({
                behavior: "smooth",
            })
    }
>
    Explore Events
</Button>
                    </div>
                </div>
            </section>


            {/*about*/}


            <section
                id="about"
                className="relative overflow-hidden py-24 bg-[#F5F7FA]"
            >
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            About Ekk Kadam Foundation
                        </h2>

                        <p className="text-gray-600 text-lg leading-8">
                            Ekk Kadam Foundation is a non-profit organization committed to
                            creating positive social impact through food drives, education,
                            healthcare initiatives, environmental campaigns, and community
                            development. Our mission is to inspire people to contribute one
                            step at a time towards a better society.
                        </p>

                        <div className="grid md:grid-cols-3 gap-8 mt-12">

                            <Card
                                hover
                                className="p-8 text-center bg-gradient-to-br from-orange-50 to-white border border-orange-200"
                            >
                                <div className="w-20 h-20 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-6">
                                    <Target className="text-[#FF8C42]" size={40} />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Our Mission

                                </h3>

                                <p className="text-gray-600 leading-7">
                                    Empower communities through volunteering,
                                    compassion, and meaningful social service.

                                </p>
                            </Card>

                            <Card
                                hover
                                className="p-8 text-center bg-gradient-to-br from-green-50 to-white border border-green-200"
                            >
                                <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
                                    <Eye className="text-green-600" size={40} />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Our Vision
                                </h3>

                                <p className="text-gray-600 leading-7">
                                    Build a compassionate society where everyone
                                    contributes towards lasting change.
                                </p>
                            </Card>
                            <Card
                                hover
                                className="p-8 text-center bg-gradient-to-br from-red-50 to-white border border-red-200"
                            >
                                <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-6">
                                    <HeartHandshake className="text-red-500" size={40} />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Our Values
                                </h3>

                                <div className="space-y-3 text-left max-w-fit mx-auto">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle size={18} className="text-red-500" />
                                        <span className="text-gray-600">Compassion</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <CheckCircle size={18} className="text-red-500" />
                                        <span className="text-gray-600">Integrity</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <CheckCircle size={18} className="text-red-500" />
                                        <span className="text-gray-600">Service</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <CheckCircle size={18} className="text-red-500" />
                                        <span className="text-gray-600">Community</span>
                                    </div>
                                </div>
                            </Card>






                        </div>
                    </div>
                </div>
            </section>


            {/* Stats Section */}
            <section id="impact" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">Together, we are making a measurable difference in communities across the country.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {MOCK_STATS.map((stat, i) => (
                            <Card key={i} hover className="p-8 text-center" glass>
                                <div className={`w-16 h-16 mx-auto rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6`}>
                                    <stat.icon size={32} />
                                </div>
                                <h3 className="text-4xl font-bold text-gray-900 mb-2">
                                    {stat.value === 1000000 ? (
                                        <>
                                            <AnimatedNumber end={1000000} suffix="+" />
                                        </>
                                    ) : (
                                        <AnimatedNumber end={stat.value} suffix={stat.suffix} />
                                    )}
                                </h3>
                                <p className="text-gray-500 font-medium">{stat.label}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Events */}
            <section id="events" className="pt-20 pb-10 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
                            <p className="text-gray-500">Join our upcoming initiatives and start contributing.</p>
                        </div>
                      
    
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.slice(0, 3).map(event => (
                            <Card key={event._id} hover className="flex flex-col h-full">
                                <div className="h-48 w-full relative overflow-hidden group">
                                    <img
    src={event.image?.url || getEventImage(event.category)}
    alt={event.title}
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
/>
                                    <div className="absolute top-4 right-4">
                                        <Badge type={event.status === 'Upcoming' ? 'success' : 'warning'}>{event.status}</Badge>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 text-sm text-[#FF8C42] font-semibold mb-2">
                                        <Activity size={16} /> {event.category}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{event.title}</h3>
                                    <div className="space-y-4 mb-6 flex-1 text-gray-600 text-sm">
                                        <div className="flex items-center gap-3"><Calendar size={18} className="text-gray-400" /> 

                                            {new Date(event.date).toLocaleDateString()} at {event.time}</div>
                                        <div className="flex items-center gap-3"><MapPin size={18} className="text-gray-400" /> {event.location}</div>

                                        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
                                            <div>
                                                <p className="text-xs text-gray-400 mb-1">Volunteers Needed</p>
                                                <p className="font-semibold text-gray-800">{event.volunteersRegistered} / {event.volunteersRequired}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 mb-1">Participants</p>
                                                <p className="font-semibold text-gray-800">{event.participantsRegistered}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-xs text-gray-400 mb-1">Remaining Capacity</p>
                                                <p className="font-semibold text-gray-800">{Math.max(0, event.capacity -
                                                    event.participantsRegistered -
                                                    event.volunteersRegistered)} spots left</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
    className="w-full"
    onClick={() => navigate("auth")}
>
    Sign Up / Login to Participate
</Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
    <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Want to Make a Difference?
    </h3>

    <p className="text-gray-600 max-w-2xl mx-auto mb-6">
        Join our community to explore all upcoming events, register as a volunteer
        or participant, track your applications, and earn certificates for your
        contributions.
    </p>

    <Button
        onClick={() => navigate("auth")}
        className="px-8 py-3 rounded-full"
    >
        Join Our Community
        <ArrowRight size={18} className="ml-2" />
    </Button>
</div>
                </div>
            </section>

<section
  id="contact"
  className="pt-10 pb-20 bg-slate-50"
>
  <div className="max-w-3xl mx-auto text-center px-6">

    <h2 className="text-4xl font-bold text-gray-900">
      Get in Touch
    </h2>

    <p className="text-gray-600 mt-4 mb-10">
      Have questions or want to volunteer? We'd love to hear from you.
    </p>

    <div className="flex justify-center gap-16 flex-wrap">

      {/* Email */}
      <button
        onClick={() =>
          window.open(
            "mailto:ekkadam.info@gmail.com",
            "_blank"
          )
        }
        className="group flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-200">
          <Mail size={28} className="text-[#FF8C42]" />
        </div>

        <span className="mt-3 font-medium text-gray-700">
          Email
        </span>
      </button>

      {/* WhatsApp */}
      <button
        onClick={() =>
          window.open(
            "https://wa.me/919299458901",
            "_blank"
          )
        }
        className="group flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-green-200">
          <MessageCircle size={28} className="text-green-600" />
        </div>

        <span className="mt-3 font-medium text-gray-700">
          WhatsApp
        </span>
      </button>

      {/* Instagram */}
      <button
        onClick={() =>
          window.open(
            "https://instagram.com/ekkkadamfoundation",
            "_blank"
          )
        }
        className="group flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-pink-200">
          <FaInstagram size={28} className="text-pink-600" />
        </div>

        <span className="mt-3 font-medium text-gray-700">
          Instagram
        </span>
      </button>



      <button
  onClick={() =>
    window.open(
      "https://www.youtube.com/@EkkkadamFoundation",
      "_blank"
    )
  }
  className="group flex flex-col items-center"
>
  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-red-200">
    <FaYoutube size={28} className="text-red-600" />
  </div>

  <span className="mt-3 font-medium text-gray-700">
    YouTube
  </span>
</button>

    </div>

  </div>
</section>






            {/* Footer */}
            <footer id="contact" className="bg-gray-900 text-gray-300 py-12">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF8C42] to-[#4CAF50] flex items-center justify-center text-white font-bold">EK</div>
                            <span className="text-2xl font-bold text-white">Ekk Kadam</span>
                        </div>
                        <p className="mb-6 max-w-sm">Empowering communities through food drives, education, medical aid, and environmental initiatives. Join us to make a difference.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#about" className="hover:text-[#FF8C42] transition-colors">
                                    About Us
                                </a>
                            </li>

                            <li>
                                <a href="#about" className="hover:text-[#FF8C42] transition-colors">
                                    Our Mission
                                </a>
                            </li>

                            <li>
                                <a href="#events" className="hover:text-[#FF8C42] transition-colors">
                                    Events
                                </a>
                            </li>

                            <li>
                                <a href="#contact" className="hover:text-[#FF8C42] transition-colors">
                                    Contact
                                </a>
                            </li>


                            
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Contact Us</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2"><MapPin size={16} /> Hyderabad, India</li>
                            <li className="flex items-center gap-2"><Mail size={16} /> ekkadam.info@gmail.com</li>
                            <li className="flex items-center gap-2"><Phone size={16} /> +91 92994 58901</li>
                        </ul>
                    </div>
                </div>
                <div className="container mx-auto px-6 pt-8 mt-8 border-t border-gray-800 text-center text-sm">
                    &copy; 2026 Ekk Kadam Foundation. All rights reserved.
                </div>
            </footer>
        </div>
    );
};




export default LandingPage;