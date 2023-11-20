const app = require('express');
const router = app.Router();
const { execCommand } = require('../../config/cmdExecution');
const { logWriter } = require('../../config/errorWrite');
const multer = require('multer')
const fs = require('fs')
const path = require('path');
var CryptoJS = require("crypto-js");
//user create
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const { consumers } = require('stream');
const hashAsync = promisify(bcrypt.hash);
const compareAsync = promisify(bcrypt.compare);

router.post('/createuser', async (req, res) => {
  console.log("create user=>", req.body);
    //     first_name = req.body.newuser.first_name,
    //     last_name = req.body.newuser.last_name,
    //     user_name = req.body.newuser.user_name,
    //     user_id = req.body.newuser.user_id,
    //     email = req.body.newuser.email,
    //     phone_no = req.body.newuser.phone_no,
    //     hashedPassword = await hashAsync(req.body.newuser.password, 10);
    //     publication = req.body.newuser.publication,
    //     role = req.body.newuser.role,
    //     department = req.body.newuser.department,
    //     date_format = req.body.newuser.date_format,
    //     statuss = req.body.newuser.status,
    //     center = req.body.newuser.center,
    //     from_date = req.body.newuser.from_date,
    //     end_date = req.body.newuser.end_date,
    //     remarks = req.body.newuser.remarks
    // var query = `INSERT INTO master_user (first_name, last_name, user_name, user_id, email, password, phone_no, publication, role, department, date_format, status, center, from_date, end_date, remarks) VALUES ('${first_name}', '${last_name}', '${user_name}', '${user_id}', '${email}', '${hashedPassword}', '${phone_no}', '${publication}', '${role}', '${department}', '${date_format}', '${statuss}', '${center}', '${from_date}', '${end_date}', '${remarks}');`
    // //console.logquery);
    // execCommand(query).then(result => res.json("insert successfully create user")).catch(err => logWriter(query, err))
})

router.post('/updateuser', async (req, res) => {
    console.log("update user=>", req.body);
    //     id = req.body.id,
    //     first_name = req.body.userdata.first_name,
    //     last_name = req.body.userdata.last_name,
    //     user_name = req.body.userdata.user_name,
    //     user_id = req.body.userdata.user_id,
    //     email = req.body.userdata.email,
    //     phone_no = req.body.userdata.phone_no,
    //     publication = req.body.userdata.publication,
    //     role = req.body.userdata.role,
    //     department = req.body.userdata.department,
    //     date_format = req.body.userdata.date_format,
    //     statuss = req.body.userdata.status,
    //     center = req.body.userdata.center,
    //     from_date = req.body.userdata.from_date,
    //     end_date = req.body.userdata.end_date,
    //     remarks = req.body.userdata.remarks
    // var query = `UPDATE master_user SET first_name = '${first_name}',phone_no = '${phone_no}', last_name = '${last_name}', user_name = '${user_name}', user_id = '${user_id}', email = '${email}', publication = '${publication}', role = '${role}', department = '${department}', date_format = '${date_format}', status = '${statuss}', center= '${center}', from_date = '${from_date}', end_date = '${end_date}', remarks = '${remarks}' WHERE (id = '${id}');`
    // execCommand(query).then((result) => res.json("update user successfully")).catch(err => logWriter(query, err))
})


//user delete 
router.post("/deleteuser", (req, res, next) => {
    const id = req.body.id;
    var query = `Delete  from master_user where id = '${id}';`
    // //console.logquery);
    execCommand(query).then(result => res.json('deleted')).catch(err => logWriter(query, err))
})
//user allActive User data 
router.post("/getallactiveuser", (req, res, next) => {
    // //console.log"req.body user ki id",req.body);
    userid = req.body.userid;
    var query = `SELECT MU.id, MU.user_image, CONCAT(MU.first_name," ", MU.last_name) as name ,MU.first_name,MU.last_name, MU.user_name, MU.user_id, MU.email, MU.password,MU.publication, MP.publication_name, MU.role, MU.department, MU.date_format, MU.status as statuss,MU.center, MC.center_name, MU.from_date, MU.end_date, MU.remarks, MU.lastlogin,MU.phone_no ,md.master_department_name,(select status from online_user where  user_id = mu.id) as status
    FROM master_user MU 
    LEFT JOIN master_publication MP ON MU.publication = MP.id
    LEFT JOIN master_center MC ON MC.id = MU.center 
    left join master_department md on mu.department = md.id where MU.id!=${userid} order by name asc;`
    ////console.logquery)
    execCommand(query).then((result) => res.json(result)).catch(err => logWriter(query, err))
})

//user alluser data 
router.get("/getalluser", (req, res, next) => {
    ////console.log"req.body",req.body);
    // userid = req.body.userid;
    var query = `SELECT MU.id, MU.user_image, CONCAT(MU.first_name," ", MU.last_name) as name ,MU.first_name,MU.last_name, MU.user_name, MU.user_id, MU.email, MU.password,MU.publication, MP.publication_name, MU.role, MU.department, MU.date_format, MU.status as statuss,MU.center, MC.center_name, MU.from_date, MU.end_date, MU.remarks, MU.lastlogin,MU.phone_no ,md.master_department_name
    FROM master_user MU
    LEFT JOIN master_publication MP ON MU.publication = MP.id
    LEFT JOIN master_center MC ON MC.id = MU.center 
    left join master_department md on mu.department = md.id order by name asc;`
    ////console.logquery)
    execCommand(query).then((result) => res.json(result)).catch(err => logWriter(query, err))
})



