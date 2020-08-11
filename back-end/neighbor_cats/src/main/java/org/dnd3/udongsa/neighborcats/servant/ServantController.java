package org.dnd3.udongsa.neighborcats.servant;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServantController {
    
    @PostMapping
    public ServentSignUpResDto signUp(final ServentSignUpReqDto reqDtp){
        return null;
    }
}