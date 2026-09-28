package com.e_commerce.catalog.controllers.seller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * ProductController
 */
@RestController
@RequestMapping("/seller")
public class ProductController {

    @GetMapping("")
    public String getMethodName() {
        return "Hi there";
    }

}