import pool from "../config/db.js";

const addProduct = (req, res) => {
    const body = req.body;
    pool.query(`INSERT INTO product(user_id, product_name, unit_cost, quantity,price) VALUES (${body.user_id},'${body.product_name}',${body.unit_cost},${body.quantity},${body.price})`, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: 0,
                message: "product not added"
            })
        }
        return res.status(200).json({
            success: 1,
            data: result
        })
    })
}

const getProduct = (req, res) => {
    const body = req.query;
    pool.query(`SELECT * FROM product WHERE id=${body.id}`, (err, result) => {
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
    })
}

const updateProduct = (req, res) => {
    const body = req.body;
    pool.query(`UPDATE product SET product_name='${body.product_name}',unit_cost=${body.unit_cost},quantity=${body.quantity},price=${body.price} WHERE id=${body.id}`,
        (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Product not updated"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Update successfully"
            })
        })
}

const productController = { addProduct, getProduct, updateProduct };

export default productController;