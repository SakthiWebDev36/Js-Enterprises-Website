export const companyData = {
  name: "JS Enterprises",
  shortName: "JSE",
  tagline: "Certified Fire Protection & Life Safety Engineering",
  badge: "TAMIL NADU FIRE & RESCUE SERVICES COMPLIANT",
  address: {
    line1: "No. 16/35, Kamarajar Street",
    line2: "Srinivasa Nagar, Padi",
    city: "Chennai",
    pincode: "600 055",
    state: "Tamil Nadu",
    country: "India",
    full: "No. 16/35, Kamarajar Street, Srinivasa Nagar, Padi, Chennai – 600 055, Tamil Nadu, India."
  },
  phones: [
    { display: "+91 99416 46332", value: "+919941646332", primary: true, label: "Emergency Hotline" },
    { display: "+91 99414 53527", value: "+919941453527", primary: false, label: "Engineering Desk" },
    { display: "+91 98411 79836", value: "+919841179836", primary: false, label: "Project Operations" },
    { display: "044-26561223", value: "+914426561223", primary: false, label: "Office Landline" },
  ],
  email: "jsbsafety@gmail.com",
  operationHours: "24/7 Emergency Dispatch • Office: 09:00 AM - 07:00 PM IST",
  headquarters: "Padi, Chennai Hub",
  
  // Core Services accurately aligned with prompt
  services: [
    {
      id: "fire-extinguishers",
      title: "Fire Extinguishers",
      badge: "IS:15683 COMPLIANT",
      shortDesc: "High-performance ABC dry chemical powder, CO2, clean agent, and mechanical foam extinguishers for rapid suppression.",
      description: "Complete supply, installation, hydrostatic pressure testing, and periodic refilling services for industrial and commercial grade fire extinguishers. Conforming strictly to IS 15683 and IS 2190 standards.",
      types: [
        "ABC Dry Powder (Stored Pressure)",
        "Carbon Dioxide (CO2) High-Pressure",
        "Clean Agent (HFC 227ea / FK-5-1-12)",
        "Mechanical Foam (AFFF) for Flammable Liquids"
      ],
      features: [
        "Certified discharge performance",
        "Zero-leak brass valve assemblies",
        "Tamper-proof safety pull pins",
        "Annual hydro-test certification & refilling"
      ]
    },
    {
      id: "fire-alarm-systems",
      title: "Fire Alarm Systems",
      badge: "IS:2189 STANDARDS",
      shortDesc: "Intelligent optical smoke sensors, rate-of-rise heat detectors, addressable panels, and 24/7 audible warning coverage.",
      description: "Turnkey fire alarm engineering covering addressable and conventional alarm architectures, high-sensitivity multi-criteria optical sensors, manual call stations, and integrated audio-visual evacuation strobes.",
      types: [
        "Addressable Fire Alarm Control Panels",
        "Conventional Multi-Zone Alarm Units",
        "Optical Smoke & Thermal Heat Detectors",
        "Weatherproof Manual Call Points & Strobes"
      ],
      features: [
        "Microsecond detection response",
        "Zone-wise fault & event telemetry",
        "Battery backup uninterrupted power system",
        "Integration with HVAC & emergency shutoff"
      ]
    },
    {
      id: "fire-hydrant-systems",
      title: "Fire Hydrant Systems",
      badge: "IS:3844 HEAVY DUTY",
      shortDesc: "Heavy-duty internal and external landing hydrant networks built to deliver sustained high-volume water pressure.",
      description: "Industrial-grade wet riser hydrant ring mains, heavy-duty gunmetal landing valves, reinforced fire hose cabinets, and multi-stage electrical & diesel booster pumps.",
      types: [
        "Internal & External Yard Hydrants",
        "Gunmetal Single & Double Landing Valves",
        "Reinforced Canvas RRL Delivery Hoses",
        "Main Jockey, Electric & Diesel Booster Pumps"
      ],
      features: [
        "High-pressure hydraulic testing up to 14 Bar",
        "Corrosion-resistant epoxy coated lines",
        "Instant-deployment canvas hose reels",
        "Automatic line pressurization with jockey pump"
      ]
    },
    {
      id: "sprinkler-systems",
      title: "Sprinkler Systems",
      badge: "IS:15105 / NFPA",
      shortDesc: "Automatic wet and dry pipe sprinkler systems designed for instant thermal activation and rapid fire suppression.",
      description: "Precision engineered automatic sprinkler arrays utilizing heat-sensitive quartzoid glass bulbs, alarm check valves, and water motor gong alarms to suppress fires at the point of origin.",
      types: [
        "Wet Pipe Automatic Sprinkler Systems",
        "Dry Pipe & Pre-Action Sprinkler Arrays",
        "Quick Response Pendant & Upright Heads",
        "Zone Control Valves & Water Flow Switches"
      ],
      features: [
        "Thermal activation at 68°C / 79°C / 93°C",
        "Uniform 360-degree water droplet distribution",
        "Zero electrical power requirement for activation",
        "Flow switch integration to central alarm console"
      ]
    }
  ],

  // Why choose us (verified engineering strengths)
  whyChooseUs: [
    {
      number: "01",
      title: "Quality-Focused Solutions",
      desc: "Equipment and assemblies strictly conform to IS, CE, and UL standards for unwavering operational reliability."
    },
    {
      number: "02",
      title: "Experienced Personnel",
      desc: "Licensed fire protection specialists and piping technicians with hands-on industrial project execution background."
    },
    {
      number: "03",
      title: "Timely Project Completion",
      desc: "Disciplined scheduling from engineering layout drawings and approvals through procurement, installation, and handover."
    },
    {
      number: "04",
      title: "Transparent Quotations",
      desc: "Comprehensive itemized bills of quantities with zero hidden fees and direct engineering accountability."
    },
    {
      number: "05",
      title: "Local Chennai Operation",
      desc: "Centrally based in Padi, Chennai, providing rapid on-site surveys, installations, and rapid emergency dispatch across Tamil Nadu."
    },
    {
      number: "06",
      title: "Ongoing Annual Maintenance",
      desc: "Structured AMC contracts, routine pressure hydro-testing, valve servicing, refilling, and statutory audit readiness."
    }
  ],

  // Engineering Lifecycle steps matching Figma
  lifecycle: [
    {
      step: "01",
      title: "Design",
      desc: "Detailed site hazard assessment, AutoCAD system layouts, and hydraulic pressure loss calculations."
    },
    {
      step: "02",
      title: "Supply",
      desc: "Procurement of verified, standard-compliant extinguishers, valves, detectors, and seamless piping."
    },
    {
      step: "03",
      title: "Installation",
      desc: "Precision mechanical piping erection, electrical alarm cabling, and control panel positioning by technicians."
    },
    {
      step: "04",
      title: "Testing",
      desc: "Rigorous hydrostatic line pressure trials, sensor calibration, loop checks, and mock discharge testing."
    },
    {
      step: "05",
      title: "Maintenance",
      desc: "Scheduled periodic inspections, hydro-testing records, refilling, and statutory compliance documentation."
    }
  ],

  // Verifiable operational highlights
  stats: [
    { value: "15+", label: "Years Experience", subtext: "In Fire Protection" },
    { value: "1,200+", label: "Systems Deployed", subtext: "Across Tamil Nadu" },
    { value: "24/7", label: "Emergency Readiness", subtext: "Padi Operations Desk" },
    { value: "100%", label: "Standards Compliant", subtext: "NBC & TNFRS Norms" }
  ],

  // Verified industries served
  industriesServed: [
    { title: "Manufacturing & Industrial Facilities", desc: "Automotive, metal fabrication, and textile facilities requiring heavy-duty hydrant loops and deluge protection." },
    { title: "Warehouses & Logistics Hubs", desc: "High-bay storage centers requiring high-density automatic sprinkler coverage and dry powder protection." },
    { title: "Commercial & Corporate Offices", desc: "Multi-tenant office spaces with multi-zone addressable smoke detection and clean-agent server room protection." },
    { title: "Healthcare & Educational Institutions", desc: "Strict life-safety installations with voice evacuation sirens, clear egress signage, and rapid response alarms." }
  ]
};
