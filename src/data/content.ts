export const contact = {
  phones: ['+91 99127 97979', '+91 99858 23239'],
  email: 'info@makprojects.com',
  web: 'www.makprojects.com',
  corporate:
    'Park Citi Plaza, 4th Floor, Road No.1, Banjara Hills, Hyderabad – 500034',
  project:
    'BTR Township – 26th Milestone on Srisailam Highway, Thummalur (V), Maheswaram (M), Ranga Reddy (D) – 501359',
  hours: 'Mon–Sat 09:00–18:00 · Sunday Holiday',
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'BTR Serenity', to: '/btr-serenity' },
  { label: 'Villa Plots', to: '/btr-villa-plots' },
  { label: 'BTR Villas', to: '/btr-villas' },
  { label: 'Amenities', to: '/amenities' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

/** MAK — BTR Township (master development) */
export const btrTownship = {
  name: 'MAK — BTR Township',
  tagline: "Telangana’s pioneer integrated luxury township",
  location: 'South Hyderabad · 26th Milestone, Srisailam Highway',
  status: 'Completed',
  summary: [
    'We delivered MAK — BTR Township, Telangana’s pioneer integrated luxury township project located in South Hyderabad. Spanning over 285+ acres of lush greenery, this master-planned development has been successfully completed by MAK Projects Private Limited while upholding international quality standards.',
    'Today, it stands as a vibrant community home to over 650+ families. The township features wide 30, 40, and 50-foot internal roads, offering smooth connectivity across 333 luxury villas, 150 3 & 4 BHK apartment units with a clubhouse, and exclusive villa plots.',
    'The entire community spreads over 1,100+ units in MAK — BTR Township, with easy access to public transport facilities.',
  ],
  connectivity: [
    'ORR Exit 14',
    'RGIA',
    'Financial District',
    'Educational institutions',
    'Healthcare hubs',
    '& more',
  ],
  stats: [
    { value: '285+', label: 'Acres of greenery' },
    { value: '650+', label: 'Families living here' },
    { value: '1,100+', label: 'Units across township' },
    { value: '150', label: '3 & 4 BHK · Ready to move in' },
    { value: '80+', label: 'World-class amenities' },
  ],
  inventory: [
    {
      id: 'villas',
      label: 'Luxury villas',
      value: '333',
      detail: 'Completed residences',
    },
    {
      id: 'apartments',
      label: 'Apartments',
      value: '150',
      detail: '3 & 4 BHK flats, ready to move in',
    },
    {
      id: 'plots',
      label: 'Exclusive villa plots',
      value: 'Gardenia',
      detail: '& more plotted options',
    },
    {
      id: 'roads',
      label: 'Internal roads',
      value: '30 / 40 / 50',
      detail: 'Wide road connectivity',
    },
  ],
  featureGroups: [
    {
      id: 'community',
      title: 'Community & Layout',
      items: [
        'Vibrant neighborhood of 650+ families',
        'Wide 30 / 40 / 50 ft internal roads',
        'Triangle Park & children’s parks',
        'Scenic tree-lined vistas',
      ],
    },
    {
      id: 'sports',
      title: 'Sports & Recreation',
      items: [
        '14+ acre 10-hole golf course',
        'Cricket ground',
        'Pickleball, volleyball & badminton courts',
        'Multipurpose court & jogging track',
      ],
    },
    {
      id: 'lifestyle',
      title: 'Leisure & Lifestyle',
      items: [
        '2 clubhouses',
        '2 swimming pools',
        'Fully-equipped gym & yoga studio',
        'Multi-cuisine restaurant & amphitheatre',
      ],
    },
    {
      id: 'safety',
      title: 'Safety & Convenience',
      items: [
        '24/7 security with solar fencing',
        'On-site ambulance',
        'ATM',
        'Water softening plant & STP',
        'EV charging — provision for modern mobility',
      ],
    },
  ],
} as const

export const projects = [
  {
    slug: 'serenity',
    title: 'BTR – Serenity Apartments',
    subtitle: 'Ready to Move-In Luxury Apartments',
    size: 'SIZE : 3 & 4 BHK | 1334 – 3068 SFT ( UNITS – 150 )',
    status: 'Ready to Move-In',
    possession: 'POSSESSION – READY TO MOVE-IN',
    location: '26TH MILE STONE ON SRISAILAM HIGHWAY – HYDERABAD',
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    href: '/btr-serenity',
    rera: 'P02400002599',
  },
  {
    slug: 'gardenia',
    title: 'BTR – Gardenia',
    subtitle: 'Premium Villa Plots',
    size: 'SIZE : 325 – 1000sq.Yds',
    status: 'Running',
    possession: 'POSSESSION – RUNNING',
    location: '26TH MILE STONE ON SRISAILAM HIGHWAY – HYDERABAD',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
    href: '/btr-villa-plots',
    rera: 'P02400001288 / P02400001289',
  },
  {
    slug: 'villas',
    title: 'BTR – Villas',
    subtitle: 'Luxury Golf Community',
    size: '',
    status: 'Completed',
    possession: 'POSSESSION – COMPLETED',
    location: '26TH MILE STONE ON SRISAILAM HIGHWAY – HYDERABAD',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
    href: '/btr-villas',
    rera: 'HMDA / RERA Approved',
  },
  {
    slug: 'canadian',
    title: 'Canadian Wood Villa',
    subtitle: 'Signature Residence',
    size: 'SIZE : 8750 SFT',
    status: 'Exclusive',
    possession: '',
    location: '26TH MILE STONE ON SRISAILAM HIGHWAY – HYDERABAD',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    href: '/canadian-wood-villa',
    rera: '—',
  },
  {
    slug: 'greens',
    title: 'BTR – Greens Residential Plots',
    subtitle: 'Residential Plots',
    size: 'SIZE : 325 – 1000',
    status: 'Completed',
    possession: 'POSSESSION – COMPLETED',
    location: '26TH MILE STONE ON SRISAILAM HIGHWAY – HYDERABAD',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
    href: '/btr-greens',
    rera: '—',
  },
  {
    slug: 'golf',
    title: 'BTR – Golf Residential Plots',
    subtitle: 'Golf Residential Plots',
    size: 'SIZE : 325 – 1000sq.Yds',
    status: 'Completed',
    possession: 'POSSESSION – COMPLETED',
    location: '26TH MILE STONE ON SRISAILAM HIGHWAY – HYDERABAD',
    image:
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1600&q=80',
    href: '/btr-golf-plots',
    rera: '—',
  },
]

export const whyUs = [
  {
    title: 'Years of Dedication',
    body: 'Our long-standing presence is a testament to delivering projects that stand the test of time.',
  },
  {
    title: 'Workmanship Quality',
    body: 'At MAK Projects, quality isn’t just a goal — it’s a tradition upheld in every detail of craftsmanship.',
  },
  {
    title: 'Quality Assurance',
    body: 'Rigorous quality control is the cornerstone of our promise to exceed expectations.',
  },
]

export const amenities = [
  'Club House',
  'Swimming Pool',
  '10-Hole Golf Course',
  'Gym',
  'Yoga Room',
  'Jogging Track',
  'Cricket Ground',
  'Basketball Court',
  'EV Charging',
  '24/7 Security',
  'Solar Fencing',
  'STP & Water Softening',
  'ATM',
  'Ambulance',
  'Tree-lined Vistas',
  'Power Backup',
]

export const floorPlans = {
  bhk3: [
    {
      size: 1334,
      beds: 3,
      baths: 3,
      uds: 77,
      image: '/media/serenity/plans/3bhk-1334.svg',
    },
    {
      size: 1448,
      beds: 3,
      baths: 3,
      uds: 84,
      image: '/media/serenity/plans/3bhk-1448.svg',
    },
    {
      size: 1558,
      beds: 3,
      baths: 3,
      uds: 90,
      image: '/media/serenity/plans/3bhk-1558.svg',
    },
    {
      size: 1788,
      beds: 3,
      baths: 3,
      uds: 103,
      image: '/media/serenity/plans/3bhk-1788.svg',
    },
  ],
  bhk4: [
    {
      size: 2434,
      beds: 4,
      baths: 4,
      uds: 140,
      image: '/media/serenity/plans/4bhk-2434.svg',
    },
    {
      size: 2482,
      beds: 4,
      baths: 4,
      uds: 143,
      image: '/media/serenity/plans/4bhk-2482.svg',
    },
    {
      size: 2767,
      beds: 4,
      baths: 4,
      uds: 160,
      image: '/media/serenity/plans/4bhk-2767.svg',
    },
    {
      size: 3068,
      beds: 4,
      baths: 4,
      uds: 177,
      image: '/media/serenity/plans/4bhk-3068.svg',
    },
  ],
}

export const leaders = [
  {
    name: 'Mr. A. Murali Krishna Reddy',
    role: 'Chairman',
    years: '45+ years',
    image: '/media/management/murali-krishna-hq.jpg',
    bio: [
      'Mr. A. Murali Krishna Reddy’s impressive background showcases his extensive expertise and achievements in both infrastructure projects and hospitality management. With a postgraduate degree in Business Management and over 45+ years of experience, he brings a wealth of knowledge and leadership to his roles.',
      'His tenure as the Promoter and Managing Director of the award-winning Green Park Group of Hotels highlights his ability to successfully build and operate star hotels, demonstrating a keen understanding of the hospitality industry’s demands.',
      'Receiving the ‘Emerging India Award – 2007’ from the Hon’ble Prime Minister of India, Dr. Manmohan Singh, underscores Mr. Reddy’s significant contributions and recognition on a national level. This award further validates his dedication, innovation, and impact within the business landscape.',
      'Mr. Reddy’s multifaceted background and distinguished accomplishments position him as a seasoned professional capable of steering projects to success and achieving excellence across various sectors. His leadership and experience undoubtedly play a pivotal role in the success of MAK Projects.',
    ],
  },
  {
    name: 'Mr. Mir Nasir Ali Khan',
    role: 'Managing Director',
    years: '35+ years',
    image: '/media/management/mir-nasir-ali.png',
    bio: [
      'Mr. Mir Nasir Ali Khan’s background showcases a wealth of experience and expertise in the construction and real estate industry. With a postgraduate degree in Business Management and over 35+ years of hands-on experience, he brings a strong foundation of knowledge to his roles.',
      'As the Promoter and Managing Director of Frontline Constructions Ltd., Mr. Khan has played a pivotal role in spearheading the construction of numerous prestigious residential and commercial properties in prime locations across Hyderabad. This demonstrates his adeptness in overseeing complex projects and delivering high-quality developments that meet the demands of discerning clients.',
      'Mr. Khan’s leadership and strategic vision have undoubtedly contributed to the success and reputation of Frontline Constructions Ltd. His ability to navigate the dynamic landscape of the real estate industry and consistently deliver exceptional results underscores his proficiency and dedication to the field.',
      'With his extensive experience and proven track record, Mr. Mir Nasir Ali Khan brings valuable insights and leadership to the team at MAK Projects, further enhancing the company’s capabilities and standing in the industry.',
    ],
  },
  {
    name: 'Mr. K. Bharath Kumar',
    role: 'Director, MAK Projects & Vice Chairman, MAK Hotels & Resorts',
    years: '20+ years',
    image: '/media/management/bharath-kumar.jpg',
    bio: [
      'Mr. K. Bharath Kumar’s background reflects a rich and diverse career in the hospitality industry, with a strong focus on human resource management, project management, and commercial management. With a postgraduate degree in Business Administration and over 20+ years of experience, he brings a depth of knowledge and expertise to his roles.',
      'His tenure with the Green Park Group of Hotels in Hyderabad and Chennai from 2001 to 2006 highlights his significant contributions and leadership within the hospitality sector. During this time, he played a key role in managing various aspects of hotel operations, including human resources, project execution, and commercial activities.',
      'Mr. Kumar’s multifaceted experience underscores his versatility and proficiency in handling diverse responsibilities within the hospitality industry. His expertise in human resource management, project management, and commercial management has been instrumental in driving operational efficiency, enhancing guest experiences, and achieving business objectives.',
      'With his extensive background and proven track record, Mr. K. Bharath Kumar brings valuable skills and insights to the team at MAK Projects, contributing to the company’s success and growth in the real estate sector.',
    ],
  },
  {
    name: 'Mr. G. Saba Nayagam',
    role: 'Director',
    years: '35+ years',
    image: '/media/management/saba-nayagam.png',
    bio: [
      'Mr. G. Saba Nayagam brings a wealth of experience and expertise to the table, particularly in finance, accounts, and legal domains. With a strong educational background including a Commerce degree, Fellowship of the Institute of Chartered Accountants of India, and a Diploma in Central Excise and Customs, he possesses a solid foundation for his career.',
      'Having accrued over 35+ years of experience across various sectors including cultivation, manufacturing, exports, and constructions, Mr. Saba has honed his skills in finance and legal matters through diverse roles and responsibilities. His tenure as Vice President – Finance at Diana Hotels Ltd. (Green Park Group of Hotels) from 1996 to 2007 underscores his leadership and proficiency in managing accounts, financing, and budgeting for the group.',
      'His responsibilities extended beyond financial management to include project financing and project implementation, showcasing his ability to navigate complex financial landscapes and oversee successful project executions. Mr. Saba’s contributions would have been instrumental in ensuring the financial health and operational efficiency of the Green Park Group and other associated companies.',
      'With his extensive experience and comprehensive understanding of finance, accounts, and legal matters, Mr. G. Saba Nayagam adds significant value to the team at MAK Projects, contributing to the company’s strategic financial management and overall success in the real estate sector.',
    ],
  },
  {
    name: 'Mr. T. Atchi Reddy',
    role: 'Director',
    years: '30+ years',
    image: '/media/management/atchi-reddy.jpg',
    bio: [
      'Mr. T. Atchi Reddy’s impressive background in both management and law, coupled with his extensive experience in the hospitality industry, positions him as a valuable asset to any organization. With a postgraduate degree in Management and a law degree, he possesses a well-rounded skill set that encompasses both business acumen and legal expertise.',
      'His tenure at Green Park – Hyderabad, where he worked across various departments including HRD, Food & Beverages, and Housekeeping, demonstrates his versatility and proficiency in different areas of hotel operations. Progressing through the ranks to the positions of Deputy General Manager at Green Park – Hyderabad and General Manager at Green Park – Visakhapatnam, Mr. Reddy has proven his leadership capabilities and ability to drive success in challenging environments.',
      'Before joining MAK Projects, Mr. Reddy served as the Chief Executive Officer of Ramky Estates & Farms Pvt. Ltd., where he was responsible for overseeing divisional operations and driving the company’s growth. His experience in this role highlights his strategic vision, operational expertise, and commitment to achieving business objectives.',
      'With over 30+ years of experience in the hospitality industry and a track record of leadership and achievement, Mr. T. Atchi Reddy brings invaluable insights and leadership to the team at MAK Projects. His multifaceted background and proven track record make him well-equipped to contribute to the company’s continued success and growth in the real estate sector.',
    ],
  },
]

export type FaqItem = {
  q: string
  a: string
  table?: {
    headers: [string, string]
    rows: [string, string][]
  }
}

export const serenityFaqs: FaqItem[] = [
  {
    q: 'What is BTR Serenity Apartments, and where is it located within BTR Township?',
    a: 'BTR Serenity Apartments is a part of the BTR luxurious active residential township, comprising approximately 150 residential flats across 3 acres on Srisailam Highway, Thummalur.',
  },
  {
    q: 'What flat sizes are available, and what is the UDS (Undivided Share of Land) in BTR Serenity?',
    a: 'The undivided share of land refers to the portion of the total land area owned by each flat owner. Common area is approximately 20%.',
    table: {
      headers: ['Flat — SFT', 'UDS (sq.yds)'],
      rows: [
        ['1334', '77'],
        ['1448', '84'],
        ['1558', '90'],
        ['1788', '103'],
        ['2434', '140'],
        ['2482', '143'],
        ['2767', '160'],
        ['3068', '177'],
      ],
    },
  },
  {
    q: 'What are the specifications for the structure and superstructure of BTR Serenity Apartments?',
    a: 'The structure features an RCC framework. The superstructure includes external walls of 8″ thickness and internal walls of 4″ thickness with C.C. Blocks / Bricks.',
  },
  {
    q: 'What flooring options are available in BTR Serenity Apartments?',
    a: 'Flooring includes 600 mm × 600 mm vitrified flooring with skirting. Anti-skid flooring is provided in toilets, along with glazed ceramic dado tile up to a specified height in the kitchen.',
  },
  {
    q: 'Can you provide details about the doors, windows, and electrical fittings?',
    a: 'Main doors are teak wood with melamine polish; internal doors are teak wood or flush doors; windows are UPVC. Electrical wiring is concealed copper with modular switches of reputed make.',
  },
  {
    q: 'What are the sanitary fittings and water supply arrangements in the apartments?',
    a: 'Sanitary fittings are from Jaguar — including European commodes, wash basins, and CP fittings. Bore well water is used for flushing and toilets, with provision for drinking water in the kitchen and a WTP.',
  },
  {
    q: 'Is there any provision for power backup? What appliances work with backup power?',
    a: 'Yes. Power backup is available for lights, fan points, and common areas.',
  },
  {
    q: 'What security features are available in BTR Serenity Apartments?',
    a: 'Surveillance cameras at the main security and designated locations, corridor intercom system facility, and boom barriers for efficient traffic management.',
  },
  {
    q: 'How is the water management system in BTR Serenity?',
    a: 'Water is managed through a Krishna water connection for drinking and daily needs, supplemented by bore well water for common use. A water softening plant ensures water quality, while a sewerage treatment plant handles waste responsibly.',
  },
  {
    q: 'Is there any provision for telecom, cable TV, and internet connections?',
    a: 'Yes — there is provision for telephone, cable, and internet connection.',
  },
  {
    q: 'Is there any car wash facility provided?',
    a: 'Yes. A common car wash area provision is given for BTR Serenity.',
  },
  {
    q: 'What are the ongoing developments in the vicinity of BTR Serenity?',
    a: 'MAK — BTR is located near a 700-acre integrated township, Electronic City, Fab City, Tata Sikorsky, TCS, GMR Health Port, Electronic SEZ, Wipro, Amazon Warehouse, Malabar Gold & Diamonds, Adani Aerospace, Wonderla Amusement Park, Foxconn, and more.\n\nNearby schools include Manchester Global School, The Aga Khan Academy, Delhi Public School – Aero City, Bhashyam Blooms, Devendra Vidyalaya, Narayana IIT Academy, and others.',
  },
  {
    q: 'Are EV charging stations available at BTR Serenity Apartments?',
    a: 'Yes. A specified EV charging point is available at BTR Serenity, operated by the Adani Group.',
  },
  {
    q: 'What is the process for obtaining club house membership?',
    a: 'We will provide the necessary forms, details regarding membership fees, and privileges associated with BTR Serenity Club membership. Additionally, if you wish to utilize the features of the BTR Club & Pavilion, a one-time subscription grants lifetime access.',
  },
  {
    q: 'What is the “corpus fund”, and how is it calculated in BTR Serenity?',
    a: 'The corpus fund is a reserve maintained by the association for future maintenance, repair, and improvement expenses of the property. It is calculated on the flat built-up area.',
  },
  {
    q: 'What are the monthly maintenance charges in BTR Serenity?',
    a: 'Maintenance charges are calculated based on the built-up area of the flat, in accordance with association guidelines, at ₹3 + GST per sft.',
  },
]

export const plotFaqs = [
  {
    q: 'What plot sizes does BTR Gardenia offer?',
    a: 'Premium residential plots from 325 to 1000 sq.yds across 193 acres with 590 units.',
  },
  {
    q: 'Is it approved?',
    a: 'Yes — HMDA approved and registered with RERA (P02400001288 / P02400001289).',
  },
  {
    q: 'How many floors are permitted?',
    a: 'Villas must follow G+2 / Stilt+2 as per sale deed and BTROWA bye-laws.',
  },
  {
    q: 'What infrastructure is included?',
    a: 'Wide roads, underground electricity & sewerage, Krishna water, water softening plant, ECO STP, playgrounds and 2 clubhouses.',
  },
]

export const villaFaqs = [
  {
    q: 'How many villas and what area?',
    a: '333 luxury villas across ~260 acres in Hyderabad’s Knowledge City, within MAK — BTR Township.',
  },
  {
    q: 'Who designed the project?',
    a: 'SA Architects SDN BHD, Malaysia.',
  },
  {
    q: 'What configurations are available?',
    a: '3 & 4 bedroom villas from 2900–4000 sq.ft (approx 400–600 sq.yds).',
  },
  {
    q: 'Key amenities?',
    a: '10-hole golf course, 2 clubhouses, spa, mini theatre, cricket ground, landscaped gardens, ATM & utility shops.',
  },
]

export const nearby = {
  schools: [
    'Manchester Global School',
    'Delhi Public School – Aero City',
    'The Aga Khan Academy',
    'Bhashyam Blooms',
    'Devendra Vidyalaya',
    'Narayana IIT Academy',
  ],
  locations: [
    '5 min from ORR Exit 14',
    '15 min from RGIA',
    '10 min from Adibatla Aerospace',
    'TCS · Wipro · Amazon',
    'Adani Aerospace · DRDO RCI',
  ],
}
