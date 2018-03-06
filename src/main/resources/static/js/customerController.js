var picknpaySystem = angular.module("myApp",['ngRoute']);
picknpaySystem.config(["$routeProvider","$locationProvider",function($routeProvider) {

}]);

// Customer Controller 
picknpaySystem.controller("CustomerController", function ($scope, $http){
   $http.defaults.headers.post["Content-Type"] = "application/json";  
    var Data = {};
    window.location.search.replace(/\?/,'').split('&').map(function(o){ Data[o.split('=')[0]]= o.split('=')[1];});
    var userId = Data.userId;
    
    //$http.get Requests data from all users in the database
    $http.get('/user/findUserByUserId/' + userId + '').then(function (response) {
        $scope.users = response.data;
        
        });
        
        //$http.get Requests data from categories in the database
    $http.get('/category/findAllCategories').then(function (response) {
        $scope.categories = response.data;
        });
        

         $http.get('/product/findAllProducts').then(function(response){
            $scope.products = response.data;
	 });
   
         // uses the search function to search for categories 
      $scope.searchCategory = function(evnt, catName){
             $http.get('/category/findAllCategories/' + catName + '').then(function(response){
                 
                $scope.category = response.data;
                 var i, tabcontent, tablinks;
                tabcontent = document.getElementsByClassName("tabcontent");
                for (i = 0; i < tabcontent.length; i++) {
                    tabcontent[i].style.display = "none";
                }
                tablinks = document.getElementsByClassName("tablinks");
                for (i = 0; i < tablinks.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace("active", "");
                }
                document.getElementById(catName).style.display = "block";
                evnt.currentTarget.className += " active";
             });
           };
           
       // Add Product To Cart  
       $scope.cartItems = [];
       $scope.CartAmount = 0.0;
       $scope.addToCart = function(products)
       {
          var checkProducts = checkProductsInCart(products.productID);
          if(checkProducts === null)
           {
               amount = 1 * products.price;
            
                $scope.cartItems.push({ name : products.name, 
                quantity: 1, 
                productId : products.productID, 
                price : products.price,
                category : products.category,
                image: products.image,
                totalAmount: amount
            });
            
          }else
          {
            checkProducts.quantity++;
            var totalAmount = 0.0;
            for(var x = 0; x < $scope.cartItems.length; x++)
            {
                var amount = parseFloat($scope.cartItems[x].price * $scope.cartItems[x].quantity);
                totalAmount = amount;
             }
            
            checkProducts.totalAmount = totalAmount;
          }
            
            var totalAmount = 0.0;
            for(var x = 0; x < $scope.cartItems.length; x++)
            {
                var amount = parseFloat($scope.cartItems[x].totalAmount + totalAmount);
                totalAmount = amount;
            }
            $scope.CartAmount = totalAmount;
      };
       
       // Check if product exist in the database  
      function checkProductsInCart(id){
         for(var i=0; i < $scope.cartItems.length; i++){
           if($scope.cartItems[i].productId === id){
                return $scope.cartItems[i];
            }
        }
        return null;
     }

       $scope.removeCartItem = function()
       {
            var index = $scope.cartItems.indexOf($scope.cartItems.length);
            $scope.cartItems.splice(index, 1); 
            
       };
       
       // Increase Cart Item Quantity  and Cart Amount 
       $scope.increaseItemCount = function (item,quantity)
       {
         
            item.quantity = quantity;
             var totalAmount = 0.0;
            for(var x = 0; x < $scope.cartItems.length; x++)
            {
                var amount = parseFloat($scope.cartItems[x].price * $scope.cartItems[x].quantity);
                totalAmount = amount;
            }
             item.totalAmount = totalAmount;
             
            var totalAmount = 0.0;
            for(var x = 0; x < $scope.cartItems.length; x++)
            {
                var amount = parseFloat($scope.cartItems[x].totalAmount + totalAmount);
                totalAmount = amount;
            }
            $scope.CartAmount = totalAmount;
            
       };
       
       // Decrease Cart Item Quantity and Cart Amount  
       $scope.decreaseItemCount = function (item,quantity)
       {
            
            item.quantity = quantity;
           
            var totalAmount = 0.0;
            for(var x = 0; x < $scope.cartItems.length; x++)
            {
                var amount = parseFloat($scope.cartItems[x].price * $scope.cartItems[x].quantity);
                totalAmount = amount;
            }
          
            item.totalAmount = totalAmount;
          
            var totalAmount = 0.0;
            for(var x = 0; x < $scope.cartItems.length; x++)
            {
                var amount = parseFloat($scope.cartItems[x].totalAmount + totalAmount);
                totalAmount = amount;
            }
            $scope.CartAmount = totalAmount;
           
       };
       

         $http.get('/addressTypes/findAllAddressTypes').then(function(response){
                $scope.addressTypes = response.data;
	 });
         
      
         $http.get('/province/findAllProvinces').then(function(response){
              $scope.provinces = response.data;
	 });

         
         $http.get('/bankNames/findAllBankNames').then(function(response){
            $scope.bankNames = response.data;
	 });
         
        
         $scope.payement = function ()
         {
             var cardNo = $scope.cardNo;
             var cardHolder = $scope.cardHolder;
             var bankName = $scope.bankName;
             
             if(cardNo !== undefined)
             {
                if(cardHolder !== undefined)
                {
                    if(bankName !== undefined)
                    {
    $http.get('/bank/findBankAccount/' + cardNo + '/'+ cardHolder + '/' + bankName).then(function(response){
                            
                $scope.banking = response.data;
                          
                    if($scope.banking.bankID !== undefined)
                            {
                                var bankAmount = $scope.banking.balance;
                                var bankBalance = 0.0;
                                var cardAmount = $scope.CartAmount;
                                var bankCardNo = $scope.banking.cardno;
                                var bankId = $scope.banking.bankID;

                                if(bankAmount < cardAmount)
                                {
                                  alert("insufficient Funds in your Bank Account!! Order can not be Processed...");
                                }else{

                                    bankBalance = bankAmount - cardAmount;
                                    $http.put('/bank/updateBankBalance/' +cardNo+ '/' +bankBalance+ '').then(function(response){
                                    
                                    }).catch(function (error){
                                        alert(error.data.message);
                                    });; 

                                    var minNumber = 0; // The minimum number you want
                                    var maxNumber = 500; // The maximum number you want
                                    var randomnumber = Math.floor(Math.random() * (maxNumber + 1) + minNumber);
                                    var orderno = randomnumber + bankCardNo + randomnumber +  bankId;

                                    var address = {
                                        "orderno": orderno,
                                        "name": $scope.name,
                                        "surname": $scope.surname,
                                        "email":$scope.email,
                                        "addresstype": $scope.addressType,
                                        "contacts": $scope.contacts,
                                        "street": $scope.street,
                                        "city":$scope.city,
                                        "province":$scope.provinceName};
                                   
                                     
                                     if(address.name !== undefined)
                                     {
                                        if(address.surname !== undefined)
                                        {
                                            if(address.email !== undefined)
                                            {
                                                if(address.addresstype !== undefined)
                                                {
                                                    if(address.contacts !== undefined)
                                                    {
                                                        if(address.street !== undefined)
                                                        {
                                                            if(address.city !== undefined)
                                                            {
                                                                if(address.province !== undefined)
                                                                {
                                                                    for(var x = 0; x < $scope.cartItems.length; x++){

                                                                    var name = $scope.cartItems[x].name;
                                                                    var quantity = $scope.cartItems[x].quantity;
                                                                    var productId = $scope.cartItems[x].productId;
                                                                    var price =  $scope.cartItems[x].price;
                                                                    var category = $scope.cartItems[x].category;
                                                                    var image= $scope.cartItems[x].image;
                                                                  
                                                                      var orderData = {
                                                                      "orderstatus": "New Order",
                                                                      "orderamount": $scope.CartAmount ,
                                                                      "userID": userId,
                                                                      "orderno": orderno,
                                                                      "delivarydate":$scope.date,
                                                                      "name":name,
                                                                      "quantity":quantity,
                                                                      "productID":productId,
                                                                      "price":price,
                                                                      "category":category,
                                                                      "image":image
                                                                  };

                                                                 
                                                                  $http.post('/orders/saveOrders',orderData).then( function (response){
                                                                      
                                                                  }).catch(function (error){
                                                                      alert(error.data.message);
                                                                  });
                                                                }
                                                                $http.post('/address/saveAddress',address).then(function(response){

                                                                 }).catch(function (error){
                                                                      alert(error.data.message);
                                                                  });
                                                                     alert("Order Processed...");
                                                                     alert("Order Number:..." + orderno);
                                                                }else{
                                                                    alert("Select Recipient Province...");
                                                                }

                                                            }else{
                                                                alert("Enter Recipient City...");
                                                            }

                                                        }else{
                                                            alert("Enter Recipient Street Name...");
                                                        }

                                                    }else{
                                                        alert("Enter Recipient Contacts Numbers...");
                                                    }

                                                }else{
                                                    alert("Select Recipient Type...");
                                                }

                                            }else{
                                                alert("Enter Recipient Email...");
                                            }

                                        }else{
                                            alert("Enter Recipient Surname...");
                                        }

                                     }else{
                                         alert("Enter Recipient Name...");
                                     }
                                }
                             }            

                        }).catch(function (error){
                            alert(error.data.message);
                        });
                    }else
                    {
                        alert("Select Bank Name!!!");
                    }
                }else
                {
                    alert("Enter Your Card Holder Namde!!!");
                }
             }else
             {
                 alert("Enter Your Card Number!!!");
             }
     };
  
});


