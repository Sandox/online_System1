var picknpaySystem = angular.module("myApp",['ngRoute']);
picknpaySystem.config(["$routeProvider","$locationProvider",function($routeProvider) {

}]);

picknpaySystem.controller("ProductController",function($scope,$http){
   
    $http.defaults.headers.post["Content-Type"] = "application/json";  

    var Data = {};
    window.location.search.replace(/\?/,'').split('&').map(function(o){ Data[o.split('=')[0]]= o.split('=')[1];});
    var userId = Data.userId;
   
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
        
   
        $scope.deleteProduct = function (productId)
        {
           
            $http.delete('/product/deleteProduct/' + productId + '').then(function(response){
               if(response.data !== 0)
                {
                   alert("Product has been Deleted");
                }
            }).catch(function (error){
                alert(error.data.message);
            }); 
        };
        // Find Product based on a Product ID  
        
        $scope.findProductById = function (productId)
        {
           $http.get('/product/findProductById/' + productId + '').then(function (response) {
            $scope.product = response.data;
           }).catch(function (error){
               alert(error.data.message);
           });
       };
       
         // Update Products name or category type and price by retrieving the ProductID 
        $scope.editProduct = function (productId)
        {
            var name = $scope.product.name;
            var cat = $scope.product.category;
            var price = $scope.product.price;
                        
            if(name !== undefined)
            {
                if( price !== undefined){
                    
                    $http.put('/product/updateProduct/' + productId + '/' + name + '/' + cat + '/'+price+'').then(function(response){
            
                        if(response.data !== 0)
                        {
                            alert("Product has been Updated");
                        }
                    }).catch(function (error){
                        alert(error.data.message);
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
		           
		            var reader = new FileReader();
		            reader.onload = function (readerEvt) {
		                var binaryString = readerEvt.target.result;
		                imageCopy = btoa(binaryString);
		                image = 'data:image/octet-stream;base64,' + imageCopy;
		                $scope.image = image;
		             };

		            reader.readAsBinaryString(file);
		        }
		    };

		    if (window.File && window.FileReader && window.FileList && window.Blob) {
		        document.getElementById('productImage').addEventListener('change', handleImageSelect, false);
		    } else {
		        alert('The File APIs are not fully supported in this browser.');
		    }
      
      
        $scope.create = function ()
        {
            var product = {
                        name :$scope.name,
                        category : $scope.category,
                        price : $scope.price,
                        image : $scope.image
                  };
         
         if(product.name !== undefined)
         {
             if(product.price !== undefined)
            {
               if(product.category !== undefined)
                    {
                       $http.post('/product/saveProduct',product).then(function(response){

                            if(response.data.pID !== 0)
                            {
                                alert("Product Added...");
                            }
                            }).catch(function(error){
                               alert(error.data.message);
                            });

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


