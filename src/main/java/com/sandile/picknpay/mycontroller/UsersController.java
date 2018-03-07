package com.sandile.picknpay.mycontroller;

import com.sandile.picknpay.errorexceptions.DataNotFoundException;
import com.sandile.picknpay.mymodel.Users;
import com.sandile.picknpay.myservices.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

//Special controller that does nothing more than adding the @Controller and @ResponseBody annotations
@RestController
@RequestMapping(value = "/user")
public class UsersController {
    
    @Autowired
    private UsersService uService;
  
  
    @RequestMapping(value = "/findUserByUserId/{userId}" , method = RequestMethod.GET)
    //tells a controller that the object returned is automatically serialized into JSON and passed back into the HttpResponse object.
    @ResponseBody
    public Users findUsersByUserId(@PathVariable int userId)
    {
        Users role = uService.findUserByUserId(userId);
        if(role == null)
        {
            throw new DataNotFoundException("User do not Exists on this system ");
        }
        return role;
    }
    
    //Register  User
   @RequestMapping(method = RequestMethod.POST, value="/register")
   @ResponseBody
    public Users registerUsers(@RequestBody Users users) throws Exception 
    {
        Users  role = uService.saveUser(users);
        if(role!= null)
        {
            return role;
        }else{
            throw new DataNotFoundException("Could not register user because the email is already registered to someone");
        }     
    }
    
    //User Login using the registered creditionals
    @RequestMapping(value="/login/{username}/{password}", method = RequestMethod.GET)
    @ResponseBody
    public Users userLogin(@PathVariable String username, @PathVariable String password)
    { 
        // use password encoder to hide or cover the password of the user 
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); 
        Users role = uService.userLogin(username);
        if(role != null)
        {
           if(passwordEncoder.matches(password, role.getPassword()))
           {
              return role;
           }else
           {
              throw new DataNotFoundException("Your password is incorrect please try again");
           }
        }else{
             throw new DataNotFoundException("User Email Don't exist...Try Again!!!");
        }
    }
    
    //Find user using the user email address 
    @RequestMapping(value="/forgotPassword/{username}", method = RequestMethod.GET)
    @ResponseBody
    public Users userFogotPassword(@PathVariable String username)
    { 
        Users role = uService.findUserByEmail(username);
        if(role != null)
        {
            return role;
        }else
        {
            throw new DataNotFoundException("the email address doesn't exist or has been taken");
        }
    }
    
    //Update Password of the user based on user email 
    @RequestMapping(value="/newPassword/{password}/{email}", method = RequestMethod.PUT)
    @ResponseBody
    public int newPassword(@PathVariable String password,@PathVariable String email)
    { 
        int uPass = uService.updatePassword(password, email);
        if(uPass != 0)
        {
            return uPass;
        }else
        {
            throw new DataNotFoundException("Sorry Failed to update the passsword");
        }
    }
}
