export interface City {
  slug: string;
  name: string;
  county: string;
  population: string;
  uniqueDescription: string;
  keyIndustries: string[];
  nearbyCities: string[];
  seoTitle: string;
  seoDescription: string;
}

export const cities: City[] = [
  {
    slug: "dallas",
    name: "Dallas",
    county: "Dallas County",
    population: "1,340,000+",
    uniqueDescription:
      "Dallas is the economic engine of North Texas and one of the fastest-growing metropolitan areas in the United States. Home to 23 Fortune 500 headquarters — more than any other U.S. city except New York — Dallas drives industries from telecommunications and banking to healthcare and technology. The city's Deep Ellum district has become a hub for creative agencies and tech startups, while Uptown and the Design District attract premium brands and professional services. With a GDP exceeding $500 billion, the DFW metroplex offers an enormous market for businesses that know how to capture digital attention. Competition is fierce, which makes strategic digital marketing not just valuable but essential for Dallas businesses looking to stand out.",
    keyIndustries: [
      "Financial Services",
      "Technology",
      "Healthcare",
      "Telecommunications",
      "Energy",
      "Real Estate",
      "Hospitality",
    ],
    nearbyCities: ["plano", "frisco", "irving", "richardson", "garland", "arlington"],
    seoTitle: "Marketing Agency Dallas TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "NIXAR Solutions is a top-rated marketing agency in Dallas, TX. AI-powered SEO, web development, branding, and digital marketing strategies for Dallas businesses. 500+ projects delivered.",
  },
  {
    slug: "frisco",
    name: "Frisco",
    county: "Collin County / Denton County",
    population: "230,000+",
    uniqueDescription:
      "Frisco is the fastest-growing city in the United States and NIXAR Solutions' home base. Known as 'Sports City USA' for hosting the Dallas Cowboys headquarters at The Star, the PGA of America, the National Soccer Hall of Fame, and the FC Dallas stadium, Frisco has transformed from a small railroad town into a booming tech and sports corridor. The city's population has grown over 400% since 2000. Frisco's $5 Billion Mile along the Dallas North Tollway is rapidly becoming a tech hub, with companies like Keurig Dr Pepper, T-Mobile, and Beal Financial relocating their headquarters here. The explosive growth means new businesses are opening daily — and competition for local customers is intense.",
    keyIndustries: [
      "Sports & Entertainment",
      "Technology",
      "Real Estate Development",
      "Healthcare",
      "Corporate Headquarters",
      "Retail",
    ],
    nearbyCities: ["plano", "mckinney", "prosper", "allen", "celina"],
    seoTitle: "Marketing Agency Frisco TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Frisco's own digital marketing agency. NIXAR Solutions delivers AI-powered SEO, web development, and growth strategies for Frisco businesses. Based in Frisco, built for Frisco.",
  },
  {
    slug: "plano",
    name: "Plano",
    county: "Collin County",
    population: "290,000+",
    uniqueDescription:
      "Plano is the corporate headquarters capital of North Texas. Home to Toyota North America, Liberty Mutual, JPMorgan Chase, Frito-Lay, and JCPenney, Plano's Legacy West and Legacy Business Park form one of the densest corporate corridors in the country. The city consistently ranks among the best places to live in America, with top-rated schools, low crime rates, and a highly educated workforce. Plano's business landscape is uniquely competitive — with so many major corporations and their associated professional services firms concentrated in one area, local businesses need sophisticated digital marketing to capture attention. The city's diverse population (over 40% Asian and Hispanic residents) also demands culturally aware marketing strategies.",
    keyIndustries: [
      "Corporate Headquarters",
      "Financial Services",
      "Technology",
      "Healthcare",
      "Professional Services",
      "Retail",
    ],
    nearbyCities: ["frisco", "richardson", "allen", "mckinney", "dallas"],
    seoTitle: "Marketing Agency Plano TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Digital marketing agency for Plano, TX businesses. NIXAR Solutions provides SEO, web development, and growth strategies for Plano's competitive corporate landscape.",
  },
  {
    slug: "mckinney",
    name: "McKinney",
    county: "Collin County",
    population: "210,000+",
    uniqueDescription:
      "McKinney was named the #1 Best Place to Live in America by Money Magazine and continues to be one of the fastest-growing cities in the nation. The city's historic downtown square has become a destination for boutique shopping, dining, and arts — creating a unique small-town charm within a rapidly growing suburb. McKinney's growth corridor along US-75 and SH-121 is attracting major employers and residential developments. The city's unique character — blending historic Texas charm with modern suburban growth — requires marketing that understands both audiences. Local businesses here compete not just with each other but with the gravitational pull of nearby Plano, Frisco, and Dallas.",
    keyIndustries: [
      "Healthcare",
      "Education",
      "Real Estate Development",
      "Retail",
      "Professional Services",
      "Agriculture Technology",
    ],
    nearbyCities: ["frisco", "allen", "plano", "prosper", "celina"],
    seoTitle: "Marketing Agency McKinney TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Marketing agency serving McKinney, TX. NIXAR Solutions helps McKinney businesses grow with AI-powered SEO, web development, and digital marketing strategies.",
  },
  {
    slug: "prosper",
    name: "Prosper",
    county: "Collin County / Denton County",
    population: "35,000+",
    uniqueDescription:
      "Prosper is one of the wealthiest and fastest-growing suburbs in the Dallas-Fort Worth metroplex. With a median household income exceeding $150,000 and luxury master-planned communities like Windsong Ranch, Light Farms, and Star Trail, Prosper attracts affluent families and premium businesses. The town's rapid growth from 2,000 residents in 2000 to over 35,000 today has created enormous opportunity for businesses serving high-income demographics. Prosper's commercial corridors along US-380 and the Dallas North Tollway extension are developing rapidly, bringing new restaurants, retail, and professional services. Marketing in Prosper requires a premium approach — this audience expects quality and can tell the difference.",
    keyIndustries: [
      "Real Estate (Luxury)",
      "Healthcare",
      "Education",
      "Professional Services",
      "Premium Retail",
      "Home Services",
    ],
    nearbyCities: ["frisco", "celina", "mckinney"],
    seoTitle: "Marketing Agency Prosper TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Premium digital marketing for Prosper, TX businesses. NIXAR Solutions delivers sophisticated marketing strategies for Prosper's affluent and fast-growing market.",
  },
  {
    slug: "celina",
    name: "Celina",
    county: "Collin County / Denton County",
    population: "28,000+",
    uniqueDescription:
      "Celina is projected to be the fastest-growing city in Texas over the next decade, with plans to expand from 28,000 to over 300,000 residents. Massive master-planned developments like Light Farms North and Legacy Hills are transforming this once-quiet farming community into a major suburb. Celina's explosive growth represents a once-in-a-generation opportunity for businesses that establish themselves early. The city's commercial infrastructure is still developing, which means early movers in digital marketing gain an outsized advantage. Businesses that build strong online presence now will dominate Celina's market for years as the population catches up.",
    keyIndustries: [
      "Real Estate Development",
      "Construction",
      "Home Services",
      "Healthcare",
      "Education",
      "Retail",
    ],
    nearbyCities: ["prosper", "frisco", "mckinney"],
    seoTitle: "Marketing Agency Celina TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Digital marketing for Celina, TX — the fastest-growing city in Texas. NIXAR Solutions helps Celina businesses establish dominance in a rapidly expanding market.",
  },
  {
    slug: "allen",
    name: "Allen",
    county: "Collin County",
    population: "110,000+",
    uniqueDescription:
      "Allen is a thriving Collin County city known for its excellent schools, family-friendly communities, and the Allen Premium Outlets — one of the largest outlet shopping destinations in North Texas. The city's Watters Creek development has become a mixed-use destination combining retail, dining, and residential living. Allen's strategic position along US-75 between Dallas and McKinney makes it a key corridor for commuters and commerce. The city's strong community identity and high household incomes create an ideal market for local businesses that invest in quality digital marketing. Allen residents are digitally savvy and research businesses online before making purchasing decisions.",
    keyIndustries: [
      "Retail",
      "Healthcare",
      "Education",
      "Technology",
      "Professional Services",
      "Restaurant & Hospitality",
    ],
    nearbyCities: ["plano", "mckinney", "frisco", "richardson"],
    seoTitle: "Marketing Agency Allen TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Marketing agency serving Allen, TX. NIXAR Solutions provides SEO, web development, and digital growth strategies for Allen's thriving business community.",
  },
  {
    slug: "richardson",
    name: "Richardson",
    county: "Dallas County / Collin County",
    population: "120,000+",
    uniqueDescription:
      "Richardson is the technology and telecommunications heart of Dallas-Fort Worth. The Telecom Corridor — a stretch along US-75 — was once home to over 600 tech companies and remains a major employer despite industry consolidation. Texas Instruments, Blue Cross Blue Shield, and Fujitsu maintain significant operations here. UT Dallas anchors the city's innovation ecosystem, producing a steady pipeline of engineering and business talent. Richardson's CityLine development has revitalized the city center with mixed-use urban living. For tech companies and B2B service providers, Richardson's concentration of technical talent and corporate decision-makers makes it a prime market for sophisticated digital marketing.",
    keyIndustries: [
      "Technology",
      "Telecommunications",
      "Healthcare",
      "Education (UT Dallas)",
      "Financial Services",
      "Engineering",
    ],
    nearbyCities: ["plano", "dallas", "garland", "allen"],
    seoTitle: "Marketing Agency Richardson TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Digital marketing for Richardson's Telecom Corridor and tech community. NIXAR Solutions delivers SEO, web development, and B2B marketing strategies for Richardson businesses.",
  },
  {
    slug: "carrollton",
    name: "Carrollton",
    county: "Dallas County / Denton County / Collin County",
    population: "140,000+",
    uniqueDescription:
      "Carrollton sits at the intersection of three counties, giving it unique access to the broader DFW market. The city's diverse population — with significant Korean, Indian, and Vietnamese communities — has created vibrant cultural districts like Koreatown along Royal Lane and Old Denton Road. Carrollton's DART light rail stations connect it directly to downtown Dallas, making it attractive for businesses and commuters. The city's manufacturing and logistics sectors benefit from proximity to major highways (I-35E, the Bush Turnpike, and the President George Bush Turnpike). For businesses in Carrollton, multicultural marketing and multilingual SEO strategies can unlock customer segments that competitors ignore.",
    keyIndustries: [
      "Manufacturing",
      "Logistics",
      "Multicultural Retail",
      "Technology",
      "Healthcare",
      "Food & Beverage",
    ],
    nearbyCities: ["plano", "lewisville", "dallas", "richardson"],
    seoTitle: "Marketing Agency Carrollton TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Marketing agency for Carrollton, TX businesses. NIXAR Solutions delivers SEO, web development, and multicultural marketing strategies for Carrollton's diverse market.",
  },
  {
    slug: "denton",
    name: "Denton",
    county: "Denton County",
    population: "160,000+",
    uniqueDescription:
      "Denton is a vibrant college town home to both the University of North Texas and Texas Woman's University, with a combined student population of over 55,000. The city's historic downtown square is the cultural heart of Denton County, hosting live music venues, independent restaurants, and a thriving arts scene that has earned comparisons to Austin. Denton's unique blend of college-town energy and suburban growth creates a dual-market opportunity. Businesses can target both the young, tech-savvy student population and the growing families moving to new developments on the city's periphery. The college market is particularly responsive to social media and digital-first marketing strategies.",
    keyIndustries: [
      "Education",
      "Arts & Music",
      "Healthcare",
      "Technology",
      "Retail",
      "Food & Beverage",
    ],
    nearbyCities: ["lewisville", "flower-mound", "carrollton"],
    seoTitle: "Marketing Agency Denton TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Digital marketing agency for Denton, TX. NIXAR Solutions helps Denton businesses reach both the university community and growing suburban market with SEO, web, and social strategies.",
  },
  {
    slug: "lewisville",
    name: "Lewisville",
    county: "Denton County",
    population: "115,000+",
    uniqueDescription:
      "Lewisville occupies a strategic position in the DFW metroplex, centered around Lewisville Lake — one of the area's major recreational destinations — and anchored by Vista Ridge Mall and the Castle Hills development. The city's diverse economy spans manufacturing, retail, healthcare, and logistics, supported by excellent highway access (I-35E, SH-121) and proximity to DFW International Airport. Lewisville's Music City Mall area and Old Town Lewisville are undergoing revitalization, creating new opportunities for businesses. The city's relatively affordable commercial real estate compared to neighboring Flower Mound and Highland Village attracts entrepreneurs and small businesses that need cost-effective but powerful digital marketing to compete.",
    keyIndustries: [
      "Retail",
      "Manufacturing",
      "Healthcare",
      "Logistics",
      "Recreation & Tourism",
      "Professional Services",
    ],
    nearbyCities: ["flower-mound", "carrollton", "denton"],
    seoTitle: "Marketing Agency Lewisville TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Marketing agency for Lewisville, TX. NIXAR Solutions provides SEO, web development, and digital marketing for Lewisville businesses in this strategically located DFW city.",
  },
  {
    slug: "flower-mound",
    name: "Flower Mound",
    county: "Denton County",
    population: "80,000+",
    uniqueDescription:
      "Flower Mound is one of the most affluent suburbs in the Dallas-Fort Worth metroplex, known for its excellent schools, low crime rates, and carefully planned residential communities. Named after a prominent 12.5-acre mound of wildflowers, the town has maintained a commitment to preserving green spaces while accommodating growth. Flower Mound's proximity to DFW Airport and Grapevine Lake, combined with top-rated Lewisville ISD schools, makes it a magnet for families with high household incomes. The River Walk at Central Park and Lakeside Business District have added mixed-use commercial space. Businesses serving Flower Mound's affluent families need polished, professional digital marketing that matches the community's expectations.",
    keyIndustries: [
      "Healthcare",
      "Professional Services",
      "Real Estate",
      "Education",
      "Premium Retail",
      "Home Services",
    ],
    nearbyCities: ["lewisville", "grapevine", "southlake"],
    seoTitle: "Marketing Agency Flower Mound TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Premium digital marketing for Flower Mound, TX. NIXAR Solutions delivers polished SEO, web development, and marketing strategies for Flower Mound's affluent community.",
  },
  {
    slug: "southlake",
    name: "Southlake",
    county: "Tarrant County / Denton County",
    population: "32,000+",
    uniqueDescription:
      "Southlake is the premier luxury suburb of Dallas-Fort Worth, with a median household income exceeding $235,000 — among the highest in Texas. Southlake Town Square is the crown jewel, a nationally recognized mixed-use development that blends high-end retail, fine dining, and community events. Carroll ISD is consistently ranked among the best school districts in the state. Southlake attracts executives, entrepreneurs, and professionals who demand excellence in every service they use. The business landscape here skews toward premium services — luxury real estate, wealth management, high-end home services, and specialty retail. Marketing in Southlake requires sophistication, quality, and an understanding that this audience values exclusivity and expertise.",
    keyIndustries: [
      "Luxury Real Estate",
      "Wealth Management",
      "Premium Retail",
      "Healthcare",
      "Professional Services",
      "Fine Dining",
    ],
    nearbyCities: ["grapevine", "flower-mound", "fort-worth"],
    seoTitle: "Marketing Agency Southlake TX | Premium Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Luxury digital marketing for Southlake, TX. NIXAR Solutions delivers premium SEO, web development, and brand strategies for Southlake's high-net-worth market.",
  },
  {
    slug: "grapevine",
    name: "Grapevine",
    county: "Tarrant County",
    population: "55,000+",
    uniqueDescription:
      "Grapevine is the 'Christmas Capital of Texas' and a major tourism destination anchored by Grapevine Mills Mall, the Gaylord Texan Resort, and historic Main Street. The city benefits enormously from its position between Dallas and Fort Worth, immediately adjacent to DFW International Airport. Grapevine Lake draws millions of visitors annually for boating, hiking, and outdoor recreation. The city's tourism-driven economy creates unique marketing opportunities — businesses here serve both local residents and the millions of annual visitors. With the Great Wolf Lodge, LEGOLAND Discovery Center, and SEA LIFE Aquarium, Grapevine's entertainment corridor demands digital marketing that captures both local and tourist search intent.",
    keyIndustries: [
      "Tourism & Hospitality",
      "Entertainment",
      "Retail",
      "Wine & Dining",
      "Aviation (DFW Airport)",
      "Real Estate",
    ],
    nearbyCities: ["southlake", "flower-mound", "irving"],
    seoTitle: "Marketing Agency Grapevine TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Digital marketing for Grapevine, TX — the Christmas Capital of Texas. NIXAR Solutions helps Grapevine businesses capture both local and tourism-driven search traffic.",
  },
  {
    slug: "arlington",
    name: "Arlington",
    county: "Tarrant County",
    population: "395,000+",
    uniqueDescription:
      "Arlington is the largest city in the U.S. without a public transit system and the 49th largest city in the country. Home to AT&T Stadium (Dallas Cowboys), Globe Life Field (Texas Rangers), and Six Flags Over Texas, Arlington is the entertainment capital of North Texas. UT Arlington's 44,000+ student body adds a youthful, diverse demographic. The city's entertainment district draws over 14 million visitors annually. Arlington's unique challenge: it sits between Dallas and Fort Worth, competing with both for business and talent. The absence of public transit makes digital marketing even more critical — Arlington businesses need to be findable online because customers won't stumble upon them in transit.",
    keyIndustries: [
      "Entertainment & Sports",
      "Education (UT Arlington)",
      "Manufacturing",
      "Healthcare",
      "Automotive",
      "Hospitality",
    ],
    nearbyCities: ["fort-worth", "dallas", "grand-prairie", "irving"],
    seoTitle: "Marketing Agency Arlington TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Digital marketing agency for Arlington, TX. NIXAR Solutions provides SEO, web development, and growth strategies for Arlington's entertainment-driven economy.",
  },
  {
    slug: "fort-worth",
    name: "Fort Worth",
    county: "Tarrant County",
    population: "960,000+",
    uniqueDescription:
      "Fort Worth is the 13th largest city in America and the fastest-growing large city in the U.S. Often overshadowed by Dallas in the marketing world, Fort Worth has forged its own distinct identity — blending Western heritage with modern innovation. The Stockyards National Historic District preserves authentic cowboy culture, while the Near Southside and West 7th districts pulse with independent restaurants, breweries, and creative businesses. Fort Worth's Cultural District houses world-class museums including the Kimbell Art Museum, Modern Art Museum, and Amon Carter Museum. Major employers include Lockheed Martin, American Airlines, BNSF Railway, and Bell Textron. Fort Worth businesses benefit from slightly lower competition in digital marketing compared to Dallas, creating an opportunity for savvy companies to capture market share.",
    keyIndustries: [
      "Aerospace & Defense",
      "Transportation",
      "Oil & Gas",
      "Healthcare",
      "Culture & Tourism",
      "Technology",
    ],
    nearbyCities: ["arlington", "southlake", "grapevine", "grand-prairie"],
    seoTitle: "Marketing Agency Fort Worth TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Fort Worth's digital marketing partner. NIXAR Solutions delivers AI-powered SEO, web development, and growth strategies for Fort Worth businesses. 500+ projects. 97%+ satisfaction.",
  },
  {
    slug: "garland",
    name: "Garland",
    county: "Dallas County",
    population: "245,000+",
    uniqueDescription:
      "Garland is a diverse, working-class city northeast of Dallas with a strong manufacturing base and a rapidly evolving identity. The city's revitalized downtown square and the Firewheel Town Center development signal a shift toward mixed-use, walkable urbanism. Garland's diverse population — with significant Hispanic and Vietnamese communities — creates a multilingual business environment where culturally aware marketing has a major impact. The city's DART light rail connection to downtown Dallas and its affordable commercial real estate make it attractive for businesses priced out of Plano or Richardson. Garland businesses that invest in strong digital marketing can capture a large, underserved market that competitors overlook in favor of flashier suburbs.",
    keyIndustries: [
      "Manufacturing",
      "Distribution",
      "Healthcare",
      "Retail",
      "Food & Beverage",
      "Automotive Services",
    ],
    nearbyCities: ["richardson", "plano", "dallas", "mesquite"],
    seoTitle: "Marketing Agency Garland TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Digital marketing for Garland, TX businesses. NIXAR Solutions provides SEO, web development, and multicultural marketing strategies for Garland's diverse market.",
  },
  {
    slug: "mesquite",
    name: "Mesquite",
    county: "Dallas County",
    population: "150,000+",
    uniqueDescription:
      "Mesquite — the 'Rodeo Capital of Texas' — is known for the Mesquite Championship Rodeo and a strong sense of community identity. The city has invested heavily in revitalization, with the Mesquite Metro Airport area attracting logistics and light industrial businesses, and Town East Mall serving as a regional retail destination. Mesquite's affordable cost of living and proximity to downtown Dallas (just 15 minutes east on I-30) make it a practical choice for families and businesses. The city's growing Hispanic population (over 40%) represents a significant market segment that responds well to culturally relevant digital marketing. Local businesses that develop a strong online presence can dominate Mesquite's relatively less competitive digital landscape.",
    keyIndustries: [
      "Retail",
      "Logistics",
      "Healthcare",
      "Rodeo & Western Culture",
      "Manufacturing",
      "Automotive",
    ],
    nearbyCities: ["garland", "dallas"],
    seoTitle: "Marketing Agency Mesquite TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Marketing agency for Mesquite, TX. NIXAR Solutions delivers SEO, web development, and culturally relevant digital marketing for the Rodeo Capital of Texas.",
  },
  {
    slug: "irving",
    name: "Irving",
    county: "Dallas County",
    population: "260,000+",
    uniqueDescription:
      "Irving is a major commercial hub home to the Las Colinas urban center — one of the first and largest mixed-use developments in the country. With ExxonMobil (before its recent relocation), Kimberly-Clark, Celanese, and Fluor Corporation, Irving has long attracted Fortune 500 headquarters. The city's proximity to both DFW Airport and Dallas Love Field makes it a natural base for companies with national and international operations. Irving's Music Factory and Toyota Music Factory have added entertainment value to the business corridor. The city's commercial density means businesses face stiff competition — effective digital marketing and SEO are essential for visibility in Irving's corporate-heavy market.",
    keyIndustries: [
      "Corporate Headquarters",
      "Aviation & Travel",
      "Technology",
      "Healthcare",
      "Entertainment",
      "Logistics",
    ],
    nearbyCities: ["dallas", "grapevine", "arlington", "grand-prairie"],
    seoTitle: "Marketing Agency Irving TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Digital marketing agency for Irving and Las Colinas businesses. NIXAR Solutions provides SEO, web development, and corporate marketing strategies for Irving's competitive market.",
  },
  {
    slug: "grand-prairie",
    name: "Grand Prairie",
    county: "Dallas County / Tarrant County / Ellis County",
    population: "200,000+",
    uniqueDescription:
      "Grand Prairie sits at the geographic center of the DFW metroplex, straddling three counties and positioned between Dallas, Fort Worth, and Arlington. The city's entertainment corridor includes Lone Star Park horse racing, Traders Village flea market, and Epic Waters Indoor Waterpark. Grand Prairie's diverse economy spans manufacturing, logistics, and retail, with major employers including Lockheed Martin and Poly-America. Joe Pool Lake on the city's southern border adds recreational value. Grand Prairie's central location and diverse population (over 45% Hispanic) make it a gateway market — businesses that establish digital dominance here effectively reach customers from across the entire metroplex.",
    keyIndustries: [
      "Manufacturing",
      "Logistics & Distribution",
      "Entertainment",
      "Healthcare",
      "Retail",
      "Aerospace",
    ],
    nearbyCities: ["arlington", "irving", "dallas", "fort-worth"],
    seoTitle: "Marketing Agency Grand Prairie TX | Digital Marketing | NIXAR Solutions",
    seoDescription:
      "Marketing agency for Grand Prairie, TX. NIXAR Solutions delivers SEO, web development, and digital marketing for Grand Prairie's centrally located, diverse business community.",
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getCitySlugs(): string[] {
  return cities.map((c) => c.slug);
}

export function getNearbyCities(slug: string): City[] {
  const city = getCityBySlug(slug);
  if (!city) return [];
  return city.nearbyCities
    .map((s) => getCityBySlug(s))
    .filter((c): c is City => c !== undefined);
}
