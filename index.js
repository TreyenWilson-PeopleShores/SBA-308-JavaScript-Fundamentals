// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: "39"
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function NotANumberError(number){
    throw new Error("That is not a valid number.");
}

function getLearnerData(course, ag, submissions) {
    let learners = [{learner_id: 0, averageScore: 1, a1:.5, a2: .4,},{learner_id: 0, averageScore: 1, a1:.5, a2: .4,}]; // This array is to store learner information
    try{
        if(course.id!==ag.course_id){ // Checks to see if the course id is valid, if not, sends an error.
            throw new Error("Incorrect course ID.");
        }
        let x = 0; let y = 0; // Incremental vars
        let assignmentIDs = []
        while (y<ag.assignments.length){ 

            assignmentIDs.push(ag.assignments[y].id); //pushing the assignment ids to a specifc array for them
            y++;
        }
        for (let x = 0; x<submissions.length; x++){// Error detection for assignments not matching
            if(!assignmentIDs.includes(submissions[x].assignment_id)){ //this is checking it against each elememt in that array
                throw new Error("The assginments do not match.");  
            } 
        }

        for(let i = 0; i<ag.assignments.length; i++){
            if(ag.assignments[i].points_possible<=0){
                throw new Error("Points possible cannot be 0 or lower.")
            }
        }
        for(let i = 0; i<ag.assignments.length; i++){
            if(isNaN(ag.assignments[i].points_possible)){
                NotANumberError();
            }
        } for(let i = 0; i<submissions.length; i++){
            if(isNaN(submissions[i].submission.score)){
                NotANumberError();
            }
        }
    } catch(error){
        console.log("There was an error: " + error.message);
    }

    const result = learners; //This sets learns to the result.
    /*[ // use this for format    - Use this for formulas
    {
        id: submissions[x].learner_id,
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: 0.94, // 47 / 50
        2: 1.0 // 150 / 150
        },
        {
        id: 132,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: 0.78, // 39 / 50
        2: 0.833 // late: (140 - 15) / 150
    }
    ]; */


    return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);