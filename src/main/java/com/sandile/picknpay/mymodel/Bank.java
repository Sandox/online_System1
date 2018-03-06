/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sandile.picknpay.mymodel;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;


/**
 *
 * @author User
 */
@Entity

public class Bank implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bankID")
    private Integer bankID;
    @Column(name = "cardno")
    private int cardno;
    @Column(name = "cardholder")
    private String cardholder;
    @Column(name = "bankname")
    private String bankname;
    @Column(name = "balance")
    private double balance;

    public Bank() {
    }

    public Bank(Integer bankID) {
        this.bankID = bankID;
    }

    public Bank(Integer bankID, int cardno, String cardholder, String bankname, double balance) {
        this.bankID = bankID;
        this.cardno = cardno;
        this.cardholder = cardholder;
        this.bankname = bankname;
        this.balance = balance;
    }

    public Integer getBankID() {
        return bankID;
    }

    public void setBankID(Integer bankID) {
        this.bankID = bankID;
    }

    public int getCardno() {
        return cardno;
    }

    public void setCardno(int cardno) {
        this.cardno = cardno;
    }

    public String getCardholder() {
        return cardholder;
    }

    public void setCardholder(String cardholder) {
        this.cardholder = cardholder;
    }

    public String getBankname() {
        return bankname;
    }

    public void setBankname(String bankname) {
        this.bankname = bankname;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

}
