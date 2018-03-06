/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sandile.picknpay.mymodel;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author User
 */
@Entity
@Table(name = "orders")
@XmlRootElement

public class Orders implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderID")
    private int orderID;

    @Column(name = "orderno")
    private int orderno;
    
    @Column(name = "orderstatus")
    private String orderstatus;
  
    @Column(name = "orderdate")
    @Temporal(TemporalType.DATE)
    private Date orderdate = new Date();
    
    @Column(name = "userID")
    private int userID;
    
    @Column(name = "orderamount")
    private double orderamount;
   
    @Column(name = "delivarydate")
    @Temporal(TemporalType.DATE)
    private Date delivarydate;
 
  
    @Column(name = "name")
    private String name;
    
    @Column(name = "category")
    private String category;
  
    @Column(name = "quantity")
    private int quantity;
    
    @Column(name = "productID")
    private int productID;
    
    @Column(name = "price")
    private double price;
   
    @Column(name = "image")
    private String image;

    public Orders() {
    }


    public Orders(int orderID, int orderno, String orderstatus, Date orderdate, int userID, double orderamount, Date delivarydate, String name, String category, int quantity, int productID, double price, String image) {
        this.orderID = orderID;
        this.orderno = orderno;
        this.orderstatus = orderstatus;
        this.orderdate = orderdate;
        this.userID = userID;
        this.orderamount = orderamount;
        this.delivarydate = delivarydate;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.productID = productID;
        this.price = price;
        this.image = image;
    }

    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public int getOrderno() {
        return orderno;
    }

    public void setOrderno(int orderno) {
        this.orderno = orderno;
    }

    public String getOrderstatus() {
        return orderstatus;
    }

    public void setOrderstatus(String orderstatus) {
        this.orderstatus = orderstatus;
    }

    public Date getOrderdate() {
        return orderdate;
    }

    public void setOrderdate(Date orderdate) {
        this.orderdate = orderdate;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public double getOrderamount() {
        return orderamount;
    }

    public void setOrderamount(double orderamount) {
        this.orderamount = orderamount;
    }

    public Date getDelivarydate() {
        return delivarydate;
    }

    public void setDelivarydate(Date delivarydate) {
        this.delivarydate = delivarydate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getProductID() {
        return productID;
    }

    public void setProductID(int productID) {
        this.productID = productID;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

}
