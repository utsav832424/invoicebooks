import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const addUser = (req, res) => {
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    pool.query(`SELECT * FROM users WHERE email='${body.email}'`, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Email is invalid"
            })
        }
        if (results.length > 0) {
            return res.json({
                success: 0,
                message: "Email is already in use"
            })
        }
        if (body.password != body.confirm_password) {
            return res.status(200).json({
                success: 0,
                message: "Confirm password must be same ak passowrd"
            })
        } else {
            body.password = bcrypt.hashSync(body.password, salt);
            pool.query(`INSERT INTO users(username, email, password) VALUES ('${body.username}','${body.email}','${body.password}')`,
                (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Users not added"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        data: result
                    })
                }
            );
        }
    });
}

const login = (req, res) => {
    var organizationid;
    const body = req.body;

    pool.query(`SELECT * FROM users WHERE email='${body.email}'`, (err, results) => {
        if (err) {
            console.log(err);
            return
        }
        if (results.length == 0) {
            return res.json({
                success: 0,
                message: "Email is invalid"
            })
        }
        if (results.length > 0) {
            pool.query(`SELECT * FROM organization where user_id=${results[0].id}`, (err, result1) => {
                if (result1.length == 0) {
                    organizationid = 0;
                }
                else {
                    organizationid = 1;
                }
                console.log("Orgid",organizationid);
                if (organizationid == 1 || organizationid == 0) {
                    const result = bcrypt.compareSync(body.password, results[0].password);
                    if (result) {
                        results[0].password = undefined;
                        const jsonwebtoken = jwt.sign({ result: results }, `'${process.env.KEY}'`, { expiresIn: "24h" });
                        return res.status(200).json({
                            success: 1,
                            message: "Login Successfully",
                            data: results[0],
                            organizationid: organizationid,
                            token: jsonwebtoken
                        })
                    } else {
                        return res.json({
                            success: 0,
                            message: "Invalid Email or password"
                        })
                    }
                }
            });
        }
        
    })
}

const getAlluser = (req, res) => {
    const body = req.params.id;
    pool.query(`SELECT * FROM users`, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "Data not found"
            })
        }
        return res.status(200).json({
            success: 1,
            data: result
        })
    });
}

const updateuser = (req, res) => {
    const body = req.body;
    pool.query(`UPDATE users SET username='${body.username}',email='${body.email}' WHERE id=${body.id}`, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Failed to update user"
            })
        }
        pool.query(`SELECT id, username, email, image FROM users WHERE id=${body.id}`, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Record not found"
                })
            }
            return res.json({
                success: 1,
                data: results[0]
            })
        })
    });
}

const profile_update = (req, res) => {
    const body = req.body;
    body.image = req.file.path.replace(/\\/g, "/");
    pool.query(`UPDATE users SET image='${body.image}' WHERE id=${body.id}`, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!result) {
            return res.json({
                success: 0,
                message: "Failed to update user"
            })
        }
        pool.query(`SELECT id, username, email, image FROM users WHERE id=${body.id}`, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Record not found"
                })
            }
            return res.json({
                success: 1,
                data: results[0]
            })
        })
    })
}

const change_password = (req, res) => {
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    pool.query(`SELECT * FROM users where id=${body.id}`, async (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.json({
                success: 0,
                data: "Record not found"
            })
        }
        const isvalidpass = await bcrypt.compare(body.current_password, results["0"]["password"]);
        if (isvalidpass) {
            if (body.password != body.confirm_password) {
                return res.status(200).json({
                    success: false,
                    message: "Confirm password must be same like to password"
                })
            } else {
                body.password = bcrypt.hashSync(body.password, salt);
                pool.query(`update users set password='${body.password}' where id=${body.id}`, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (!result) {
                        return res.json({
                            success: 0,
                            message: "Failed to update password"
                        })
                    }
                    return res.json({
                        success: 1,
                        data: result,
                        message: "Update successfully"
                    })
                })
            }
        } else {
            return res.json({
                success: 0,
                message: "Current Password is Wrong"
            })
        }
    })
}

const userController = { addUser, login, updateuser, getAlluser, profile_update, change_password };

export default userController;