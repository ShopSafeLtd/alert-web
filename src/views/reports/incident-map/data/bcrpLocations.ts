export interface BCRPLocation {
  address: string;
  id: string;
  initiative: string;
  latitude: null | number;
  longitude: null | number;
  postcode: string;
}

export const bcrpLocations: BCRPLocation[] = [
  {
    address:
      'Arun District Council, Civic Centre, Maltravers Road, Littlehampton, BN17 5LF',
    id: 'bcrp-001',
    initiative: 'Arun BCRP',
    latitude: 50.808_188,
    longitude: -0.538_495,
    postcode: 'BN17 5LF',
  },
  {
    address:
      'Ashford Borough Council, Civic Centre, Tannery Lane, Ashford, TN23 1PL',
    id: 'bcrp-002',
    initiative: 'Ashford Partners Against Crime (APAC)',
    latitude: 51.146_502,
    longitude: 0.878_747,
    postcode: 'TN23 1PL',
  },
  {
    address:
      'Buckinghamshire Council, The Gateway, Gatehouse Road, Aylesbury, HP19 8FF',
    id: 'bcrp-003',
    initiative: 'Aylesbury Business Against Crime',
    latitude: 51.822_371,
    longitude: -0.826_386,
    postcode: 'HP19 8FF',
  },
  {
    address:
      'Basingstoke and Deane Borough Council, Civic Offices, London Road, Basingstoke, RG21 4AH',
    id: 'bcrp-004',
    initiative: 'Basingstoke Town Centre Partnership',
    latitude: 51.261_943,
    longitude: -1.083_746,
    postcode: 'RG21 4AH',
  },
  {
    address:
      'Bath and North East Somerset Council, Guildhall, High Street, Bath, BA1 5AW',
    id: 'bcrp-005',
    initiative: 'Bath BID BCRP',
    latitude: 51.382_046,
    longitude: -2.358_804,
    postcode: 'BA1 5AW',
  },
  {
    address:
      'Birmingham City Council, Council House, Victoria Square, Birmingham, B1 1BB',
    id: 'bcrp-006',
    initiative: 'Birmingham - Central BID BCRP',
    latitude: 52.480_432,
    longitude: -1.903_449,
    postcode: 'B1 1BB',
  },
  {
    address: 'Bluewater Shopping Centre, Greenhithe, DA9 9ST',
    id: 'bcrp-007',
    initiative: 'Bluewater BBAC',
    latitude: 51.439_425,
    longitude: 0.272_881,
    postcode: 'DA9 9ST',
  },
  {
    address:
      'Bournemouth, Christchurch and Poole Council, Town Hall, Bourne Avenue, Bournemouth, BH2 6DY',
    id: 'bcrp-008',
    initiative: 'Bournemouth Businesses Reducing Crime',
    latitude: 50.722_432,
    longitude: -1.882_004,
    postcode: 'BH2 6DY',
  },
  {
    address:
      'Bradford City Council, City Hall, Centenary Square, Bradford, BD1 1HY',
    id: 'bcrp-009',
    initiative: 'Bradford',
    latitude: 53.792_327,
    longitude: -1.753_296,
    postcode: 'BD1 1HY',
  },
  {
    address:
      'Bridgend County Borough Council, Civic Offices, Angel Street, Bridgend, CF31 4WB',
    id: 'bcrp-010',
    initiative: 'Bridgend Business Against Crime',
    latitude: 51.505_807,
    longitude: -3.580_425,
    postcode: 'CF31 4WB',
  },
  {
    address:
      'Brighton and Hove City Council, Hove Town Hall, Norton Road, Hove, BN3 3BQ',
    id: 'bcrp-011',
    initiative: 'Brighton Crime Reduction Partnership',
    latitude: 50.828_755,
    longitude: -0.170_33,
    postcode: 'BN3 3BQ',
  },
  {
    address: 'Bristol City Council, City Hall, College Green, Bristol, BS1 5TR',
    id: 'bcrp-012',
    initiative: 'Bristol City Centre BCRP',
    latitude: 51.452_605,
    longitude: -2.602_07,
    postcode: 'BS1 5TR',
  },
  {
    address:
      'London Borough of Bromley, Civic Centre, Stockwell Close, Bromley, BR1 3UH',
    id: 'bcrp-013',
    initiative: 'Bromley BCRP (Your Bromley BID)',
    latitude: 51.403_879,
    longitude: 0.020_403,
    postcode: 'BR1 3UH',
  },
  {
    address:
      'Burnley Borough Council, Town Hall, Manchester Road, Burnley, BB11 9SA',
    id: 'bcrp-014',
    initiative: 'Burnley BID',
    latitude: 53.787_602,
    longitude: -2.244_649,
    postcode: 'BB11 9SA',
  },
  {
    address:
      'Cambridge City Council, Mandela House, 4 Regent Street, Cambridge, CB2 1BY',
    id: 'bcrp-015',
    initiative: 'Cambridge Against Business Crime (CAMBAC)',
    latitude: 52.202_122,
    longitude: 0.124_304,
    postcode: 'CB2 1BY',
  },
  {
    address:
      'Contact Canary Wharf Management, One Canada Square, London, E14 5AB',
    id: 'bcrp-016',
    initiative: 'Canary Wharf',
    latitude: 51.504_938,
    longitude: -0.019_496,
    postcode: 'E14 5AB',
  },
  {
    address: 'Canterbury City Council, Military Road, Canterbury, CT1 1YW',
    id: 'bcrp-017',
    initiative: 'Canterbury District Watch Ltd',
    latitude: 51.283_621,
    longitude: 1.093_204,
    postcode: 'CT1 1YW',
  },
  {
    address: 'Cardiff Council, County Hall, Atlantic Wharf, Cardiff, CF10 4UW',
    id: 'bcrp-018',
    initiative: 'Cardiff Against Business Crime',
    latitude: 51.469_63,
    longitude: -3.163_208,
    postcode: 'CF10 4UW',
  },
  {
    address: 'Bolton Council, Town Hall, Victoria Square, Bolton, BL1 1RU',
    id: 'bcrp-019',
    initiative: 'Central Bolton Partnership',
    latitude: 53.578_247,
    longitude: -2.430_772,
    postcode: 'BL1 1RU',
  },
  {
    address:
      'Cherwell District Council, Bodicote House, Ascot Close, Banbury, OX15 4AA',
    id: 'bcrp-020',
    initiative: 'Cherwell Crime Partnership (Banbury and Bicester)',
    latitude: null, // Missing coordinates
    longitude: null,
    postcode: 'OX15 4AA',
  },
  {
    address:
      'Cheshire West and Chester Council, The Portal, Wellington Road, Ellesmere Port, CH65 0BA',
    id: 'bcrp-021',
    initiative: 'Cheshire West and North Wales BCRP',
    latitude: 53.276_669,
    longitude: -2.901_121,
    postcode: 'CH65 0BA',
  },
  {
    address:
      'Chichester District Council, East Pallant House, East Pallant, Chichester, PO19 1TY',
    id: 'bcrp-022',
    initiative: 'Chichester ChiBac',
    latitude: 50.834_671,
    longitude: -0.776_862,
    postcode: 'PO19 1TY',
  },
  {
    address:
      'Colchester City Council, Rowan House, 33 Sheepen Road, Colchester, CO3 3WG',
    id: 'bcrp-023',
    initiative: 'Colchester COLBAC',
    latitude: 51.892_573,
    longitude: 0.8927,
    postcode: 'CO3 3WG',
  },
  {
    address:
      'Coventry City Council, Council House, Earl Street, Coventry, CV1 5RR',
    id: 'bcrp-024',
    initiative: 'Coventry BID',
    latitude: 52.407_106,
    longitude: -1.507_605,
    postcode: 'CV1 5RR',
  },
  {
    address:
      'Crawley Borough Council, Town Hall, The Boulevard, Crawley, RH10 1UZ',
    id: 'bcrp-025',
    initiative: 'Crawley and Gatwick Business Watch',
    latitude: 51.116_795,
    longitude: -0.183_823,
    postcode: 'RH10 1UZ',
  },
  {
    address:
      'London Borough of Croydon, Bernard Weatherill House, 8 Mint Walk, Croydon, CR0 1EA',
    id: 'bcrp-026',
    initiative: 'Croydon Business Crime Partnership',
    latitude: 51.371_477,
    longitude: -0.098_825,
    postcode: 'CR0 1EA',
  },
  {
    address: 'Cumberland Council, Civic Centre, Carlisle, CA3 8QG',
    id: 'bcrp-027',
    initiative: 'Cumbria Safer Business Partnership',
    latitude: 54.897_52,
    longitude: -2.934_648,
    postcode: 'CA3 8QG',
  },
  {
    address:
      'Dartford Borough Council, Civic Centre, Home Gardens, Dartford, DA1 1DR',
    id: 'bcrp-028',
    initiative: 'Dartford',
    latitude: 51.446_659,
    longitude: 0.219_284,
    postcode: 'DA1 1DR',
  },
  {
    address: 'Derbyshire County Council, County Hall, Matlock, DE4 3AG',
    id: 'bcrp-029',
    initiative: 'Derbyshire BCRP',
    latitude: 53.142_36,
    longitude: -1.551_393,
    postcode: 'DE4 3AG',
  },
  {
    address: 'Doncaster Council, Civic Office, Waterdale, Doncaster, DN1 3BU',
    id: 'bcrp-030',
    initiative: 'Doncaster',
    latitude: 53.519_702,
    longitude: -1.131_949,
    postcode: 'DN1 3BU',
  },
  {
    address:
      'Dover District Council, White Cliffs Business Park, Dover, CT16 3PJ',
    id: 'bcrp-031',
    initiative: 'Dover Partnership Against Crime',
    latitude: 51.154_373,
    longitude: 1.294_816,
    postcode: 'CT16 3PJ',
  },
  {
    address: 'Eastbourne Borough Council, 1 Grove Road, Eastbourne, BN21 4TW',
    id: 'bcrp-032',
    initiative: 'Eastbourne Business Crime Group',
    latitude: 50.768_365,
    longitude: 0.279_355,
    postcode: 'BN21 4TW',
  },
  {
    address:
      'Eastleigh Borough Council, Eastleigh House, Upper Market Street, Eastleigh, SO50 9YN',
    id: 'bcrp-033',
    initiative: 'Eastleigh BID',
    latitude: 50.970_838,
    longitude: -1.351_205,
    postcode: 'SO50 9YN',
  },
  {
    address:
      'Epsom & Ewell Borough Council, Town Hall, The Parade, Epsom, KT18 5BY',
    id: 'bcrp-034',
    initiative: 'Epsom BID',
    latitude: 51.332_788,
    longitude: -0.264_995,
    postcode: 'KT18 5BY',
  },
  {
    address: 'Exeter City Council, Civic Centre, Paris Street, Exeter, EX1 1JN',
    id: 'bcrp-035',
    initiative: 'Exeter Business Against Crime (EBAC)',
    latitude: 50.724_762,
    longitude: -3.524_465,
    postcode: 'EX1 1JN',
  },
  {
    address:
      'Folkestone & Hythe District Council, Civic Centre, Castle Hill Avenue, Folkestone, CT20 2QY',
    id: 'bcrp-036',
    initiative: 'Folkestone Area PAC',
    latitude: 51.079_536,
    longitude: 1.169_785,
    postcode: 'CT20 2QY',
  },
  {
    address:
      'Gloucester City Council, Herbert Warehouse, The Docks, Gloucester, GL1 2EQ',
    id: 'bcrp-037',
    initiative: 'Gloucester City Safe',
    latitude: 51.863_703,
    longitude: -2.251_24,
    postcode: 'GL1 2EQ',
  },
  {
    address:
      'Gravesham Borough Council, Civic Centre, Windmill Street, Gravesend, DA12 1AU',
    id: 'bcrp-038',
    initiative: 'Gravesham G Safe',
    latitude: 51.440_032,
    longitude: 0.368_547,
    postcode: 'DA12 1AU',
  },
  {
    address:
      'Great Yarmouth Borough Council, Town Hall, Hall Plain, Great Yarmouth, NR30 2QF',
    id: 'bcrp-039',
    initiative: 'Great Yarmouth BID',
    latitude: 52.605_982,
    longitude: 1.725_052,
    postcode: 'NR30 2QF',
  },
  {
    address:
      'North East Lincolnshire Council, Municipal Offices, Town Hall Square, Grimsby, DN31 1HU',
    id: 'bcrp-040',
    initiative: 'Grimsby',
    latitude: 53.565_304,
    longitude: -0.081_453,
    postcode: 'DN31 1HU',
  },
  {
    address:
      'Guildford Borough Council, Millmead House, Millmead, Guildford, GU2 4BB',
    id: 'bcrp-041',
    initiative: 'Guildford BCRP',
    latitude: 51.232_272,
    longitude: -0.576_065,
    postcode: 'GU2 4BB',
  },
  {
    address: 'North Yorkshire Council, Crescent Gardens, Harrogate, HG1 2SG',
    id: 'bcrp-042',
    initiative: 'Harrogate District Businesses Against Crime',
    latitude: null, // Missing coordinates
    longitude: null,
    postcode: 'HG1 2SG',
  },
  {
    address:
      'London Borough of Harrow, Civic Centre, Station Road, Harrow, HA1 2XY',
    id: 'bcrp-043',
    initiative: 'Harrow Town Centre BID',
    latitude: 51.590_362,
    longitude: -0.335_192,
    postcode: 'HA1 2XY',
  },
  {
    address:
      'Hastings Borough Council, Muriel Matters House, Breeds Place, Hastings, TN34 3UY',
    id: 'bcrp-044',
    initiative: 'Hastings and St Leonards',
    latitude: 50.855_326,
    longitude: 0.583_706,
    postcode: 'TN34 3UY',
  },
  {
    address:
      'Buckinghamshire Council, The Gateway, Gatehouse Road, Aylesbury, HP19 8FF',
    id: 'bcrp-045',
    initiative: 'High Wycombe Bid Company Safe & Secure',
    latitude: 51.822_371,
    longitude: -0.826_386,
    postcode: 'HP19 8FF',
  },
  {
    address:
      'London Borough of Redbridge, Lynton House, 255-259 High Road, Ilford, IG1 1NN',
    id: 'bcrp-046',
    initiative: 'Ilford BID',
    latitude: 51.560_363,
    longitude: 0.078_044,
    postcode: 'IG1 1NN',
  },
  {
    address: 'Leeds City Council, Civic Hall, Calverley Street, Leeds, LS1 1UR',
    id: 'bcrp-047',
    initiative: 'Leeds BID',
    latitude: 53.802_177,
    longitude: -1.548_522,
    postcode: 'LS1 1UR',
  },
  {
    address:
      'Leicester City Council, City Hall, 115 Charles Street, Leicester, LE1 1FZ',
    id: 'bcrp-048',
    initiative: 'Leicester City Watch Against Crime',
    latitude: 52.634_343,
    longitude: -1.129_791,
    postcode: 'LE1 1FZ',
  },
  {
    address: 'Lincoln City Council, City Hall, Beaumont Fee, Lincoln, LN1 1DD',
    id: 'bcrp-049',
    initiative: 'Lincoln Business Improvement Group',
    latitude: 53.231_006,
    longitude: -0.543_561,
    postcode: 'LN1 1DD',
  },
  {
    address:
      'Liverpool City Council, Cunard Building, Water Street, Liverpool, L3 1AH',
    id: 'bcrp-050',
    initiative: 'Liverpool BID Company',
    latitude: 53.404_247,
    longitude: -2.994_412,
    postcode: 'L3 1AH',
  },
  {
    address:
      'Charnwood Borough Council, Southfield Road, Loughborough, LE11 2TX',
    id: 'bcrp-051',
    initiative: 'Love Loughborough',
    latitude: 52.769_148,
    longitude: -1.204_122,
    postcode: 'LE11 2TX',
  },
  {
    address: 'Luton Borough Council, Town Hall, George Street, Luton, LU1 2BQ',
    id: 'bcrp-052',
    initiative: 'Luton Business Against Crime',
    latitude: 51.879_926,
    longitude: -0.417_804,
    postcode: 'LU1 2BQ',
  },
  {
    address:
      'Maidstone Borough Council, Maidstone House, King Street, Maidstone, ME15 6JQ',
    id: 'bcrp-053',
    initiative: 'Maidstone',
    latitude: 51.272_607,
    longitude: 0.526_545,
    postcode: 'ME15 6JQ',
  },
  {
    address:
      'Manchester City Council, Town Hall, Albert Square, Manchester, M60 2LA',
    id: 'bcrp-054',
    initiative: 'Manchester BCRP (CityCo)',
    latitude: 53.487_378,
    longitude: -2.227_209,
    postcode: 'M60 2LA',
  },
  {
    address:
      'Milton Keynes City Council, Civic Offices, 1 Saxon Gate East, Milton Keynes, MK9 3EJ',
    id: 'bcrp-055',
    initiative: 'Milton Keynes Partners Against Crime',
    latitude: 52.043_275,
    longitude: -0.760_815,
    postcode: 'MK9 3EJ',
  },
  {
    address:
      'Newcastle City Council, Civic Centre, Newcastle upon Tyne, NE1 8QH',
    id: 'bcrp-056',
    initiative: 'NE1 Business Crime Partnership',
    latitude: 54.978_423,
    longitude: -1.610_589,
    postcode: 'NE1 8QH',
  },
  {
    address: 'Neath Port Talbot Council, Civic Centre, Port Talbot, SA13 1PJ',
    id: 'bcrp-057',
    initiative: 'Neath Port Talbot BCRP',
    latitude: 51.597_757,
    longitude: -3.784_109,
    postcode: 'SA13 1PJ',
  },
  {
    address:
      'London Borough of Croydon, Bernard Weatherill House, 8 Mint Walk, Croydon, CR0 1EA',
    id: 'bcrp-058',
    initiative: 'New Addington BID',
    latitude: 51.371_477,
    longitude: -0.098_825,
    postcode: 'CR0 1EA',
  },
  {
    address:
      'West Suffolk Council, West Suffolk House, Western Way, Bury St Edmunds, IP33 3YU',
    id: 'bcrp-059',
    initiative: 'New Market BID',
    latitude: 52.251_49,
    longitude: 0.697_034,
    postcode: 'IP33 3YU',
  },
  {
    address:
      'Westminster City Council, City Hall, 64 Victoria Street, London, SW1E 6QP',
    id: 'bcrp-060',
    initiative: 'New West End Company',
    latitude: 51.497_553,
    longitude: -0.137_352,
    postcode: 'SW1E 6QP',
  },
  {
    address:
      "Bassetlaw District Council, Queen's Buildings, Potter Street, Worksop, S80 2AH",
    id: 'bcrp-061',
    initiative: 'North Notts BID',
    latitude: 53.301_776,
    longitude: -1.123_316,
    postcode: 'S80 2AH',
  },
  {
    address:
      'West Northamptonshire Council, The Guildhall, St Giles Square, Northampton, NN1 1DE',
    id: 'bcrp-062',
    initiative: 'Northamptonshire Business Crime Partnership',
    latitude: 52.237_411,
    longitude: -0.894_618,
    postcode: 'NN1 1DE',
  },
  {
    address:
      "Norwich City Council, City Hall, St Peter's Street, Norwich, NR2 1NH",
    id: 'bcrp-063',
    initiative: 'Norwich BID',
    latitude: 52.628_599,
    longitude: 1.291_638,
    postcode: 'NR2 1NH',
  },
  {
    address:
      'Nottingham City Council, Loxley House, Station Street, Nottingham, NG2 3NG',
    id: 'bcrp-064',
    initiative: 'Nottingham BID BCRP',
    latitude: 52.948_168,
    longitude: -1.144_602,
    postcode: 'NG2 3NG',
  },
  {
    address:
      "Oxford City Council, St Aldate's Chambers, 109-113 St Aldate's, Oxford, OX1 1DS",
    id: 'bcrp-065',
    initiative: 'Oxford City Partnership',
    latitude: null, // Missing coordinates
    longitude: null,
    postcode: 'OX1 1DS',
  },
  {
    address:
      'Plymouth City Council, Ballard House, West Hoe Road, Plymouth, PL1 3BJ',
    id: 'bcrp-066',
    initiative: 'Plymouth Against Retail Crime Ltd',
    latitude: 50.366_793,
    longitude: -4.152_612,
    postcode: 'PL1 3BJ',
  },
  {
    address:
      'Reading Borough Council, Civic Offices, Bridge Street, Reading, RG1 2LU',
    id: 'bcrp-067',
    initiative: 'Reading Business Against Crime',
    latitude: 51.452_839,
    longitude: -0.973_573,
    postcode: 'RG1 2LU',
  },
  {
    address: 'Not publicly available',
    id: 'bcrp-068',
    initiative: 'Retailers Against Crime RAC',
    latitude: null,
    longitude: null,
    postcode: '',
  },
  {
    address:
      'Rhondda Cynon Taf Council, The Pavilions, Clydach Vale, Tonypandy, CF40 2XX',
    id: 'bcrp-069',
    initiative: 'Rhondda-Cynon-Taf & Merthyr Tydfil BCRP',
    latitude: 51.6233,
    longitude: -3.470_475,
    postcode: 'CF40 2XX',
  },
  {
    address:
      'Contact Safer Business Network, 2 Devonshire Square, London, EC2M 4UJ',
    id: 'bcrp-070',
    initiative: 'Safer Business Network',
    latitude: 51.516_562,
    longitude: -0.079_831,
    postcode: 'EC2M 4UJ',
  },
  {
    address: 'Medway Council, Gun Wharf, Dock Road, Chatham, ME4 4TR',
    id: 'bcrp-071',
    initiative: 'Safer Medway Partnership',
    latitude: 51.389_111,
    longitude: 0.524_017,
    postcode: 'ME4 4TR',
  },
  {
    address: 'Sevenoaks District Council, Argyle Road, Sevenoaks, TN13 1HG',
    id: 'bcrp-072',
    initiative: 'Safer Sevenoaks & District BCRP',
    latitude: 51.273_348,
    longitude: 0.188_827,
    postcode: 'TN13 1HG',
  },
  {
    address: 'City of York Council, West Offices, Station Rise, York, YO1 6GA',
    id: 'bcrp-073',
    initiative: 'Safer York Business Partnership',
    latitude: 53.958_153,
    longitude: -1.089_682,
    postcode: 'YO1 6GA',
  },
  {
    address:
      'North Yorkshire Council, Town Hall, St Nicholas Street, Scarborough, YO11 2HG',
    id: 'bcrp-074',
    initiative: 'Scarborough Anti Theft Group',
    latitude: 54.281_987,
    longitude: -0.397_894,
    postcode: 'YO11 2HG',
  },
  {
    address:
      'Sheffield City Council, Town Hall, Pinstone Street, Sheffield, S1 2HH',
    id: 'bcrp-075',
    initiative: 'Sheffield Crime Reduction Partnership',
    latitude: 53.380_41,
    longitude: -1.469_915,
    postcode: 'S1 2HH',
  },
  {
    address: 'Southampton City Council, Civic Centre, Southampton, SO14 7LY',
    id: 'bcrp-076',
    initiative: 'Southampton BID',
    latitude: 50.907_674,
    longitude: -1.406_971,
    postcode: 'SO14 7LY',
  },
  {
    address:
      'Staffordshire County Council, County Buildings, Martin Street, Stafford, ST16 2LH',
    id: 'bcrp-077',
    initiative: 'Staffordshire PABCIS',
    latitude: 52.803_076,
    longitude: -2.123_009,
    postcode: 'ST16 2LH',
  },
  {
    address:
      'Spelthorne Borough Council, Council Offices, Knowle Green, Staines-upon-Thames, TW18 1XB',
    id: 'bcrp-078',
    initiative: 'Staines Staisafe Radio Scheme',
    latitude: 51.429_714,
    longitude: -0.499_178,
    postcode: 'TW18 1XB',
  },
  {
    address:
      'Swale Borough Council, Swale House, East Street, Sittingbourne, ME10 3HT',
    id: 'bcrp-079',
    initiative: 'Swale Link',
    latitude: 51.3395,
    longitude: 0.741_029,
    postcode: 'ME10 3HT',
  },
  {
    address:
      'Swansea Council, Civic Centre, Oystermouth Road, Swansea, SA1 3SN',
    id: 'bcrp-080',
    initiative: 'Swansea Against Business Crime',
    latitude: 51.613_724,
    longitude: -3.948_371,
    postcode: 'SA1 3SN',
  },
  {
    address: 'Thanet District Council, Cecil Street, Margate, CT9 1XZ',
    id: 'bcrp-081',
    initiative: 'Thanet Safe Ltd',
    latitude: 51.386_926,
    longitude: 1.385_768,
    postcode: 'CT9 1XZ',
  },
  {
    address: 'The Trafford Centre, Manchester, M17 8AA',
    id: 'bcrp-082',
    initiative: 'The Trafford Centre, Manchester',
    latitude: 53.465_725,
    longitude: -2.349_829,
    postcode: 'M17 8AA',
  },
  {
    address:
      'Tonbridge and Malling Borough Council, Gibson Building, Gibson Drive, Kings Hill, West Malling, ME19 4LZ',
    id: 'bcrp-083',
    initiative: 'Tonbridge and Malling Safer Towns',
    latitude: 51.274_289,
    longitude: 0.391_669,
    postcode: 'ME19 4LZ',
  },
  {
    address:
      'Tunbridge Wells Borough Council, Town Hall, Civic Way, Royal Tunbridge Wells, TN1 1RS',
    id: 'bcrp-084',
    initiative: 'Tunbridge Wells Safe Town Partnership',
    latitude: 51.132_583,
    longitude: 0.263_953,
    postcode: 'TN1 1RS',
  },
  {
    address: 'Wakefield Council, Town Hall, Wood Street, Wakefield, WF1 2HQ',
    id: 'bcrp-085',
    initiative: 'Wakefield Area Business Against Crime',
    latitude: 53.683_816,
    longitude: -1.501_562,
    postcode: 'WF1 2HQ',
  },
  {
    address: 'Wakefield Council, Town Hall, Wood Street, Wakefield, WF1 2HQ',
    id: 'bcrp-086',
    initiative: 'Wakefield BID',
    latitude: 53.683_816,
    longitude: -1.501_562,
    postcode: 'WF1 2HQ',
  },
  {
    address: 'Warwickshire County Council, Shire Hall, Warwick, CV34 4RL',
    id: 'bcrp-087',
    initiative: 'Warwickshire Retail Crime Initiative',
    latitude: 52.282_741,
    longitude: -1.589_677,
    postcode: 'CV34 4RL',
  },
  {
    address:
      'Sandwell Council, Sandwell Council House, Freeth Street, Oldbury, B69 3DE',
    id: 'bcrp-088',
    initiative: 'West Bromwich BID',
    latitude: 52.504_007,
    longitude: -2.009_055,
    postcode: 'B69 3DE',
  },
  {
    address:
      'North Somerset Council, Town Hall, Walliscote Grove Road, Weston-super-Mare, BS23 1UJ',
    id: 'bcrp-089',
    initiative: 'Weston Super Mare Business Crime Reduction',
    latitude: 51.345_534,
    longitude: -2.977_509,
    postcode: 'BS23 1UJ',
  },
  {
    address: 'Wigan Council, Town Hall, Library Street, Wigan, WN1 1YN',
    id: 'bcrp-090',
    initiative: 'Wigan Borough Business Crime Partnerships',
    latitude: 53.545_121,
    longitude: -2.629_975,
    postcode: 'WN1 1YN',
  },
  {
    address:
      'Winchester City Council, City Offices, Colebrook Street, Winchester, SO23 9LJ',
    id: 'bcrp-091',
    initiative: 'Winchester',
    latitude: 51.060_995,
    longitude: -1.311_36,
    postcode: 'SO23 9LJ',
  },
  {
    address:
      "Wolverhampton City Council, Civic Centre, St Peter's Square, Wolverhampton, WV1 1SH",
    id: 'bcrp-092',
    initiative: 'Wolverhampton City Centre',
    latitude: 52.587_057,
    longitude: -2.129_572,
    postcode: 'WV1 1SH',
  },
  {
    address:
      'Worthing Borough Council, Town Hall, Chapel Road, Worthing, BN11 1HA',
    id: 'bcrp-093',
    initiative: 'Worthing BCRP',
    latitude: 50.814_723,
    longitude: -0.371_805,
    postcode: 'BN11 1HA',
  },
  {
    address: 'South Somerset District Council, Brympton Way, Yeovil, BA20 2HT',
    id: 'bcrp-094',
    initiative: 'Yeovil Crime Reduction Team',
    latitude: 50.935_453,
    longitude: -2.667_574,
    postcode: 'BA20 2HT',
  },
  {
    address: 'Not publicly available',
    id: 'bcrp-095',
    initiative: 'Yorkshire Business Crime Network',
    latitude: null,
    longitude: null,
    postcode: '',
  },
];

// Filter out locations without valid coordinates
export const validBCRPLocations = bcrpLocations.filter(
  (location) => location.latitude !== null && location.longitude !== null
);

// Create GeoJSON data for the BCRP locations
export const bcrpGeoJSON = {
  features: validBCRPLocations.map((location) => ({
    geometry: {
      coordinates: [location.longitude!, location.latitude!],
      type: 'Point' as const,
    },
    properties: {
      address: location.address,
      id: location.id,
      initiative: location.initiative,
      postcode: location.postcode,
    },
    type: 'Feature' as const,
  })),
  type: 'FeatureCollection' as const,
};
