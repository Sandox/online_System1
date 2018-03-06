package com.sandile.picknpay;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages={"com.sandile.picknpay","com.sandile.picknay.mymodel","com.sandile.picknpay.myservices","com.sandile.picknpay.mycontroller","com.sandile.picknpay.myrepositories"})
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
