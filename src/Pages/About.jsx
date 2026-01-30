import { 
  FaHeartbeat, 
  FaUsers, 
  FaShieldAlt, 
  FaRegCalendarCheck,
  FaAmbulance,
  FaHandHoldingHeart,
  FaArrowRight,
  FaHome,
  FaArrowLeft
} from 'react-icons/fa';
import { Link } from 'react-router';
import Footer from '../components/Footer/Footer';

const About = () => {
  // Color variables based on provided colors
  const colors = {
    primary: '#818281',
    accent: '#871e14',
    dark: '#211e1e',
    light: '#fdfdfd'
  };

  const stats = [
    { value: '10,000+', label: 'Lives Saved', icon: <FaHeartbeat /> },
    { value: '5,000+', label: 'Regular Donors', icon: <FaUsers /> },
    { value: '50+', label: 'Campaigns', icon: <FaRegCalendarCheck /> },
    { value: '24/7', label: 'Emergency Service', icon: <FaAmbulance /> }
  ];

  const benefits = [
    {
      title: 'Health Checkup',
      description: 'Every donation includes a free mini health screening checking your hemoglobin, blood pressure, and pulse.',
      icon: <FaShieldAlt />
    },
    {
      title: 'Save Lives',
      description: 'A single donation can save up to 3 lives. Your contribution makes an immediate impact in your community.',
      icon: <FaHandHoldingHeart />
    },
    {
      title: 'Regular Updates',
      description: 'Get notified when your blood is used to save a life. Track your donation impact through our donor portal.',
      icon: <FaRegCalendarCheck />
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Registration',
      description: 'Complete the donor registration form with your personal and contact information.'
    },
    {
      step: 2,
      title: 'Screening',
      description: 'A quick health screening and mini-physical to check your temperature, blood pressure, and hemoglobin levels.'
    },
    {
      step: 3,
      title: 'Donation',
      description: 'The actual donation takes about 8-10 minutes. You\'ll be seated comfortably while approximately one pint of blood is drawn.'
    },
    {
      step: 4,
      title: 'Refreshment',
      description: 'After donating, you\'ll enjoy snacks and drinks while you rest for 10-15 minutes before resuming your day.'
    }
  ];

  const eligibilityCriteria = [
    { requirement: 'Age', condition: 'Between 18-65 years' },
    { requirement: 'Weight', condition: 'Minimum 50 kg (110 lbs)' },
    { requirement: 'Health', condition: 'Good health, free from infections' },
    { requirement: 'Interval', condition: '56 days between donations' },
    { requirement: 'Travel', condition: 'No recent travel to restricted areas' },
    { requirement: 'Medication', condition: 'Some medications may require deferral' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.light }}>
      

      {/* Modern Title Section */}
      <section className="relative py-8 md:py-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 opacity-5"
            style={{ backgroundColor: colors.accent }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="inline-block mb-4">
             
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 relative">
              <span 
                className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.accent} 50%, ${colors.dark} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                About Us
              </span>
              <div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full"
                style={{ backgroundColor: colors.accent }}
              ></div>
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed" style={{ color: colors.primary }}>
              Connecting hearts, saving lives through the power of blood donation
            </p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 opacity-10"
            style={{ backgroundColor: colors.accent }}
          ></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-white opacity-70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.dark }}>
                Every Drop <span style={{ color: colors.accent }}>Counts</span>
              </h2>
              <p className="text-lg mb-8" style={{ color: colors.primary }}>
                Blood donation is a simple, safe way to make a big difference in people's lives. 
                Join our community of heroes who give the gift of life. Your single donation 
                can save up to three lives and bring hope to families in need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/contact"
                  className="px-8 py-3 rounded-lg font-semibold text-white transition duration-300 hover:opacity-90 hover:transform hover:scale-105 text-center inline-block"
                  style={{ backgroundColor: colors.accent }}
                >
                  Become a Donor
                </Link>
                <Link 
                  to="/contact"
                  className="px-8 py-3 rounded-lg font-semibold border transition duration-300 hover:bg-gray-50 hover:transform hover:scale-105 text-center inline-block"
                  style={{ borderColor: colors.accent, color: colors.accent }}
                >
                  Find a Center
                </Link>
              </div>
    
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div 
                  className="w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500"
                  style={{ backgroundColor: colors.dark }}
                >
                  {/* Hero Image Placeholder - In real app, replace with actual image */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <FaHeartbeat className="text-6xl mx-auto mb-4 animate-pulse" style={{ color: colors.accent }} />
                     
                    </div>
                  </div>
                </div>
                <div 
                  className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full opacity-20 animate-pulse"
                  style={{ backgroundColor: colors.accent }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                style={{ backgroundColor: colors.light }}
              >
                <div className="text-4xl mb-4 flex justify-center" style={{ color: colors.accent }}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2" style={{ color: colors.dark }}>
                  {stat.value}
                </div>
                <div className="text-lg" style={{ color: colors.primary }}>
                  {stat.label}
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
              Why Donate Blood?
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.primary }}>
              Blood donation benefits both recipients and donors in multiple ways
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col h-full"
                style={{ backgroundColor: colors.light }}
              >
                <div className="text-5xl mb-6" style={{ color: colors.accent }}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.dark }}>
                  {benefit.title}
                </h3>
                <p className="mb-6 flex-grow" style={{ color: colors.primary }}>
                  {benefit.description}
                </p>
               
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.dark }}>
              The Donation Process
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.primary }}>
              Simple, safe, and typically takes less than an hour from start to finish
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1" style={{ backgroundColor: colors.accent }}></div>
            
            <div className="space-y-12 md:space-y-0">
              {processSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="md:w-1/2 mb-8 md:mb-0">
                    <div className={`p-8 rounded-xl shadow-lg max-w-lg mx-auto ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}
                      style={{ backgroundColor: colors.light }}
                    >
                      <div className="flex items-center mb-4">
                        <div 
                          className="flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-xl mr-4"
                          style={{ backgroundColor: colors.accent }}
                        >
                          {step.step}
                        </div>
                        <h3 className="text-2xl font-bold" style={{ color: colors.dark }}>
                          {step.title}
                        </h3>
                      </div>
                      <p style={{ color: colors.primary }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 flex justify-center">
                    <div className="relative">
                      {/* Step indicator */}
                      <div 
                        className="w-10 h-10 rounded-full border-4 flex items-center justify-center"
                        style={{ borderColor: colors.accent, backgroundColor: colors.light }}
                      >
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: colors.accent }}
                        ></div>
                      </div>
                      
                      {/* Image placeholder */}
                      <div 
                        className="mt-4 w-48 h-48 rounded-xl overflow-hidden shadow-lg"
                        style={{ backgroundColor: colors.dark }}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <FaRegCalendarCheck className="text-4xl mx-auto mb-2" style={{ color: colors.accent }} />
                            <p className="text-white text-sm">Step {step.step} visual</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-16" style={{ backgroundColor: '#f8f8f8' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: colors.dark }}>
                Eligibility <span style={{ color: colors.accent }}>Criteria</span>
              </h2>
              <p className="text-lg mb-8" style={{ color: colors.primary }}>
                Before donating blood, ensure you meet these basic requirements. 
                Additional screening will be done at the donation center.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {eligibilityCriteria.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start p-4 rounded-lg"
                    style={{ backgroundColor: colors.light }}
                  >
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1" style={{ color: colors.dark }}>{item.requirement}</h4>
                      <p style={{ color: colors.primary }}>{item.condition}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              
            </div>
            
            <div className="lg:w-1/2 lg:pl-12">
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{ backgroundColor: colors.dark }}
              >
                <div className="w-full h-80 flex items-center justify-center">
                  <div className="text-center p-6">
                    <FaUsers className="text-6xl mx-auto mb-4" style={{ color: colors.accent }} />
                    <h3 className="text-2xl font-bold text-white mb-2">Ready to Save Lives?</h3>
                    <p className="text-gray-300 mb-6">
                      Join thousands of donors who make a difference every day
                    </p>
                    <Link 
                      to="/contact"
                      className="px-6 py-2 rounded-lg font-semibold inline-block text-center"
                      style={{ backgroundColor: colors.accent, color: colors.light }}
                    >
                      Find a Donation Center Near You
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div 
            className="rounded-2xl p-8 md:p-12 text-center shadow-xl"
            style={{ backgroundColor: colors.dark }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Schedule your donation appointment today and become a hero in someone's life story. 
              The need for blood is constant, and your contribution matters.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                to="/contact"
                className="px-10 py-4 rounded-lg font-bold text-lg transition duration-300 hover:bg-white hover:bg-opacity-10 inline-block text-center"
                style={{ backgroundColor: colors.accent, color: colors.light }}
              >
                Book an Appointment
              </Link>
              <Link 
                to="/contact"
                className="px-10 py-4 rounded-lg font-bold text-lg border-2 transition duration-300 hover:bg-white hover:bg-opacity-10 inline-block text-center"
                style={{ borderColor: colors.light, color: colors.light }}
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;