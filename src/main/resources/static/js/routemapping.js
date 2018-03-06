var picknpaySystem = angular.module("myApp",['ngRoute']);
picknpaySystem.config(["$routeProvider","$locationProvider",function($routeProvider) {
  $routeProvider
    .when('/login', {
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
   }).when('/customerOrders',{
       templateUrl :'/customerOrders.html',
       controller : 'OrderController'
   }).otherwise({
       redirectTo :'/'
    });
}]);


