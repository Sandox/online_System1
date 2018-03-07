var picknpaySystem = angular.module("myApp",['ngRoute']);
picknpaySystem.config(["$routeProvider","$locationProvider",function($routeProvider) {

}]);



picknpaySystem.controller("RegisterController",['$scope','$http',function($scope,$http){
        
        //$http.post Submits data to be processed
    $http.defaults.headers.post["Content-Type"] = "application/json";  
           //$http requests from the server and returns json data 
          
        //Registering Customer 
      
        $scope.registerUsers = function (val)
        {
            var  userole = "customer";
           
            if(val === '1'){
                role = "Admin";
            }
           
            var user = {
                        "name" :$scope.myname,
                        "surname" :$scope.lastname,
                        "email" : $scope.email,
                        "password" : $scope.password,
                        "mobile" : $scope.cellphone,
                        "role":role
                    };
                    
            if(user.name !== undefined)
            {
                if(user.surname !== undefined)
                {
                  if(user.mobile !== undefined)
                        {
                            if(user.password !== undefined)
                            {
           //$http is a service function which takes a single argument and used to generate an HTTP request and returns a promise.
                                $http.post('/user/register',user).then(function(response) {
                                        
                                        if(response.data.userID !== 0)
                                        {
                                           alert("User is registered successfully...");
                                           window.location = './login.html';
                                        }
                                }).catch(function (error){
                                    alert(error.data.error + ": User unsuccessfully registered..");
                                });
                                // Validation 
                           }else
                            {
                                alert("Enter User Password...");
                            }
                        }else
                        {
                            alert("Enter User Cellphone Number...");
                        }
                    }else
                {
                    alert("Enter User Surname...");
                }
            }else
            {
                alert("Enter User First Name...");
            }
                    
       }; 
       
       // Method for registering Driver and Supplier 
             $scope.registerUser = function (val)
        {
            var  role = "supplier";
           
            if(val === '1'){
                role = "driver";
            }
            
           
            var myExternals = {
                        "name" :$scope.myname,
                        "surname" :$scope.lastname,
                        "email" : $scope.email,
                        "password" : $scope.password,
                        "mobile" : $scope.cellphone,
                        "role":role
                    };
                    
            if(myExternals.name !== undefined)
            {
                if(myExternals.surname !== undefined)
                {
                  if(myExternals.mobile !== undefined)
                        {
                            if(myExternals.password !== undefined)
                            {
                             
                                $http.post('/user/register',user).then(function(response) {
                                        
                                        if(response.data.userID !== 0)
                                        {
                                           alert("User is successfully registered...");
                                           window.location = './login.html';
                                        }
                                }).catch(function (error){
                                    alert(error.data.error + ": User Email address has been taken..");
                                });
                           }
                            
                        }
                    }
            }
                    
       };
       
       
}]);

// Login Controller
picknpaySystem.controller("LoginController",function($scope,$http){
    $http.defaults.headers.post["Content-Type"] = "application/json";  
   
    
    
        $scope.login = function ()
        {
            var username=  $scope.username;
            var password=  $scope.password;
            
            if(username !== undefined)
            {
                if(password !== undefined)
                {
                    var userId = 0;
                   $http.get('/user/login/'+ username + '/'+ password + '').then(function(response){
                               if(response.data.role === "customer")
                               {
                                  userId = response.data.userID;
                                  window.location = './customerHomePage.html?userId=' + userId;
                               }else if(response.data.role === "Admin")
                               {
                                 userId = response.data.userID;
                                 window.location = './adminHomePage.html?userId=' + userId;
                               }
                                 else if(response.data.role === "supplier")
                               {
                                  userId = response.data.userID;
                                  window.location = './supplierHomePage.html?userId=' + userId;
                               }else if(response.data.role === "driver")
                               {
                                 userId = response.data.userID;
                                 window.location = './driverHomePage.html?userId=' + userId;
                               }
		        }).catch(function(error){
                            alert(error.data.message);
                        });
                }else
                {
                   alert("Enter Password...");
                }
            }else
            {
               alert("Enter Username...");
            }
         };      
});

