package org.dnd3.udongsa.neighborcats;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestApiController {

    @GetMapping("/api/test")
    public String test(){
        return "Hello API World!";
    }
}