import pool from "../config/db.js";

const addInvoice = (req, res) => {
    const body = req.body;
    pool.query(`INSERT INTO invoice(user_id,invno, invoice_date, due_date, client_detail, product_detail, notes, terms_and_cond, organization_detail) VALUES (${body.user_id},'${body.invno}','${body.invoice_date}','${body.due_date}',${body.client_detail},${body.product_detail},'${body.notes}','${body.terms_and_cond}',${body.organization_detail})`, (err, result) => {
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


const getInvoices = (req, res) => {
    const body = req.query;
    pool.query(`SELECT * FROM invoice i LEFT JOIN client c on i.client_detail=c.client_id LEFT JOIN product p ON i.product_detail=p.id left JOIN organization o on i.organization_detail=o.org_id where i.user_id=${body.user_id} order by i.inv_id desc`, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "Data not found"
            })
        }
        return res.status(200).json({
            success: 1,
            data: result
        });
    })
}

const getInvoicesByid = (req, res) => {
    const body = req.query;
    pool.query(`SELECT * FROM invoice i LEFT JOIN client c on i.client_detail=c.client_id LEFT JOIN product p ON i.product_detail=p.id left JOIN organization o on i.organization_detail=o.org_id where i.inv_id=${body.id}`, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "Data not found"
            })
        }
        return res.status(200).json({
            success: 1,
            data: result
        });
    })
}

const updateInvoice = (req, res) => {
    const body = req.body;
    pool.query(`UPDATE invoice SET invno='${body.invno}',invoice_date='${body.invoice_date}',due_date='${body.due_date}',notes='${body.notes}',terms_and_cond='${body.terms_and_cond}' WHERE inv_id=${body.id}`,
        (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invoice not updated"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Update successfully"
            })
        })
}
const deleteInvoice = (req, res) => {
    const body = req.body;
    pool.query(`DELETE i,c,p FROM invoice i LEFT JOIN client c on i.client_detail=c.client_id LEFT JOIN product p ON i.product_detail=p.id where i.inv_id=${body.inv_id}`,
        (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (results.affectedRows==0) {
                return res.json({
                    success: 0,
                    message: "Invoice not Found"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Delete successfully",
                data :results
            })
        })
}

const invoiceController = { addInvoice ,getInvoices ,getInvoicesByid, updateInvoice,deleteInvoice };

export default invoiceController;
