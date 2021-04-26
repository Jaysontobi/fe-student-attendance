const CLEARANCE_DROPDOWN = [
  '',
  'pending',
  'complete'
]

let CLEARANCE_HEADERS = [
  {
    title: 'Student Name',
    field: 'studentName',
    dataIndex: 'studentName',
    width: '35%'
  },
  {
    title: 'First Quarter',
    field: 'firstQuarter',
    dataIndex: 'firstQuarter',
    editable: true
  },
  {
    title: 'Second Quarter',
    field: 'secondQuarter',
    dataIndex: 'secondQuarter',
    editable: true,
  },
  {
    title: 'Third Quarter',
    field: 'thirdQuarter',
    dataIndex: 'thirdQuarter',
    editable: true,
  },
  {
    title: 'Fourth Quarter',
    field: 'fouthQuarter',
    dataIndex: 'fourthQuarter',
    editable: true,
  }
];


module.exports = { CLEARANCE_HEADERS, CLEARANCE_DROPDOWN };