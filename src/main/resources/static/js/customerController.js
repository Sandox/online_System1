var picknpaySystem = angular.module("myApp",['ngRoute']);
picknpaySystem.config(["$routeProvider",function($routeProvider) {

}]);

//************************************CUSTOMER CONTROLLER***********************************************


picknpaySystem.controller("CustomerController", function ($scope, $http){
   $http.defaults.headers.post["Content-Type"] = "application/json";  
    var cusData = {};
    window.location.search.replace(/\?/,'').split('&').map(function(o){ cusData[o.split('=')[0]]= o.split('=')[1];});
    var userId = cusData.userId;
    
    //$http.get Requests data from all users using the id in the database
    $http.get('/user/findUserByUserId/' + userId + '').then(function (dolist) {
        $scope.users = dolist.data;
        
        });
        
        //$http.get Requests data from categories in the database
    $http.get('/category/findAllCategories').then(function (dolist) {
        $scope.categories = dolist.data;
        });
        

         $http.get('/product/findAllProducts').then(function(dolist){
            $scope.products = dolist.data;
	 });
   
         // uses the search function to search for categories 
      $scope.searchCategory = function(evnt, categoryName){
             $http.get('/category/findAllCategories/' + categoryName + '').then(function(dolist){
                 
                $scope.category = dolist.data;
                 var x, tabcontent, tablinks;
                tabcontent = document.getElementsByClassName("tabcontent");
                for (x = 0; x < tabcontent.length; x++) {
                    tabcontent[x].style.display = "none";
                }
                tablinks = document.getElementsByClassName("tablinks");
                for (x = 0; x < tablinks.length; x++) {
                    tablinks[x].className = tablinks[x].className.replace("active", "");
                }
                document.getElementById(categoryName).style.display = "block";
                evnt.currentTarget.className += " active";
             });
           };
         
 //*************Adding to Cart and Payment and Making a Order Process Below**********************************
    
       // Add Product To Cart  
       $scope.cartItems = [];
       $scope.CartAmount = 0.0;
       $scope.addToCart = function(myproduct)
       {
          //checks the products in the cart using the product ID 
          var checking = checkProductsInCart(myproduct.productID);
          // checks if the products in the cart is 
          try{
          if(checking === null)
           {
               amount = 1 * myproduct.price;
            
                $scope.cartItems.push({ name : myproduct.name, 
                quantity: 1, 
                productId : myproduct.productID, 
                price : myproduct.price,
                category : myproduct.category,
                image: myproduct.image,
                totalAmount: amount
            });
            
          }else
          {
            checking.quantity++;
            var totalAmount = 0.0;
            for(var x = 0; x < $scope.cartItems.length; x++)
            {
                var amount = parseFloat($scope.cartItems[x].price * $scope.cartItems[x].quantity);
                totalAmount = amount;
             }
            
            checking.totalAmount = totalAmount;
          }
          }
          catch(error){
              
               error.data.error + ": failed to insert your cart items";
          }
            
            var totalAmount = 0.0;
            for(var x = 0; x < $scope.cartItems.length; x++)
            {
                var amount = parseFloat($scope.cartItems[x].totalAmount + totalAmount);
                totalAmount = amount;
            }
            $scope.CartAmount = totalAmount;
      };
       
     // Check if product the are products in the Cart function
      function checkProductsInCart(id){
         for(var i=0; i < $scope.cartItems.length; i++){
           if($scope.cartItems[i].productId === id){
                return $scope.cartItems[i];
            }
        }
        return null;
     }

//Removing the Items on the Cart Funcion 
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
       
       //fecths the addresstypes through the addressController which has the method and uses the services url to get the methods
         $http.get('/addressTypes/findAllAddressTypes').then(function(response){
                $scope.addressTypes = response.data;
	 });
         
      //uses the services url to get the methods and create a scope of the object
         $http.get('/province/findAllProvinces').then(function(response){
              $scope.provinces = response.data;
	 });

         //uses the services url to get the methods and create a scope of the object
         $http.get('/bankNames/findAllBankNames').then(function(response){
            $scope.bankNames = response.data;
	 });
         
//*****************************************************PAYMENT PROCESS BELOW*********************************************************************
         $scope.payement = function ()
         {
             var cardNo = $scope.cardNo;
             var cardHolder = $scope.cardHolder;
             var bankName = $scope.bankName;
             
             //user must insert this required field
             if(cardNo !== undefined)
             {
                if(cardHolder !== undefined)
                {
                    if(bankName !== undefined)
   
                     {
                         
    //uses the services url to get the methods and create a scope of the object
    $http.get('/bank/findBankAccount/' + cardNo + '/'+ cardHolder + '/' + bankName).then(function(response){
                            
    $scope.banking = response.data;
                          
    if($scope.banking.bankID !== undefined)
       {
         var bankAmount = $scope.banking.balance;
         var bankBalance = 0.0;
         var cartAmount = $scope.CartAmount;
         var bankCardNo = $scope.banking.cardno;
         var bankId = $scope.banking.bankID;

        if(bankAmount < cartAmount)
            {
            alert("insufficient Funds in your Bank Account!! Order can not be Processed...");
            }
            else{

              bankBalance = bankAmount - cartAmount;
                 //used to update existing bank balance in server based on the request mapping
            $http.put('/bank/updateBankBalance/' +cardNo+ '/' +bankBalance+ '').then(function(response){
                                    
            }).catch(function (error){
              alert(error.data.message);
    }); 

      var minNumber = 0; // The minimum number you want
      var maxNumber = 5000; // The maximum number you want
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
                  
                
//required fields for the address used for delivery
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
       
//*************************ORDER PROCESS BELOW*************************************//*****************                                            
                                            
//angularjs gets the request mapping from the controller and uses the controller which autowires the service-class  
$http.post('/orders/saveOrders',orderData).then( function (response){

    try{ if(orderData !== null)
        {
                                                                          
          alert("Order Processed...");
        }
       
     }
                                                                      
    catch(error){
                error.data.error + ": Your Order cannot be Proceed ";  
                }
                                                                   
    });
                                                              
                                                                    
     }
     
 // Tracking order for registered customers 
  $scope.trackOrder = function (orderNo)
         {
             try{ if(orderNo !== undefined)
                 
          { 
                $http.get('/orders/findByOrderNo/' + orderNo + '').then(function(response){
                  
                   $scope.ordersIn = response.data;
                });
  
      //requests / fetchs the address by the order number
     $http.get('/address/findAddressByOrderNo/' + orderNo + '').then(function(response){
                  
         $scope.delivary = response.data;
         });
      
        }
        }
        catch(error){
            
            alert("Enter Order Number...!!!");
        }
            
     
       };
 
   
//saving the customer address for the delivery
$http.post('/address/saveAddress',address).then(function(response){
     try{ if(address !== null)
         {
            alert("Order Number:..." + orderno);
         }
        }
                                                                 
       catch(error){
                 error.data.error + ": There is a problem with your address";
                    }
});
                                                            
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


