// Neo4j Schema for Smart Travel Planner - นครราชสีมา Province
// Run this in Neo4j Browser or via cypher-shell

// ============================================
// DROP EXISTING (for fresh install)
// ============================================
MATCH (n) DETACH DELETE n;

// ============================================
// CREATE CONSTRAINTS
// ============================================
CREATE CONSTRAINT attraction_id IF NOT EXISTS FOR (a:Attraction) REQUIRE a.id IS UNIQUE;
CREATE CONSTRAINT accommodation_id IF NOT EXISTS FOR (a:Accommodation) REQUIRE a.id IS UNIQUE;
CREATE CONSTRAINT restaurant_id IF NOT EXISTS FOR (r:Restaurant) REQUIRE r.id IS UNIQUE;
CREATE CONSTRAINT province_name IF NOT EXISTS FOR (p:Province) REQUIRE p.name IS UNIQUE;

// ============================================
// CREATE NODES - Province
// ============================================
CREATE (p:Province {
    id: 'nakhon-ratchasima',
    name: 'นครราชสีมา',
    name_en: 'Nakhon Ratchasima',
    region: 'อีสาน',
    lat: 14.9700,
    lng: 102.1000
});

// ============================================
// CREATE NODES - Attractions
// ============================================

// Nature - เขาใหญ่
CREATE (a:Attraction {
    id: 'khao-yai-national-park',
    name: 'Khao Yai National Park',
    name_th: 'อุทยานแห่งชาติเขาใหญ่',
    category: 'nature',
    description: 'อุทยานแห่งชาติลำดับที่ 3 ของไทย มรดกโลกทางธรรมชาติ UNESCO',
    opening_hours: '06:00-18:00',
    entry_fee: 400,
    duration_minutes: 360,
    lat: 14.4397,
    lng: 101.3716,
    community_owned: false
});

CREATE (a:Attraction {
    id: 'haew-narok-waterfall',
    name: 'Haew Narok Waterfall',
    name_th: 'น้ำตกห้วยนราก',
    category: 'nature',
    description: 'น้ำตกขนาดใหญ่ที่สุดในเขาใหญ่ สูงกว่า 80 เมตร',
    opening_hours: '06:00-17:30',
    entry_fee: 400,
    duration_minutes: 180,
    lat: 14.2947,
    lng: 101.4172,
    community_owned: true
});

CREATE (a:Attraction {
    id: 'haew-suwat-waterfall',
    name: 'Haew Suwat Waterfall',
    name_th: 'น้ำตกห้วยสุวรรณ',
    category: 'nature',
    description: 'น้ำตกห้วยสุวรรณที่โด่งดังจากภาพยนตร์ The Beach',
    opening_hours: '06:00-18:00',
    entry_fee: 400,
    duration_minutes: 150,
    lat: 14.3817,
    lng: 101.3850,
    community_owned: true
});

// Culture - วัดและพิพิธภัณฑ์
CREATE (a:Attraction {
    id: 'wat-phra-yai-khao-yai',
    name: 'Wat Phra Yai',
    name_th: 'วัดไผ่พระพุทธรูปยืน',
    category: 'culture',
    description: 'พระพุทธรูปยืนองค์ใหญ่ที่สุดในประเทศไทย สูงกว่า 50 เมตร',
    opening_hours: '07:00-18:00',
    entry_fee: 0,
    duration_minutes: 90,
    lat: 14.4380,
    lng: 101.3800,
    community_owned: true
});

CREATE (a:Attraction {
    id: 'korat-zoo',
    name: 'Sakaew Nakhonratchasima Zoo',
    name_th: 'สวนสัตว์นครราชสีมา',
    category: 'culture',
    description: 'สวนสัตว์ขนาดใหญ่ที่มีสัตว์หลากหลายสายพันธุ์',
    opening_hours: '08:00-18:00',
    entry_fee: 150,
    duration_minutes: 240,
    lat: 14.9200,
    lng: 102.0500,
    community_owned: false
});

CREATE (a:Attraction {
    id: 'wat-nong-wang',
    name: 'Wat Nong Wang',
    name_th: 'วัดหนองหงส์',
    category: 'culture',
    description: 'วัดที่มีพระเจดีย์ 9 ยอด สูง 127 เมตร',
    opening_hours: '06:00-20:00',
    entry_fee: 0,
    duration_minutes: 120,
    lat: 14.9700,
    lng: 102.1000,
    community_owned: true
});

