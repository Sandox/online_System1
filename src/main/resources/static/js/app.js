var picknpaySystem = angular.module("myApp",['ngRoute']);
picknpaySystem.config(["$routeProvider","$locationProvider",function($routeProvider) {

}]);


//Setting new Password  
picknpaySystem.controller("ForgotPasswordController",function($scope,$http){
    $http.defaults.headers.post["Content-Type"] = "application/json";  
   
    
        //users email address to look for the details and get the password
        $scope.forgotPassword = function ()
        {
           var email =  $scope.username;
           try{
               
            if(username !== undefined)
            {
               
                $http.get('/user/forgotPassword/' + email + '').then( function (response){
                    $scope.user = response.data;
                    window.location = './newPassword.html?email=' + email;
                })
           
            }
        }
        catch(error){
             alert("Please re-enter your email Correctly");
        }
           
       };   
       
     //Customer Creates new password and override the old one
       $scope.newPassword = function (){
           var password = $scope.password;
           var newPassword = $scope.password1;
            var Data = {};
            window.location.search.replace(/\?/,'').split('&').map(function(o){ Data[o.split('=')[0]]= o.split('=')[1];});
            var email = Data.email;
   
        try
        {
           if(password === newPassword)
           {
               $http.put('/user/newPassword/' + password + '/' +email+'').then(function(response){
                    alert("New customer Password has been created...");
                    window.location = './login.html';
                    
               })
                  
            }
         }
        catch(error)
            {
             alert(error.data.message);   
            }
        
        };
});





//Category Controller
picknpaySystem.controller("CategoryController",function($scope,$http){
   
    $http.defaults.headers.post["Content-Type"] = "application/json";  

          
        //save the caegory
        $scope.saveCategory = function ()
        {
           var cat = {
              "name" :$scope.name
           };
          
          try{
          if(cat.name !== undefined){
              //submits the category name to be processed and written to the database
               $http.post('/category/saveCategory',cat ).then(function(response){
                     
                if(response.data.catcatID !== 0)
                {
                    alert("Category Added...");
                }
            })
            
          }
      }
          catch(error){
              
              alert("Enter Category Name");
          }
            
         };  
        
     //delete the selected category 
        $scope.removeCategory = function ()
        {
            var name = $scope.name;
            
            try
            {
            //select category from a drop down list     
            if( name !== undefined){
                 $http.delete('/category/deleteCategory/' + name + '').then(function(response){
                
                    if(response.data !== 0)
                    {
                         alert("Category has been Deleted");
                    }
                })
                 
            }
        }
        catch(error){
             alert("Enter Category Name to be deleted...");
        }
          
         };
});



//Order controller
picknpaySystem.controller("OrderController",function($scope,$http){
   
    $http.defaults.headers.post["Content-Type"] = "application/json";  
    
 //requests or finds the orders from the orders table in the database
     $http.get('/orders/findAllOrders').then(function(response){
               $scope.orders = response.data;

        });
        
     //Find All Order Statues 
    $http.get('/orderStatus/findAllOrderStatus').then(function(response){
                $scope.orderStatus = response.data;
               
 	 });
         
     
         //Driver Update Status Order Using Order ID
         $scope.updateOrderStatus = function(orderId, orderStatus)
         {
             //Every time a order is made it is New order bt defualt then driver changes the order after delivery 
             
             //updates existing order status 
             $http.put('/orders/updateOrderStatus/' + orderId + '/' + orderStatus + '').then(function(response){
                
                try{
                if(response.data !== 0)
                {
                 alert("Order Status has been Updated");
                }
            }
            catch(error){
                alert("Order Status failed to be updated");
            }
                
	 })
            
         };
         
       
         //uses the order number to delete the order
         $scope.removeOrder = function(orderNo)
         {
            console.log(orderNo); 
            
              $http.delete('/orders/deleteOrders/' + orderNo + '').then(function(response){
                
        try
            {
                if(response.data !== 0)
                {
                 alert("Order has been deleted");
                }
            }
            catch(error){
                
                 alert("Failed to delete the order");
            }
            })
                    
         };
               
});
   