/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sandile.picknpay.myservices;

import com.sandile.picknpay.mymodel.Category;
import com.sandile.picknpay.myrepositories.CatagoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author User
 */
@Service
public class CategoryService{
    @Autowired
    private CatagoryRepository catRepo;
    
    public Object findAllCategories()
    {
        return catRepo.findAll();
    }
    
    public Category saveCategory(Category category)
    {
        return catRepo.save(category);
    }
    
    public int deleteCategory(String name)
    {
        return catRepo.deleteCategory(name);
    }
}
