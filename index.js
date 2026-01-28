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

function LaterDate(dueDate, submittedDate){ //Checks to see if Due date is before submitted date, if so, returns true.
    let date1 = new Date(dueDate); let date2 = new Date(submittedDate); // Makes both dates into usable formats
    const late = submittedDate>dueDate;
    return late;
}

function getLearnerData(course, ag, submissions) {
    let learners = []; // This array is finally send out to print
    let learners2 = []; // This is to organize all the data into a single array
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
    // MAKE SURE TO ALSO CHECK ALL ASSIGNMENTS, also the 3rd assignment

            function tempSTOP(){
            for(const assignment of ag.assignments){ 
            //This puts the average score for assignments 1 and 2 into the learners array
                for(const submission of submissions){
                    let submittedDate = new Date(submission.submission.submitted_at);
                    let dueDate = new Date(assignment.due_at);
                    if(assignment.id===submission.assignment_id && assignment.id==1){
                        if(submission.learner_id===125){
                            //console.log(submission.submission.score, assignment.points_possible);
                            if(submittedDate>dueDate) // checks to see if the submitted date is late
                            { learners[0].a1 = submission.submission.score/assignment.points_possible
                              learners[0].a1 = learners[0].a1*.9;
                              continue;
                            }
                            learners[0].a1 = submission.submission.score/assignment.points_possible
                        } else if(submission.learner_id===132){
                            if(submittedDate>dueDate) // checks to see if the submitted date is late
                            { learners[1].a1 = submission.submission.score/assignment.points_possible
                              learners[1].a1 = learners[1].a1*.9;
                              continue;
                            }
                            learners[1].a1 = submission.submission.score/assignment.points_possible
                        }

                    } else if(assignment.id===submission.assignment_id && assignment.id==2){
                        if(submission.learner_id===125){
                            if(submittedDate>dueDate) // checks to see if the submitted date is late
                            { learners[0].a2 = submission.submission.score/assignment.points_possible
                              learners[0].a2 = learners[0].a2*.9;
                              continue;
                            }
                            learners[0].a2 = submission.submission.score/assignment.points_possible
                        } else if(submission.learner_id===132){
                            if(submittedDate>dueDate) // checks to see if the submitted date is late
                            { learners[1].a2 = submission.submission.score/assignment.points_possible
                              learners[1].a2 = learners[1].a2*.9;
                              continue;
                            }
                            learners[1].a2 = submission.submission.score/assignment.points_possible
                        }
                    }
                } 
            }
          } // end of temp function


          function calculateScore(score, points_possible){

          }
          function noteLearnerID(learnerID){
            console.log(learnerID); // this categorizes the learner ID
            for(const learner of learners){
              console.log(learnerID);
              if (learners.some(learnerID)){
                console.log("It is");
                break;
              };
              learners.push({id:learnerID});
            }
            console.log(learners);
          }
          // Starting from the ground up - code
          for(const assignment of ag.assignments){
            for(const submission of submissions){
              if(submission.assignment_id===assignment.id){
                learners2.push({learner_id: submission.learner_id, assignment_id: submission.assignment_id, score: submission.submission.score, points_possible: assignment.points_possible, submitted: new Date(submission.submission.submitted_at), due: new Date(assignment.due_at), });
              }
            }
          }
          for(info of learners2){
            //noteLearnerID(info.learner_id);
            if(info.submitted<Date){
              learners2.pop(info);
              
            }

            learners.push({id: info.learner_id});
          }
          for (match in learners){ // This for loop gets rid of duplicate entries. 
            // MAKE SURE TO RUN AS ONE OF THE LAST LOOPS.
            if(learners[match] == learners[match]){
              learners.pop(match);
            }
          }
          
          console.log(learners2);
    //This determines the weighted average of the scores, make sure to do this last, as that allows the penalties to be applied.
 


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