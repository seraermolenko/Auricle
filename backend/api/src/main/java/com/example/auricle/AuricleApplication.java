package com.example.auricle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class AuricleApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuricleApplication.class, args);
	}
}
