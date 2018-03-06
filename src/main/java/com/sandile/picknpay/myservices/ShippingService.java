/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sandile.picknpay.myservices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sandile.picknpay.myrepositories.ShippingRepository;

/**
 *
 * @author User
 */
@Service
public class ShippingService {
    @Autowired
    private ShippingRepository ship;
    
    public Object findAllDeliveryTypes()
    {
        return ship.findAll();
    }
}
