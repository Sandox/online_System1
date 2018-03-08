var picknpaySystem = angular.module("myApp",['ngRoute']);
picknpaySystem.config(["$routeProvider","$locationProvider",function($routeProvider) {

}]);

//***************************************************CATEGORY CONTROLLER**********************************************************
picknpaySystem.controller("CategoryController",function($scope,$http){
   
    $http.defaults.headers.post["Content-Type"] = "application/json";  

          
//*******************************************ADMIN WORKING WITH CATEGORY FUNCTIONS BELOW******************************************
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
            });
            
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
                });
                 
            }
        }
        catch(error){
             alert("Enter Category Name to be deleted...");
        }
          
         };
});



//**************************************************************ORDER CONTROLLER*******************************************
picknpaySystem.controller("OrderController",function($scope,$http){
   
    $http.defaults.headers.post["Content-Type"] = "application/json";  
     //$http requests from the server and returns json data 
    
//***************************************************FUNCTIONS WORKING WITH THE ORDERS BELOW********************************    
    
 //fecths the all the order through the ordersController which has the method and uses the services url to get the methods
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
             
 //*****************Every time a order is made it is New order bt defualt then driver changes the order after delivery 
             
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
                
	 });
            
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
            });
                    
         };
               
});
   