package com.sift.app;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
@RestController
public class SiftApplication {

	public static void main(String[] args) {
		SpringApplication.run(SiftApplication.class, args);
	}

}
