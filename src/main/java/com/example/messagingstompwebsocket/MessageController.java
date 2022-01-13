package com.example.messagingstompwebsocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class MessageController {

  /*
    - controller is mapped to handle /hello destination
    - MessageMapping ensures greeting method is called
    - greeting() is defined only here. Not in other java objects
    - payload is bound to a ReplyMessage object (the return value)
    - 
  */
  @MessageMapping("/hello")
  @SendTo("/topic/greetings")
  public ReplyMessage greeting(StringMessage message) throws Exception {
    Thread.sleep(1000); // simulated delay
    return new ReplyMessage("Hi, you typed: " + HtmlUtils.htmlEscape(message.getMessage()) );
  }

}