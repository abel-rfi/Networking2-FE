package com.example.messagingstompwebsocket;

public class StringMessage {

  private String message;

  public StringMessage() {
  }

  public StringMessage(String message) {
    this.message = message;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}