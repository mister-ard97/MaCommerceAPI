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

        let offset = 0;
        
        if (!req.query.page) {
            req.query.page = 1
        }

        if (req.query.page > 1) {
            // munculin dari data ke berapa data di tampil.
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
                    join category as subcat on p.subcategoryId = subcat.id where p.is_deleted = 0`

        if(req.query.product) {
            sql += ` and c.name = '${req.query.product}'`
        }
        if(req.query.productName) {
            sql += ` and p.name like '%${req.query.productName}%'`
        }

        if(req.query.categoryId) {
            sql += ` and c.id = ${req.query.categoryId}`
        }

        if(req.query.subCategoryId) {
            sql += ` and subcat.id = ${req.query.subCategoryId}`
        }

        if(!req.query.showData) {
            req.query.showData = 4
        }
        
        sql += ` limit ${offset}, ${req.query.showData}`

        mysql_conn.query(sql, (err, firstResults) => {
            if (err) {
                return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err });
            }
            console.log(firstResults)
        

            return res.status(200).send({
                page: parseInt(req.query.page),
                totalProduct: parseInt(firstResults.length),
                total_pages: Math.ceil(parseInt(firstResults.length) / 4),
                categoryName: req.query.categoryName,
                subCategoryName: req.query.subCategory,
                dataProduct: firstResults
            })
        })
    },

    getProductDetailById: (req, res) => {
        let sql = `select
            p.*, 
            stk.small, 
            stk.medium, 
            stk.large, 
            stk.xlarge
        from product as p join category as c on p.categoryId = c.id 
        join category as subcat on p.subcategoryId = subcat.id join stockproduct as stk on stk.productId = p.id where p.is_deleted = 0 and p.id = ${req.params.id}`

        mysql_conn.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err });
            }
            console.log(results)
            console.log(req.params.id)

            sql = `select imagePath from product_image where productId = ${req.params.id}`
            mysql_conn.query(sql, (err, linkImageProduct) => {
                if (err) {
                    return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err });
                }

                return res.status(200).send({
                    dataProductDetail: results,
                    linkImageProduct
                })
            })
        })
    },

    getAllProductUI: (req, res) => {
        
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
                    join category as subcat on p.subcategoryId = subcat.id where p.is_deleted = 0 limit 0, ${req.query.limit}`

        mysql_conn.query(sql, (err, resultsProduct) => {
            if (err) {
                return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err });
            }

            if (resultsProduct.length === 0) {
                return res.status(500).json({ status: 'No Product available', message: 'There are no product in database' });
            }

            return res.status(200).send({               
                dataProduct: resultsProduct
            })
        })
    }

}