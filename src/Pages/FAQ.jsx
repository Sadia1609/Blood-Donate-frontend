import { useState } from 'react';
import { 
  FaQuestionCircle,
  FaHeartbeat,
  FaUserCheck,
  FaShieldAlt,
  FaClock,
  FaSyringe,
  FaUsers,
  FaAmbulance,
  FaCalendarAlt,
  FaSearch,
  FaArrowRight,
  FaRegHospital,
  FaChartLine,
  FaRegCalendarCheck,
  FaRegFileAlt,
  FaMobileAlt,
  FaTint,
  FaHandHoldingHeart,
  FaBalanceScale,
  FaRegClock,
  FaHome,
  FaArrowLeft
} from 'react-icons/fa';
import { Link } from 'react-router';

const FAQ = () => {
  // Color variables based on provided colors
  const colors = {
    primary: '#818281',
    accent: '#871e14',
    dark: '#211e1e',
    light: '#fdfdfd'
  };


  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    { id: 'all', label: 'All Questions', icon: <FaQuestionCircle />, count: 20 },
    { id: 'eligibility', label: 'Eligibility', icon: <FaUserCheck />, count: 6 },
    { id: 'process', label: 'Donation Process', icon: <FaSyringe />, count: 5 },
    { id: 'safety', label: 'Safety & Health', icon: <FaShieldAlt />, count: 4 },
    { id: 'impact', label: 'Impact & Benefits', icon: <FaHeartbeat />, count: 5 },
  ];

  const faqData = [
    // Eligibility Questions
    {
      id: 1,
      question: 'Who is eligible to donate blood?',
      answer: 'Generally, donors must be in good health, at least 18 years old (16-17 with parental consent in some states), weigh at least 110 pounds (50 kg), and have a valid photo ID. Specific eligibility criteria may vary based on medical history, recent travel, and medications.',
      category: 'eligibility',
      icon: <FaUserCheck />,
      readTime: '2 min read',
      lastUpdated: 'Updated 2 weeks ago'
    },
    {
      id: 2,
      question: 'How often can I donate blood?',
      answer: 'You can donate whole blood every 56 days (approximately 8 weeks). Platelet donations can be made every 7 days, up to 24 times per year. Plasma donations can be made every 28 days. Double red cell donations can be made every 112 days.',
      category: 'eligibility',
      icon: <FaClock />,
      readTime: '1 min read',
      lastUpdated: 'Updated 1 month ago'
    },
    {
      id: 3,
      question: 'Can I donate if I have tattoos or piercings?',
      answer: 'Yes, but you must wait at least 3 months if the tattoo or piercing was done in a state-regulated facility using sterile needles and fresh ink. If unsure about the facility\'s standards, wait 3 months. Always inform staff about recent body modifications during screening.',
      category: 'eligibility',
      icon: <FaSyringe />,
      readTime: '1 min read',
      lastUpdated: 'Updated 3 weeks ago'
    },
    {
      id: 4,
      question: 'What medical conditions prevent blood donation?',
      answer: 'Conditions that typically prevent donation include: active infections, certain chronic illnesses (like hepatitis or HIV), recent cancer treatment (within 12 months), heart disease, bleeding disorders, and pregnancy. Some medications may also require temporary deferral. Always disclose your full medical history during screening.',
      category: 'eligibility',
      icon: <FaShieldAlt />,
      readTime: '3 min read',
      lastUpdated: 'Updated 2 months ago'
    },

    // Donation Process Questions
    {
      id: 5,
      question: 'How long does the entire donation process take?',
      answer: 'The entire process typically takes 45-60 minutes: 10 minutes for registration, 10-15 minutes for health screening, 8-10 minutes for actual donation, and 15 minutes for rest and refreshments. For first-time donors, plan for about 75 minutes.',
      category: 'process',
      icon: <FaRegClock />,
      readTime: '1 min read',
      lastUpdated: 'Updated 2 weeks ago'
    },
    {
      id: 6,
      question: 'Does donating blood hurt?',
      answer: 'You may feel a quick pinch when the needle is inserted, similar to a routine blood test. During donation, most people feel only slight pressure. The discomfort is minimal and temporary. Our trained staff ensures your comfort throughout the process.',
      category: 'process',
      icon: <FaTint />,
      readTime: '1 min read',
      lastUpdated: 'Updated 1 month ago'
    },
    {
      id: 7,
      question: 'What should I do before and after donating?',
      answer: 'Before: Eat a healthy meal, drink plenty of fluids, get adequate sleep, and bring a photo ID. Avoid fatty foods. After: Drink extra fluids for 24-48 hours, avoid strenuous exercise for 24 hours, eat iron-rich foods, and if you feel dizzy, lie down with feet elevated. Keep the bandage on for several hours.',
      category: 'process',
      icon: <FaRegCalendarCheck />,
      readTime: '2 min read',
      lastUpdated: 'Updated 3 weeks ago'
    },

    // Safety & Health Questions
    {
      id: 8,
      question: 'Is it safe to donate blood?',
      answer: 'Yes, blood donation is extremely safe. All equipment is sterile, used only once, and then disposed of properly. Our staff follows strict safety protocols. The amount collected (about 1 pint) is quickly replenished by your body within 24-48 hours for fluids and 4-8 weeks for red blood cells.',
      category: 'safety',
      icon: <FaShieldAlt />,
      readTime: '2 min read',
      lastUpdated: 'Updated 1 week ago'
    },
    {
      id: 9,
      question: 'What safety measures are in place for COVID-19?',
      answer: 'We follow CDC guidelines including: mandatory mask-wearing (provided if needed), social distancing, enhanced cleaning protocols, health screening for all donors and staff, hand sanitizer stations, and appointment scheduling to limit crowding. All surfaces are disinfected between donors.',
      category: 'safety',
      icon: <FaRegHospital />,
      readTime: '2 min read',
      lastUpdated: 'Updated 2 weeks ago'
    },
    {
      id: 10,
      question: 'Are there any health benefits to donating blood?',
      answer: 'Yes! Donating blood can: 1) Reduce iron overload (especially important for those with hemochromatosis), 2) Provide a free mini-health screening (checking blood pressure, hemoglobin, etc.), 3) Help identify potential health issues, 4) Burn approximately 650 calories per donation, and 5) Give psychological benefits from helping others.',
      category: 'safety',
      icon: <FaHeartbeat />,
      readTime: '2 min read',
      lastUpdated: 'Updated 1 month ago'
    },

    // Impact & Benefits Questions
    {
      id: 11,
      question: 'How many lives can one donation save?',
      answer: 'A single blood donation can save up to 3 lives! Your blood is separated into components: red blood cells (for trauma, surgery, anemia), platelets (for cancer patients, organ transplants), and plasma (for burn victims, clotting disorders). Each component can go to different patients with specific needs.',
      category: 'impact',
      icon: <FaUsers />,
      readTime: '1 min read',
      lastUpdated: 'Updated 2 weeks ago'
    },
    {
      id: 12,
      question: 'How quickly is donated blood used?',
      answer: 'Blood has a limited shelf life: Red blood cells last 42 days, platelets only 5 days, and plasma can be frozen for up to 1 year. This constant need is why regular donations are crucial. Most blood is used within days of donation, especially during emergencies.',
      category: 'impact',
      icon: <FaClock />,
      readTime: '1 min read',
      lastUpdated: 'Updated 3 weeks ago'
    },
    {
      id: 13,
      question: 'Who needs blood donations most?',
      answer: 'Blood is needed by: 1) Cancer patients (25% of all blood used), 2) Trauma and accident victims, 3) Surgical patients, 4) Patients with blood disorders (sickle cell, hemophilia), 5) Organ transplant recipients, 6) Burn victims, and 7) Mothers with childbirth complications.',
      category: 'impact',
      icon: <FaAmbulance />,
      readTime: '2 min read',
      lastUpdated: 'Updated 1 month ago'
    },
  ];

  const [expandedQuestions, setExpandedQuestions] = useState([1, 5, 8, 11]);

  const toggleQuestion = (id) => {
    if (expandedQuestions.includes(id)) {
      setExpandedQuestions(expandedQuestions.filter(qId => qId !== id));
    } else {
      setExpandedQuestions([...expandedQuestions, id]);
    }
  };

  const filteredFaqs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const donationTimeline = [
    { time: 'Day 1-2', event: 'Plasma volume restored', details: 'Your body replaces the fluid portion of your donation' },
    { time: 'Week 1-2', event: 'Red blood cells replenish', details: 'Red cell count returns to normal levels' },
    { time: 'Week 4-6', event: 'Iron levels restored', details: 'Iron stores return to pre-donation levels' },
    { time: 'Day 56', event: 'Eligible to donate again', details: 'You can donate whole blood again after 8 weeks' },
  ];

  const bloodTypeTable = [
    { type: 'O+', population: '37%', canGiveTo: 'O+, A+, B+, AB+', canReceiveFrom: 'O+, O-' },
    { type: 'O-', population: '7%', canGiveTo: 'All blood types', canReceiveFrom: 'O-' },
    { type: 'A+', population: '36%', canGiveTo: 'A+, AB+', canReceiveFrom: 'A+, A-, O+, O-' },
    { type: 'A-', population: '6%', canGiveTo: 'A+, A-, AB+, AB-', canReceiveFrom: 'A-, O-' },
    { type: 'B+', population: '8%', canGiveTo: 'B+, AB+', canReceiveFrom: 'B+, B-, O+, O-' },
    { type: 'B-', population: '2%', canGiveTo: 'B+, B-, AB+, AB-', canReceiveFrom: 'B-, O-' },
    { type: 'AB+', population: '3%', canGiveTo: 'AB+', canReceiveFrom: 'All blood types' },
    { type: 'AB-', population: '1%', canGiveTo: 'AB+, AB-', canReceiveFrom: 'AB-, A-, B-, O-' },
  ];

  const requirementsChecklist = [
    { requirement: 'Age', condition: '18-75 years (16-17 with consent)', icon: <FaUserCheck /> },
    { requirement: 'Weight', condition: 'Minimum 110 lbs (50 kg)', icon: <FaBalanceScale /> },
    { requirement: 'Health', condition: 'Good health, no active infections', icon: <FaHeartbeat /> },
    { requirement: 'Hemoglobin', condition: 'Minimum 12.5 g/dL for females, 13.0 g/dL for males', icon: <FaTint /> },
    { requirement: 'Time since last donation', condition: '56 days for whole blood', icon: <FaRegClock /> },
    { requirement: 'Identification', condition: 'Valid photo ID required', icon: <FaRegFileAlt /> },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.light }}>
     

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 opacity-5"
            style={{ backgroundColor: colors.accent }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="flex items-center mb-6">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mr-4"
                  style={{ backgroundColor: colors.accent }}
                >
                  <FaQuestionCircle className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold" style={{ color: colors.dark }}>
                    Frequently Asked <span style={{ color: colors.accent }}>Questions</span>
                  </h1>
                  <p className="text-lg mt-2" style={{ color: colors.primary }}>
                    Everything you need to know about blood donation
                  </p>
                </div>
              </div>
              
              <p className="text-xl mb-8" style={{ color: colors.primary }}>
                Find answers to common questions about eligibility, safety, 
                the donation process, and how your contribution saves lives.
              </p>
              
              <div className="relative max-w-xl">
                <div className="relative">
                  <FaSearch 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl"
                    style={{ color: colors.primary }}
                  />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 focus:outline-none focus:ring-2 transition duration-300"
                    style={{
                      borderColor: colors.primary + '30',
                      backgroundColor: colors.light,
                      color: colors.dark
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative">
                <div 
                  className="w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl"
                  style={{ backgroundColor: colors.dark }}
                >
                  {/* Hero Image Placeholder */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <FaHandHoldingHeart className="text-8xl mx-auto mb-6" style={{ color: colors.accent }} />
                      <h3 className="text-2xl font-bold text-white mb-2">Your Questions Matter</h3>
                      <p className="text-gray-300">Find answers, feel confident, save lives</p>
                    </div>
                  </div>
                </div>
                <div 
                  className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full opacity-10"
                  style={{ backgroundColor: colors.accent }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeCategory === category.id 
                    ? 'shadow-lg transform scale-105' 
                    : 'hover:shadow-md'
                }`}
                style={{
                  backgroundColor: activeCategory === category.id ? colors.accent : colors.light,
                  color: activeCategory === category.id ? colors.light : colors.dark,
                  border: `2px solid ${activeCategory === category.id ? colors.accent : colors.primary}20`
                }}
              >
                <span className="mr-3 text-lg">{category.icon}</span>
                <span className="font-semibold">{category.label}</span>
                <span 
                  className="ml-3 px-2 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: activeCategory === category.id ? colors.light : colors.accent,
                    color: activeCategory === category.id ? colors.accent : colors.light
                  }}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((item) => (
                  <div 
                    key={item.id}
                    className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
                    style={{ 
                      backgroundColor: colors.light,
                      border: `1px solid ${colors.primary}20`
                    }}
                  >
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className="w-full p-6 text-left flex justify-between items-center"
                    >
                      <div className="flex items-start">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                          style={{ backgroundColor: `${colors.accent}15` }}
                        >
                          <span style={{ color: colors.accent }}>{item.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2" style={{ color: colors.dark }}>
                            {item.question}
                          </h3>
                          <div className="flex items-center gap-4">
                            <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                            </span>
                            <span className="text-sm" style={{ color: colors.primary }}>
                              {item.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                          expandedQuestions.includes(item.id) ? 'rotate-180' : ''
                        }`}
                        style={{ backgroundColor: colors.accent, color: colors.light }}
                      >
                        <FaArrowRight className="transform rotate-90" />
                      </div>
                    </button>
                    
                    {expandedQuestions.includes(item.id) && (
                      <div className="px-6 pb-6">
                        <div className="ml-16">
                          <div className="prose max-w-none" style={{ color: colors.primary }}>
                            <p className="mb-4">{item.answer}</p>
                            <div className="flex items-center text-sm mt-4" style={{ color: colors.primary }}>
                              <FaRegFileAlt className="mr-2" />
                              <span>{item.lastUpdated}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <FaSearch className="text-5xl mx-auto mb-4" style={{ color: colors.primary }} />
                  <h3 className="text-2xl font-bold mb-2" style={{ color: colors.dark }}>
                    No questions found
                  </h3>
                  <p style={{ color: colors.primary }}>
                    Try adjusting your search or browse by category
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blood Type Compatibility Table */}
      <section className="py-16" style={{ backgroundColor: '#f8f8f8' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <FaTint className="text-3xl mr-3" style={{ color: colors.accent }} />
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: colors.dark }}>
                Blood Type <span style={{ color: colors.accent }}>Compatibility</span>
              </h2>
            </div>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.primary }}>
              Understanding blood type compatibility helps ensure patients receive safe transfusions
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="min-w-full" style={{ backgroundColor: colors.light }}>
              <thead>
                <tr style={{ backgroundColor: colors.dark }}>
                  <th className="py-4 px-6 text-left font-bold text-white">Blood Type</th>
                  <th className="py-4 px-6 text-left font-bold text-white">Population %</th>
                  <th className="py-4 px-6 text-left font-bold text-white">Can Give To</th>
                  <th className="py-4 px-6 text-left font-bold text-white">Can Receive From</th>
                  <th className="py-4 px-6 text-left font-bold text-white">Universal</th>
                </tr>
              </thead>
              <tbody>
                {bloodTypeTable.map((blood, index) => (
                  <tr 
                    key={index}
                    className="hover:bg-gray-50 transition duration-200"
                    style={{ 
                      backgroundColor: index % 2 === 0 ? colors.light : '#f9f9f9',
                      borderBottom: `1px solid ${colors.primary}20`
                    }}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center font-bold mr-3"
                          style={{ 
                            backgroundColor: `${colors.accent}15`,
                            color: colors.accent,
                            border: `2px solid ${colors.accent}`
                          }}
                        >
                          {blood.type}
                        </div>
                        <span className="font-bold" style={{ color: colors.dark }}>
                          {blood.type}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold" style={{ color: colors.primary }}>
                      {blood.population}
                    </td>
                    <td className="py-4 px-6" style={{ color: colors.dark }}>
                      {blood.canGiveTo}
                    </td>
                    <td className="py-4 px-6" style={{ color: colors.dark }}>
                      {blood.canReceiveFrom}
                    </td>
                    <td className="py-4 px-6">
                      {blood.type === 'O-' ? (
                        <span className="px-3 py-1 rounded-full text-sm font-bold" style={{ backgroundColor: `${colors.accent}15`, color: colors.accent }}>
                          Universal Donor
                        </span>
                      ) : blood.type === 'AB+' ? (
                        <span className="px-3 py-1 rounded-full text-sm font-bold" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                          Universal Recipient
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Recovery Timeline & Requirements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Recovery Timeline */}
            <div>
              <div className="flex items-center mb-8">
                <FaChartLine className="text-3xl mr-3" style={{ color: colors.accent }} />
                <h2 className="text-3xl font-bold" style={{ color: colors.dark }}>
                  Recovery <span style={{ color: colors.accent }}>Timeline</span>
                </h2>
              </div>
              
              <div className="space-y-6">
                {donationTimeline.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="flex flex-col items-center mr-6">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2"
                        style={{ backgroundColor: colors.accent, color: colors.light }}
                      >
                        {index + 1}
                      </div>
                      {index < donationTimeline.length - 1 && (
                        <div className="w-1 h-full" style={{ backgroundColor: colors.primary }}></div>
                      )}
                    </div>
                    <div className="pb-6">
                      <div className="flex items-center mb-2">
                        <FaRegClock className="mr-2" style={{ color: colors.accent }} />
                        <span className="font-bold text-lg" style={{ color: colors.dark }}>
                          {item.time}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: colors.dark }}>
                        {item.event}
                      </h3>
                      <p style={{ color: colors.primary }}>{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements Checklist */}
            <div>
              <div className="flex items-center mb-8">
                <FaUserCheck className="text-3xl mr-3" style={{ color: colors.accent }} />
                <h2 className="text-3xl font-bold" style={{ color: colors.dark }}>
                  Donor <span style={{ color: colors.accent }}>Requirements</span>
                </h2>
              </div>
              
              <div className="space-y-4">
                {requirementsChecklist.map((req, index) => (
                  <div 
                    key={index}
                    className="flex items-center p-4 rounded-xl hover:shadow-md transition duration-300"
                    style={{ backgroundColor: colors.light, border: `1px solid ${colors.primary}20` }}
                  >
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                      style={{ backgroundColor: `${colors.accent}15` }}
                    >
                      <span style={{ color: colors.accent }}>{req.icon}</span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold" style={{ color: colors.dark }}>
                        {req.requirement}
                      </h3>
                      <p style={{ color: colors.primary }}>{req.condition}</p>
                    </div>
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: `${colors.accent}30` }}>
                      <div 
                        className="w-4 h-4 rounded-full mx-auto mt-1"
                        style={{ backgroundColor: colors.accent }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: `${colors.accent}10` }}>
                <div className="flex items-start">
                  <FaMobileAlt className="text-2xl mt-1 mr-4" style={{ color: colors.accent }} />
                  <div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: colors.dark }}>
                      Quick Eligibility Check
                    </h3>
                    <p className="mb-4" style={{ color: colors.primary }}>
                      Use our online eligibility tool to check if you can donate today
                    </p>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: colors.dark }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Our donor support team is ready to help you with any additional questions.
              Contact us for personalized guidance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button 
                className="px-10 py-4 rounded-lg font-bold text-lg transition duration-300 hover:opacity-90"
                style={{ backgroundColor: colors.accent, color: colors.light }}
              >
                Contact Support Team
              </button>
              <button 
                className="px-10 py-4 rounded-lg font-bold text-lg border-2 transition duration-300 hover:bg-white hover:bg-opacity-10"
                style={{ borderColor: colors.light, color: colors.light }}
              >
                Schedule Donation
              </button>
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
              Information is updated regularly. Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;