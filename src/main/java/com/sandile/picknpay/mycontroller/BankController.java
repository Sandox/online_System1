package com.sandile.picknpay.mycontroller;

import com.sandile.picknpay.errorexceptions.DataNotFoundException;
import com.sandile.picknpay.mymodel.Bank;
import com.sandile.picknpay.myservices.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

// has the capablity of handling multiple HTTP requests throughout the lifecycle of an application. 
@Controller
@RequestMapping(value = "/bank")
public class BankController{
    
    //You use @Autowired annotation on properties to get rid of the setter methods.
    @Autowired
    private BankService myBank;
    
  //find account details for the user
   @RequestMapping(value = "/findBankAccount/{cardNo}/{cardHolder}/{bankName}", method = RequestMethod.GET)
//tells a controller that the object returned is automatically serialized into JSON and passed back into the HttpResponse object.   
   @ResponseBody
    public Bank findBankAccount(@PathVariable int cardNo, @PathVariable String cardHolder, @PathVariable String bankName)
    {
        Bank banking = myBank.findBankAccount(cardNo, cardHolder, bankName);
        
        if(banking == null)
        {
            throw new DataNotFoundException("Account Not Authorized..Verify your Credict Card Details...");
        }
        return banking;
    }
    
    
     
   // Update bank account balance after a transaction
    //@RequestMapping ensures that HTTP requests to /updateBankBalance are mapped to the updateBankBalance() method.
    @RequestMapping(value = "/updateBankBalance/{cardNo}/{balance}", method = RequestMethod.PUT)
    @ResponseBody
    public int updateBankBalance(@PathVariable int cardNo, @PathVariable double balance)
    {
        
         int trans = myBank.updateBankBalance(cardNo, balance);
         
         if(trans  == 0)
         {
            throw new DataNotFoundException("Sorry we couldnt update your bank Balance ");
         }
            
        return trans ;
    }
    
}
