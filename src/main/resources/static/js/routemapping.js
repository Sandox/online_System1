var picknpaySystem = angular.module("myApp",['ngRoute']);
picknpaySystem.config(["$routeProvider",function($routeProvider) {
  $routeProvider
  //this is the request-mapping from the HomeController 
    .when('/login', {
        // this is the name of the login page in the templates folder 
       templateUrl :'/login.html',
       controller : 'LoginController'
   }).when('/register',{
       templateUrl :'/register.html',
       controller : 'RegisterController'
   }).when('/forgotPassword',{
       templateUrl :'/forgotPassword.html',
       controller : 'ForgotPasswordController'
   }).when('/newPassword',{
       templateUrl :'/newPassword.html',
       controller : 'ForgotPasswordController'
   }).when('/adminHomePage',{
       templateUrl :'/adminHomePage.html',
       controller : 'ProductController'
   }).when('/addProduct',{
       templateUrl :'/addProduct.html',
       controller : 'AddProductController'
   }).when('/updateProduct',{
       templateUrl :'/updateProduct.html',
       controller : 'ProductController'
   }).when('/addCategory',{
       templateUrl :'/addCategory.html',
       controller : 'CategoryController'
   }).when('/registerAdmin',{
       templateUrl :'/registerAdmin.html',
       controller : 'RegisterController'
   }).when('/viewOrders',{
       templateUrl :'/viewOrders.html',
       controller : 'OrderController'
   }).when('/customerHomePage',{
       templateUrl :'/customerHomePage.html',
       controller : 'CustomerController'
   })
      .when('/customerOrders',{
       templateUrl :'/customerOrders.html',
       controller : 'OrderController'
   })
     .when('/registerSupplier',{
       templateUrl :'/registerSupplier.html',
       controller : 'RegisterController'
   }).when('/registerDriver',{
       templateUrl :'/registerDriver.html',
       controller : 'RegisterController'
   })
   .otherwise({
       redirectTo :'/'
    });
}]);


