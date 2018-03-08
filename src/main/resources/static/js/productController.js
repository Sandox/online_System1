var picknpaySystem = angular.module("myApp",['ngRoute']);
picknpaySystem.config(["$routeProvider","$locationProvider",function($routeProvider) {

}]);

picknpaySystem.controller("ProductController",function($scope,$http){
   
    $http.defaults.headers.post["Content-Type"] = "application/json";  

    var info = {};
    window.location.search.replace(/\?/,'').split('&').map(function(o){ info[o.split('=')[0]]= o.split('=')[1];});
    var userId = info.userId;
   
    $http.get('/user/findUserByUserId/' + userId + '').then(function (response) {
        $scope.user = response.data;
      });
    // Fetch All Products that are aviable 
    $http.get('/product/findAllProducts').then(function (response) {
       $scope.products = response.data;
    });
        
        
 
        $http.get('/category/findAllCategories').then(function (response) {
        $scope.categories = response.data;
       });
        
     // Method to deletes the product using the productID
        $scope.deleteProduct = function (productId)
        {
           
            $http.delete('/product/deleteProduct/' + productId + '').then(function(response){
                
                try
                {
                    if(response.data !== 0)
                    {
                         alert("Product has been Deleted");
                    }
                }
                catch(error){
                    
                    alert("Failed to delete the selected product");; 
                }
                
            })
                     
        };
        
        // Find Product based on a Product ID  
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
               
               alert("Failed to find the Product");;
           }
           
           })
           
       };
       
         // Update Products name or category type and price by retrieving the ProductID 
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
                            alert("Product has been Updated");
                        }
                    }
                    catch(error){
                        
                         alert("Could notsave the edited product");
                    }
                    
                    })
                                     
                }else
                {
                    alert("Enter Product Price...");
                }
            }else {
                alert("Enter Product Name...");
            }
        };
});


picknpaySystem.controller("AddProductController",function($scope,$http){
   
    $http.defaults.headers.post["Content-Type"] = "application/json";  
         
           
        // Finding all Categories which are available 
        $http.get('/category/findAllCategories').then(function (response) {
            $scope.categories = response.data;
         });
     
       
         // Admin Save Product
          $scope.image = null;
            var imageCopy = null;
		    var image = null;
		    var handleImageSelect = function (evt)
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
      
      //method for creating the product
        $scope.create = function ()
        {
            var myproduct = {
                        prodname :$scope.name,
                        prodcategory : $scope.category,
                        prodprice : $scope.price,
                        image : $scope.image
                  };
         
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
           alert("Product is successfully added Added...");
        }
           }
           catch(error){
               alert("Product could not be added");
           }
     })
   
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


