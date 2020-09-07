<template>
	
	<div class="container login-box col-md-4 offset-md-4">
  	
  		<h2 class="text-center">Login</h2>
    	
    	<div v-if="errors.length" class="alert alert-danger alert-dismissible">
    		
    		<button type="button" class="close" data-dismiss="alert">&times;</button>
    		
    		<ul class="m-0">
		     
		      <li v-for="error in errors">{{ error }}</li>
		    </ul>
  		</div>

    	<div class="form-group">
      	
      	<label for="name">User Name:</label>
      	
      	<input type="text" class="form-control" placeholder="Enter username" name="name" v-model="name">
    	</div>
    	
    	<div class="form-group">
      	
      	<label for="pwd">Password:</label>
      	
      	<input type="password" class="form-control" placeholder="Enter password" name="password" v-model="password">
    	</div>
    	
    	<button type="submit" class="btn btn-primary btn-block" @click="onSubmit">Submit</button>

    	<router-link to="/register" class="btn btn-light btn-block">Don't have an account</router-link>
  </div>
</template>

<script>
	
	import { mapGetters } from 'vuex';

	export default {

		name : 'login',

		data () {

			return {

				name : '',

				password : '',

				errors : []
			}
		},

		computed : {

			...mapGetters(['getUserData'])
		},

		methods : {

			onSubmit () {

				if (this.name && this.password) {
					        
		        	this.errors = [];

		        	if(!this.getUserData) {

		        		this.errors.push('User not registered.');

		        		setTimeout(()=> {

		        			this.$router.push('/register');
		        		},2000)
		        	
		        	} else if( this.name != this.getUserData.name || this.password != this.getUserData.password) {

		        		this.errors.push('Incorrect Username or Password.');
		        	
		        	} else {

		        		this.$store.dispatch('updateLogin',true);

		        		this.$router.push('/customers')
		        	}
		        	
		        	return true;
		      }

		      this.errors = [];

		      if (!this.name) {
		        
		        this.errors.push('Username required.');
		      }
		      
		      if (!this.password) {
		      
		        this.errors.push('Password required.');
		      }
			}
		}
	};
</script>

<style scoped>
	
	.login-box {

		border: 2px solid #ddd;
	   padding: 10px;
	   margin-top: 100px;
	   border-radius: 6px;
	}

	.m-0 { margin: 0 !important; }
</style>