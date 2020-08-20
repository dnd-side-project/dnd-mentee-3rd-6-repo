package org.dnd3.udongsa.neighborcats;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class TestApiController {

    @GetMapping("/api/test")
    public String test(){
        return "Hello API World!";
    }
}