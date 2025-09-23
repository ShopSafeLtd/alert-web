import type { CircleLayer, SymbolLayer } from 'react-map-gl';

import React from 'react';
import { Layer, Source } from 'react-map-gl';

// UK Districts data
const ukDistrictsData = [
  { lat: 54.701_168_6, lng: -1.205_247_2, name: 'Cleveland - Hartlepool' },
  { lat: 54.574_227, lng: -1.234_956, name: 'Cleveland - Middlesbrough' },
  { lat: 54.597_463_6, lng: -1.077_951_5, name: 'Cleveland - Redcar' },
  {
    lat: 54.570_455_1,
    lng: -1.328_982_1,
    name: 'Cleveland - Stockton-on-Tees',
  },
  { lat: 50.369_482_4, lng: -4.157_313_4, name: 'Devon & Cornwall - Plymouth' },
  { lat: 54.544_638, lng: -1.924_968, name: 'Durham - Barnard Castle' },
  { lat: 54.663_822, lng: -1.678_788, name: 'Durham - Bishop Auckland' },
  { lat: 54.859_116_1, lng: -1.574_088_8, name: 'Durham - Chester-le-Street' },
  { lat: 54.851_797, lng: -1.833_026, name: 'Durham - Consett' },
  { lat: 54.715_131, lng: -1.743_545, name: 'Durham - Crook' },
  { lat: 54.523_61, lng: -1.559_458, name: 'Durham - Darlington' },
  { lat: 54.775_25, lng: -1.584_852, name: 'Durham - Durham' },
  {
    lat: 54.615_987_999_999_99,
    lng: -1.575_577,
    name: 'Durham - Newton Aycliffe',
  },
  { lat: 54.762_441, lng: -1.328_95, name: 'Durham - Peterlee' },
  { lat: 54.840_346, lng: -1.337_517, name: 'Durham - Seaham' },
  { lat: 54.697_720_999_999_99, lng: -1.585_52, name: 'Durham - Spennymoor' },
  { lat: 54.868_948, lng: -1.698_841, name: 'Durham - Stanley' },
  { lat: 51.766_836_899_999_99, lng: 0.475_776_2, name: 'Essex' },
  { lat: 53.386_904_599_999_99, lng: -2.348_898_3, name: 'GMP - Altrincham' },
  { lat: 53.576_864_699_999_99, lng: -2.428_219_2, name: 'GMP - Bolton' },
  { lat: 53.593_349_8, lng: -2.296_605_4, name: 'GMP - Bury' },
  { lat: 53.455_203, lng: -2.114_613, name: 'GMP - Denton' },
  { lat: 53.480_759_3, lng: -2.242_630_5, name: 'GMP - Manchester' },
  { lat: 53.541_067_899_999_99, lng: -2.116_76, name: 'GMP - Oldham' },
  { lat: 53.470_045_7, lng: -2.174_946_4, name: 'GMP - Openshaw' },
  { lat: 53.609_713_6, lng: -2.1561, name: 'GMP - Rochdale' },
  { lat: 53.487_292_7, lng: -2.290_007_1, name: 'GMP - Salford' },
  { lat: 53.410_631_599_999_99, lng: -2.157_533_2, name: 'GMP - Stockport' },
  { lat: 53.511_443, lng: -2.346_232_5, name: 'GMP - Swinton' },
  { lat: 53.487_225_6, lng: -2.097_385_4, name: 'GMP - Tameside' },
  { lat: 53.457_823_4, lng: -2.289_442_2, name: 'GMP - Trafford' },
  { lat: 53.545_064_5, lng: -2.632_507_4, name: 'GMP - Wigan' },
  {
    lat: 50.693_847_899_999_99,
    lng: -1.304_734,
    name: 'Hampshire - Isle of Wight',
  },
  { lat: 51.089_520_3, lng: -1.216_844, name: 'Hampshire - Portsmouth' },
  { lat: 50.988_93, lng: -1.496_58, name: 'Hampshire - Romsey' },
  { lat: 51.089_520_3, lng: -1.216_844, name: 'Hampshire - Southampton' },
  { lat: 51.059_771, lng: -1.310_142, name: 'Hampshire - Winchester' },
  { lat: 55.378_051, lng: -3.435_973, name: 'Hobbycraft' },
  { lat: 51.145_100_700_000_01, lng: 0.873_963_1, name: 'Kent - Ashford' },
  { lat: 51.277_033_1, lng: 1.083_785_5, name: 'Kent - Canterbury' },
  { lat: 51.446_21, lng: 0.216_872, name: 'Kent - Dartford & Gravesham' },
  { lat: 51.127_875_8, lng: 1.313_402_7, name: 'Kent - Dover' },
  { lat: 51.081_397, lng: 1.169_456, name: 'Kent - Folkstone' },
  { lat: 51.071_739, lng: 1.081_937, name: 'Kent - Hythe' },
  { lat: 51.450_714, lng: 0.541_371_9, name: 'Kent - Medway' },
  { lat: 51.360_251_6, lng: 1.348_466_3, name: 'Kent - Thanet' },
  { lat: 52.740_709_3, lng: -1.145_146_1, name: 'Leicestershire - Charnwood' },
  { lat: 52.724_569, lng: -1.367_710_9, name: 'Leicestershire - Coalville' },
  { lat: 52.570_876_2, lng: -0.934_645_8, name: 'Leicestershire - Harborough' },
  {
    lat: 52.513_588_2,
    lng: -1.343_108_1,
    name: 'Leicestershire - Hinckley & Blaby',
  },
  {
    lat: 52.740_122_799_999_99,
    lng: -1.140_592_5,
    name: 'Leicestershire - Leicester',
  },
  {
    lat: 52.828_278_399_999_99,
    lng: -0.843_268_5,
    name: 'Leicestershire - Melton & Rutland',
  },
  {
    lat: 52.580_168_6,
    lng: -1.096_627_2,
    name: 'Leicestershire - Oadby and Wigston',
  },
  {
    lat: 52.978_939_999_999_99,
    lng: -0.026_577,
    name: 'Lincolnshire - Boston & South Holland',
  },
  { lat: 53.549_350_8, lng: -0.007_07, name: 'Lincolnshire - Coast & Wolds' },
  {
    lat: 53.229_456_5,
    lng: -0.542_682_7,
    name: 'Lincolnshire - Lincoln & West Lindsey',
  },
  {
    lat: 52.830_022_4,
    lng: -0.544_081_8,
    name: 'Lincolnshire - North & South Kesteven',
  },
  { lat: 53.454_594, lng: -2.852_907, name: 'Merseyside - Knowsley' },
  { lat: 53.408_371_4, lng: -2.991_572_6, name: 'Merseyside - Liverpool' },
  { lat: 53.503_444_9, lng: -2.970_359, name: 'Merseyside - Sefton' },
  { lat: 53.456_307, lng: -2.737_095, name: 'Merseyside - St Helens' },
  { lat: 53.372_718_1, lng: -3.073_754, name: 'Merseyside - Wirral' },
  { lat: 55.208_254_2, lng: -2.078_413_8, name: 'Northumbria - Gateshead' },
  { lat: 54.958_364_7, lng: -1.670_335_3, name: 'Northumbria - Metro Centre' },
  { lat: 54.978_252, lng: -1.617_78, name: 'Northumbria - Newcastle' },
  {
    lat: 55.018_239_9,
    lng: -1.485_843_6,
    name: 'Northumbria - North Tyneside',
  },
  {
    lat: 55.208_254_2,
    lng: -2.078_413_8,
    name: 'Northumbria - Northumberland North',
  },
  {
    lat: 55.208_254_2,
    lng: -2.078_413_8,
    name: 'Northumbria - Northumberland South',
  },
  { lat: 55.010_765, lng: -1.502_580_8, name: 'Northumbria - South Tyneside' },
  { lat: 54.904_416_1, lng: -1.381_174_6, name: 'Northumbria - Sunderland' },
  { lat: 54.109_113_4, lng: -2.156_282_1, name: 'North Yorkshire - Craven' },
  {
    lat: 54.329_980_9,
    lng: -2.011_858_4,
    name: 'North Yorkshire - Hambleton & Richmondshire',
  },
  { lat: 53.992_12, lng: -1.541_812, name: 'North Yorkshire - Harrogate' },
  {
    lat: 54.280_139_8,
    lng: -0.495_087_4,
    name: 'North Yorkshire - Scarborough & Ryedale',
  },
  {
    lat: 53.783_524_000_000_01,
    lng: -1.067_189,
    name: 'North Yorkshire - Selby',
  },
  {
    lat: 54.250_359_499_999_99,
    lng: -1.470_855_3,
    name: 'North Yorkshire - York',
  },
  { lat: 53.100_956_5, lng: -1.269_586, name: 'Nottinghamshire - Ashfield' },
  { lat: 53.318_617_8, lng: -0.939_850_3, name: 'Nottinghamshire - Bassetlaw' },
  { lat: 52.985_459_1, lng: -1.264_754, name: 'Nottinghamshire - Broxtowe' },
  {
    lat: 52.973_454_999_999_99,
    lng: -1.080_055_9,
    name: 'Nottinghamshire - Gedling',
  },
  { lat: 53.147_195, lng: -1.198_674, name: 'Nottinghamshire - Mansfield' },
  {
    lat: 53.085_094_299_999_99,
    lng: -0.952_234,
    name: 'Nottinghamshire - Newark and Sherwood',
  },
  {
    lat: 52.954_022_3,
    lng: -1.154_989_2,
    name: 'Nottinghamshire - Nottingham City',
  },
  {
    lat: 52.891_210_8,
    lng: -1.020_950_5,
    name: 'Nottinghamshire - Rushcliffe',
  },
  {
    lat: 52.699_940_800_000_01,
    lng: -2.021_829_3,
    name: 'Staffordshire - Cannock',
  },
  { lat: 52.838_654, lng: -1.828_578_9, name: 'Staffordshire - East Staffs' },
  { lat: 52.681_602, lng: -1.831_672, name: 'Staffordshire - Lichfield' },
  {
    lat: 53.013_208,
    lng: -2.227_300_2,
    name: 'Staffordshire - Newcastle-under-Lyme',
  },
  {
    lat: 52.661_537_1,
    lng: -2.172_748_3,
    name: 'Staffordshire - South Staffs',
  },
  { lat: 52.806_777_5, lng: -2.121_961_2, name: 'Staffordshire - Stafford' },
  {
    lat: 53.107_029_999_999_99,
    lng: -2.020_837_3,
    name: 'Staffordshire - Staffs Moorlands',
  },
  {
    lat: 53.003_336_9,
    lng: -2.182_740_8,
    name: 'Staffordshire - Stoke-on-Trent',
  },
  { lat: 52.633_584, lng: -1.691_032, name: 'Staffordshire - Tamworth' },
  { lat: 50.821_322_1, lng: -0.139_388_6, name: 'Sussex - Brighton & Hove' },
  {
    lat: 50.837_610_000_000_01,
    lng: -0.774_936,
    name: 'Sussex - Chichester & Arun',
  },
  {
    lat: 51.109_140_1,
    lng: -0.187_227_5,
    name: 'Sussex - Crawley & Mid-Sussex',
  },
  { lat: 50.854_259, lng: 0.573_453, name: 'Sussex - Hastings & Rother' },
  {
    lat: 50.817_87,
    lng: -0.372_882,
    name: 'Sussex - Horsham, Adur & Worthing',
  },
  {
    lat: 52.040_622_4,
    lng: -0.759_417_1,
    name: 'Thames Valley - Milton Keynes',
  },
  { lat: 51.761_205_6, lng: -1.246_467_4, name: 'Thames Valley - Oxfordshire' },
  {
    lat: 51.455_120_099_999_99,
    lng: -0.978_747_5,
    name: 'Thames Valley - Reading',
  },
  { lat: 51.380_527, lng: -0.123_702, name: 'The Met - Croydon' },
  { lat: 51.412_33, lng: -0.300_689, name: 'The Met - Kingston' },
  { lat: 51.461_150_900_000_01, lng: -0.007_317_7, name: 'The Met - Lewisham' },
  { lat: 51.577_523_1, lng: 0.178_581_4, name: 'The Met - Romford' },
  { lat: 52.192_733_1, lng: -1.706_468_9, name: 'The Met - Stratford' },
  { lat: 52.412_816_3, lng: -1.508_952_1, name: 'West Midlands - Coventry' },
  { lat: 52.586_636_7, lng: -1.984_534, name: 'West Midlands - Walsall' },
  {
    lat: 52.586_815_9,
    lng: -2.125_658_7,
    name: 'West Midlands - Wolverhampton',
  },
  { lat: 52.475_074_3, lng: -1.829_833, name: 'West Mids - Other Areas' },
  { lat: 53.810_817_600_000_01, lng: -1.762_61, name: 'West Yorkshire' },
  { lat: 53.793_799_6, lng: -1.756_358_3, name: 'West Yorkshire - Bradford' },
  { lat: 53.724_784_5, lng: -1.865_835_7, name: 'West Yorkshire - Calderdale' },
  { lat: 53.645_792, lng: -1.785_035, name: 'West Yorkshire - Huddersfield' },
  { lat: 53.593_343_2, lng: -1.800_950_9, name: 'West Yorkshire - Kirklees' },
  { lat: 53.800_755_4, lng: -1.549_077_4, name: 'West Yorkshire - Leeds' },
  { lat: 53.684_816_2, lng: -1.503_859_6, name: 'West Yorkshire - Wakefield' },
  { lat: 51.167_920_1, lng: -1.762_978_3, name: 'Wiltshire - Amesbury' },
  { lat: 51.348_708_6, lng: -1.992_603_1, name: 'Wiltshire - Devizes' },
  {
    lat: 51.541_394_999_999_99,
    lng: -1.902_318,
    name: 'Wiltshire - Royal Wootton Basset',
  },
  { lat: 51.068_785, lng: -1.794_472, name: 'Wiltshire - Salisbury' },
  { lat: 51.543_763_8, lng: -1.769_514_4, name: 'Wiltshire - Swindon' },
  { lat: 51.319_664, lng: -2.208_853, name: 'Wiltshire - Trowbridge' },
  { lat: 51.204_629, lng: -2.181_078, name: 'Wiltshire - Warminster' },
];

