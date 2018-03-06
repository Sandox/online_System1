package com.sandile.picknpay.mycontroller;

import com.sandile.picknpay.errorexceptions.DataNotFoundException;
import com.sandile.picknpay.mymodel.Address;
import com.sandile.picknpay.myservices.AddressService;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/address")
public class AddressController {
    
    @Autowired
    private AddressService addServ;
    
    // Saving details for Shipping 
    @RequestMapping(value = "/saveAddress", method = RequestMethod.POST)
    @ResponseBody
    public Address saveAddress(@RequestBody Address address)
    {
        Address myadd = addServ.saveAddress(address);
          if(myadd == null)
          {
              throw new DataNotFoundException("Sorry Your address could not Saved...");
          }
        return myadd;
    }
    
    //Get shipping address based on order number
    @RequestMapping(value = "/findAddressByOrderNo/{orderno}", method = RequestMethod.GET)
    @ResponseBody
    public ArrayList<Address> viewByOrderNo(@PathVariable int orderno)
    {
        ArrayList<Address> list = addServ.findAddressByOrderNo(orderno);
        if(list.isEmpty())
        {
            throw new DataNotFoundException("Sorry but your address could not Found...");
        }
        
        return list;
    }
}
