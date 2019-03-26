export default {

  install(Vue) {
    Vue.mixin({
      methods: {
        getCaseType(type) {
          var applications = ["License", "Certificate"];
          return applications[type] ? applications[type] : 'N/A'
        },
        getAppType(type) {
          var app_type = ["Initial", "Variation", "Renewal"];
          return app_type[type] ? app_type[type] : "N/A"
        },
        getPrimaryActivity(primary_id) {
          var primaries = this.$store.state.reference.primary;
          var i = primaries ? primaries.findIndex(x => x._id === primary_id) : -1;
          return i >= 0 ? primaries[i] : {}
        },
        getTask(case_type, task_id) {
          var _tasks = [
            this.$store.state.task.license_tasks,
            this.$store.state.task.certificate_tasks
          ]
          console.log('this.$store.state.task.license_tasks :', this.$store.state.task.license_tasks);
          var tasks = _tasks[case_type];
          var i = tasks ? tasks.findIndex(x => x._id === task_id) : -1;
          return i >= 0 ? tasks[i] : {}
        },
        getProduct(product_id) {
          if (this.$store.state.products.productType) {
            var product = null;
            product = this.$store.state.products.productType.find(x => {
              return x._id === product_id
            })
            return product ? product.name : ''
          } else {
            return ''
          }
        },
        getPrimary(primary_id) {
          if (this.$store.state.products.primaryActivity) {
            var primary = null;
            primary = this.$store.state.products.primaryActivity.find(x => {
              return x._id === primary_id
            })
            return primary ? primary.name : ''
          } else {
            return ''
          }
        },
        getDeclared(declared_id) {
          if (this.$store.state.products.declared) {
            var declared = null;
            declared = this.$store.state.products.declared.find(x => {
              return x._id === declared_id
            })
            return declared ? declared.name : ''
          } else {
            return ''
          }
        },
        getUser(user_id) {
          if (this.$store.state.users.users) {
            var user = null;
            user = this.$store.state.users.users.find(x => {
              return x._id === user_id
            })
            return user ? user.name : ''
          } else {
            return ''
          }
        },
        getProductLine(productLine_id) {
          if (this.$store.state.products.prod_line) {
            var product_line = null;
            product_line = this.$store.state.products.prod_line.find(x => {
              return x._id === productLine_id
            })
            return product_line ? product_line.name : ''
          } else {
            return ''
          }
        },
        getAdminUser(user_id) {
          var accounts = this.$store.state.accounts.admins_info;
          var i = accounts ? accounts.findIndex(x => x._id.toString() === user_id) : -1;
          return i >= 0 ? accounts[i] : {}
        },
        getClientUser(user_id) {
          var accounts = this.$store.state.accounts.accounts_info;
          var account = accounts ? accounts.find(x => x._id.toString() === user_id) : {};
          return account ? account : {}
        },
        numberWithCommas(x) {
          return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0.00";
        },
        // getProduct(product_id) {
        //   if (this.$store.state.products.productType) {
        //     var product = null;
        //     product = this.$store.state.products.productType.find(x => {
        //       return x._id === product_id
        //     })
        //     return product ? product.name : ''
        //   } else {
        //     return ''
        //   }
        // },
        formatDate: (date, type) => {
          if (!date) {
            return "";
          }
          var format = type ? type : {
            hour12: true,
            year: "numeric",
            month: "long",
            day: "2-digit"
          };
          var dt = new Date(date).toLocaleString("en-US", format);
          return dt;
        },
        formatDt(dt) {
          var date = new Date(dt);
          var month = date.getMonth() + 1;
          var newDT = date.getFullYear() + "-" + month + "-" + date.getDate();
          return newDT
        },
        // formatDates(dt){
        //   var date = new Date(dt);
        //   var month = date.getMonth() + 1;
        //   var year = date.getFullYear();
        //   var newDT = {month: month, year: year}
        //   return newDT
        // },
        formatCurrency: amount => {
          var parts = amount.toString().split(".");
          return (
            parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
            (parts[1] ? "." + parts[1] : "")
          );
        },
        isEmpty(str) {
          return !str || str === null || str === "";
        },
        checkPassword(password) {
          var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
          return re.test(password);
        },
        checkEmail(email) {
          var validate = false;
          var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          validate = this.isEmpty(email) || !re.test(email);
          return validate;
        },
        getActivityStatus(status) {
          var _status = ["Approved", "Recommend", "Denied"]
          return _status[status]
        },
        getActivity(_case) {
          var activity = _case && _case.activities ? _case.activities.find(x => x.task_id.toString() === _case.previous_task) : {};
          return activity ? activity : {}
        },
        getRegionName(id) {
          for (var i = 0; i < this.$store.state.places.regions.length; i++) {
            var region = this.$store.state.places.regions[i]
            if (region._id === id) {
              return region.name
            }
          }
        },
        getProvinceName(id) {
          for (var i = 0; i < this.$store.state.places.provinces.length; i++) {
            var province = this.$store.state.places.provinces[i]
            if (province._id === id) {
              return province.name
            }
          }
        },
        getCityName(id) {
          for (var i = 0; i < this.$store.state.places.city.length; i++) {
            var city = this.$store.state.places.city[i]
            if (city._id === id) {
              return city.name
            }
          }
        },
        logout() {
          this.$store.dispatch("LOGOUT");
          this.$router.push("/");
        }
      }
    });
  }

}