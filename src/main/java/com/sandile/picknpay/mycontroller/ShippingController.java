
package com.sandile.picknpay.mycontroller;

import com.sandile.picknpay.errorexceptions.DataNotFoundException;
import com.sandile.picknpay.myservices.ShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value = "/delivaryType")
public class ShippingController {
    
    @Autowired
    private ShippingService ship;
    
  
    @RequestMapping(value="/findAllDelivaryTypes", method = RequestMethod.GET)
    @ResponseBody
    public Object findAllDeliveryTypes()
    {
        Object objective = ship.findAllDeliveryTypes();
        if(objective == null)
        {
            throw new DataNotFoundException("Address Types Not Found...");
        }
        
        return objective;
    }
    
}
