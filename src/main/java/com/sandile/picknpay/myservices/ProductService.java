/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sandile.picknpay.myservices;

import com.sandile.picknpay.mymodel.Product;
import com.sandile.picknpay.myrepositories.ProductRepository;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author User
 */
@Service
public class ProductService{
    @Autowired
    private ProductRepository prodRepo;
    
    
    public Object findAllProduct()
    {
        return prodRepo.findAll();
    }
    
    public Product saveProduct(Product product)
    {
        return prodRepo.save(product);
    }
    
    public int deleteProduct(int productId)
    {
        return prodRepo.deleteProduct(productId);
    }

    public int updateProduct(int productId, String name, String cat, double price)
    {
        
        return prodRepo.updateProduct(productId, name, cat, price);
    }
    
    public ArrayList<Product> findProductByCategory(String category)
    {
        return prodRepo.findProductByCategory(category);
    }
    
    public Product findProductByProductId(int productId)
    {
        return prodRepo.findOne(productId);
    }
    
}