CREATE (a:Attraction {
    id: 'chiangkan-valley',
    name: 'Chiangkan Valley',
    name_th: 'หุบเขาชี้เชียงคาน',
    category: 'nature',
    description: 'หุบเขาสวยงาม อากาศเย็นสบายตลอดปี',
    opening_hours: '06:00-18:00',
    entry_fee: 0,
    duration_minutes: 180,
    lat: 15.1300,
    lng: 101.6200,
    community_owned: true
});

CREATE (a:Attraction {
    id: 'khao-lampang',
    name: 'Khao Lampathan',
    name_th: 'เขาลำภารา',
    category: 'nature',
    description: 'จุดชมวิวพระอาทิตย์ขึ้นที่สวยที่สุดในเขตอีสาน',
    opening_hours: '04:00-10:00',
    entry_fee: 0,
    duration_minutes: 240,
    lat: 15.0500,
    lng: 101.7500,
    community_owned: true
});

// ============================================
// CREATE NODES - Accommodations
// ============================================

CREATE (a:Accommodation {
    id: 'novotel-khao-yai',
    name: 'Novotel Khao Yai Resort',
    name_th: 'โนโวเทล เขาใหญ่',
    type: 'resort',
    price_per_night: 4500,
    rating: 4.5,
    lat: 14.4400,
    lng: 101.3750,
    amenities: ['wifi', 'parking', 'pool', 'restaurant', 'spa'],
    community_owned: false
});

CREATE (a:Accommodation {
    id: 'khao-yai-homestay',
    name: 'Khao Yai Green Home',
    name_th: 'บ้านเขาใหญ่กรีนโฮม',
    type: 'homestay',
    price_per_night: 1200,
    rating: 4.6,
    lat: 14.4250,
    lng: 101.3650,
    amenities: ['wifi', 'parking', 'ac'],
    community_owned: true
});

CREATE (a:Accommodation {
    id: 'the-patio-korat',
    name: 'The Patio Hotel Korat',
    name_th: 'เดอะ พาเทียโอ โฮเต็ล โคราช',
    type: 'hotel',
    price_per_night: 1800,
    rating: 4.3,
    lat: 14.9700,
    lng: 102.0800,
    amenities: ['wifi', 'parking', 'pool', 'fitness'],
    community_owned: false
});

CREATE (a:Accommodation {
    id: 'rice-homestay-pakchong',
    name: 'Rice Field Homestay Pakchong',
    name_th: 'ไร่ข้าว โฮมสเตย์ ปากช่อง',
    type: 'homestay',
    price_per_night: 700,
    rating: 4.7,
    lat: 14.9800,
    lng: 101.6900,
    amenities: ['wifi', 'parking', 'breakfast'],
    community_owned: true
});

CREATE (a:Accommodation {
    id: 'hostel-korat',
    name: 'Korat Backpacker Hostel',
    name_th: 'โคราช แบ็คแพ็คเกอร์ โฮสเทล',
    type: 'hostel',
    price_per_night: 350,
    rating: 4.0,
    lat: 14.9750,
    lng: 102.0750,
    amenities: ['wifi', 'ac', 'shared-bath'],
    community_owned: true
});

// ============================================
// CREATE NODES - Restaurants
// ============================================

CREATE (r:Restaurant {
    id: 'khao-mankai-pakchong',
    name: 'ข้าวมันไก่ปากช่อง',
    cuisine: 'thai',
    average_cost: 60,
    rating: 4.6,
    lat: 14.9750,
    lng: 101.6850,
    dietary_options: [],
    community_owned: true
});

CREATE (r:Restaurant {
    id: 'somtam-pakchong',
    name: 'ส้มตำปากช่อง',
    cuisine: 'thai',
    average_cost: 120,
    rating: 4.5,
    lat: 14.9780,
    lng: 101.6820,
    dietary_options: ['vegetarian'],
    community_owned: true
});

CREATE (r:Restaurant {
    id: 'khao-soi-chiangkan',
    name: 'ข้าวซอยเชียงคาน',
    cuisine: 'thai',
    average_cost: 80,
    rating: 4.7,
    lat: 15.1200,
    lng: 101.6250,
    dietary_options: [],
    community_owned: true
});

