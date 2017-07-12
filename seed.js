// not seeding properly, need to investigate


const Promise = require('bluebird');
const db = require('./db');
const models = require('./db/models');
const Student = models.Student;
const Campus = models.Campus;

const data = {
  campus: [
    {name: 'Gryffindor', image:'https://vignette2.wikia.nocookie.net/harrypotter/images/6/6b/Gryffindorcrest.png/revision/latest?cb=20110308010135'},
    {name: 'Hufflepuff', image:'https://vignette3.wikia.nocookie.net/harrypotter/images/3/30/Hufflepuff%E2%84%A2_Crest_%28Painting%29.png/revision/latest?cb=20091129184403'},
    {name: 'Ravenclaw', image:'https://vignette1.wikia.nocookie.net/harrypotter/images/6/6c/Ravenclaw%E2%84%A2_Crest_%28Painting%29.png/revision/latest?cb=20091129184403'},
    {name: 'Slytherin', image:'https://vignette4.wikia.nocookie.net/harrypotter/images/e/ef/Slytherin%E2%84%A2_Crest_%28Painting%29.png/revision/latest?cb=20091129190321'}
  ],
  student: {
    gryffindor: [
      {name: 'Harry Potter', email: 'harry@hogwarts.edu'},
      {name: 'Hermione Granger', email: 'hermione@hogwarts.edu'},
      {name: 'Ron Weasley', email: 'ron@hogwarts.edu'},
      {name: 'Ginny Weasley', email: 'ginny@hogwarts.edu'},
      {name: 'Neville Longbottom', email: 'neville@hogwarts.edu'}
    ],
    hufflepuff: [
      {name: 'Cedric Diggory', email: 'cedric@hogwarts.edu'},
      {name: 'Ernie MacMillan', email: 'ernie@hogwarts.edu'},
      {name: 'Hannah Abbott', email: 'hannah@hogwarts.edu'}
    ],
    ravenclaw: [
      {name: 'Luna Lovegood', email: 'luna@hogwarts.edu'},
      {name: 'Cho Chang', email: 'cho@hogwarts.edu'},
      {name: 'Terry Boot', email: 'terry@hogwarts.edu'},
      {name: 'Padma Patil', email: 'padma@hogwarts.edu'}
    ],
    slytherin: [
      {name: 'Draco Malfoy', email: 'draco@hogwarts.edu'},
      {name: 'Vincent Crabbe', email: 'vincent@hogwarts.edu'},
      {name: 'Gregory Goyle', email: 'gregory@hogwarts.edu'}
    ]
  }
}

db.sync({force: true})
.then(function () {
  console.log('Dropped old data, now adding from seed');
  return Promise.all(data.campus.map(campus => Campus.create(campus)))
})
.then(arrOfCampuses => {
  let students = []
  arrOfCampuses.forEach(elem => {
    const studentsWithHouse = data.student[elem.name.toLowerCase()].map(student => {
      student.campusId = elem.id;
    })
    students = [...students, ...studentsWithHouse];
  })
  return Promise.all(students.map(student => Student.create(student)))
})
.then(() => console.log('Finished seeding!'))
.catch(err => console.error('There was a problem seeding.', err, err.stack))
// .finally(function () {
//   db.close();
//   console.log('Db connection closed');
//   return null;
// });
