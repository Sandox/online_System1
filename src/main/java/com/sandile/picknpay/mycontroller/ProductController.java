/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sandile.picknpay.mycontroller;

import com.sandile.picknpay.errorexceptions.DataNotFoundException;
import com.sandile.picknpay.mymodel.Product;
import com.sandile.picknpay.myservices.ProductService;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author User
 */

@RestController
@RequestMapping(value = "/product")
public class ProductController{
  
    @Autowired
    private ProductService prodServ;
    
     //Fetch all the products that are avialble 
    @RequestMapping(value = "/findAllProducts" , method = RequestMethod.GET)
    @ResponseBody
    public Object findAllProduct()
    {
        Object prod = prodServ.findAllProduct();
        if(prod == null)
        {
            throw new DataNotFoundException("Products are not found at the moment...");
        }
        return prod;
    }
    

    @RequestMapping(value = "/findProductById/{productId}" , method = RequestMethod.GET)
    @ResponseBody
    public Product findProductByProductID(@PathVariable int productId)
    {
        Product prod = prodServ.findProductByProductId(productId);
        if(prod == null)
        {
            throw new DataNotFoundException("The reqired product do not exists...");
        }
        return prod;
    }
    
    

    @RequestMapping(value = "/saveProduct" , method = RequestMethod.POST)
    @ResponseBody
    public Product saveProduct(@RequestBody Product product) {
        
       Product saving = prodServ.saveProduct(product);
       if(saving == null)
       {
           throw new DataNotFoundException("The Product could not be added ");
       }
       return saving;
    }
    
    //Delete the Product using the  product ID
    @RequestMapping(value = "/deleteProduct/{productId}" , method = RequestMethod.DELETE)
    @ResponseBody
    public int deleteProduct(@PathVariable int productId)
    {
        int delProd = prodServ.deleteProduct(productId);
        
        if(delProd == 0)
        {
            throw new DataNotFoundException("Failed to delete the Product");
        }
       return delProd;
    }
     
  
    @RequestMapping(value = "/updateProduct/{productId}/{name}/{category}/{price}" , method = RequestMethod.PUT)
    @ResponseBody
    public int updateProduct(@PathVariable int productId, @PathVariable String name, @PathVariable String category, @PathVariable double price )
    {
        
        int prodUpdate = prodServ.updateProduct(productId, name, category, price);
        if(prodUpdate != 1)
        {
           throw new DataNotFoundException(" Failed to update the Product");
        }
        
        return prodUpdate;
    }
    
    //Fetch the Prodcut based on its category 
    @RequestMapping(value = "/findProductByCategory/{category}" , method = RequestMethod.GET)
    @ResponseBody
    
    public ArrayList<Product> retrieveProductsByCategory(@PathVariable String category)
    {
        ArrayList<Product> listProduct = prodServ.findProductByCategory(category);
    
        if(listProduct.isEmpty())
        {
            throw new DataNotFoundException("The Product does not belong to the category you are looking at");
        }
        return listProduct;
    }
       
}
