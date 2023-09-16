import pool from "../config/db.js";

const addOrganization = (req, res) => {
    const body = req.body;
    pool.query(`INSERT INTO organization(user_id,company_name1, name1, address1, city1, state1, country1, zipcode1, mobile_number1, emailid1) VALUES (${body.user_id},'${body.company_name1}','${body.name1}','${body.address1}','${body.city1}','${body.state1}','${body.country1}','${body.zipcode1}','${body.mobile_number1}','${body.emailid1}')`, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "organization not added"
            })
        }
        return res.status(200).json({
            success: 1,
            data: result
        })
    })
}

const getOrganization = (req, res) => {
    const body = req.query;
    pool.query(`SELECT * FROM organization WHERE user_id=${body.user_id}`, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "Data not Found"
            })
        }
        return res.status(200).json({
            success: 1,
            data: result
        })
    })
}

const updateOrganization = (req, res) => {
    const body = req.body;
    pool.query(`UPDATE organization SET company_name1='${body.company_name1}',name1='${body.name1}',address1='${body.address1}',city1='${body.city1}',state1='${body.state1}',country1='${body.country1}',zipcode1='${body.zipcode1}',mobile_number1='${body.mobile_number1}',emailid1='${body.emailid1}' WHERE org_id=${body.org_id}`,
        (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Organization not updated"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Update successfully"
            })
        })
}

const organizationController = { addOrganization, getOrganization ,updateOrganization};

export default organizationController;