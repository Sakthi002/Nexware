import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  
  	state: {

  		//Registered user
  		user : '',

  		customers : [],

  		//Particular Customer data
  		editData : '',

  		// Login status
  		login : false
  },

  getters : {

  	//For getting User data
  	 getUserData(state){
        
        return state.user;
    },

    // For getting Customers data
     getCustomerData(state){
        
        return state.customers;
    },

    // For getting Particular customer data
    getEditData(state) {

    	return state.editData
    },

    //For getting login sattus
    getLogin(state) {

    	return state.login
    }
  },

  mutations: {
  		
  		//Mutates user value when user registered action performed
  		mutateUserData(state, user) {
      	
      	state.user = user;
   	},

   	//Updates customers list
   	mutateCustomerData(state, customer) {
      	
      	state.customers.push(customer);
   	},

   	//For update particular customer data
   	mutateCustomerEditData(state,value) {

   		state.customers[value.index] = value.value;
   	},

   	//Particular customers current data
   	mutateEditData(state, value) {

   		state.editData = value;
   	},

   	mutateLogin(state,login) {

   		state.login = login;
   	}
  },
  
  actions: {
  	
  		updateUserData({commit},data){

        	commit('mutateUserData',data);
    	},

    	updateCustomerData({commit},data){
        
        	commit('mutateCustomerData',data);
    	},

    	updateEditData({commit},data) {

    		commit('mutateEditData',data);
    	},

    	clearEditData({commit},data) {

    		commit('mutateEditData','');
    	},

    	updateLogin({commit},data) {

    		commit('mutateLogin',data);
    	},

    	updateCustomerEditData({commit},data) {

    		commit('mutateCustomerEditData',data);
    	},
    
    	deleteUser({commit}) {

        commit('mutateLogin',false);

        commit('mutateEditData','');
    	}
  }
})
