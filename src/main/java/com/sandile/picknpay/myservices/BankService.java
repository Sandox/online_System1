/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sandile.picknpay.myservices;

import com.sandile.picknpay.mymodel.Bank;
import com.sandile.picknpay.myrepositories.BankRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author User
 */
@Service
public class BankService{
    
    @Autowired
    private BankRepository myBank;
    
    public Bank findBankAccount(int cardNo, String cardHolder, String bankName)
    {
        return myBank.findBankAccount(cardNo, cardHolder, bankName);
    }
    
    public int updateBankBalance(int cardNo, double balance)
    {
        return myBank.updateBankBalance(cardNo, balance);
    }
}
