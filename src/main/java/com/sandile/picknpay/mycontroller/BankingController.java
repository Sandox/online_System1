package com.sandile.picknpay.mycontroller;

import com.sandile.picknpay.errorexceptions.DataNotFoundException;
import com.sandile.picknpay.myservices.BankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

// has the capablity of handling multiple HTTP requests throughout the lifecycle of an application. 
@Controller
@RequestMapping(value = "/bankNames")
public class BankingController {
    
    //You use @Autowired annotation on properties to get rid of the setter methods.
    @Autowired
    private BankingService bank;
    
    
   //@RequestMapping ensures that HTTP requests to /findAllBankNames are mapped to the findAllBankNames() method.
    @RequestMapping(value = "/findAllBankNames", method = RequestMethod.GET)
    @ResponseBody
    public Object findAllBankNames()
    {
        Object objective = bank.findAllBankNames();
        if(objective == null)
        {
            throw new DataNotFoundException("Bank Names Not Found...");
        }
        return objective;
    }
}
