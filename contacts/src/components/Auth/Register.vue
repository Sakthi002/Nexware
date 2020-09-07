<template>
	
	<div class="container register-box col-md-6 offset-md-3">
  	
  		<h2 class="text-center">Register</h2>
    	
    	<div v-if="errors.length" class="alert alert-danger alert-dismissible">
    		
    		<button type="button" class="close" data-dismiss="alert">&times;</button>
    		
    		<ul class="m-0">
		     
		      <li v-for="error in errors">{{ error }}</li>
		    </ul>
  		</div>

  		<div v-if="success" class="alert alert-success alert-dismissible">
    		
    		<button type="button" class="close" data-dismiss="alert">&times;</button>
    		
    		{{ success }}
  		</div>

    	<div class="form-group">
      	
      	<label for="name">User Name:</label>
      	
      	<input type="text" class="form-control" placeholder="Enter username" name="name" v-model="name">
    	</div>
    	
    	<div class="form-group">
      	
      	<label for="pwd">Password:</label>
      	
      	<input type="password" class="form-control" placeholder="Enter password" name="password" v-model="password">
    	</div>

    	<div class="form-group">
      	
      	<label for="pwd">Confirm Password:</label>
      	
      	<input type="password" class="form-control" placeholder="Confirm password" name="confirm" v-model="confirm">
    	</div>
    	
    	<button type="submit" class="btn btn-primary btn-block" @click="onSubmit">Submit</button>
  </div>
</template>

<script>

	export default {

		name : 'register',

		data () {

			return {

				name : '',

				password : '',

				confirm : '',

				errors : [],

				success : ''
			}
		},

		methods : {

			onSubmit () {

				if (this.name && this.password && this.confirm) {
					        
		        	this.errors = [];

		        	if(this.password != this.confirm ) {

		        		this.errors.push('Password not matching.');
		        	} else {

		        		let obj = {};

		        		obj['name'] = this.name;

		        		obj['password'] = this.password;

		        		this.$store.dispatch('updateUserData',obj);

		        		this.success = 'Registered successfully';

		        		setTimeout(()=> {

		        			this.$router.push('/login');
		        		},2000)
		        	}

		        	return true
		      }

		      this.errors = [];

		      if (!this.name) {
		        
		        this.errors.push('Username required.');
		      }
		      
		      if (!this.password) {
		      
		        this.errors.push('Password required.');
		      }

		      if (!this.confirm) {
		      
		        this.errors.push('Confirm Password required.');
		      }
			}
		}
	};
</script>

<style scoped>
	
	.register-box {

		border: 2px solid #ddd;
	   padding: 10px;
	   margin-top: 100px;
	   border-radius: 6px;
	}

	.m-0 { margin: 0 !important; }
</style>