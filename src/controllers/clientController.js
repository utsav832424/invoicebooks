import pool from "../config/db.js";

const addclient = (req, res) => {
    const body = req.body;
    pool.query(`INSERT INTO client(user_id,company_name, name, address, city, state, country, zipcode, mobile_number, emailid) VALUES (${body.user_id},'${body.company_name}','${body.name}','${body.address}','${body.city}','${body.state}','${body.country}','${body.zipcode}','${body.mobile_number}','${body.emailid}')`, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "client not added"
            })
        }
        return res.status(200).json({
            success: 1,
            data: result
        })
    })
}

const getclient = (req, res) => {
    const body = req.query;
    pool.query(`SELECT * FROM client WHERE client_id=${body.id}`, (err, result) => {
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

const updateclient = (req, res) => {
    const body = req.body;
    pool.query(`UPDATE client SET company_name='${body.company_name}',name='${body.name}',address='${body.address}',city='${body.city}',state='${body.state}',country='${body.country}',zipcode='${body.zipcode}',mobile_number='${body.mobile_number}',emailid='${body.emailid}' WHERE client_id=${body.id}`,
        (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Client not updated"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Update successfully"
            })
        })
}

const clientController = { addclient, getclient ,updateclient};

export default clientController;