package com.sandile.picknpay.mycontroller;

import com.sandile.picknpay.errorexceptions.DataNotFoundException;
import com.sandile.picknpay.mymodel.Category;
import com.sandile.picknpay.myservices.CategoryService;
import java.sql.SQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/category")
public class CategoryController{
     
    @Autowired
    private CategoryService myCat;
    
    
    @RequestMapping(value = "/findAllCategories", method = RequestMethod.GET)
    @ResponseBody
    public Object getAllRep()
    {
        Object objective = myCat.findAllCategories();
        if(objective == null)
        {
            throw new DataNotFoundException("Sorry Category could not Deleted");
        }
       return objective; 
    }
  
    
    @RequestMapping(value = "/saveCategory", method = RequestMethod.POST)
    @ResponseBody
    public Category saveCategory(@RequestBody Category category) throws SQLException
    {
        Category cate = myCat.saveCategory(category);
        
        if(cate == null)
        {
            throw new DataNotFoundException("Sorry Category could not be saved");
        }
        return cate;         
    }
   
    //Deleting the Categories based on category Id
    @RequestMapping(value = "/deleteCategory/{name}", method = RequestMethod.DELETE)
    @ResponseBody
    public int deleteCategory(@PathVariable String name)
    {
        int delCat = myCat.deleteCategory(name);
        
        if(delCat != 1)
        {
            throw new DataNotFoundException("Sorry but we failed to delete your category" );
        }
        
        return delCat;         
    }
    
}
