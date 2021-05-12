const G_1_To_3 = [
  'Mother Tongue',
  'Filipino',
  'English',
  'Mathematics',
  'Science',
  'Araling Panlipunan',
  'Music',
  'Art',
  'PE',
  'Health'
];

const G_4_To_10 = [
  'Filipino',
  'English',
  'Mathematics',
  'Science',
  'Araling Panlipunan',
  'TLE',
  'Music',
  'Art',
  'PE',
  'Health'
];

let quartersObj = {
  firstQuarter: 0,
  secondQuarter: 0,
  thirdQuarter: 0,
  fourthQuarter: 0
};

const buildLevelSubjects = (levelNum, schoolYear) => {
  let subjectList = (levelNum > 3) ? G_4_To_10 : G_1_To_3;

  let subjects = subjectList.map(topic => {
    return {
      subjectName: topic,
      subjectGrade: quartersObj,
      recommendedGrade: {}
    };
  });

  return subjects;
};

const getSubjects = levelNum => {
  let subjectList = (levelNum > 3) ? G_4_To_10 : G_1_To_3;
  return subjectList;
};

export default { buildLevelSubjects,  getSubjects};
