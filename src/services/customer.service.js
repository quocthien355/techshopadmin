var customerModel = require('../models/customer.model');

module.exports.addCustomer = (customer) => {
  return customerModel.addCustomer(customer);
}

module.exports.getCustomer = (phone_number) => {
  return customerModel.getCustomer(phone_number);
}

module.exports.updateRefreshToken = (refresh_token, phone_number) => {
  return customerModel.updateRefreshToken(refresh_token, phone_number);
}
module.exports.getAllCustomer = () => {
  return customerModel.getAllCustomer();
}
