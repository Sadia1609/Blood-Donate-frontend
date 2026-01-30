import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router";
import { FaHeartbeat, FaSearch, FaHospital, FaUsers, FaArrowRight, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Home = () => {
  const colors = {
    primary: '#818281',
    accent: '#871e14',
    dark: '#211e1e',
    light: '#fdfdfd'
  };

  // Slideshow images data
  const slides = [
    {
      id: 1,
      title: "Save Lives",
      subtitle: "Your Blood Can Give Someone Another Chance",
      description: "A single donation can save up to three lives. Join our community of heroes.",
      bgColor: colors.accent
    },
    {
      id: 2,
      title: "Emergency Ready",
      subtitle: "24/7 Blood Availability",
      description: "We ensure blood is available for emergencies at all times across the country.",
      bgColor: '#a52a2a'
    },
    {
      id: 3,
      title: "Join Our Network",
      subtitle: "Thousands of Registered Donors",
      description: "Be part of the largest blood donation network connecting donors with those in need.",
      bgColor: colors.dark
    }
  ];

  // Stats data
  const stats = [
    { number: "10,000+", label: "Lives Saved", icon: "❤️" },
    { number: "5,000+", label: "Active Donors", icon: "🩸" },
    { number: "100+", label: "Hospitals", icon: "🏥" },
    { number: "24/7", label: "Emergency Service", icon: "⏰" }
  ];

  // Donation process steps
  const processSteps = [
    {
      icon: <FaUsers />,
      title: "Register as Donor",
      description: "Create an account and provide your blood information"
    },
    {
      icon: <FaSearch />,
      title: "Find Blood Requests",
      description: "Search blood requests by group and location"
    },
    {
      icon: <FaHospital />,
      title: "Donate & Save Lives",
      description: "Visit the hospital and help save precious lives"
    }
  ];

  // Blood type urgency
  const bloodTypes = [
    { type: "O+", urgency: "High", patients: "37% population" },
    { type: "O-", urgency: "Critical", patients: "Universal Donor" },
    { type: "A+", urgency: "Medium", patients: "36% population" },
    { type: "B+", urgency: "Medium", patients: "8% population" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.light }}>
      <Navbar />

      {/* Hero Banner with Custom Slideshow */}
      <section className="relative overflow-hidden">
        <div className="relative h-[70vh]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 translate-x-0' 
                  : index < currentSlide 
                    ? 'opacity-0 -translate-x-full' 
                    : 'opacity-0 translate-x-full'
              }`}
              style={{ backgroundColor: slide.bgColor }}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-white -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white translate-x-1/3 translate-y-1/3"></div>
              </div>

              <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
                <div className="max-w-3xl">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-2xl md:text-3xl font-semibold text-white/90 mb-6">
                    {slide.subtitle}
                  </p>
                  <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/signup"
                      className="px-8 py-4 rounded-lg font-bold text-lg bg-white transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 group"
                      style={{ color: colors.accent }}
                    >
                      <FaHeartbeat className="text-xl" />
                      Join as a Donor
                      <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>

                    <Link
                      to="/search"
                      className="px-8 py-4 rounded-lg font-bold text-lg border-2 border-white transition-all duration-300 hover:bg-white/10 flex items-center justify-center gap-2 group"
                      style={{ color: colors.light }}
                    >
                      <FaSearch className="text-xl" />
                      Search Donors
                      <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
          >
            <FaChevronLeft className="text-xl" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
          >
            <FaChevronRight className="text-xl" />
          </button>

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'w-8 bg-white' 
                    : 'w-3 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Professional & Simple */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 group"
                style={{ 
                  backgroundColor: colors.light,
                  border: `1px solid ${colors.primary}20`
                }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div 
                  className="text-3xl font-bold mb-2"
                  style={{ color: colors.accent }}
                >
                  {stat.number}
                </div>
                <div 
                  className="font-medium text-sm"
                  style={{ color: colors.dark }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: colors.dark }}>
              How <span style={{ color: colors.accent }}>Blood Donation</span> Works
            </h2>
            <p className="text-lg" style={{ color: colors.primary }}>
              Follow a simple, safe process to help patients in need across the country.
              Your donation makes an immediate impact.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div 
                  className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2"
                  style={{ 
                    backgroundColor: colors.light,
                    border: `1px solid ${colors.primary}20`
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-3xl transition-transform duration-300 group-hover:scale-110"
                      style={{ 
                        backgroundColor: `${colors.accent}15`,
                        color: colors.accent
                      }}
                    >
                      {step.icon}
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold"
                        style={{ 
                          backgroundColor: colors.accent,
                          color: colors.light
                        }}
                      >
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: colors.dark }}>
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="mb-6" style={{ color: colors.primary }}>
                      {step.description}
                    </p>
                    
                    <div 
                      className="w-full h-1 rounded-full mt-auto"
                      style={{ backgroundColor: `${colors.primary}20` }}
                    ></div>
                  </div>
                </div>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-16 transform -translate-y-1/2 translate-x-1/2 z-10">
                    <div className="w-full h-1" style={{ backgroundColor: `${colors.primary}30` }}></div>
                    <div 
                      className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: colors.accent,
                        color: colors.light
                      }}
                    >
                      →
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blood Type Urgency Section */}
      <section className="py-20" style={{ backgroundColor: '#f8f8f8' }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: colors.dark }}>
              Current <span style={{ color: colors.accent }}>Blood Needs</span>
            </h2>
            <p className="text-lg" style={{ color: colors.primary }}>
              Some blood types are urgently needed. Check the current demand levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {bloodTypes.map((blood, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ 
                  backgroundColor: colors.light,
                  borderTop: `4px solid ${colors.accent}`
                }}
              >
                <div className="text-center">
                  <div 
                    className="text-4xl font-bold mb-3"
                    style={{ color: colors.dark }}
                  >
                    {blood.type}
                  </div>
                  <div className="mb-4">
                    <span 
                      className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                        blood.urgency === 'Critical' ? 'bg-red-100 text-red-600' :
                        blood.urgency === 'High' ? 'bg-orange-100 text-orange-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {blood.urgency} Need
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: colors.primary }}>
                    {blood.patients}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/donation-requests"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-lg group"
              style={{ 
                backgroundColor: colors.accent,
                color: colors.light
              }}
            >
              View All Blood Requests
              <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
          style={{ backgroundColor: colors.accent }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
              style={{ 
                backgroundColor: `${colors.accent}15`,
                color: colors.accent
              }}
            >
              <FaHeartbeat className="text-4xl" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: colors.dark }}>
              Ready to <span style={{ color: colors.accent }}>Save Lives</span>?
            </h2>
            
            <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: colors.primary }}>
              Join thousands of donors who are making a difference every day. 
              Your single donation can give someone a second chance at life.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/signup"
                className="px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                style={{ 
                  backgroundColor: colors.accent,
                  color: colors.light
                }}
              >
                Register as Donor
              </Link>
              
              <Link
                to="/about"
                className="px-10 py-4 rounded-lg font-bold text-lg border-2 transition-all duration-300 hover:bg-white/10"
                style={{ 
                  borderColor: colors.accent,
                  color: colors.accent
                }}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.dark }}>
                Get in <span style={{ color: colors.accent }}>Touch</span>
              </h2>
              <p className="text-lg" style={{ color: colors.primary }}>
                Have questions? We're here to help you through the donation process.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${colors.accent}15` }}
                >
                  <FaPhoneAlt className="text-2xl" style={{ color: colors.accent }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: colors.dark }}>Call Us</h3>
                <p className="font-semibold" style={{ color: colors.accent }}>+880 1234-567890</p>
                <p className="text-sm mt-1" style={{ color: colors.primary }}>24/7 Emergency Hotline</p>
              </div>

              <div className="text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${colors.primary}15` }}
                >
                  <FaEnvelope className="text-2xl" style={{ color: colors.primary }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: colors.dark }}>Email</h3>
                <p className="font-semibold" style={{ color: colors.accent }}>help@blooddonate.org</p>
                <p className="text-sm mt-1" style={{ color: colors.primary }}>Response within 24 hours</p>
              </div>

              <div className="text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${colors.dark}15` }}
                >
                  <FaMapMarkerAlt className="text-2xl" style={{ color: colors.dark }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: colors.dark }}>Visit</h3>
                <p className="font-semibold" style={{ color: colors.accent }}>Nationwide Network</p>
                <p className="text-sm mt-1" style={{ color: colors.primary }}>100+ locations</p>
              </div>
            </div>

            <div 
              className="p-8 rounded-2xl shadow-lg"
              style={{ 
                backgroundColor: colors.light,
                border: `1px solid ${colors.primary}20`
              }}
            >
              <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: colors.dark }}>
                Send us a Message
              </h3>
              <form className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ 
                      borderColor: colors.primary,
                      color: colors.dark,
                      backgroundColor: colors.light
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ 
                      borderColor: colors.primary,
                      color: colors.dark,
                      backgroundColor: colors.light
                    }}
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ 
                    borderColor: colors.primary,
                    color: colors.dark,
                    backgroundColor: colors.light
                  }}
                ></textarea>
                <button 
                  type="submit"
                  className="w-full py-3 rounded-lg font-bold text-lg transition duration-300 hover:opacity-90"
                  style={{ 
                    backgroundColor: colors.accent,
                    color: colors.light
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;