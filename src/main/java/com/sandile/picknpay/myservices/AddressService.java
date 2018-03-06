/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sandile.picknpay.myservices;

import com.sandile.picknpay.mymodel.Address;
import com.sandile.picknpay.myrepositories.AddressRepository;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author User
 */
@Service
public class AddressService {
  
    @Autowired
    private AddressRepository addressRepo;
    
     public Address saveAddress(Address address)
    {
        return addressRepo.save(address);
    }  
    
    public ArrayList<Address> findAddressByOrderNo(int orderNo)
    {
        return addressRepo.findAddressByOrderNo(orderNo);
    }
    
    public int deleteDelivery(int orderNo)
    {
        return addressRepo.deleteAddress(orderNo);
    }
}
