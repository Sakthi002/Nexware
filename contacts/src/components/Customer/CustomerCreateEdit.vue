<template>
	
	<div class="container create-box col-md-8 offset-md-2">
  	
  		<h2>{{ title }}</h2>
    	
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

  		<div class="row">

  			<div class="col-sm-6">
  				
  				<div class="form-group">
      	
		      	<label for="name">First Name:</label>
		      	
		      	<input type="text" class="form-control" name="firstname" v-model="firstname">
		    	</div>
  			</div>

  			<div class="col-sm-6">
  				
  				<div class="form-group">
      	
		      	<label for="name">Last Name:</label>
		      	
		      	<input type="text" class="form-control" name="lastname" v-model="lastname">
		    	</div>
  			</div>
  		</div>

  		<div class="row">

  			<div class="col-sm-4">

		    	<div class="form-group">
		      	
		      	<label for="name">Email:</label>
		      	
		      	<input type="email" class="form-control" name="email" v-model="email">
		    	</div>
		    </div>

		    <div class="col-sm-4">

		    	<div class="form-group">
		      	
		      	<label for="name">Mobile:</label>
		      	
		      	<input type="number" class="form-control" name="mobile" v-model="mobile">
		    	</div>
		   </div> 

		   <div class="col-sm-4">

    			<div class="form-group">
      	
      			<label for="name">Website:</label>
      	
      			<input type="url" class="form-control" name="website" v-model="website">
    			</div>
    		</div>
		</div>

		<div class="row">

    		<div class="col-sm-12">

    			<div class="form-group">
      	
      			<label for="name">Address:</label>
      			
      			<div class="row" v-for="(input, index) in inputs">
      				
      				<div class="col-sm-10">
      					
      					<textarea :key="index" class="form-control mb-1" :name="'address'+index" v-model="input.value"></textarea>
      				</div> 

      				<div class="col-sm-2">

      					<button class="btn btn-danger" @click="deleteRow(index)" :disabled="inputs.length == 1">Delete</button>
      				</div>
      			</div>
    			</div>
    		</div>

    		<div class="col-sm-12">
    			
    			<button class="btn btn-light btn-block" @click="addRow">Add Address</button>
    		</div>
    	</div>

    	<button type="submit" class="btn btn-primary mt-3" @click="onSubmit">Submit</button>
  </div>
</template>

<script>
	
	import { mapGetters } from 'vuex';

	export default {

		name : 'register',

		props : {

			customer : { type : String | Number, default : '' }
		},

		data () {

			return {

				firstname : '',

				lastname : '',

				email : '',

				mobile : '',

				website : '',

				inputs : [{ value : '' }],

				errors : [],

				success : '',

				title : 'Create'
			}
		},

		computed : { 

			...mapGetters(['getEditData','getLogin'])
		},

		watch : {

			getEditData(newValue,oldValue) {

				if(newValue) {

					this.updateData(newValue)
				}

				return newValue
			}
		},


		mounted() {

			if(!this.getLogin) {

				this.$router.push('/')
			}

			this.updateData(this.getEditData);
		},
		
		methods : {

			updateData(value) {

				let path = this.$route.path.split('/');

				if(value && path[path.length-2] == 'edit') {

					this.title = 'Edit';

					this.firstname = value.firstname;
				
					this.lastname = value.lastname;
					
					this.email = value.email;
					
					this.website = value.website;
					
					this.mobile = value.mobile;
					
					this.inputs = value.address;
				}
			},

			addRow() {
      		
      		this.inputs.push({ value : '' });
    		},
    		
    		deleteRow(index) {
      		
      		this.inputs.splice(index,1)
    		},

			onSubmit () {

				if (this.firstname && this.lastname && this.email) {
					        
		        	this.errors = [];

		        	let obj = {};

		        	obj['firstname'] = this.firstname;

		        	obj['lastname'] = this.lastname;

		        	obj['email'] = this.email;

		        	obj['mobile'] = this.mobile;

		        	obj['website'] = this.website;
		        	
		        	obj['address'] = this.inputs;

		        	if(!this.getEditData) {

		        		this.$store.dispatch('updateCustomerData',obj);
		        	} else {
						
						let path = this.$route.path.split('/');

		        		this.$store.dispatch('updateCustomerEditData',{ index : path[path.length-1], value : obj });
		        	}

		        	this.success = 'Saved successfully';

		        	setTimeout(()=> {

		        		this.$router.push('/customers');
		        	},2000)
		      }

		      this.errors = [];

		      if (!this.firstname) {
		        
		        this.errors.push('Firstname required.');
		      }
		      
		      if (!this.lastname) {
		      
		        this.errors.push('Lastname required.');
		      }

		      if (!this.email) {
		      
		        this.errors.push('Email required.');
		      }
			}
		}
	};
</script>

<style scoped>
	
	.create-box {

		border: 2px solid #ddd;
	   padding: 10px;
	   margin-top: 10px;
	   border-radius: 6px;
	}

	.m-0 { margin: 0 !important; }
</style>