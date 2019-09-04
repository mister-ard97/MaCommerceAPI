const mysql_conn = require('../database');

module.exports = {
    getAllProducts: (req, res) => {
        
        let offset = 0;
        // 2.2.2

        if(!req.query.page) {
            req.query.page = 1
        } 
        
        if(req.query.page > 1){
            // Menampilkan 4 data setiap halamannya.
            offset = (req.query.page - 1) * 4
        }

        let sql = `select 
                        p.id as productId,
                        p.name,
                        p.coverImage,
                        p.price,
                        p.popularCount,
                        c.name as category_product, 
                        subcat.name as sub_category 
                    from product as p 
                    join category as c on p.categoryId = c.id
                    join category as subcat on p.subcategoryId = subcat.id where p.is_deleted = 0
                    limit ${offset}, 4`

        mysql_conn.query(sql, (err, resultsProduct) => {
            if(err) {
                return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err });
            }

            if(resultsProduct.length === 0) {
                return res.status(500).json({ status: 'No Product available', message: 'There are no product in database' });
            }

            sql = `select count(*) as totalProduct from product where is_deleted = 0`;
            mysql_conn.query(sql, (err, totalProducts) => {
                if (err) {
                    return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err });
                }

                return res.status(200).send({
                    page: parseInt(req.query.page),
                    totalProduct: totalProducts[0].totalProduct,
                    total_pages: Math.ceil(totalProducts[0].totalProduct / 4),
                    dataProduct: resultsProduct
                })
            })
        })
    },

    getFilterProduct: (req, res) => {
        console.log(req.query)

        return res.status(200).send({message: 'berhasil'})
    }

}