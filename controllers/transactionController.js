const mysql_conn = require('../database');
const moment = require('moment')
const fs = require('fs');

const { uploader } = require('../helpers/uploader'); 

module.exports = {
    addTransaction: (req, res) => {
        let today = new Date()
        console.log(today.setMinutes(today.getMinutes() + 10))

        console.log(req.body.data)
        let dataTransaction = {
            kodeTransaksi: 'MaCommerce' + Date.now(),
            userId: req.user.userId,
            status: 0,
            date_created: today,
            expired_date: moment(today).add(10, 'm').format('YYYY-MM-DD HH:mm:ss'),
            is_deleted: 0
        }

        let sql = `insert into transaction set ?`
        mysql_conn.query(sql, dataTransaction, (err, results) => {
            if (err) {
                return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err });
            }

            console.log(results);
            console.log(results.insertId);

            let values = []

            req.body.data.forEach((val) => {
                values.push([val.productId, val.small, val.medium, val.large, val.xlarge, val.price, val.total_price, results.insertId, val.userId, 0])
            })

            sql = `insert into transaction_detail (productId, small, medium, large, xlarge, price, total_price, transactionId, userId, is_deleted) values ?`
            mysql_conn.query(sql, [values], (err, insertStatus) => {
                if (err) {
                     return res.status(500).json({ err });
                }

                sql = 'select * from stockproduct where productId in ('

                req.body.data.forEach((val, id) => {
                    if(id !== req.body.data.length - 1) {
                        sql += val.productId + ', '
                    } else {
                        sql += val.productId
                    }
                })

                sql += ')'

                mysql_conn.query(sql, (err, resultsStock) => {
                    if (err) {
                        return res.status(500).json({ err });
                    }

                    sql = ''

                    resultsStock.forEach((val) => {
                        sql += `update stockproduct set `
                        req.body.data.forEach((dataCart) => {
                            if (val.productId === dataCart.productId) {
                                val.small -= dataCart.small
                                sql += `small = ${val.small}, `

                                val.medium -= dataCart.medium
                                sql += `medium = ${val.medium}, `

                                val.large -= dataCart.large
                                sql += `large = ${val.large}, `

                                val.xlarge -= dataCart.xlarge
                                sql += `xlarge = ${val.xlarge}`

                                sql += ` where productId = ${dataCart.productId};`
                            }
                        })
                    })

                    mysql_conn.query(sql, (err, resultUpdateStock) => {
                        if (err) {
                            return res.status(500).json({ err });
                        }


                        req.body.data.forEach((val) => {
                            sql += `delete from cart where userId = ${val.userId} and is_deleted = 0;`
                        })

                        mysql_conn.query(sql, (err, deleteResults) => {
                            if (err) {
                                return res.status(500).json({ err });
                            }

                            sql = `select * from transaction where id = ${results.insertId}`
                            mysql_conn.query(sql, (err, dataTransactionUI) => {
                                if (err) {
                                    return res.status(500).json({ err });
                                }

                                return res.status(200).send({
                                    dataTransactionUI
                                })
                            })
                        })
                    })

                   
                })

            })

            // sql = `select * from transaction where id=${results.insertId}`
            // mysql_conn.query(sql, (err, transaksi) => {
            //     if (err) {
            //         return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err });
            //     }


            // })
        })
    }
}
