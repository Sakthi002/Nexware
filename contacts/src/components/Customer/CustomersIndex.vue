<template>
	
	<div class="container table-box">
  		
  		<div class="row">
  			
			<div class="col-sm-6"><h2>Customers</h2></div>

			<div class="col-sm-6"><router-link to="create" class="btn btn-primary float-right" @click.native="clearEditData">Create</router-link></div>
  		</div>
  		
  		<table class="table table-hover">
    		
    		<thead>
      		
      		<tr>
        			
        			<th>Firstname</th>
        			
        			<th>Lastname</th>
        			
        			<th>Email</th>

        			<th>Mobile</th>

        			<th>Website</th>

        			<th>Address</th>

        			<th>Action</th>
      		</tr>
    		</thead>
    		
    		<tbody v-if="getCustomerData.length">
   			
   			<tr v-for="(customer,index) in getCustomerData">
     			
        			<td>{{customer.firstname}}</td>
        			
        			<td>{{customer.lastname}}</td>

        			<td>{{customer.email}}</td>

        			<td>{{customer.mobile}}</td>

        			<td>{{customer.website}}</td>

        			<td>
        				<button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#myModal'+index">
    					View Address
  						</button>

  						<div class="modal" :id="'myModal'+index">
	    	
				    	<div class="modal-dialog">
				      	
				      	<div class="modal-content">
				      
				        		<div class="modal-header">
				          		
				          		<h4 class="modal-title">Address</h4>
				          		
				          		<button type="button" class="close" data-dismiss="modal">&times;</button>
				        		</div>
				        
				        		<div class="modal-body">
				          		
				          		<template v-for="(value, i) in customer.address">
				          			
				          			<strong>Address {{i+1}}</strong><br>
				          			
				          			<span>{{value.value}}</span><br><br>
				          		</template>
				        		</div>
				        
				        		<div class="modal-footer">
				          		
				          		<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
				        		</div>
				      </div>
				    </div>
	  				</div>
  					</td>

        			<td><router-link :to="'/edit/'+index" class="btn btn-primary" @click.native="onEdit(index)">Edit 
        			</router-link></td>
      		</tr>
      	</tbody>

      	<template v-else>No records found.</template>
  		</table>
	</div>
</template>

<script>
	
	import { mapGetters } from 'vuex';

	export default {

		name : 'customers',

		computed : {

			...mapGetters(['getCustomerData','getLogin'])
		},

		mounted() {

			if(!this.getLogin) {

				this.$router.push('/')
			}
		},

		methods : {

			onEdit(i) {

				this.$store.dispatch('updateEditData',this.getCustomerData[i])
			},

			clearEditData() {

				this.$store.dispatch('clearEditData')
			}
		}
	};
</script>
<style scoped>
	
	.table-box {

		border: 2px solid #ddd;
	   padding: 10px;
	   margin-top: 10px;
	   border-radius: 6px;
	}
</style>