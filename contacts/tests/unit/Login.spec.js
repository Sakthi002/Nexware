import { shallow, createLocalVue,  mount } from '@vue/test-utils'

import Vue from 'vue'

import VueRouter from 'vue-router'

import Vuex from 'vuex'

import Login from '@/components/Auth/Login.vue'

const localVue = createLocalVue()

localVue.use(VueRouter);

localVue.use(Vuex);

const router = new VueRouter();

describe('Login',() => {

   let wrapper

   let store
	
	let getters

	let actions
    
   const updateWrapper = () =>{

   	getters = {
			
			getUserData: () => () => {return { firstname : 'name' }},
		},
		
		actions ={
	    	updateLogin : jest.fn()
	    },

		store = new Vuex.Store({
			
			getters,
			
			actions
		})

       wrapper = mount(Login,{

       	localVue,
         
         router,

         store
       })
   } 

	it('updates `errors` value when `onSubmit` method called with `name and password` empty',() => {
     	
     	updateWrapper();

     	wrapper.setData({ name : '', password : '' });

     	wrapper.vm.onSubmit();
    	
    	expect(wrapper.vm.errors).toEqual(["Username required.", "Password required."])
	});

	it('updates `errors` value when `getUserData` value not empty',() => {
     	
     	updateWrapper();

     	wrapper.setData({ name : 'name', password : 'pswd' });

     	wrapper.vm.onSubmit();
    	
    	expect(wrapper.vm.errors).toEqual(["Incorrect Username or Password."])
	});
})