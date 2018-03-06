package com.sandile.picknpay.mycontroller;

import com.sandile.picknpay.errorexceptions.DataNotFoundException;
import com.sandile.picknpay.myservices.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value = "/province")
public class ProvinceController {
    
    @Autowired
    private ProvinceService states;
    
   
    @RequestMapping(value="/findAllProvinces", method = RequestMethod.GET)
    @ResponseBody
    public Object findAllProvinces()
    {
        Object objective =  states.findAllProvinces();
        
        if(objective == null)
        {
            throw new DataNotFoundException("Provinces Not Found...");
        }
         return objective;   
    }
}
