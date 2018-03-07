
package com.sandile.picknpay.mycontroller;

import com.sandile.picknpay.errorexceptions.DataNotFoundException;
import com.sandile.picknpay.mymodel.Orders;
import com.sandile.picknpay.myservices.AddressService;
import com.sandile.picknpay.myservices.OrdersService;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/orders")
public class OrdersController {
    
    @Autowired
    private OrdersService myOrder;
    
    @Autowired
    private AddressService addServ;
    
     // Saving user Order
    @RequestMapping(value = "/saveOrders", method = RequestMethod.POST)
    //tells a controller that the object returned is automatically serialized into JSON and passed back into the HttpResponse object.
    @ResponseBody
    public Orders saveOrder(@RequestBody Orders orders)
    {
       Orders ordering = myOrder.saveOrders(orders);
           
        if(ordering == null)
        {
            throw new DataNotFoundException("Sorry but we failded to save your Order ");
        }
       
        return ordering;
    }
    
     //Deleting User orders 
    @RequestMapping(value = "/findAllOrders", method = RequestMethod.GET)
    @ResponseBody
    public Object findAllOrders()
    {
        
        Object objective =  myOrder.findAllOrders();
        if(objective == null)
        {
            throw new DataNotFoundException("Avialble Orders could not be found");
        }
       return objective;
    }
    
    //updating order status on user orders 
    @RequestMapping(value = "/updateOrderStatus/{orderId}/{orderStatus}", method = RequestMethod.PUT)
    @ResponseBody
    public int updateOrderStatus(@PathVariable int orderId, @PathVariable String orderStatus )
    {
       
       int state = myOrder.updateOrdersStatus(orderId, orderStatus);
       if(state != 1)
       {
           throw new DataNotFoundException("Order Status could not be Updated...");
       }
       return state;
    }
    
    //removing order status on user orders 
    @RequestMapping(value = "/deleteOrders/{orderNo}" , method = RequestMethod.DELETE)
    @ResponseBody
    public int removeOrderStatu(@PathVariable int orderNo )
    {
       int rem = myOrder.deleteOrders(orderNo);
        
        if(rem != 1){
            throw new DataNotFoundException("Your Order could not be deleted...");
        }else{
            if(rem == 1)
            {
                 addServ.deleteDelivery(orderNo);
            }
        }
        return rem;
    }
    
    //View order Status
    @RequestMapping(value = "/findByOrderNo/{orderno}", method = RequestMethod.GET)
    @ResponseBody
    public ArrayList<Orders> viewByOrderNo(@PathVariable int orderno)
    {
        ArrayList<Orders> oList = myOrder.findOrdersByOrderNo(orderno);
        
        if(oList.isEmpty())
        {
            throw new DataNotFoundException("Your Order could not be found...");
        }
        return oList;
    }
    
}
