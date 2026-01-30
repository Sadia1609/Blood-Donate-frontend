import { useState } from 'react';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaAmbulance,
  FaUserMd,
  FaCalendarAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaHome,
  FaArrowLeft
} from 'react-icons/fa';
import { Link } from 'react-router';
import Footer from '../components/Footer/Footer';

const ContactUs = () => {
  // Color variables based on provided colors
  const colors = {
    primary: '#818281',
    accent: '#871e14',
    dark: '#211e1e',
    light: '#fdfdfd'
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactMethods = [
    {
      icon: <FaPhoneAlt />,
      title: 'Emergency Hotline',
      info: '+1 (800) 555-1234',
      subtitle: '24/7 Emergency Service',
      color: '#871e14'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      info: 'contact@blooddonate.org',
      subtitle: 'Response within 24 hours',
      color: '#818281'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Main Center',
      info: '123 Life Street, Health City',
      subtitle: 'Get Directions',
      color: '#211e1e'
    },
    {
      icon: <FaClock />,
      title: 'Office Hours',
      info: 'Mon-Sat: 8 AM - 8 PM',
      subtitle: 'Sunday: 9 AM - 4 PM',
      color: '#871e14'
    }
  ];

  const donationCenters = [
    {
      name: 'Central Blood Bank',
      address: '123 Life Street, Health City',
      phone: '(555) 123-4567',
      hours: '7 AM - 9 PM Daily',
      services: ['Whole Blood', 'Platelets', 'Plasma']
    },
    {
      name: 'Northside Donation Center',
      address: '456 Hope Avenue, Medical District',
      phone: '(555) 234-5678',
      hours: '8 AM - 8 PM Mon-Sat',
      services: ['Whole Blood', 'Power Red']
    },
    {
      name: 'West End Mobile Unit',
      address: '789 Care Boulevard',
      phone: '(555) 345-6789',
      hours: '10 AM - 6 PM Tue-Sun',
      services: ['Whole Blood']
    },
    {
      name: 'Children\'s Hospital Center',
      address: '321 Healing Road',
      phone: '(555) 456-7890',
      hours: '24/7 Emergency',
      services: ['Whole Blood', 'Platelets', 'Pediatric']
    }
  ];

  const emergencyContacts = [
    { department: 'Blood Emergency', contact: 'Ext. 100', available: '24/7' },
    { department: 'Donor Support', contact: 'Ext. 101', available: '8 AM - 8 PM' },
    { department: 'Hospital Coordination', contact: 'Ext. 102', available: '24/7' },
    { department: 'Volunteer Services', contact: 'Ext. 103', available: '9 AM - 5 PM' },
    { department: 'Community Outreach', contact: 'Ext. 104', available: '10 AM - 6 PM' },
    { department: 'Blood Transportation', contact: 'Ext. 105', available: '24/7' }
  ];

  const faqItems = [
    {
      question: 'How often can I donate blood?',
      answer: 'You can donate whole blood every 56 days, platelets every 7 days, and plasma every 28 days.'
    },
    {
      question: 'What should I bring to my donation?',
      answer: 'Please bring a valid photo ID, list of medications you\'re taking, and know your medical history.'
    },
    {
      question: 'How long does donation take?',
      answer: 'The entire process takes about 1 hour, with the actual donation taking only 8-10 minutes.'
    },
    {
      question: 'Is it safe to donate during COVID-19?',
      answer: 'Yes, we follow strict safety protocols including enhanced cleaning, social distancing, and mask requirements.'
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
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.dark }}>
              Get in <span style={{ color: colors.accent }}>Touch</span>
            </h1>
            <p className="text-xl mb-8" style={{ color: colors.primary }}>
              Your questions matter. Whether you're a donor, recipient, or partner, 
              we're here to help you save lives through blood donation.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {contactMethods.map((method, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                  style={{ backgroundColor: colors.light }}
                >
                  <div 
                    className="text-2xl mb-3 flex justify-center"
                    style={{ color: method.color }}
                  >
                    {method.icon}
                  </div>
                  <h3 className="font-bold mb-1 text-sm" style={{ color: colors.dark }}>
                    {method.title}
                  </h3>
                  <p className="font-semibold mb-1 text-xs" style={{ color: colors.accent }}>
                    {method.info}
                  </p>
                  <p className="text-xs" style={{ color: colors.primary }}>
                    {method.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Form */}
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
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold" style={{ color: colors.dark }}>
                      Contact Us
                    </h2>
                    <p style={{ color: colors.primary }}>
                      We typically respond within 24 hours
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
                        name="name"
                        value={formData.name}
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
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
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
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm"
                        style={{ 
                          borderColor: colors.primary,
                          color: colors.dark,
                          backgroundColor: colors.light
                        }}
                      >
                        <option value="">Select a topic</option>
                        <option value="donation">Blood Donation</option>
                        <option value="emergency">Emergency Request</option>
                        <option value="volunteer">Volunteer</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 font-medium text-sm" style={{ color: colors.dark }}>
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm"
                      style={{ 
                        borderColor: colors.primary,
                        color: colors.dark,
                        backgroundColor: colors.light
                      }}
                      placeholder="Tell us how we can help..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg font-bold text-lg transition duration-300 hover:opacity-90"
                    style={{ backgroundColor: colors.accent, color: colors.light }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="lg:w-1/2">
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{ backgroundColor: colors.dark }}
                  >
                    <FaAmbulance className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold" style={{ color: colors.dark }}>
                      Emergency Contact
                    </h2>
                    <p style={{ color: colors.primary }}>
                      For urgent blood requirements
                    </p>
                  </div>
                </div>
                
                <div 
                  className="p-6 rounded-xl mb-6"
                  style={{ backgroundColor: '#fff5f5', borderLeft: `4px solid ${colors.accent}` }}
                >
                  <div className="flex items-start">
                    <FaUserMd className="text-2xl mt-1 mr-4" style={{ color: colors.accent }} />
                    <div>
                      <h3 className="font-bold text-xl mb-2" style={{ color: colors.dark }}>
                        24/7 Emergency Hotline
                      </h3>
                      <p className="text-2xl font-bold mb-2" style={{ color: colors.accent }}>
                        +1 (800) 555-EMRG
                      </p>
                      <p style={{ color: colors.primary }}>
                        For hospitals, trauma centers, and emergency blood requirements
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <div className="flex items-center mb-6">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <FaCalendarAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold" style={{ color: colors.dark }}>
                      Frequently Asked Questions
                    </h2>
                  </div>
                </div>

                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg hover:shadow-md transition duration-300"
                      style={{ backgroundColor: colors.light, border: `1px solid ${colors.primary}20` }}
                    >
                      <h3 className="font-bold mb-2 text-sm" style={{ color: colors.dark }}>
                        {item.question}
                      </h3>
                      <p className="text-sm" style={{ color: colors.primary }}>
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Centers Table */}
      <section className="py-16" style={{ backgroundColor: '#f8f8f8' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.dark }}>
              Our <span style={{ color: colors.accent }}>Donation Centers</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.primary }}>
              Find a donation center near you. Walk-ins welcome, appointments recommended.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="min-w-full" style={{ backgroundColor: colors.light }}>
              <thead>
                <tr style={{ backgroundColor: colors.dark }}>
                  <th className="py-4 px-6 text-left font-bold text-white text-sm">Center Name</th>
                  <th className="py-4 px-6 text-left font-bold text-white text-sm">Address</th>
                  <th className="py-4 px-6 text-left font-bold text-white text-sm">Contact</th>
                  <th className="py-4 px-6 text-left font-bold text-white text-sm">Hours</th>
                  <th className="py-4 px-6 text-left font-bold text-white text-sm">Services</th>
                </tr>
              </thead>
              <tbody>
                {donationCenters.map((center, index) => (
                  <tr 
                    key={index}
                    className="hover:bg-gray-50 transition duration-200"
                    style={{ 
                      backgroundColor: index % 2 === 0 ? colors.light : '#f9f9f9',
                      borderBottom: `1px solid ${colors.primary}20`
                    }}
                  >
                    <td className="py-4 px-6 font-semibold text-sm" style={{ color: colors.dark }}>
                      {center.name}
                    </td>
                    <td className="py-4 px-6 text-sm" style={{ color: colors.primary }}>
                      {center.address}
                    </td>
                    <td className="py-4 px-6 text-sm" style={{ color: colors.accent }}>
                      {center.phone}
                    </td>
                    <td className="py-4 px-6 text-sm" style={{ color: colors.primary }}>
                      {center.hours}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-2">
                        {center.services.map((service, sIndex) => (
                          <span
                            key={sIndex}
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: `${colors.accent}15`,
                              color: colors.accent
                            }}
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Emergency Contacts Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.dark }}>
              Department <span style={{ color: colors.accent }}>Contacts</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.primary }}>
              Direct contacts for specific departments and services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                style={{ backgroundColor: colors.light }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-sm" style={{ color: colors.dark }}>
                    {contact.department}
                  </h3>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: contact.available === '24/7' ? `${colors.accent}15` : `${colors.primary}15`,
                      color: contact.available === '24/7' ? colors.accent : colors.primary
                    }}
                  >
                    {contact.available}
                  </span>
                </div>
                <p className="text-xl font-bold mb-2 text-sm" style={{ color: colors.accent }}>
                  {contact.contact}
                </p>
                <p className="text-xs" style={{ color: colors.primary }}>
                  Available: {contact.available}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16" style={{ backgroundColor: '#f8f8f8' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.dark }}>
              Connect With Us
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a 
                href="#"
                className="flex flex-col items-center p-4 rounded-xl hover:shadow-md transition duration-300"
                style={{ backgroundColor: colors.light }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: '#1877F2' }}>
                  <FaFacebook className="text-white text-xl" />
                </div>
                <h3 className="font-bold text-sm" style={{ color: colors.dark }}>Facebook</h3>
                <p className="text-xs" style={{ color: colors.primary }}>@BloodDonateOrg</p>
              </a>

              <a 
                href="#"
                className="flex flex-col items-center p-4 rounded-xl hover:shadow-md transition duration-300"
                style={{ backgroundColor: colors.light }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: '#1DA1F2' }}>
                  <FaTwitter className="text-white text-xl" />
                </div>
                <h3 className="font-bold text-sm" style={{ color: colors.dark }}>Twitter</h3>
                <p className="text-xs" style={{ color: colors.primary }}>@BloodDonate</p>
              </a>

              <a 
                href="#"
                className="flex flex-col items-center p-4 rounded-xl hover:shadow-md transition duration-300"
                style={{ backgroundColor: colors.light }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: '#E4405F' }}>
                  <FaInstagram className="text-white text-xl" />
                </div>
                <h3 className="font-bold text-sm" style={{ color: colors.dark }}>Instagram</h3>
                <p className="text-xs" style={{ color: colors.primary }}>@BloodDonateLife</p>
              </a>

              <a 
                href="#"
                className="flex flex-col items-center p-4 rounded-xl hover:shadow-md transition duration-300"
                style={{ backgroundColor: colors.light }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: '#0077B5' }}>
                  <FaLinkedin className="text-white text-xl" />
                </div>
                <h3 className="font-bold text-sm" style={{ color: colors.dark }}>LinkedIn</h3>
                <p className="text-xs" style={{ color: colors.primary }}>Blood Donation Network</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;