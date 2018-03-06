/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sandile.picknpay.myservices;

import com.sandile.picknpay.mymodel.Orders;
import com.sandile.picknpay.myrepositories.OrdersRepository;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author User
 */
@Service
public class OrdersService {
    
    @Autowired
    private OrdersRepository orderings;
    
    public Orders saveOrders(Orders orders)
    {
   
        return orderings.save(orders);
    }
    
    public Object findAllOrders()
    {
        return orderings.findAll();
    }
    
    public int updateOrdersStatus(int orderID, String statusStatus)
    {
        return orderings.updateOrderStatus(orderID, statusStatus);
    }
    
   public int deleteOrders(int orderNo)
   {
       return orderings.deleteOrder(orderNo);
   }
     
   public ArrayList<Orders> findOrdersByOrderNo(int orderNo)
   {
       return orderings.findOrderByOrderNo(orderNo);
   }
}
