import axios from 'axios';


export default class ProductAPI {
  constructor(token) {
    axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0';
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common['access_token'] = token;
  }
  productType(cb) {
    axios.get('core/products')
      .then(result => {
        console.log("get product type api")
        if (result.data.success) {
          console.log("core products data: " + JSON.stringify(result.data.model))
          cb(result.data.model)
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        cb(null, err)
      });
  }

  primary(productType, cb) {
    axios.get("core/primary/products/" + productType)
      .then(result => {
        if (result.data.success) {
          cb(result.data.model)
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        cb(null, err)
      });
  }

  secondary(primary, cb) {
    axios.get("core/secondary/" + primary)
      .then(result => {
        if (result.data.success) {
          cb(result.data.model)
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        cb(null, err)
      });
  }

  additional(primary, cb) {
    axios.get("core/additional/additional" + primary)
      .then(result => {
        if (result.data.success) {
          cb(result.data.model)
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        cb(null, err)
      });
  }

  declared(primary, cb) {
    axios.get("core/declared/declared" + primary)
      .then(result => {
        if (result.data.success) {
          cb(result.data.model)
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        cb(null, err)
      });
  }
  getDeclared(cb) {
    axios.get("core/declared")
      .then(result => {
        if (result.data.success) {
          cb(result.data.model)
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        cb(null, err)
      });
  }
  prodline(cb) {
    axios.get('core/productLine')
      .then(result => {
        if (result.data.success) {
          console.log("api product line: " + JSON.stringify(result.data.success))
          cb(result.data.model)
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        cb(null, err)
      });
  }

  /**
   * @description promised based method for retrieving product type
   * @returns {Promise}
   */
  getProductType() {
    return axios.get('core/products')
  }

  /**
   * @description promised based method for retrieving primary
   * @returns {Promise}
   */
  getPrimary() {
    return axios.get("core/primary")
  }

  /**
   * @description promised based method for retrieving additional
   * @returns {Promise}
   */
  getAdditional() {
    return axios.get("core/additional")
  }

  /**
   * @description promised based method for retrieving declared capital
   * @returns {Promise}
   */
  getDeclaredCapital() {
    return axios.get("core/declared")
  }

  /**
   * @description promised based method for retrieving product line
   * @returns {Promise}
   */
  getProductLine() {
    return axios.get("core/productLine")
  }
}