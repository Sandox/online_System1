var picknpaySystem = angular.module("myApp",['ngRoute']);
picknpaySystem.config(["$routeProvider","$locationProvider",function($routeProvider) {

}]);

//***************************************************PRODUCT CONTROLLER************************************************
picknpaySystem.controller("ProductController",function($scope,$http){
   
   
    $http.defaults.headers.post["Content-Type"] = "application/json";  
     //$http requests from the server and returns json data 

    var info = {};
    window.location.search.replace(/\?/,'').split('&').map(function(o){ info[o.split('=')[0]]= o.split('=')[1];});
    var userId = info.userId;
   
   //fecths the all the user through the userController which has the method and uses the services url to get the methods
    $http.get('/user/findUserByUserId/' + userId + '').then(function (response) {
        $scope.user = response.data;
      });
 // Fetch All Products that are aviable 
    $http.get('/product/findAllProducts').then(function (response) {
       $scope.products = response.data;
    });
        
        
//fecths the all the categories through the categoryController which has the method and uses the services url to get the methods 
        $http.get('/category/findAllCategories').then(function (response) {
        $scope.categories = response.data;
       });
        
 
//******************************************** Method to deletes the product using the productID****************************************
        $scope.deleteProduct = function (productId)
        {
           
            $http.delete('/product/deleteProduct/' + productId + '').then(function(response){
                
                try
                {
                    if(response.data !== 0)
                    {
                         alert(response+"Product has been Deleted");
                    }
                }
                catch(error){
                    
                    alert(error + "Failed to delete the selected product");; 
                }
                
            });
                     
        };
        
//********************************************************** Find Product based on a Product ID*************************************************  
        $scope.findProductById = function (productId)
        {
           $http.get('/product/findProductById/' + productId + '').then(function (response) {
               
              try
              { 
               if(product !== null){
               $scope.product = response.data;
               }
           }
           catch(error){
               
               alert(error + "Failed to find the Product");;
           }
           
           });
           
       };
       
 //************************************* Update Products name or category type and price by retrieving the ProductID****************************** 
        $scope.editProduct = function (productId)
        {
            var prodname = $scope.product.name;
            var prodcategory = $scope.product.category;
            var prodprice = $scope.product.price;
                        
            if(prodname !== undefined)
            {
                if( prodprice !== undefined){
                    
                    $http.put('/product/updateProduct/' + productId + '/' + prodname + '/' + prodcategory + '/'+prodprice+'').then(function(response){
            
                 try{
                        if(response.data !== 0)
                        {
                            alert (response + "Product has been Updated");
                        }
                    }
                    catch(error){
                        
                         alert(error + "Could not save the edited product");
                    }
                    
                    });
                                     
                }else
                {
                    alert("Enter Product Price...");
                }
            }else {
                alert("Enter Product Name...");
            }
        };
});

//****************************************************ADMIN ADDING PRODUCT PROCESS BELOW*****************************************
picknpaySystem.controller("AddProductController",function($scope,$http){
   
    $http.defaults.headers.post["Content-Type"] = "application/json";  
         
           
        // Finding all Categories which are available 
        $http.get('/category/findAllCategories').then(function (response) {
            $scope.categories = response.data;
         });
     
       
//**************************************************Uploading a picture for a product**********************************************
          $scope.image = null;
            var imageCopy = null;
		    var image = null;
		    var handleImageSelect = function (evt)// FileList object

    // files is a FileList of File objects. List some properties.
		    {
		        var files = evt.target.files;
		        var file = files[0];

		        if (files && file) {
		           
		            var fleRead = new FileReader();
		            fleRead.onload = function (readerEvt) {
		                var binaryString = readerEvt.target.result;
		                imageCopy = btoa(binaryString);
		                image = 'data:image/octet-stream;base64,' + imageCopy;
		                $scope.image = image;
		             };

		            fleRead.readAsBinaryString(file);
		        }
		    };

		    if (window.File && window.FileReader && window.FileList && window.Blob) {
		        document.getElementById('productImage').addEventListener('change', handleImageSelect, false);
		    } else {
		        alert('The File APIs are not fully supported in this browser.');
		    }
      
//****************************************************ADMIN ADDING PRODUCT METHOD*****************************************      
      //method for creating the product
        $scope.create = function ()
        {
            var myproduct = {
                        prodname :$scope.name,
                        prodcategory : $scope.category,
                        prodprice : $scope.price,
                        image : $scope.image
                  };
  // user must fill the defualt fields        
if(myproduct.prodname !== undefined)
{
if(myproduct.prodprice !== undefined)
 {
   if(myproduct.prodcategory !== undefined)
           {
           $http.post('/product/saveProduct',myproduct).then(function(response){

           try{
             if(response.data.pID !== 0)
            {
           alert(response + "Product is successfully added Added...");
        }
           }
           catch(error){
               alert(error + "Product could not be added");
           }
     });
   
  // expectations for creating the new product
    }else{
   alert("Select Product Category...");
    }
    }else{
   alert("Enter Product Price...");
 }

}else{
  alert("Enter Product Name...");
 }
  };   
});


