const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var islogin = false;
var user;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "OnlineExamDB",
});
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "test",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.post("/register", (req, res) => {
  islogin = true;
  const mydata = req.body.userdata;
  const sqlInsert =
    "insert into users (Firstname,Lastname,Username,Password,Email,PhoneNumber,Role) values (?,?,?,?,?,?,?)";

  const checkusername = "select username from users where username=?";

  const getallcourses = "select Coursename from courses";

  const coursesteacher = [];

  const values = [];

  var flag = 0;

  //   bcrypt.hash(mydata.password, saltRounds, (err, hash) => {
  //     if (err) {
  //       cosnole.log(err);
  //     }
  //     db.query(checkusername, [mydata.username], (err, result) => {
  //       if (result.length === 0) {
  //         db.query(
  //           sqlInsert,
  //           [
  //             mydata.firstname,
  //             mydata.lastname,
  //             mydata.username,
  //             hash,
  //             mydata.email,
  //             parseInt(mydata.phonenumber),
  //             mydata.role,
  //           ],
  //           (err, result) => {
  //             // console.log(result);

  //             db.query(getallcourses, (err, results) => {
  //               const allval = Object.keys(mydata);
  //               results.map((value) => {
  //                 allval.map((val) => {
  //                   if (value.Coursename == val && mydata[val] == true) {
  //                     // var obj = {};
  //                     // obj[value.Coursename] = mydata[val];

  //                     // coursesteacher.push(obj);
  // flag=1;
  //                     coursesteacher.push(value.Coursename);

  //                   } else {
  // flag=0;

  //                   }
  //                 });
  //               });

  //               coursesteacher.map((v) => {
  //                 const getcourseid =
  //                   "select CourseID from courses where Coursename=?";

  //                 db.query(getcourseid, v, (err, result) => {
  //                   // console.log(result[0].CourseID);
  //                   // console.log(mydata.username)
  //                   console.log(v);

  //                   const insert =
  //                     "insert into courseteacher (CourseID,Coursename,Username) values (?,?,?)";
  //                   db.query(
  //                     insert,
  //                     [result[0].CourseID, v, mydata.username],
  //                     (err, result) => {
  //                       console.log(err);
  //                     }
  //                   );
  //                 });
  //               });
  //             });
  //             res.send({ message: [1,flag] });

  //             console.log(err);
  //           }
  //         );
  //       } else {
  //         islogin = true;
  //         res.send({ message: [0,flag] });
  //       }
  //       console.log(err);
  //       // console.log(result);
  //     });
  //   });

  bcrypt.hash(mydata.password, saltRounds, (err, hash) => {
    if (err) {
      cosnole.log(err);
    }
    db.query(checkusername, [mydata.username], (err, result) => {
      if (result.length === 0) {
        db.query(getallcourses, (err, results) => {
          const allval = Object.keys(mydata);
          results.map((value) => {
            allval.map((val) => {
              if (value.Coursename == val && mydata[val] == true) {
                // var obj = {};
                // obj[value.Coursename] = mydata[val];

                // coursesteacher.push(obj);
                flag = 1;
                coursesteacher.push(value.Coursename);
              }
            });
          });
          console.log(flag);
          if (flag == 1) {
            db.query(
              sqlInsert,
              [
                mydata.firstname,
                mydata.lastname,
                mydata.username,
                hash,
                mydata.email,
                parseInt(mydata.phonenumber),
                mydata.role,
              ],
              (err, result) => {
                // console.log(result);

                res.send({ message: [1, 1] });

                console.log(err);
              }
            );

            coursesteacher.map((v) => {
              const getcourseid =
                "select CourseID from courses where Coursename=?";

              db.query(getcourseid, v, (err, result) => {
                // console.log(result[0].CourseID);
                // console.log(mydata.username)
                console.log(v);

                const insert =
                  "insert into courseteacher (CourseID,Coursename,Username) values (?,?,?)";
                db.query(
                  insert,
                  [result[0].CourseID, v, mydata.username],
                  (err, result) => {
                    console.log(err);
                  }
                );
              });
            });
          } else {
            islogin = true;
            res.send({ message: [1, 0] });
          }
        });
      } else {
        res.send({ message: [0, flag] });
      }
    });
  });

  // console.log(mydata.firstname);
  // console.log(mydata.lastname);
  // console.log(mydata.username);
  // console.log(mydata.password);
  // console.log(mydata.email);
  // console.log(mydata.phonenumber);
  // console.log(mydata.role);

  const sqlshowdata = "select Username from users where Role='Teacher'";
  db.query(sqlshowdata, (err, result) => {
    // console.log(result);
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const s = "select * from allusers where email =?";

  db.query(s, email, (err, result) => {
    if (result.length == 1) {
      const pass = result[0].password;
      const role = result[0].role_id;
      console.log(pass);

      if (password == pass) {
        res.send({ e: "Correct", r: role, f: email });
      } else {
        res.send({ e: "Wrong username Password" });
      }
    } else {
      res.send({ e: "Invalid" });
    }
  });
});

// app.post("/login", (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   const myquery = "select * from users where username = ?";
//   const myquery2 = "select role from users where username =?";

//   db.query(myquery, username, (err, result) => {
//     if (err) {
//       console.log({ err: err });

//       res.send({ err: err });
//     }
//     if (result.length > 0) {
//       // console.log(result[0].password)
//       bcrypt.compare(password, result[0].Password, (err, resp) => {
//         if (resp) {
//           req.session.user = result;
//           // console.log(req.session.user)

//           res.send({ mydata: result });
//           islogin = true;
//         } else {
//           res.send({ message: "Wrong Username/Password combination" });
//         }
//       });

//       // res.send(result);
//     } else {
//       res.send({ message: "User does not Exist" });
//     }
//   });
// });

// app.get("/login", (req, res) => {
//   if (req.session.user) {
//     res.send({ loggedIn: true, user: req.session.user });
//   } else {
//     res.send({ loggedIn: false });
//   }
// });

app.post("/checkloggedIn", (req, res) => {
  if (islogin == false) {
    islogin = false;
    res.send({ loggedIn: false });
  } else {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  }
});

app.post("/logout", (req, res) => {
  const u = req.body.a;
  if (u == false) {
    islogin = false;
    res.send({ loggedIn: false });
  }
});
app.get("/api/get", (req, res) => {
  const sqlshowdata = "select * from users";
  db.query(sqlshowdata, (err, result) => {
    console.log(result);
    console.log(result);
    res.send(result);
  });
});
app.post("/addcourse", (req, res) => {
  const mydata = req.body.userdata;

  const sqlInsert = "insert into courses(CourseID,Coursename) values (?,?)";

  const checkcourseid = "select CourseID from courses where CourseID=?";

  db.query(checkcourseid, [mydata.CourseID], (err, result) => {
    if (result.length === 0) {
      db.query(
        sqlInsert,
        [mydata.CourseID, mydata.Coursename],
        (err, result) => {
          console.log(result);
          res.send({ message: 1 });
          // console.log(err);
        }
      );
    } else {
      res.send({ message: 0 });
    }
    console.log(err);
    console.log(result);
  });
});

app.post("/getcourses", (req, res) => {
  const sqlget = "select * from courses";

  db.query(sqlget, (err, result) => {
    res.send({ mysubjects: result });
  });
});

var a = 0;
var b = 0;
var c = 0;
var d = 0;
var e = 0;
app.post("/getall", (req, res) => {
  const sql = "select count(*) as total from  department";
  db.query(sql, (err, result) => {
    a = result;

    // res.send({d:result})
  });

  const sql2 = "select count(*) as total from  classes";
  db.query(sql2, (err, result) => {
    b = result;
  });

  const sql3 = "select count(*) as total from  courses";
  db.query(sql3, (err, result) => {
    c = result;
  });

  const sql4 = "select count(*) as total from  teacher";
  db.query(sql4, (err, result) => {
    d = result;
  });

  const sql5 = "select count(*) as total from  student";
  db.query(sql5, (err, result) => {
    e = result;
  });

  res.send({ dep: a, class: b, course: c, teach: d, student: e });
});

app.post("/selectdepartment", (req, res) => {
  const sql = "select *  from  department order by department_id ASC";
  db.query(sql, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.post("/deletedepartment", (req, res) => {
  const id = req.body.m;

  const sql = "delete  from department where department_id=" + id;
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

app.post("/adddepartment", (req, res) => {
  console.log(req.body.dep.department_name);

  const sql = "insert into department (department_name) values (?)";
  db.query(sql, req.body.dep.department_name, (err, result) => {
    // console.log("--------------------------------------"+err)
    res.send(result);
  });
});

app.post("/selectclass", (req, res) => {
  const sql = "select *  from classes";
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

app.post("/deleteclass", (req, res) => {
  const id = req.body.m;

  const sql = "delete  from classes where class_id=" + id;
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

app.post("/addclasses", (req, res) => {
  // console.log(req.body.c.department_name)
  const class_name = req.body.c.class_name;
  const dep_name = req.body.c.department_name;

  const sql = "select department_id from department where department_name=?";

  db.query(sql, [dep_name], (err, result1) => {
    console.log(result1[0].department_id);
    const sql2 = "insert into classes (class_name,department_id) values (?,?)";
    db.query(sql2, [class_name, result1[0].department_id], (err, result) => {
      //  console.log(result);
      //  console.log(err);
    });
  });
  // console.log(class_name,dep_name)
});
app.post("/selectcourse", (req, res) => {
  const sql = "select *  from courses";
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

app.post("/deletecourse", (req, res) => {
  const id = req.body.m;

  const sql = "delete  from courses  where course_id=" + id;
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

app.post("/addcourses", (req, res) => {
  console.log(req.body.c.course_name);

  const sql = "insert into courses (course_name) values (?)";
  db.query(sql, req.body.c.course_name, (err, result) => {
    res.send(result);
  });
});

app.post("/selectteacher", (req, res) => {
  const a =
    "SELECT teacher.teacher_id,teacher.teacher_name,teacher.teacher_email,courses.course_name from teacher INNER JOIN courses ON teacher.course_id=courses.course_id  ORDER BY teacher.teacher_id ASC;";

  db.query(a, (err, result) => {
    res.send(result);
    // console.log(result);
  });
});



app.post("/selectteachernew", (req, res) => {
  const a =
 

"SELECT     teacher.teacher_id,teacher.teacher_name,teacher.teacher_email,GROUP_CONCAT(courses.course_name) as allcourses from  teacher INNER JOIN teacher_course ON teacher.teacher_id=teacher_course.teacher_id INNER JOIN  courses  ON courses.course_id=teacher_course.course_id GROUP BY teacher.teacher_id ORDER BY teacher.teacher_id ASC"

  db.query(a, (err, result) => {
    res.send(result);
    console.log(result);
  });
});






app.post("/getteachername", (req, res) => {
  const a ="select teacher_name from teacher";
    

  db.query(a, (err, result) => {
    res.send(result);
    // console.log(result);
  });
});





app.post("/deleteteacher", (req, res) => {
  const id = req.body.m;

  const sql3 = "delete  from teacher  where teacher_id=" + id;
  const sql = "select teacher_email from teacher where teacher_id=" + id;

  db.query(sql, (err, result) => {
    const sql2 = "delete from allusers where email=?";
    db.query(sql2, result[0].teacher_email, (err, result2) => {
      db.query(sql3, (err, result3) => {});
    });
  });
});

app.post("/getteacher", (req, res) => {
  const teacheremail = req.body.email;
  // console.log(teacheremail);

  const sql = "SELECT     teacher.teacher_id,teacher.teacher_name,teacher.teacher_email,GROUP_CONCAT(courses.course_name) as allcourses from  teacher INNER JOIN teacher_course ON teacher.teacher_id=teacher_course.teacher_id INNER JOIN  courses  ON courses.course_id=teacher_course.course_id  where teacher.teacher_email=? GROUP BY teacher.teacher_id ORDER BY teacher.teacher_id ASC ";

  db.query(sql, teacheremail, (err, result1) => {
    const t = result1[0].teacher_id;

    const sql2 =
      "  SELECT department.department_name from department INNER JOIN classes ON department.department_id=classes.department_id INNER JOIN class_teacher ON classes.class_id = class_teacher.class_id  WHERE class_teacher.teacher_id="+t;
      

    db.query(sql2, (err, result2) => {
      const tid = result1[0].teacher_id;
    
      const sql3 =
        "  SELECT classes.class_name from classes INNER JOIN class_teacher ON classes.class_id=class_teacher.class_id WHERE class_teacher.teacher_id=" +
        tid;
      db.query(sql3, (err, result3) => {
        res.send({ res: result1, dep: result2[0], class: result3 });
        console.log(err);
      });
    });

    // res.send({res:result});
  });
});
// app.post("/addteacher", (req, res) => {
//   // console.log(req.body.c.department_name)
//   const teacher_name = req.body.t.teacher_name;
//   const teacher_email = req.body.t.teacher_email;
//   const teacher_password = req.body.t.teacher_password;
//   const course_name = req.body.t.course_name;
//   const role = 2;

//   const sql = "select course_id from courses where course_name=?";
//   const s = "insert into allusers (email,password,role_id) values(?,?,?) ";
//   const checkuser = "select * from allusers where email=?";
//   const allcourses = req.body.t.values;
//   db.query(checkuser, [teacher_email], (err, result) => {
//     console.log(result.length);

//     if (result.length == 1) {
//       res.send({ e: 0 });
//     } else {
//       db.query(sql, [course_name], (err, result1) => {
//         const sql2 =
//           "insert into teacher (teacher_name,teacher_password,teacher_email,course_id) values (?,?,?,?)";
//         db.query(
//           sql2,
//           [teacher_name, teacher_password, teacher_email, result1[0].course_id],
//           (err, result) => {
//             console.log(err);

//             db.query(s, [teacher_email, teacher_password, role], (err, r) => {
//               res.send({ e: 1 });
//             });
//           }
//         );
//       });
//     }
//   });
// });



app.post("/addteacher", (req, res) => {
  // console.log(req.body.c.department_name)
  const teacher_name = req.body.t.teacher_name;
  const teacher_email = req.body.t.teacher_email;
  const teacher_password = req.body.t.teacher_password;

  const role = 2;

 
  const s = "insert into allusers (email,password,role_id) values(?,?,?) ";
  const checkuser = "select * from allusers where email=?";

  db.query(checkuser, [teacher_email], (err, result) => {
    console.log(result.length);

    if (result.length == 1) {
      res.send({ e: 0 });
    } else {

        const sql2 =
          "insert into teacher (teacher_name,teacher_password,teacher_email) values (?,?,?)";
        db.query(
          sql2,
          [teacher_name, teacher_password, teacher_email],
          (err, result) => {
            console.log(err);

            db.query(s, [teacher_email, teacher_password, role], (err, r) => {
              res.send({ e: 1 });
            });
          }
        );
   
    }
  });
});
// console.log(class_name,dep_name)

app.post("/selectstudent", (req, res) => {
  const a =
    "SELECT student.student_id,student.student_name,student.student_email ,classes.class_name,department.department_name from student  INNER JOIN classes ON student.class_id=classes.class_id INNER JOIN department ON classes.department_id = department.department_id  ORDER BY student.student_id ASC ;";

  db.query(a, (err, result) => {
    res.send(result);
    // console.log(result);
  });
});

app.post("/getstudent", (req, res) => {
  const studentemail = req.body.email;

  const sql =
    "SELECT student.student_id,student.student_name,student.student_email ,classes.class_name,department.department_name from student  INNER JOIN classes ON student.class_id=classes.class_id INNER JOIN department ON classes.department_id = department.department_id where student.student_email=?;";

  db.query(sql, studentemail, (err, result) => {
    const stid = result[0].student_id;

    const sql2 =
      " SELECT courses.course_name from courses INNER JOIN department_course ON courses.course_id=department_course.course_id    WHERE department_course.department_id=( SELECT department.department_id from student  INNER JOIN classes ON student.class_id=classes.class_id INNER JOIN department ON classes.department_id = department.department_id  WHERE student.student_id=" +
      stid +
      ");";

    db.query(sql2, (err, result2) => {
      res.send({ r: result, co: result2 });
    });

    // console.log(result);
  });
});

app.post("/deletestudent", (req, res) => {
  const id = req.body.m;

  const sql3 = "delete  from student  where student_id=" + id;
  const sql = "select student_email from student where student_id=" + id;

  db.query(sql, (err, result) => {
    console.log(result[0].student_email);
    const sql2 = "delete from allusers where email=?";
    db.query(sql2, result[0].student_email, (err, result2) => {
      db.query(sql3, (err, result3) => {});
    });
  });
});

app.post("/getc", (req, res) => {
  const dep = req.body.c;
  const sql = "select department_id from department where department_name=?";

  db.query(sql, [dep], (err, result1) => {
    const id = result1[0].department_id;

    const sql2 =
      "SELECT class_name FROM classes  WHERE department_id =   ( SELECT department_id FROM  department  WHERE department_id = ?);";
    db.query(sql2, [id], (err, result2) => {
      res.send(result2);
      console.log(err);
    });
  });
  // console.log(req.body.c.department_name)
});
// console.log(class_name,dep_name)

app.post("/addstudent", (req, res) => {
  // console.log(req.body.c.department_name)
  const student_name = req.body.s.student_name;
  const student_email = req.body.s.student_email;
  const student_password = req.body.s.student_password;
  const class_name = req.body.s.class_name;
  const s = "insert into allusers (email,password,role_id) values(?,?,?) ";
  const role = 3;

  const sql = "select class_id from classes where class_name=?";

  const checkuser = "select * from allusers where email=?";

  db.query(checkuser, [student_email], (err, result) => {
    if (result.length == 1) {
      res.send({ e: 0 });
    } else {
      db.query(sql, [class_name], (err, result1) => {
        const sql2 =
          "insert into student (student_name,student_password,student_email,class_id) values (?,?,?,?)";
        db.query(
          sql2,
          [student_name, student_password, student_email, result1[0].class_id],
          (err, result) => {
            db.query(s, [student_email, student_password, role], (err, r) => {
              res.send({ e: 1 });
            });
          }
        );
      });
    }
  });

  // console.log(class_name,dep_name)
});

app.post("/insertquestions", (req, res) => {
  const questions = JSON.stringify(req.body.qns.Questions);
  const question_bank_name = req.body.qns.exam_name;
  const marks_per_question = req.body.qns.marks_per_question;
  const total_qns = req.body.totalqns;

  console.log(req.body.t);

  // console.log(JSON.stringify(questions));
  const sql2 = "select teacher_id from teacher where teacher_email = ?";

  db.query(sql2, req.body.t, (err, result) => {
    const teachid = result[0].teacher_id;
    const sql =
      "insert into question_bank (teacher_id,QuestionBank_Name,MarksPerQuestion,questions,total_questions) values(?,?,?,?,?)";

    db.query(
      sql,
      [teachid, question_bank_name, marks_per_question, questions, total_qns],
      (err, result) => {
        console.log(err);
        // console.log(result)
      }
    );
  });
});

app.post("/getquestionbank", (req, res) => {
  const t = req.body.t;
  console.log(t);
  const sql2 = "select teacher_id from teacher where teacher_email = ?";

  db.query(sql2, req.body.t, (err, result) => {
    console.log(result);

    const sql =
      "select QuestionBank_Name from question_bank where teacher_id =" +
      result[0].teacher_id;
    db.query(sql, (err, result) => {
      res.send({ exam_n: result });
    });
  });
});

app.post("/createexam", (req, res) => {
  const exam_name = req.body.ex.exam_name;
  const date_time = req.body.ex.date_time;
  const total_time = req.body.ex.total_time;

  // var datetime = new Date(date_time);
  // const userdatetime= datetime.toLocaleString('en-GB');

  const class_name = req.body.ex.class_name;
  const qbank_name = req.body.ex.qb_name;
  const sql1 = "select class_id from classes where class_name=?";
  const sql2 =
    "select QuestionBank_id from question_bank where QuestionBank_Name=?";
  const sql3 =
    "insert into exam (Exam_name,Exam_dt,Exam_total_time,class_id,QuestionBank_id) values(?,?,?,?,?)";

  //   console.log(exam_name);

  db.query(sql1, class_name, (err, result1) => {
    const classid = result1[0].class_id;

    db.query(sql2, qbank_name, (err, result2) => {
      const qbid = result2[0].QuestionBank_id;

      db.query(
        sql3,
        [exam_name, date_time, total_time, classid, qbid],
        (err, result3) => {
          const sql4 = "select Exam_id from exam order by Exam_id desc limit 1";

          db.query(sql4, (err, result4) => {
            const examid = result4[0].Exam_id;
            const sql5 =
              "select student_id from student where class_id = " + classid;
            db.query(sql5, (err, result5) => {
              result5.map((e) => {
                const sql6 =
                  "insert into student_exam (student_id,exam_id) values(?,?)";

                db.query(
                  sql6,
                  [e.student_id, examid, 0, 0],
                  (err, result) => {}
                );
              });
            });
          });
        }
      );
    });
  });
});

app.post("/getexamdetails", (req, res) => {
  const student_email = req.body.s;
  const sql = "select student_id from student where student_email=?";
  db.query(sql, student_email, (err, result1) => {
    const student_id = result1[0].student_id;

    const sql2 =
      "select  exam.exam_id ,exam.exam_name,exam.Exam_dt,exam.Exam_total_time,question_bank.MarksPerQuestion,question_bank.total_questions,teacher.teacher_name from exam INNER JOIN student_exam ON exam.Exam_id=student_exam.exam_id INNER JOIN question_bank ON exam.QuestionBank_id = question_bank.QuestionBank_id INNER JOIN teacher ON teacher.teacher_id=question_bank.teacher_id where student_exam.student_id=" +
      student_id;

    db.query(sql2, (err, result2) => {
      res.send(result2);
    });
  });
});

app.post("/getmyexam", (req, res) => {
  const id = req.body.q;

  const sql2 = "select * from exam where exam_id =" + id;

  db.query(sql2, (err, result) => {
    res.send(result);
  });
});
app.post("/getmyquestions", (req, res) => {
  const id = req.body.r;

  const sql2 =
    "SELECT * from question_bank INNER JOIN exam ON question_bank.QuestionBank_id=exam.QuestionBank_id WHERE exam.Exam_id=" +
    id;

  db.query(sql2, (err, result) => {
    res.send(result);
  });
});

app.post("/result", (req, res) => {
  var totalmarks = 0;
  const answers = req.body.studentans;
  const rightans = req.body.rightans;
  const marksperqn = req.body.markspq;
  const examid = req.body.exam_id;
  const stemail = req.body.st_id;
  const totalquestions = req.body.totalqns;
  const high = marksperqn * totalquestions;

  const sql = "select student_id from student where student_email =? ";

  const s = [];
  const r = [];

  answers.fieldArray.map((e, i) => {
    r.push(e.Answer);
  });

  rightans.map((f) => {
    s.push(f.Answer);
  });
  console.log(r);
  console.log(s);
  for (let i = 0; i <= s.length; i++) {
    if (s[i] == "a" && r[i] == "a") {
      totalmarks = totalmarks + marksperqn;
    } else if (s[i] == "b" && r[i] == "b") {
      totalmarks = totalmarks + marksperqn;
    } else if (s[i] == "c" && r[i] == "c") {
      totalmarks = totalmarks + marksperqn;
    } else if (s[i] == "d" && r[i] == "d") {
      totalmarks = totalmarks + marksperqn;
    }
  }

  console.log(totalmarks);

  console.log(e.student_id);

  db.query(sql, stemail, (err, result) => {
    const sid = result[0].student_id;

    const sql2 =
      "select studentexam_id from student_exam where student_id=? and exam_id=?";

    db.query(sql2, [sid, examid], (err, result2) => {
      console.log(err);
      console.log(result2);

      const s = result2[0].studentexam_id;
      const sql3 =
        "insert into student_marks (studentexam_id,marks,marks_out_of) values(?,?,?) ";

      db.query(sql3, [s, totalmarks, high], (err, result) => {
        res.send(result);
      });
    });
  });
});

app.post("/adddepartmentcourse", (req, res) => {
  const data = req.body.s;
  const department_name = data.department_name;
  const courses = data.values;
  // const sql2 = "select * from exam where exam_id =" + id;
  // console.log(data)
  // console.log(department_name)
  // console.log(courses)
  const sql = "select department_id from department where department_name = ?";
  db.query(sql, department_name, (err, result) => {
    const department_id = result[0].department_id;
    // console.log(department_id)
    //  console.log(result)
    courses.map((e) => {
      const sql2 = "select course_id from courses where course_name = ?";
      db.query(sql2, e, (err, r) => {
        console.log(r);
        const sql3 =
          "insert into department_course (department_id,course_id) values (?,?)";
        db.query(sql3, [department_id, r[0].course_id], (err, result) => {
          console.log(err);
        });
      });
    });
    console.log(a);
  });
});

app.post("/addclassteacher", (req, res) => {
  const data = req.body.s;
  console.log(data);
  const teacher_name = data.teacher_name;
  const department_name = data.department_name;
  const classes = data.values;
  // console.log(typeof(classes))

  //   console.log(classes.length);

  const sql = "select teacher_id from teacher where teacher_name=?";
  const sql2 = "select department_id from department where department_name=?";

  db.query(sql, teacher_name, (err, result) => {
    const teacher_id = result[0].teacher_id;

    db.query(sql2, department_name, (err, result) => {
      const department_id = result[0].department_id;

      classes.map((e) => {
        const sql3 = "select class_id from classes where class_name = ?";
        db.query(sql3, e, (err, r) => {
          const sql4 =
            "insert into class_teacher (class_id,teacher_id) values (?,?)";
          db.query(sql4, [r[0].class_id, teacher_id], (err, result) => {
            console.log(err);
          });
        });
      });
    });
  });
});










app.post("/addcourseteacher", (req, res) => {
  const data = req.body.s;
  const teacher_name = data.teacher_name;
  const courses = data.values;
  const sql = "select teacher_id from teacher where teacher_name=?";

  db.query(sql, teacher_name, (err, result) => {
    const teacher_id = result[0].teacher_id;
      courses.map((e) => {
        const sql3 = "select course_id from courses where course_name = ?";
        db.query(sql3, e, (err, r) => {
          const sql4 =
            "insert into teacher_course (teacher_id,course_id) values (?,?)";
          db.query(sql4, [ teacher_id,r[0].course_id], (err, result) => {
            console.log(err);
          });
        });
      });
    });
  });






















app.post("/getteacherdepartment", (req, res) => {
  const t = req.body.c;
  const sql = "select teacher_id from teacher where teacher_name=?";

  db.query(sql, t, (err, result) => {
    const teacher_id = result[0].teacher_id;
    const sql2 =
      "SELECT department.department_name from department INNER JOIN classes ON department.department_id=classes.department_id INNER JOIN class_teacher ON classes.class_id = class_teacher.class_id  WHERE class_teacher.teacher_id=" +
      teacher_id;

    db.query(sql2, (err, result1) => {
      console.log(result1);
      const department_name = result1[0].department_name;

      const sql3 =
        "select department_id from department where department_name=?";
      db.query(sql3, department_name, (err, result2) => {
        console.log(result2);
        const department_id = result2[0].department_id;

        const sql4 =
          "SELECT courses.course_name from courses INNER JOIN department_course ON courses.course_id=department_course.course_id WHERE department_course.department_id=" +
          department_id;

        db.query(sql4, (err, result3) => {
          res.send(result3)
        });
      });
    });
  });
});







app.post("/getresult", (req, res) => {
  const student_email = req.body.st;
 console.log(student_email)
 sql ="select student_id from student where student_email=?";
 db.query(sql,student_email,(err, result) => {


  const student_id = result[0].student_id
    // console.log(student_id)
const sql2="select student.student_id,student.student_name,exam.Exam_name,exam.Exam_dt,question_bank.MarksPerQuestion,student_marks.marks,student_marks.marks_out_of  from student INNER JOIN student_exam ON student_exam.student_id=student.student_id INNER JOIN exam ON exam.Exam_id=student_exam.exam_id INNER JOIN question_bank ON exam.QuestionBank_id=question_bank.QuestionBank_id INNER JOIN student_marks  ON student_marks.studentexam_id = student_exam.studentexam_id where student_exam.student_id="+student_id

  db.query(sql2,(err, result2) => {
res.send(result2)
  
   })

 })

});
app.listen(3001, () => {
  console.log("running at port 3001!! YOU CAN DO IT!!");
});