CREATE (r:Restaurant {
    id: 'ran-thip-korat',
    name: 'ร้านทิพย์ เสาเขาวง',
    cuisine: 'thai',
    average_cost: 150,
    rating: 4.5,
    lat: 14.9550,
    lng: 102.0900,
    dietary_options: ['vegetarian'],
    community_owned: true
});

CREATE (r:Restaurant {
    id: 'halal-korat',
    name: 'Muslim Food Korat',
    cuisine: 'halal',
    average_cost: 100,
    rating: 4.3,
    lat: 14.9650,
    lng: 102.0700,
    dietary_options: ['halal'],
    community_owned: true
});

// ============================================
// CREATE RELATIONSHIPS
// ============================================

// Province -> Attractions
MATCH (p:Province {id: 'nakhon-ratchasima'})
MATCH (a:Attraction)
WHERE a.id IN ['khao-yai-national-park', 'haew-narok-waterfall', 'haew-suwat-waterfall', 
               'wat-phra-yai-khao-yai', 'korat-zoo', 'wat-nong-wang', 'chiangkan-valley', 'khao-lampang']
CREATE (p)-[:HAS_ATTRACTION]->(a);

// Province -> Accommodations
MATCH (p:Province {id: 'nakhon-ratchasima'})
MATCH (a:Accommodation)
WHERE a.id IN ['novotel-khao-yai', 'khao-yai-homestay', 'the-patio-korat', 'rice-homestay-pakchong', 'hostel-korat']
CREATE (p)-[:HAS_ACCOMMODATION]->(a);

// Province -> Restaurants
MATCH (p:Province {id: 'nakhon-ratchasima'})
MATCH (r:Restaurant)
WHERE r.id IN ['khao-mankai-pakchong', 'somtam-pakchong', 'khao-soi-chiangkan', 'ran-thip-korat', 'halal-korat']
CREATE (p)-[:HAS_RESTAURANT]->(r);

// Attractions nearby each other
MATCH (a1:Attraction {id: 'khao-yai-national-park'})
MATCH (a2:Attraction {id: 'haew-narok-waterfall'})
CREATE (a1)-[:NEARBY {distance_km: 5}]->(a2);

MATCH (a1:Attraction {id: 'haew-narok-waterfall'})
MATCH (a2:Attraction {id: 'haew-suwat-waterfall'})
CREATE (a1)-[:NEARBY {distance_km: 8}]->(a2);

// Attractions in categories
MATCH (a:Attraction)
WHERE a.category = 'nature'
CREATE (a)-[:IN_CATEGORY]->(:Category {name: 'nature', name_th: 'ธรรมชาติ'});

MATCH (a:Attraction)
WHERE a.category = 'culture'
CREATE (a)-[:IN_CATEGORY]->(:Category {name: 'culture', name_th: 'วัฒนธรรม'});

// Accommodations in area zones
MATCH (a:Accommodation)
WHERE a.id IN ['novotel-khao-yai', 'khao-yai-homestay']
CREATE (a)-[:IN_ZONE]->(:Zone {name: 'khao-yai', name_th: 'เขาใหญ่'});

MATCH (a:Accommodation)
WHERE a.id IN ['the-patio-korat', 'hostel-korat', 'rice-homestay-pakchong']
CREATE (a)-[:IN_ZONE]->(:Zone {name: 'korat-city', name_th: 'ตัวเมืองโคราช'});

// ============================================
// INDEXES FOR PERFORMANCE
// ============================================
CREATE INDEX attraction_category IF NOT EXISTS FOR (a:Attraction) ON (a.category);
CREATE INDEX attraction_entry_fee IF NOT EXISTS FOR (a:Attraction) ON (a.entry_fee);
CREATE INDEX accommodation_type IF NOT EXISTS FOR (a:Accommodation) ON (a.type);
CREATE INDEX accommodation_price IF NOT EXISTS FOR (a:Accommodation) ON (a.price_per_night);
CREATE INDEX restaurant_cuisine IF NOT EXISTS FOR (r:Restaurant) ON (r.cuisine);

// ============================================
// VERIFICATION QUERIES
// ============================================
// Count all nodes
MATCH (n) RETURN labels(n)[0] as type, count(n) as count ORDER BY count DESC;

// Get sample attractions by category
MATCH (a:Attraction)-[:IN_CATEGORY]->(c:Category)
RETURN c.name, collect(a.name_th) as attractions LIMIT 10;

PRINT '✅ Neo4j Schema for นครราชสีมา created successfully!';
