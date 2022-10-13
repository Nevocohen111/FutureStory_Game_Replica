package com.example.Maplestory.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HttpCustomResponse {
    private int statusCode;
    private String message;
}
