/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sandile.picknpay.myservices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sandile.picknpay.myrepositories.BankingRepository;

/**
 *
 * @author User
 */
@Service
public class BankingService{
    @Autowired
    private BankingRepository bankRepo;
    
    public Object findAllBankNames()
    {
        return bankRepo.findAll();
    }
}
