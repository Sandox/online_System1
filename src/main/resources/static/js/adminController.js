var picknpaySystem = angular.module("myApp",['ngRoute']);
picknpaySystem.config(["$routeProvider",function($routeProvider) {

}]);

//*****************************REGISTERATION PROCESS BELOW*******************************************

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
                                        
                     try { 
        if(response.data.userID !== 0){
            
            alert(response + "User is registered successfully...");
             window.location = './login.html';
        } 
        
    }
    catch(error){
        
        alert(error + "User unsuccessfully registered");
        
    }                             
                                    
      });
        // Validates if the user has inserted the fields  
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
//***************************************METHOD FOR REGISTERING SUPPLIER AND DRIVER*****************************  
        
       // Method for registering Driver and Supplier 
             $scope.registerUser = function (val)
        {
            var  role = "supplier";
           
            if(val === '1'){
                role = "driver";
            }
            
           //external users of the system
            var myExternals = {
                        "name" :$scope.myname,
                        "surname" :$scope.lastname,
                        "email" : $scope.email,
                        "password" : $scope.password,
                        "mobile" : $scope.cellphone,
                        "role":role
                    };
                    
          
                             
           $http.post('/user/register',myExternals).then(function(response) {
                                        
                                             try { 
        if(response.data.userID !== 0){
            
            alert(response + "User is registered successfully...");
             window.location = './login.html';
        } 
        
        }
        catch(error){
        
        (error + "Admin failed to successfilly register external users");
        
         }
                                        
                                        
                                        
      });
   };
                            
 }
         
]);

//**************************************LOGIN PROCESS BELOW******************************************************

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
                               
                       
                       
                               try
                               {
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
                               
                       }
                       catch(error){
                           
                            (error + " Sorry your details are not found");
                       }
		        });
                              
                }else
                {
                   alert("Enter Your user password...");
                }
            }else
            {
               alert("Enter Your user email...");
            }
         };      
});


//****************************************FORGOT PASSWORD PROCESS BELOW******************************************************

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
                });
           
            }
        }
        catch(error){
             alert(error + "Please re-enter your email Correctly");
        }
           
       };   
       
 //*************************************Customer Creates new password and override the old one**********************
    
    
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
                    
               });
                  
            }
         }
        catch(error)
            {
             alert(error + "Please passwords dont match ");  
            }
        
        };
});