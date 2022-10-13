package com.example.Maplestory.exception;

import com.example.Maplestory.response.HttpCustomResponse;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(annotations = RestController.class)
@Order(1)
public class RestExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<HttpCustomResponse> exceptionHandler(Exception e, Errors errors) {
        return ResponseEntity
                .status(500)
                .body(new HttpCustomResponse(500, errors.getFieldErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).reduce((x, y) -> x + " " + y)
                        .orElse(e.getMessage())));
    }
}
