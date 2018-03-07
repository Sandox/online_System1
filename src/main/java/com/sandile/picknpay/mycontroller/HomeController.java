package com.sandile.picknpay.mycontroller;



import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

// has the capablity of handling multiple HTTP requests throughout the lifecycle of an application.
@Controller
public class HomeController {
    
    
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String homePage()
    {
        return "home";
    }
    
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String loginPage()
    {
        return "login";
    }
    
    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public String registerPage()
    {
        return "register";
    }
    
    @RequestMapping(value = "/forgotPassword", method = RequestMethod.GET)
    public String forgotPassword()
    {
        return "forgotPassword";
    }
    
    @RequestMapping(value = "/newPassword", method = RequestMethod.GET)
    public String newPassword()
    {
        return "newPassword";
    }
    
    
    @RequestMapping(value = "/adminHomePage", method = RequestMethod.GET)
    public String adminPage()
    {
        return "adminHomePage";
    }
    
    @RequestMapping(value = "/addProduct", method = RequestMethod.GET)
    public String addProduct()
    {
        return "addProduct";
    }
    
    @RequestMapping(value = "/updateProduct", method = RequestMethod.GET)
    public String updateProduct()
    {
        return "updateProduct";
    }
    
    @RequestMapping(value = "/addCategory", method = RequestMethod.GET)
    public String addCategory()
    {
        return "addCategory";
    }
    
    @RequestMapping(value = "/registerAdmin", method = RequestMethod.GET)
    public String registerAdmin()
    {
        return "registerAdmin";
    }
    
    @RequestMapping(value = "/viewOrders", method = RequestMethod.GET)
    public String viewOrders()
    {
        return "viewOrders";
    }
    
  //Customer Pages for Registered users only
    @RequestMapping(value = "/customerHomePage", method = RequestMethod.GET)
    public String customerHomePage()
    {
        return "customerHomePage";
    }
    
    @RequestMapping(value = "/customerOrders", method = RequestMethod.GET)
    public String customerOrders()
    {
        return "customerOrders";
    }
    
    //mapping for adding supplier and driver
       @RequestMapping(value = "/registerSupplier", method = RequestMethod.GET)
    public String registerSupplier()
    {
        return "registerSupplier";
    }
    
    @RequestMapping(value = "/registerDriver", method = RequestMethod.GET)
    public String registerDreiver()
    {
        return "registerDriver";
    }
    
    @RequestMapping(value = "/driverHomePage", method = RequestMethod.GET)
    public String driverHomePage()
    {
        return "driverHomePage";
    }
    
    @RequestMapping(value = "/supplierHomePage", method = RequestMethod.GET)
    public String supplierHomePage()
    {
        return "supplierHomePage";
    }
}
