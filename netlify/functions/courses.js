// Goal: Kellogg course reviews API!
//
// Business logic:
// - Courses can be taught by more than one lecturers (e.g. Brian Eng's KIEI-451 and Ben Block's KIEI-451)
// - Information on a course includes the course number (KIEI-451) and name (Intro to Software Development)
// - lecturerss can teach more than one course (e.g. Brian Eng teaches KIEI-451 and KIEI-925)
// - Reviews can be written (anonymously) about the lecturers/course combination (what would that be called?)
// - Reviews contain a String body, and a numeric rating from 1-5
// - Keep it simple and ignore things like multiple course offerings and quarters; assume reviews are written
//   about the lecturers/course combination only – also ignore the concept of a "user" and assume reviews
//   are written anonymously
//
// Tasks:
// - (Lab) Think about and write the domain model - fill in the blanks below
// - (Lab) Build the domain model and some sample data using Firebase
// - (Lab) Write an API endpoint, using this lambda function, that accepts a course number and returns 
//   information on the course and who teaches it
// - (Homework) Provide reviews of the lecturers/course combinations 
// - (Homework) As part of the returned API, provide the total number of reviews and the average rating for 
//   BOTH the lecturers/course combination and the course as a whole.

// === Domain model - fill in the blanks ===
// There are 4 models: courses, lecturers, reviews, and sections (lecturers/course combo)
// There is one many-to-many relationship: courses <-> lecturers, which translates to two one-to-many relationships:
// - One-to-many: lecturers -> sections
// - One-to-many: courses -> sections
// And one more one-to-many: sections -> reviews
// Therefore:
// - The first model, courses, contains the following fields (not including ID): course number, course name
// - The second model, lecturers, contains the following fields: lecturers name
// - The third model, reviews, contains the following fields: comments, rating, sections ID
// - The fourth model, sections, contains the following fields: course ID, lecturer ID

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/courses?courseNumber=KIEI-451
exports.handler = async function(event) {

  // get the course number being requested
  let courseNumber = event.queryStringParameters.courseNumber

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // ask Firebase for the course that corresponds to the course number, wait for the response
  let coursesQuery = await db.collection(`courses`).where(`courseNum`,`==`, courseNumber).get()

  // get the first document from the query
  let courses = coursesQuery.docs

  // get the id from the document
  let courseId = courses[0].id

  // get the data from the document
  let courseData = courses[0].data()

  let sectionsQuery = await db.collection(`sections`).where(`courseID`, `==`,courseID).get()
  let sections = sectionsQuery.docs
  let sectionData = sections[0].data()

  let lectQuery = await db.collection(`lecturers`).where(`id`, `==`, sectionData.lectID)
  let lecturers = lectQuery.docs
  let lectureData = lecturers[0].data()

  // set a new Array as part of the return value
  let returnValue = {
    id: courseId,
    courseNumber : courseData.courseNum,
    courseName : courseData.courseName,
    lectName: []
  }

  // ask Firebase for the sections corresponding to the Document ID of the course, wait for the response

  // get the documents from the query

  // loop through the documents
    // get the document ID of the sections
    // get the data from the sections
    // ask Firebase for the lecturers with the ID provided by the sections; hint: read "Retrieve One Document (when you know the Document ID)" in the reference
    // get the data from the returned document
    // add the lecturers's name to the sections's data
    // add the sections data to the courseData
    // 🔥 your code for the reviews/ratings goes here

  // return the standard response
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}