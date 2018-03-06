/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sandile.picknpay.myservices;

import com.sandile.picknpay.myrepositories.OrderStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author User
 */
@Service
public class OrderStatusService {
    @Autowired
    private OrderStatusRepository oSt;
    
    public Object findAllOrderStatus()
    {
        return oSt.findAll();
    }
  
}
