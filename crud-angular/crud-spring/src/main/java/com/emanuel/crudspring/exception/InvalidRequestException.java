package com.emanuel.crudspring.exception;

public class InvalidRequestException extends RuntimeException{

    public InvalidRequestException(String mensagem, Exception e) {
        super(mensagem, e);
    }
    
}
