const DEFINITIONS = {
  Makadiyos: {
    a: `Expres ones's spiritual beliefs while respecting the spriritual beleiefs of others.`,
    b: `Shows adherence to ethical principles by upholding truth`
  },
  Makatao: {
    a: `Is sensitive to individual, social, and cultural differences`,
    b: `Demonstrates contributions toward solidarity`
  },
  Makakalikasan: {
    a: `Cares for the environment and utilizes resources wisely, and economically`
  },
  Makabansa: {
    a: `Demonstrates pride in being a Filipino; exercises the rights and responsibilities of Filipino citizen`,
    b: `Demonstrates appropriate behavior in carrying out activities in the school, community, and country`
  }
};

const OBSERVED_VALUES_HEADER = [
  {
    title: 'Core Values',
    field: 'values',
    dataIndex: 'values'
  },
  {
    title: 'Behavior Statements',
    field: 'statement',
    dataIndex: 'statement',
    width: '35%'
  },
  {
    title: 'Q1',
    field: 'q1',
    dataIndex: 'q1', 
    withCondition: (value) => { if (value === 'NO') return 'red'},
    isSubField: false,
    editable: true
  },
  {
    title: 'Q2',
    field: 'q2',
    dataIndex: 'q2',
    withCondition: (value) => { if (value === 'NO') return 'red'},
    isSubField: false,
    editable: true
  },
  {
    title: 'Q3',
    field: 'q3',
    dataIndex: 'q3',
    withCondition: (value) => { if (value === 'NO') return 'red'},
    isSubField: false,
    editable: true
  },
  {
    title: 'Q4',
    field: 'q4',
    dataIndex: 'q4',
    withCondition: (value) => { if (value === 'NO') return 'red'},
    isSubField: false,
    editable: true
  }
]

let OBSERVED_VALUES = [
  {
    values: '1. Makadiyos',
    statement: DEFINITIONS.Makadiyos.a,
    key: 'Makadiyos.a',
    id: 'Makadiyos.a',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    dropdownList: ['AO', 'SO', 'RO', 'NO']
  },
  {
    values: '',
    statement: DEFINITIONS.Makadiyos.b,
    key: 'Makadiyos.b',
    id: 'Makadiyos.b',
    isSubField: true,
    isEditable: true,
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    dropdownList: ['AO', 'SO', 'RO', 'NO']
  },
  {
    values: '2. Makatao',
    statement: DEFINITIONS.Makatao.a,
    key: 'Makatao.a',
    id: 'Makatao.a',
    isSubField: false,
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    dropdownList: ['AO', 'SO', 'RO', 'NO']
  },
  {
    values: '',
    statement: DEFINITIONS.Makatao.b,
    key: 'Makatao.b',
    id: 'Makatao.b',
    isSubField: true,
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    dropdownList: ['AO', 'SO', 'RO', 'NO']
  },
  {
    values: '3. Makakalikasan',
    statement: DEFINITIONS.Makakalikasan.a,
    key: 'Makakalikasan.a',
    id: 'Makakalikasan.a',
    isSubField: false,
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    dropdownList: ['AO', 'SO', 'RO', 'NO']
  },
  {
    values: '4. Makabansa',
    statement: DEFINITIONS.Makabansa.a,
    key: 'Makabansa.a',
    id: 'Makabansa.a',
    isSubField: false,
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    dropdownList: ['AO', 'SO', 'RO', 'NO']
  },
  {
    values: '',
    statement: DEFINITIONS.Makabansa.a,
    key: 'Makabansa.b',
    id: 'Makabansa.b',
    isSubField: false,
    q1: '',
    q2: '',
    q3: '',
    q4: ''
  }
];

const DESCRIPTOR_TABLE = {
  headers: [
    {
      title: 'Descriptors',
      field: 'descriptors'
    },
    {
      title: 'Grading Scale',
      field: 'scale',
    },
    {
      title: 'Remarks',
      field: 'remarks'
    }
  ],

  body: [
    {
      key: 'Outstanding_DT',
      id: 'Outstanding_DT',
      descriptors: 'Outstanding',
      scale: '90-100',
      remarks: 'Passed'
    },
    {
      key: 'Very_Satisfactory_DT',
      id: 'Very_Satisfactory_DT',
      descriptors: 'Very Satisfactory',
      scale: '85-89',
      remarks: 'Passed'
    },
    {
      key: 'Satisfactory_DT',
      id: 'Satisfactory_DT',
      descriptors: 'Satisfactory',
      scale: '80-84',
      remarks: 'Passed'
    },
    {
      key: 'Fairly_Satisfactory_DT',
      id: 'Fairly_Satisfactory_DT',
      descriptors: 'Fairly Satisfactory',
      scale: '75-79',
      remarks: 'Passed'
    },
    {
      key: 'Did_Not_Meet_DT',
      id: 'Did_Not_Meet_DT',
      descriptors: 'Did Not Meet Expectations',
      scale: 'Below 75',
      remarks: 'Failed'
    }
  ]
};

const MARKING_TABLE = {
  headers: [
    {
      title: 'Marking',
      field: 'marking'
    }, {
      title: 'Non-Numerical Rating',
      field: 'rating'
    }
  ],
  body: [
    {
      key:'AO_MT',
      id: 'AO_MT',
      marking: 'AO',
      rating: 'Always Observed'
    },
    {
      key:'SO_MT',
      id: 'SO_MT',
      marking: 'SO',
      rating: 'Sometimes Observed'
    },
    {
      key:'RO_MT',
      id: 'RO_MT',
      marking: 'RO',
      rating: 'Rarely Observed'
    },
    {
      key:'NO_MT',
      id: 'NO_MT',
      marking: 'NO',
      rating: 'Not Observed'
    }
  ]
};


module.exports = { 
  DESCRIPTOR_TABLE,
  MARKING_TABLE,
  DEFINITIONS,
  OBSERVED_VALUES_HEADER,
  OBSERVED_VALUES
};