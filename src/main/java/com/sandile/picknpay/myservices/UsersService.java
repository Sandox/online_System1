/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sandile.picknpay.myservices;

import com.sandile.picknpay.mymodel.Users;
import com.sandile.picknpay.myrepositories.UsersRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *
 * @author User
 */
@Service
public class UsersService {
    
    //You use @Autowired annotation on properties to get rid of the setter methods.
    @Autowired
    private UsersRepository myUser;
    
    public Users saveUser(Users users)
    {
      PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); 
      String hashedPassword = passwordEncoder.encode(users.getPassword());
      users.setPassword(hashedPassword);
      return myUser.save(users);
    }
    
    public Users findUserByUserId(int userId)
    {
        return myUser.findOne(userId);
    }
    
    public void deleteUser(int userId)
    {
        myUser.delete(userId);
    }
    
    public Users userLogin(String email)
    {
   
        return myUser.login(email);
    }
    
    public Users findUserByEmail(String email)
    {
        return myUser.forgotPassword(email);
    }
    
    public int updatePassword(String password, String email)
    {
        
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); 
        String hashedPassword = passwordEncoder.encode(password);
        System.out.println("password: " + hashedPassword);
        return myUser.updatePassword(hashedPassword, email);
    }
    
}
