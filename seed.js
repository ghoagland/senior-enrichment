// not seeding properly, need to investigate


const Promise = require('bluebird');
const db = require('./db');
const models = require('./db/models');
const Student = models.Student;
const Campus = models.Campus;

const campuses = [
  {
    name: 'Gryffindor',
    image: 'https://vignette2.wikia.nocookie.net/harrypotter/images/6/6b/Gryffindorcrest.png/revision/latest?cb=20110308010135',
    students: [
      {name: 'Harry Potter', email: 'harry@hogwarts.edu'},
      {name: 'Hermione Granger', email: 'hermione@hogwarts.edu'},
      {name: 'Ron Weasley', email: 'ron@hogwarts.edu'},
      {name: 'Ginny Weasley', email: 'ginny@hogwarts.edu'},
      {name: 'Neville Longbottom', email: 'neville@hogwarts.edu'}
    ]
  },
  {
    name: 'Hufflepuff',
    image: 'https://vignette3.wikia.nocookie.net/harrypotter/images/3/30/Hufflepuff%E2%84%A2_Crest_%28Painting%29.png/revision/latest?cb=20091129184403',
    students: [
      {name: 'Cedric Diggory', email: 'cedric@hogwarts.edu'},
      {name: 'Ernie MacMillan', email: 'ernie@hogwarts.edu'},
      {name: 'Hannah Abbott', email: 'hannah@hogwarts.edu'}
    ]
  },
  {
    name: 'Ravenclaw',
    image: 'https://vignette1.wikia.nocookie.net/harrypotter/images/6/6c/Ravenclaw%E2%84%A2_Crest_%28Painting%29.png/revision/latest?cb=20091129184403',
    students: [
      {name: 'Luna Lovegood', email: 'luna@hogwarts.edu'},
      {name: 'Cho Chang', email: 'cho@hogwarts.edu'},
      {name: 'Terry Boot', email: 'terry@hogwarts.edu'},
      {name: 'Padma Patil', email: 'padma@hogwarts.edu'}
    ]
  },
  {
    name: 'Slytherin',
    image: 'https://vignette4.wikia.nocookie.net/harrypotter/images/e/ef/Slytherin%E2%84%A2_Crest_%28Painting%29.png/revision/latest?cb=20091129190321',
    students: [
      {name: 'Draco Malfoy', email: 'draco@hogwarts.edu'},
      {name: 'Vincent Crabbe', email: 'vincent@hogwarts.edu'},
      {name: 'Gregory Goyle', email: 'gregory@hogwarts.edu'}
    ]
  }
]
const students = [
  {name: 'Harry Potter', email: 'harry@hogwarts.edu', campus: 'Gryffindor'},
  {name: 'Hermione Granger', email: 'hermione@hogwarts.edu', campus: 'Gryffindor'},
  {name: 'Ron Weasley', email: 'ron@hogwarts.edu', campus: 'Gryffindor'},
  {name: 'Ginny Weasley', email: 'ginny@hogwarts.edu', campus: 'Gryffindor'},
  {name: 'Neville Longbottom', email: 'neville@hogwarts.edu', campus: 'Gryffindor'},
  {name: 'Cedric Diggory', email: 'cedric@hogwarts.edu', campus: 'Hufflepuff'},
  {name: 'Ernie MacMillan', email: 'ernie@hogwarts.edu', campus: 'Hufflepuff'},
  {name: 'Hannah Abbott', email: 'hannah@hogwarts.edu', campus: 'Hufflepuff'},
  {name: 'Luna Lovegood', email: 'luna@hogwarts.edu', campus: 'Ravenclaw'},
  {name: 'Cho Chang', email: 'cho@hogwarts.edu', campus: 'Ravenclaw'},
  {name: 'Terry Boot', email: 'terry@hogwarts.edu', campus: 'Ravenclaw'},
  {name: 'Padma Patil', email: 'padma@hogwarts.edu', campus: 'Ravenclaw'},
  {name: 'Draco Malfoy', email: 'draco@hogwarts.edu', campus: 'Slytherin'},
  {name: 'Vincent Crabbe', email: 'vincent@hogwarts.edu', campus: 'Slytherin'},
  {name: 'Gregory Goyle', email: 'gregory@hogwarts.edu', campus: 'Slytherin'}
]


db.sync({force: true})
.then(function () {
  console.log('Dropped old data, now adding from seed');
  return Promise.all(campuses.map(campus => {
    Campus.create({name: campus.name, image: campus.image})
  }))
})
.then(() => {
  return Promise.all(students.map(student => {
    Student.create({name: student.name, email: student.email})
  }))
})
.then(() => Student.findAll())
.then(allStudents => {
  return Promise.all(allStudents.map(student => {
    const thisStudent = students.find(elem => elem.name === student.name);
    //how to spread out the async?
    student.setCampus(Campus.findOne({where: {name: thisStudent.campus}}))
  }))
})
.then(() => console.log('Finished seeding!'))
.catch(err => console.error('There was a problem seeding.', err, err.stack))
