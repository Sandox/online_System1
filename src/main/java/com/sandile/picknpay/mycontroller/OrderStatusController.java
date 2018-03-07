
package com.sandile.picknpay.mycontroller;

import com.sandile.picknpay.errorexceptions.DataNotFoundException;
import com.sandile.picknpay.myservices.OrderStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

// has the capablity of handling multiple HTTP requests throughout the lifecycle of an application.
@Controller
@RequestMapping(value = "/orderStatus")
public class OrderStatusController {
    
    @Autowired
    private OrderStatusService myOrder;
    
    
    @RequestMapping(method = RequestMethod.GET, value = "/findAllOrderStatus")
    //spring will try and convert view order status and return the value and try it to the http response automatically 
    @ResponseBody
    public Object viewOrderStatus()
    {
        Object objective =  myOrder.findAllOrderStatus();
        if(objective == null)
        {
            throw new DataNotFoundException("Order status names could not be found...");
        }
        return objective;
    }
    
    
}
