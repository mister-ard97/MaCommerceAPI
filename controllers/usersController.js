const mysql_conn = require('../database')
const Crypto = require('crypto');
const fs = require('fs');

const { uploader } = require('../helpers/uploader');
const { createJWTToken } = require('../helpers/jwtoken');
const transporter = require('../helpers/mailer');

module.exports = {
    register: (req, res) => {
        try {

            let path = `/users/images`; //file save path
            const upload = uploader(path, 'MaCommerce').fields([{ name: 'imageUser' }]); //uploader(path, 'default prefix')

            upload(req, res, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
                }

                console.log(req.body.data)
                const data = JSON.parse(req.body.data);

                let {
                    username,
                    password,
                    email,
                    FirstName,
                    LastName,
                    address,
                } = data

                let sql = `SELECT * FROM users WHERE username='${username}'`
                mysql_conn.query(sql, (err, resultsUsername) => {
                    if (err) {
                        return res.status(500).send({ status: 'error', err })
                    }

                    sql = `SELECT * FROM users WHERE email='${email}'`
                    mysql_conn.query(sql, (err, resultsEmail) => {
                        if (err) {
                            return res.status(500).send({ status: 'error', err })
                        }

                        if (resultsUsername.length > 0 && resultsEmail.length > 0) {
                            return res.status(500).send({ status: 'error', message: 'Username & Email been taken by another user!. Try another Username & Email' });
                        }

                        if (resultsUsername.length > 0) {
                            return res.status(500).send({ status: 'error', message: 'Username has been taken by another user!. Try another username' });
                        }

                        if (resultsEmail.length > 0) {
                            return res.status(500).send({ status: 'error', message: 'Email has been used by another user!. Try another Email' });
                        }

                        let hashPassword = Crypto.createHmac('sha256', 'macommerce_api')
                            .update(password).digest('hex');

                       
                        // Upload User Data

                        let dataUser = {
                            username,
                            password: hashPassword,
                            email,
                            FirstName,
                            LastName,
                            address,
                            status: 'Unverified',
                            LastLogin: new Date(),
                            role:'User'
                        }

                        const { imageUser } = req.files;
                        console.log(imageUser)
                        const imagePath = imageUser ? path + '/' + imageUser[0].filename : '/defaultPhoto/defaultUser.png';
                        console.log(imagePath)

                        console.log(data)
                        dataUser.UserImage = imagePath;

                        sql = 'INSERT INTO users SET ?';
                        mysql_conn.query(sql, dataUser, (err, results) => {
                            if (err) {
                                console.log(err.message)
                                fs.unlinkSync('./public' + imagePath);
                                return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                            }

                            sql = `select * from users where username='${username}' and role='User'`
                            mysql_conn.query(sql, (err, results) => {
                                if (err) {
                                    return res.status(500).send({ status: 'error', err })
                                }

                                const tokenJwt = createJWTToken({ userId: results[0].id, username: results[0].username })
                                
                                let linkVerifikasi = `http://localhost:3000/verified/${tokenJwt}`;
                                let mailOptions = {
                                    from: 'MaCommerce Admin <rezardiansyah1997@gmail.com>',
                                    to: email,
                                    subject: 'Verifikasi Email for MaCommerce',
                                    html: `
                                        <div>
                                            <img src='https://i.ibb.co/L8SgW3n/logo-Macommerce.png' /><span>Online Shop ter-update dalam fashion</span>
                                            <hr />
                                            <h4>Link Verification</h4>
                                            <p>This is a link verification for username: <span style='font-weight:bold'>${results[0].username}</span>.</p>
                                            <p>To verification your account <a href='${linkVerifikasi}'>Click Here!</a></p>
                                            <hr />
                                        </div>`
                                }

                                transporter.sendMail(mailOptions, (err1, res1) => {
                                    if (err1) {
                                        return res.status(500).send({ status: 'error', err: err1 })
                                    }

                                    return res.status(200).send({
                                        FirstName: results[0].FirstName,
                                        LastName: results[0].LastName,
                                        username: results[0].username,
                                        email: results[0].email,
                                        token: tokenJwt,
                                        status: results[0].status,
                                        UserImage: results[0].UserImage,
                                        role: results[0].role,
                                        address: results[0].address
                                    });

                                })
                            })
                        })
                    })
                })   
            })
        } catch (err) {
            return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
        }
    }, 

    userUpdateData: (req, res) => {

    },

    emailVerification: (req, res) => {
        let sql = `select * from users where id = ${req.user.userId} and role='User'`;
        mysql_conn.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send({ status: 'error', err })
            }

            if(results.length === 0) {
                return res.status(500).send({ status: 'error', message: 'User not found' });
            }

            const tokenJwt = createJWTToken({ userId: results[0].id, username: results[0].username })

            sql = `Update users Set status='Verified' where id = ${req.user.userId}`
            mysql_conn.query(sql, (err, results1) => {
                if (err) {
                    return res.status(500).send({ status: 'error', err })
                }

                sql = `Select * From users where id=${req.user.userId}`;

                mysql_conn.query(sql, (err, results) => {
                    if (err) {
                        return res.status(500).send({ status: 'error', err })
                    }

                    return res.status(200).send({
                        FirstName: results[0].FirstName,
                        LastName: results[0].LastName,
                        username: results[0].username,
                        email: results[0].email,
                        token: tokenJwt,
                        status: results[0].status,
                        UserImage: results[0].UserImage,
                        role: results[0].role,
                        address: results[0].address
                    });
                })
            })
        })
    },

    resendEmailVerification: (req, res) => {
        let { username, email } = req.body;

        let sql = `Select id, username, email, status From users where username='${username}' and email='${email}'`;
        mysql_conn.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send({ status: 'error', err })
            }
            
            if (results.length === 0) {
                return res.status(500).send({ status: 'error', err: 'User Not Found!' })
            }

            const tokenJwt = createJWTToken({ userId: results[0].id, username: results[0].username })

            let linkVerifikasi = `http://localhost:3000/verified/${tokenJwt}`;
            let mailOptions = {
                from: 'MaCommerce Admin <rezardiansyah1997@gmail.com>',
                to: email,
                subject: 'Verifikasi Email for MaCommerce',
                html: `
                                    <div>
                                        <img src='https://i.ibb.co/L8SgW3n/logo-Macommerce.png' /><span>Online Shop ter-update dalam fashion</span>
                                        <hr />
                                        <h4>Link Verification</h4>
                                        <p>This is a link verification for username: <span style='font-weight:bold'>${results[0].username}</span>.</p>
                                        <p>To verification your account <a href='${linkVerifikasi}'>Click Here!</a></p>
                                        <hr />
                                    </div>`
            }

            transporter.sendMail(mailOptions, (err1, res1) => {
                if (err1) {
                    return res.status(500).send({ status: 'error', err: err1 })
                }

                return res.status(200).send({
                    FirstName: results[0].FirstName,
                    LastName: results[0].LastName,
                    username: results[0].username,
                    email: results[0].email,
                    token: tokenJwt,
                    status: results[0].status,
                    role: results[0].role,
                    address: results[0].address
                });
            })
        })
    },

    keepLoginUser: (req, res) => {
        let sql = `select * from users where id = ${req.user.userId}`;
        mysql_conn.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send({ status: 'error', err })
            }

            if (results.length === 0) {
                return res.status(500).send({ status: 'error', err: 'User Not Found!' })
            }

            const tokenJwt = createJWTToken({ userId: results[0].id, username: results[0].username })
            
            return res.status(200).send({
                FirstName: results[0].FirstName,
                LastName: results[0].LastName,
                username: results[0].username,
                email: results[0].email,
                token: tokenJwt,
                status: results[0].status,
                UserImage: results[0].UserImage,
                role: results[0].role,
                address: results[0].address
            });  
        })
    },

    userLogin: (req, res) => {
        let { username, password} = req.body;
        let hashPassword = Crypto.createHmac('sha256', 'macommerce_api')
            .update(password).digest('hex');
        
        let sql = `Select * from users where username='${username}' and password='${hashPassword}' and role='User'`;
        mysql_conn.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send({ status: 'error', err })
            }

            if (results.length === 0) {
                return res.status(500).send({ status: 'error', message: 'Username or Password is wrong.!' });
            }

            const tokenJwt = createJWTToken({ userId: results[0].id, username: results[0].username })
            sql = `Select * From users where username='${username}' and role='User'`;

            mysql_conn.query(sql, (err, results) => {
                if (err) {
                    return res.status(500).send({ status: 'error', err })
                }

                if (results.length === 0) {
                    return res.status(500).send({ status: 'error', err: 'User Not Found!' })
                }

                return res.status(200).send({
                    FirstName: results[0].FirstName,
                    LastName: results[0].LastName,
                    username: results[0].username,
                    email: results[0].email,
                    token: tokenJwt,
                    status: results[0].status,
                    UserImage: results[0].UserImage,
                    role: results[0].role,
                    address: results[0].address
                });
            })
        })
    },
    
    // userAddLikeToProduct: (req, res) => {

    // }
}
