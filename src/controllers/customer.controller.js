const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10;
var customerService = require("../services/customer.service");
var Role = require('../helpers/role.helper');
var token = require('../helpers/jwt.helper')


module.exports.register = async (req, res) => {
    try {
        const customer = req.body;
        const data = await customerService.getCustomer(customer.phone_number);
        if (data[0]) {
            res.status(400).json({
                status: false,
                message: 'Phone number already exists'
            })
        } else {
            // console.log(customer);
            //create hash password
            const hashPassword = bcrypt.hashSync(customer.password, SALT_ROUNDS)
            // set role for customer
            customer.role = Role.User
            const newCustomer = {
                _phone_number: customer.phone_number,
                gender: customer.gender,
                _password: hashPassword, image: customer.image,
                role: Role.Admin
            }

            // console.log(newCustomer);
            const result = await customerService.addCustomer(newCustomer);
            if (!result) {
                return res
                    .status(400)
                    .send('Have err when create customer!!');
            }
            return res.json({
                status: true,
                message: 'Create account success!!',
                data: {
                    phone_number: newCustomer._phone_number
                }
                ,
            });
        }
    } catch (error) {
        console.log("err: " + error.message);
    }
}
module.exports.login = async (req, res) => {
    try {
        const customer = req.body;
        let data = await customerService.getCustomer(customer.phone_number);
        data = await JSON.parse(JSON.stringify(data));
        data = data[0];
        if (data == undefined) {
            res.status(404).json({
                status: false,
                message: "Account doesn't exist"
            })
        } else {
            const isValidatePassword = bcrypt.compareSync(customer.password, data._password);

            if (!isValidatePassword) {
                res.status(404).json({
                    status: false,
                    message: "Wrong password!!",

                })
            } else {
                const accessTokenSecret =
                    process.env.ACCESS_TOKEN_SECRET;
                const accessTokenLife =
                    process.env.ACCESS_TOKEN_LIFE;

                const dataForAccessToken = {
                    number_phone: data._phone_number,
                };
                const accessToken = await token.generateToken(
                    dataForAccessToken,
                    accessTokenSecret,
                    accessTokenLife,
                );

                if (!accessToken) {
                    res.status(404).json({
                        status: false,
                        message: " Login fail,try again!!",

                    })
                } else {

                    let result = await customerService.updateRefreshToken(accessToken, customer.phone_number);
                    //    console.log(result);
                    res.status(200).json({
                        status: true,
                        message: "Login success!!",
                        data: {
                            phone_number: data._phone_number,
                            access_token: accessToken
                        }
                    })
                }

            }
        }

    } catch (error) {
        console.log("err: " + error.message);
    }
}

module.exports.loginWebAdmin = async (req, res) => {
    try {
        const { phone_number, password } = req.body;
        // console.log({ phone_number, password });
        let data = await customerService.getCustomer(phone_number);
        data = await JSON.parse(JSON.stringify(data));
        data = data[0];
        // console.log(data);
        if (data == undefined) {

            res.cookie("error", 'Incorrect username or password');
            res.redirect('/auth/login')



        } else {
            const isValidatePassword = bcrypt.compareSync(password, data._password);

            if (!isValidatePassword) {
                res.cookie("error", 'Incorrect username or password');
                res.redirect('/auth/login')
            } else {

                // generate token
                const accessTokenSecret =
                    process.env.ACCESS_TOKEN_SECRET;
                const accessTokenLife =
                    process.env.ACCESS_TOKEN_LIFE;

                const dataForAccessToken = {
                    number_phone: data._phone_number,
                };
                const accessToken = await token.generateToken(
                    dataForAccessToken,
                    accessTokenSecret,
                    accessTokenLife,
                );

                if (!accessToken) {

                    res.cookie("error", " Login fail, try again!!");
                    res.redirect('/auth/login')
                } else {

                    let result = await customerService.updateRefreshToken(accessToken, phone_number);
                    //    console.log(result);
                    res.cookie("access_token", accessToken)
                    res.cookie("user", data)
                    res.redirect('/')
                }

            }
        }

    } catch (error) {
        console.log("err: " + error.message);
        res.cookie("error", " Login fail,try again!!");
        res.redirect('/auth/login')
    }
}
module.exports.showListCustomer = async (req, res, next) => {
    try {
        const customers = await customerService.getAllCustomer();
        console.log(customers);
        res.render('list_customers', { customers })
    } catch (error) {
        console.log(error.message);
        res.render('list_customers')
    }
}