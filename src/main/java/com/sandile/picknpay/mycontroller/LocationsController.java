
package com.sandile.picknpay.mycontroller;

import com.sandile.picknpay.errorexceptions.DataNotFoundException;
import com.sandile.picknpay.myservices.LocationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/addressTypes")
public class LocationsController {
     @Autowired
    private LocationsService Service;
    
   
    @RequestMapping(value="/findAllAddressTypes", method = RequestMethod.GET)
    @ResponseBody
    public Object findAllDeliveryTypes()
    {
        Object objective = Service.findAllAddressTypes();
        if(objective == null)
        {
            throw new DataNotFoundException("Address Types Not Found...");
        }
        return objective;
    }
}