//login 
router.post('/login', async(req, res) => {
    email = req.body.userdata.email;
    enteredPassword = req.body.userdata.password;
    var query = `SELECT id, user_image, CONCAT(first_name, " ", last_name) AS name, first_name, last_name, user_name, user_id,convertcm, email, publication, role, department, date_format, status, center, from_date, end_date, remarks, lastlogin, theme, (SELECT center_name FROM master_center WHERE id = master_user.center) AS center,master_user.center as center_id , password FROM master_user WHERE email = '${email}';`;
    execCommand(query)
        .then(async(result) => {
            if (result.length > 0) {
                const storedPassword = result[0].password;
                const passwordMatch = await compareAsync(enteredPassword, storedPassword);
                if (passwordMatch) {
                    user_id = result[0].id
                    center_id = result[0].center_id
                    var exitUser = `DELETE from online_user where user_id = '${user_id}';`
                    execCommand(exitUser).then(() => {
                            var updateQuery = `INSERT INTO online_user (user_id, center_id, login_time) VALUES ('${user_id}', '${center_id}', now())`;
                            execCommand(updateQuery)
                                .then(() => {
                                    var loginhistory = `INSERT INTO  login_history (user_id, center_id, login_time) VALUES ('${user_id}', '${center_id}', now());`;
                                    execCommand(loginhistory)
                                        .then((login_historyresult) => {
                                            res.json({
                                                msg: "success",
                                                user_id: result[0].id,
                                                user_name: result[0].name,
                                                center: result[0].center,
                                                centerId: result[0].center_id,
                                                theme: result[0].theme,
                                                image: result[0].user_image,
                                                sessionId: login_historyresult.insertId,
                                                convertcm: result[0].convertcm
                                            });
                                        })
                                        .catch(err => logWriter(loginhistory, err));
                                })
                                .catch(err => logWriter(updateQuery, err));
                        })
                        .catch(err => {
                            logWriter(exitUser, err)
                        })
                } else {
                    res.json("failed");
                }
            } else {
                res.json("failed");
            }
        })
        .catch(err => logWriter(query, err));

})

router.post("/getUserPublicationAndCenter", (req, res, next) => {
    // //console.logreq.body, "reskldfjaklsjfkldsj");
    var query = `SELECT publication,center FROM master_user where id=${req.body.userid};`
    //console.logquery, "query");
    execCommand(query).then((result) => res.json(result)).catch(err => logWriter(query, err))

})

//update changepassword
router.post('/changepassword', async (req, res) => {
    // //console.log"changepassword=>", req.body);
    id = req.body.userid;
    var oldpassword = req.body.changepassword.currentPassword;
    var newpassword = req.body.changepassword.confirmPassword;
    let hashedPassword = '';
    if (oldpassword != null && newpassword != null && oldpassword != undefined && newpassword != undefined) {
        hashedPassword = await hashAsync(newpassword, 10);
    }
    let profile_picture = req.body.changepassword.profile_picture;
    let theme = req.body.changepassword.theme;
    if (profile_picture == null) {
        // //console.log"without profile.......");
        var query = `select * from master_user where  id = ${id};`
        //console.logquery);
        execCommand(query)
            .then((result) => {
                if (result.length > 0) {
                    //console.logresult);
                    var query = `UPDATE master_user SET password = '${hashedPassword}', theme = '${theme}' WHERE (id = '${id}');`
                    // //console.logquery);
                    execCommand(query).then(result => res.json('updated')).catch(err => logWriter(query, err))
                }
            }).catch(err =>
                logWriter(query, err)
            )
    } else if (newpassword == null && oldpassword == null) {
        var query = `select * from master_user where  id = '${id}';`
        // //console.log"with profile.......");
        ////console.logquery);
        execCommand(query)
            .then((result) => {
                if (result.length > 0) {
                    var query = `UPDATE master_user , user_image = '${profile_picture}' , theme = '${theme}' WHERE (id = '${id}');`
                    //console.logquery);
                    execCommand(query).then(result => res.json('updated')).catch(err => logWriter(query, err))
                }
            }).catch(err =>
                logWriter(query, err)
            )
    } else {
        var query = `select * from master_user where  id = '${id}';`
        //console.log"with profile and password.......");
        ////console.logquery);
        execCommand(query)
            .then((result) => {
                if (result.length > 0) {
                    var query = `UPDATE master_user SET password = '${hashedPassword}' , user_image = '${profile_picture}' , theme = '${theme}' WHERE (id = '${id}');`
                    //console.logquery);
                    execCommand(query).then(result => res.json('updated')).catch(err => logWriter(query, err))
                }
            }).catch(err =>
                logWriter(query, err)
            )
    }
})



router.post('/checkpassword', (req, res) => {
    // //console.log"req.body=>", req.body)
    id = req.body.userid,
        oldpassword = req.body.oldpassword;

    var query = `SELECT password FROM master_user WHERE id = '${id}';`;
    //console.log"query=>", query)
    execCommand(query)
        .then((result) => {
            if (result.length > 0) {
                const hashedPassword1 = result[0].password;
                bcrypt.compare(oldpassword, hashedPassword1, (err, isMatch) => {
                    if (err) {
                        //console.logerr);
                        res.json("error");
                    } else if (isMatch) {
                        res.json("correct");
                    } else {
                        res.json("wrong");
                    }
                });
            } else {
                res.json("wrong");
            }
        })
        .catch((err) => logWriter(query, err));
});




module.exports = router;

