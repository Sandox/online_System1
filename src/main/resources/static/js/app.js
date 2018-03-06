var picknpaySystem = angular.module("myApp",['ngRoute']);
picknpaySystem.config(["$routeProvider","$locationProvider",function($routeProvider) {

}]);


//Setting new Password  
picknpaySystem.controller("ForgotPasswordController",function($scope,$http){
    $http.defaults.headers.post["Content-Type"] = "application/json";  
   
    
        
        $scope.forgotPassword = function ()
        {
           var email =  $scope.username;
            if(username !== undefined)
            {
               
                $http.get('/user/forgotPassword/' + email + '').then( function (response){
                    $scope.user = response.data;
                    window.location = './newPassword.html?email=' + email;
                }).catch(function(error){
                    alert(error.data.message);
                });
           
            }else
            {
               alert("Enter Username...");
            }
            
       };   
       
       $scope.newPassword = function (){
           var password = $scope.password;
           var newPassword = $scope.password1;
            var Data = {};
            window.location.search.replace(/\?/,'').split('&').map(function(o){ Data[o.split('=')[0]]= o.split('=')[1];});
            var email = Data.email;
   
           if(password === newPassword)
           {
               $http.put('/user/newPassword/' + password + '/' +email+'').then(function(response){
                    alert("New User Password has been created...");
                    window.location = './login.html';
                    
               }).catch(function (error){
                   alert(error.data.message);
               });
            }else
           {
               alert("Passwords Dont Match....");
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
          
          if(cat.name !== undefined){
               $http.post('/category/saveCategory',cat ).then(function(response){
                     
                if(response.data.catcatID !== 0)
                {
                    alert("Category Added...");
                }
            }).catch(function (error){
                alert(error.data.message);
            });
          }else
          {
              alert("Enter Category Name...");
          }
      
        };  
        
     
        $scope.removeCategory = function ()
        {
            var name = $scope.name;
            if( name !== undefined){
                 $http.delete('/category/deleteCategory/' + name + '').then(function(response){
                
                    if(response.data !== 0)
                    {
                         alert("Category has been Deleted");
                    }
                }).catch(function (error){
                    alert(error.data.message);
                });
            }else
            {
               alert("Enter Category Name to be deleted...");
            }
         };
});



//Order controller
picknpaySystem.controller("OrderController",function($scope,$http){
   
    $http.defaults.headers.post["Content-Type"] = "application/json";  
    

     $http.get('/orders/findAllOrders').then(function(response){
               $scope.orders = response.data;

        });
        
     //Find All Order Statues 
         
         $http.get('/orderStatus/findAllOrderStatus').then(function(response){
                $scope.orderStatus = response.data;
               
 	 });
         
     
         //Admin Update Status Order Using Order ID 
         
         $scope.updateOrderStatus = function(orderId, orderStatus)
         {
             
             $http.put('/orders/updateOrderStatus/' + orderId + '/' + orderStatus + '').then(function(response){
                
                if(response.data !== 0)
                {
                 alert("Order Status has been Updated");
                }
	 }).catch(function (error){
             alert(error.data.message);
         });
             
         };
         
       
         
         $scope.removeOrder = function(orderNo)
         {
            console.log(orderNo);   
              $http.delete('/orders/deleteOrders/' + orderNo + '').then(function(response){
                
                if(response.data !== 0)
                {
                 alert("Order has been deleted");
                }
            }).catch(function (error){
                alert(error.data.message);
            });;
         };
         
         // Tracking order for registered customers 
         $scope.trackOrder = function (orderNo)
         {
            if(orderNo !== undefined){ 
                $http.get('/orders/findByOrderNo/' + orderNo + '').then(function(response){
                  
                   $scope.ordersIn = response.data;
                }).catch(function (error){
                    alert(error.data.message);
                });
        
                $http.get('/address/findAddressByOrderNo/' + orderNo + '').then(function(response){
                  
                   $scope.delivary = response.data;
                 }).catch(function (error){
                    alert(error.data.message);
                });
            }else
            {
                alert("Enter Order Number...!!!");
            }
       };
});
   