const ukDistrictsCircleLayer: CircleLayer = {
  id: 'uk-districts-circles',
  paint: {
    'circle-color': '#9333EA', // Purple color
    'circle-opacity': 0.7,
    'circle-radius': {
      base: 1.75,
      stops: [
        [5, 3],
        [10, 5],
        [15, 8],
      ],
    },
    'circle-stroke-color': '#FFFFFF',
    'circle-stroke-opacity': 0.9,
    'circle-stroke-width': 2,
  },
  source: 'uk-districts',
  type: 'circle',
};

const ukDistrictsLabelLayer: SymbolLayer = {
  id: 'uk-districts-labels',
  layout: {
    'text-anchor': 'top',
    'text-field': ['get', 'name'],
    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
    'text-max-width': 8,
    'text-offset': [0, 1.5],
    'text-size': {
      base: 1,
      stops: [
        [10, 10],
        [15, 12],
      ],
    },
  },
  minzoom: 10, // Only show labels when zoomed in
  paint: {
    'text-color': '#000000',
    'text-halo-color': '#FFFFFF',
    'text-halo-width': 2,
  },
  source: 'uk-districts',
  type: 'symbol',
};

interface Props {
  showLabels?: boolean;
  visible: boolean;
}

const UKDistrictsLayer: React.FC<Props> = ({ showLabels = true, visible }) => {
  if (!visible) return null;

  const geojsonData = {
    features: ukDistrictsData.map((district) => ({
      geometry: {
        coordinates: [district.lng, district.lat],
        type: 'Point' as const,
      },
      properties: {
        name: district.name,
      },
      type: 'Feature' as const,
    })),
    type: 'FeatureCollection' as const,
  };

  return (
    <Source data={geojsonData} id="uk-districts" type="geojson">
      <Layer {...ukDistrictsCircleLayer} />
      {showLabels && <Layer {...ukDistrictsLabelLayer} />}
    </Source>
  );
};

export default UKDistrictsLayer;
