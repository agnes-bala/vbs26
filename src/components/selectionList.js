
  const genderList = [
    { _id: 1, name: "MALE" },
    { _id: 2, name: "FEMALE" }
  ];

  const maritalStatusList =[
    {_id:1, name:"SINGLE"},
    {_id:2, name: "MARRIED"},
    {_id:3, name: "DIVORCED"},
    {_id:4, name: "WIDOWED"},
  ];



const educationList = [
    { _id: 1, name: "PRIMARY" },
    { _id: 2, name: "UPPER PRIMARY" },
    { _id: 3, name: "SSLC" },
    { _id: 4, name: "HSC" },
    { _id: 5, name: "DIPLOMA" },
    { _id: 6, name: "UG" },
    { _id: 7, name: "PG" },
    { _id: 8, name: "PH.D" }
];

// const relationshipList = [
//   { _id: 1, name: "SPOUSE" },
//   { _id: 2, name: "CHILD" },
//   { _id: 3, name: "PARENT" },
//   { _id: 4, name: "SIBLING" },
//   // { _id: "5", name: "GRANDPARENT" },
//   // { _id: "6", name: "CHILD-IN-LAW" },
//   // { _id: "7", name: "PARENT-IN-LAW" },
//   // { _id: "8", name: "GRANDPARENT-IN-LAW" },
//   // { _id: "9", name: "NIECE/NEPHEW" },
// ];
const relationshipList = [
  { _id: 97, name: "Child" },
  { _id: 98, name: "Husband/Wife" },
  { _id: 1, name: "Father" },
  { _id: 2, name: "Mother" },
  { _id: 3, name: "Uncle" },
  { _id: 4, name: "Aunt" },
  { _id: 5, name: "Brother" },
  { _id: 6, name: "Sister" },
  { _id: 7, name: "Grand Parent" },
  { _id: 8, name: "Grand Child" },
  { _id: 9, name: "Church Believer" },
  { _id: 10, name: "Friend" },
  { _id: 11, name: "Relative" },
];

const bloodgroupList = [
    {_id:1,	name:"O +ve"},
    {_id:2,	name:"O -ve"},
    {_id:3,	name:"A +ve"},
    {_id:4,	name:"A -ve"},
    {_id:5,	name:"B +ve"},
    {_id:6,	name:"B -ve"},
    {_id:7,	name:"AB +ve"},
    {_id:8,	name:"AB -ve"},
    {_id:9,	name:"A1 +ve"},
    {_id:10,name:"A1 -ve"},
    {_id:11,name:"A2 +ve"},
    {_id:12,	name:"A2 -ve"},
    {_id:13,	name:"A1B +ve"},
    {_id:14,	name:"A1B -ve"},
    {_id:15,	name:"A2B +ve"},
    {_id:16,	name:"A2B -ve"},
    {_id:17,	name:"A1B RH +ve"},
    {_id:18, name:"A1B RH -ve"},
    {_id:19,	name:"A2B RH +ve"},
    {_id:20,	name:"A2B RH -ve"}
]

const appliedStatusList =[
  {_id: 1, name:'Online'},
  {_id: 2, name:'Manual'},
];

const statusList =[
  {_id: 0, name:'InActive'},
  {_id: 1, name:'Active'},
];

const monthSortList = [
  {_id: 'total', name : "All"},
  {_id: 'Apr', name : "Apr"},
  {_id: 'May', name : "May"},
  {_id: 'Jun', name : "Jun"},
  {_id: 'Jul', name : "Jul"},
  {_id: 'Aug', name : "Aug"},
  {_id: 'Sep', name : "Sep"},
  {_id: 'Oct', name : "Oct"},
  {_id: 'Nov', name : "Nov"},
  {_id: 'Dec', name : "Dec"},
  {_id: 'Jan', name : "Jan"},
  {_id: 'Feb', name : "Feb"},
  {_id: 'Mar', name : "Mar"},
];


const titleList = [
  { _id: "1", name: "BRO." },
  { _id: "2", name: "SIS." },
  { _id: "3", name: "MR." },
  { _id: "4", name: "MRS." },
  { _id: "5", name: "DR." },
  { _id: "6", name: "REV." },
  { _id: "7", name: "PASTOR." }
];
const occupationList = [
  { _id: "1", name: "Student" },
  { _id: "2", name: "Private Employee" },
  { _id: "3", name: "Government Employee" },
  { _id: "4", name: "Business" },
  { _id: "5", name: "Homemaker" },
  { _id: "6", name: "Self Employed" },
  { _id: "7", name: "Reverend" },
  { _id: "8", name: "Pastor" },
  { _id: "9", name: "Others" },
  { _id: "10", name: "Dont Want To Mention" },
];
  export {
    genderList,
    maritalStatusList,
    educationList,
    relationshipList,
    bloodgroupList,
    appliedStatusList,
    statusList,
    monthSortList,
    titleList,
    occupationList,
  }
