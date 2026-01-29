
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

function calculateScore(score, points_possible, penalty=false){
  let result = score/points_possible;
  
  while(penalty==true){
    result=result*.9
    break;
  }
//  console.log(result);
  return result;
}


let results = [];
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
          // Starting from the ground up - code
          for(const assignment of ag.assignments){
            for(const submission of submissions){
              if(submission.assignment_id===assignment.id){
                learners2.push({learner_id: submission.learner_id, assignment_id: submission.assignment_id, score: submission.submission.score, points_possible: assignment.points_possible, submitted: new Date(submission.submission.submitted_at), due: new Date(assignment.due_at), });
              }
            }
          }


          let organizeByLearners = {};
            for(info of learners2){ // This loop is organzing assignments by learners
                let id = info.learner_id;
                if(!organizeByLearners[id]){
                    organizeByLearners[id] = [];
                }
                organizeByLearners[id].push(info);  
            }

            for (let learner_ID in organizeByLearners){
              let totalScore = 0;
              let possiblePoints = 2;
              let needsGraded = true;
              for(let info of organizeByLearners[learner_ID]){
                let score = 0;
                possiblePoints = 0;
                //console.log("info:", info, "organ learner id:", organizeByLearners[learner_ID]);

                if(info.due>new Date()){
                  // This gets rid of entries with due dates in the future
                  organizeByLearners[learner_ID].pop(info);
                  needsGraded = false;
                }
                else if(info.due<info.submitted){ // checks for late submissions
                  penaltyScore = calculateScore(info.score, info.points_possible, true);
                  //console.log(info.assignment_id);                
                    score = penaltyScore;
                    possiblePoints = info.points_possible;
                }
                else{
                  score = calculateScore(info.score, info.points_possible, false);
                  points_possible = info.points_possible;
                }

                //learners[]= {score};
                //learners = [{id:info.learner_id, [info.assignment_id]: score}]// Overwrites entry each generation?
               
                learners.push({id: info.learner_id, avg: "temp", [info.assignment_id]: score, possiblePoints: info.points_possible,fullPoints: info.score})
                if(needsGraded === false){ //This HAS to come after pushing the assignment id!!!
                  // This checks to see if the assignment has been marked to only be graded at a later date,
                  // then it deletes the entry from learners
                  learners.pop(info);
                  needsGraded = true; 
                }
                totalScore+=score;
                //IMPORTANT ===> ACTION PLAN: learners provides all the information required for me to finalize the output!

              // Second loop
   
              }
            // First loop loop
            }
          

          let organizeLearners2 = {}; // This will organize the FINAL learners to prepare for result
            for(info of learners){ // This loop is organzing assignments by learners
                let id = info.id;
                if(!organizeLearners2[id]){
                    organizeLearners2[id] = [];
                }
                organizeLearners2[id].push(info);  
            }


            //console.log ("or2", organizeLearners2);
            let totalPoints = 0; let totalPossible = 0;
            for (let learner_id in organizeLearners2){

              let finished ={
                id: Number(learner_id),
                avg: 1,
              }
             // console.log("Finish", finished)
             // results[learner_id] = {id: [learner_id]};
              for(let info of organizeLearners2[learner_id]){ // This will be the same learner id
             //   console.log("test", Object.keys(info));
              //  console.log("HERE", info);
                assignment_ids = Object.keys(info)
                assignment_id = assignment_ids[0];
                //above gets the unknown assignment id
               // console.log ("here again", info);
                  //finished[info] = ({id: info.id, avg: "temp1",});
                  totalPoints+=(info[assignment_id]*info.possiblePoints); // This equation reverts the score back into a point format
                  totalPossible+=info.possiblePoints;
                  finished[assignment_id] = info[assignment_id];
                //The above equation allows the assignments to be set to their grades
                
              // second loop
              
              }
             // console.log("total: ", totalPoints, "possible", totalPossible);
              finished.avg = totalPoints/totalPossible;
              //results[info] = ({id: organizeLearners2[learner_id][info].id, avg: "temp1",});
            // outer loop
            results.push(finished);
            }











          //console.log(organizeByLearners);
    //This determines the weighted average of the scores, make sure to do this last, as that allows the penalties to be applied.
 

    
    const result = results; //This sets learns to the result.
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
//console.log(results);