import { useState } from 'react';
import { 
  FaUsers, 
  FaHandsHelping, 
  FaCalendarCheck, 
  FaHeartbeat,
  FaMapMarkerAlt,
  FaClock,
  FaPhoneAlt,
  FaEnvelope,
  FaCheckCircle,
  FaArrowRight,
  FaUserFriends,
  FaStar,
  FaChalkboardTeacher,
  FaRegSmile,
  FaHome,
  FaArrowLeft
} from 'react-icons/fa';
import { Link } from 'react-router';

const Volunteer = () => {
  // Color variables based on provided colors
  const colors = {
    primary: '#818281',
    accent: '#871e14',
    dark: '#211e1e',
    light: '#fdfdfd'
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    age: '',
    skills: '',
    availability: '',
    motivation: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your volunteer application! We will contact you soon.');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      age: '',
      skills: '',
      availability: '',
      motivation: ''
    });
  };

  const volunteerRoles = [
    {
      icon: <FaUsers />,
      title: 'Donor Ambassador',
      description: 'Welcome and assist donors through the donation process',
      requirements: ['Friendly demeanor', 'Basic medical knowledge', 'Communication skills'],
      timeCommitment: '4-8 hours/week',
      color: '#871e14'
    },
    {
      icon: <FaHandsHelping />,
      title: 'Registration Assistant',
      description: 'Help with donor check-in and paperwork processing',
      requirements: ['Organizational skills', 'Computer literacy', 'Attention to detail'],
      timeCommitment: '3-6 hours/week',
      color: '#818281'
    },
    {
      icon: <FaCalendarCheck />,
      title: 'Event Coordinator',
      description: 'Organize and manage blood donation drives and events',
      requirements: ['Event planning experience', 'Leadership skills', 'Flexible schedule'],
      timeCommitment: '5-10 hours/week',
      color: '#211e1e'
    },
    {
      icon: <FaHeartbeat />,
      title: 'Health Screener',
      description: 'Assist with pre-donation health screenings',
      requirements: ['Medical background preferred', 'Discretion', 'Accuracy'],
      timeCommitment: '4-8 hours/week',
      color: '#871e14'
    }
  ];

  const volunteerBenefits = [
    {
      icon: <FaHeartbeat />,
      title: 'Save Lives',
      description: 'Directly contribute to saving lives in your community',
      color: '#871e14'
    },
    {
      icon: <FaUserFriends />,
      title: 'Community',
      description: 'Join a network of dedicated, like-minded individuals',
      color: '#818281'
    },
    {
      icon: <FaChalkboardTeacher />,
      title: 'Training',
      description: 'Receive comprehensive training and skill development',
      color: '#211e1e'
    },
    {
      icon: <FaStar />,
      title: 'Recognition',
      description: 'Earn certificates and recognition for your service',
      color: '#871e14'
    },
    {
      icon: <FaRegSmile />,
      title: 'Satisfaction',
      description: 'Experience the joy of making a real difference',
      color: '#818281'
    },
    {
      icon: <FaCalendarCheck />,
      title: 'Flexibility',
      description: 'Choose shifts that fit your schedule',
      color: '#211e1e'
    }
  ];

  const upcomingEvents = [
    {
      date: 'Feb 15, 2024',
      title: 'Community Blood Drive',
      location: 'City Center Plaza',
      time: '9 AM - 5 PM',
      volunteersNeeded: 12
    },
    {
      date: 'Feb 22, 2024',
      title: 'Corporate Donation Day',
      location: 'Tech Park Auditorium',
      time: '10 AM - 6 PM',
      volunteersNeeded: 8
    },
    {
      date: 'Mar 1, 2024',
      title: 'University Campus Drive',
      location: 'Student Union Building',
      time: '8 AM - 4 PM',
      volunteersNeeded: 15
    },
    {
      date: 'Mar 8, 2024',
      title: 'Emergency Response Training',
      location: 'Main Blood Center',
      time: '2 PM - 5 PM',
      volunteersNeeded: 20
    }
  ];

  const volunteerStories = [
    {
      name: 'Sarah Johnson',
      role: 'Donor Ambassador',
      duration: '2 years',
      quote: 'Volunteering here has been the most rewarding experience. Seeing the direct impact of our work keeps me motivated.',
      imageColor: '#871e14'
    },
    {
      name: 'Michael Chen',
      role: 'Event Coordinator',
      duration: '1 year',
      quote: 'The training and support I received helped me grow both personally and professionally.',
      imageColor: '#818281'
    },
    {
      name: 'Priya Sharma',
      role: 'Health Screener',
      duration: '3 years',
      quote: 'Every shift, I know I\'m making a difference. The gratitude from donors and recipients is priceless.',
      imageColor: '#211e1e'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.light }}>
    

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
          style={{ backgroundColor: colors.accent }}
        ></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="flex items-center mb-6">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mr-4"
                  style={{ backgroundColor: colors.accent }}
                >
                  <FaHandsHelping className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold" style={{ color: colors.dark }}>
                    Become a <span style={{ color: colors.accent }}>Volunteer</span>
                  </h1>
                  <p className="text-lg mt-2" style={{ color: colors.primary }}>
                    Join our life-saving mission
                  </p>
                </div>
              </div>
              
              <p className="text-xl mb-8" style={{ color: colors.primary }}>
                Your time and skills can save lives. Join our dedicated team of volunteers 
                who make blood donation possible for thousands in our community.
              </p>
              
                {/* Professional Home Button */}
      <div className="container mx-auto px-4 pt-6">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105 group"
          style={{ 
            backgroundColor: colors.light,
            color: colors.accent,
            border: `2px solid ${colors.accent}20`,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = colors.accent;
            e.target.style.color = colors.light;
            e.target.style.borderColor = colors.accent;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = colors.light;
            e.target.style.color = colors.accent;
            e.target.style.borderColor = `${colors.accent}20`;
          }}
        >
          <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
          <FaHome className="transition-transform duration-300 group-hover:scale-110" />
          <span>Back to Home</span>
        </Link>
      </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative">
                <div 
                  className="w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl"
                  style={{ backgroundColor: colors.dark }}
                >
                  {/* Volunteer Hero Image */}
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="flex justify-center mb-6">
                        <div className="relative">
                          <div 
                            className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ backgroundColor: colors.accent }}
                          >
                            <FaUsers className="text-white text-5xl" />
                          </div>
                          <div 
                            className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: colors.light }}
                          >
                            <FaHeartbeat className="text-xl" style={{ color: colors.accent }} />
                          </div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Join Our Volunteer Team</h3>
                      <p className="text-gray-300">Make a difference in your community today</p>
                    </div>
                  </div>
                </div>
                <div 
                  className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full opacity-10"
                  style={{ backgroundColor: colors.accent }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.dark }}>
              Volunteer <span style={{ color: colors.accent }}>Opportunities</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.primary }}>
              Choose a role that matches your skills and interests
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {volunteerRoles.map((role, index) => (
              <div 
                key={index} 
                className="rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
                style={{ backgroundColor: colors.light }}
              >
                <div 
                  className="h-2"
                  style={{ backgroundColor: role.color }}
                ></div>
                <div className="p-6">
                  <div 
                    className="text-4xl mb-4 flex justify-center"
                    style={{ color: role.color }}
                  >
                    {role.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center" style={{ color: colors.dark }}>
                    {role.title}
                  </h3>
                  <p className="text-sm mb-4 text-center" style={{ color: colors.primary }}>
                    {role.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-bold mb-2 text-sm" style={{ color: colors.dark }}>Requirements:</h4>
                    <ul className="space-y-1">
                      {role.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center text-sm" style={{ color: colors.primary }}>
                          <FaCheckCircle className="mr-2 text-xs" style={{ color: colors.accent }} />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: `${colors.primary}20` }}>
                    <span className="text-sm font-semibold" style={{ color: colors.dark }}>
                      Time Commitment:
                    </span>
                    <span className="text-sm font-bold" style={{ color: colors.accent }}>
                      {role.timeCommitment}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16" style={{ backgroundColor: '#f8f8f8' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.dark }}>
              Why <span style={{ color: colors.accent }}>Volunteer</span> With Us?
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.primary }}>
              Discover the rewards of joining our life-saving mission
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {volunteerBenefits.map((benefit, index) => (
              <div 
                key={index} 
                className="p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex items-start"
                style={{ backgroundColor: colors.light }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                  style={{ backgroundColor: `${benefit.color}15` }}
                >
                  <span className="text-xl" style={{ color: benefit.color }}>{benefit.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: colors.dark }}>
                    {benefit.title}
                  </h3>
                  <p className="text-sm" style={{ color: colors.primary }}>
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <div 
                className="p-8 rounded-2xl shadow-xl"
                style={{ backgroundColor: colors.light }}
              >
                <div className="flex items-center mb-8">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{ backgroundColor: colors.accent }}
                  >
                    <FaUsers className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold" style={{ color: colors.dark }}>
                      Volunteer Application
                    </h2>
                    <p style={{ color: colors.primary }}>
                      Join our life-saving team today
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block mb-2 font-medium text-sm" style={{ color: colors.dark }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm"
                        style={{ 
                          borderColor: colors.primary,
                          color: colors.dark,
                          backgroundColor: colors.light
                        }}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium text-sm" style={{ color: colors.dark }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm"
                        style={{ 
                          borderColor: colors.primary,
                          color: colors.dark,
                          backgroundColor: colors.light
                        }}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block mb-2 font-medium text-sm" style={{ color: colors.dark }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm"
                        style={{ 
                          borderColor: colors.primary,
                          color: colors.dark,
                          backgroundColor: colors.light
                        }}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium text-sm" style={{ color: colors.dark }}>
                        Age *
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min="18"
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm"
                        style={{ 
                          borderColor: colors.primary,
                          color: colors.dark,
                          backgroundColor: colors.light
                        }}
                        placeholder="18+"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 font-medium text-sm" style={{ color: colors.dark }}>
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm"
                      style={{ 
                        borderColor: colors.primary,
                        color: colors.dark,
                        backgroundColor: colors.light
                      }}
                      placeholder="Your full address"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 font-medium text-sm" style={{ color: colors.dark }}>
                      Relevant Skills & Experience
                    </label>
                    <textarea
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm"
                      style={{ 
                        borderColor: colors.primary,
                        color: colors.dark,
                        backgroundColor: colors.light
                      }}
                      placeholder="Medical training, customer service, event planning, etc."
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block mb-2 font-medium text-sm" style={{ color: colors.dark }}>
                        Availability *
                      </label>
                      <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm"
                        style={{ 
                          borderColor: colors.primary,
                          color: colors.dark,
                          backgroundColor: colors.light
                        }}
                      >
                        <option value="">Select availability</option>
                        <option value="weekdays">Weekdays</option>
                        <option value="weekends">Weekends</option>
                        <option value="both">Both Weekdays & Weekends</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 font-medium text-sm" style={{ color: colors.dark }}>
                        Why do you want to volunteer? *
                      </label>
                      <textarea
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleChange}
                        required
                        rows="3"
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm"
                        style={{ 
                          borderColor: colors.primary,
                          color: colors.dark,
                          backgroundColor: colors.light
                        }}
                        placeholder="Tell us why you want to volunteer..."
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg font-bold text-lg transition duration-300 hover:opacity-90 flex items-center justify-center"
                    style={{ backgroundColor: colors.accent, color: colors.light }}
                  >
                    Submit Application
                    <FaArrowRight className="ml-2" />
                  </button>
                </form>
              </div>
            </div>

            {/* Upcoming Events & Stories */}
            <div className="lg:w-1/2">
              {/* Upcoming Events */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{ backgroundColor: colors.dark }}
                  >
                    <FaCalendarCheck className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold" style={{ color: colors.dark }}>
                      Upcoming <span style={{ color: colors.accent }}>Events</span>
                    </h2>
                    <p style={{ color: colors.primary }}>
                      Join our upcoming blood drives and events
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div 
                      key={index}
                      className="p-5 rounded-xl hover:shadow-md transition duration-300 flex items-center"
                      style={{ backgroundColor: colors.light, border: `1px solid ${colors.primary}20` }}
                    >
                      <div className="text-center mr-4">
                        <div className="font-bold text-lg" style={{ color: colors.accent }}>
                          {event.date.split(' ')[1]}
                        </div>
                        <div className="text-sm" style={{ color: colors.primary }}>
                          {event.date.split(' ')[0]}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold mb-1" style={{ color: colors.dark }}>
                          {event.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <span className="flex items-center" style={{ color: colors.primary }}>
                            <FaMapMarkerAlt className="mr-1" />
                            {event.location}
                          </span>
                          <span className="flex items-center" style={{ color: colors.primary }}>
                            <FaClock className="mr-1" />
                            {event.time}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg" style={{ color: colors.accent }}>
                          {event.volunteersNeeded}
                        </div>
                        <div className="text-xs" style={{ color: colors.primary }}>
                          Volunteers Needed
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volunteer Stories */}
              <div>
                <div className="flex items-center mb-6">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <FaUserFriends className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold" style={{ color: colors.dark }}>
                      Volunteer <span style={{ color: colors.accent }}>Stories</span>
                    </h2>
                  </div>
                </div>

                <div className="space-y-6">
                  {volunteerStories.map((story, index) => (
                    <div 
                      key={index}
                      className="p-6 rounded-xl hover:shadow-md transition duration-300"
                      style={{ backgroundColor: colors.light, border: `1px solid ${colors.primary}20` }}
                    >
                      <div className="flex items-start mb-4">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                          style={{ backgroundColor: story.imageColor }}
                        >
                          <span className="text-white text-xl font-bold">
                            {story.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg" style={{ color: colors.dark }}>
                            {story.name}
                          </h3>
                          <div className="flex items-center text-sm">
                            <span style={{ color: colors.accent }}>{story.role}</span>
                            <span className="mx-2" style={{ color: colors.primary }}>•</span>
                            <span style={{ color: colors.primary }}>{story.duration}</span>
                          </div>
                        </div>
                      </div>
                      <p className="italic" style={{ color: colors.primary }}>
                        "{story.quote}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16" style={{ backgroundColor: '#f8f8f8' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.dark }}>
              Volunteer <span style={{ color: colors.accent }}>Support</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.primary }}>
              Have questions about volunteering? Get in touch with our team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl shadow-lg" style={{ backgroundColor: colors.light }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${colors.accent}15` }}>
                <FaPhoneAlt className="text-2xl" style={{ color: colors.accent }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: colors.dark }}>Call Us</h3>
              <p className="font-semibold mb-1" style={{ color: colors.accent }}>(555) 789-VOLU</p>
              <p className="text-sm" style={{ color: colors.primary }}>Mon-Fri, 9 AM - 5 PM</p>
            </div>

            <div className="text-center p-6 rounded-xl shadow-lg" style={{ backgroundColor: colors.light }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${colors.primary}15` }}>
                <FaEnvelope className="text-2xl" style={{ color: colors.primary }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: colors.dark }}>Email Us</h3>
              <p className="font-semibold mb-1" style={{ color: colors.accent }}>volunteer@blooddonate.org</p>
              <p className="text-sm" style={{ color: colors.primary }}>Response within 48 hours</p>
            </div>

            <div className="text-center p-6 rounded-xl shadow-lg" style={{ backgroundColor: colors.light }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${colors.dark}15` }}>
                <FaMapMarkerAlt className="text-2xl" style={{ color: colors.dark }} />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: colors.dark }}>Visit Us</h3>
              <p className="font-semibold mb-1" style={{ color: colors.accent }}>123 Volunteer Lane</p>
              <p className="text-sm" style={{ color: colors.primary }}>Schedule an orientation tour</p>
            </div>
          </div>
        </div>
      </section>

     
      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: '#f8f8f8' }}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="mb-2" style={{ color: colors.dark }}>
              © {new Date().getFullYear()} LifeBlood Donation Network
            </p>
            <p style={{ color: colors.primary }}>
              Volunteer Program • All volunteers are trained and supervised by certified professionals
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Volunteer;