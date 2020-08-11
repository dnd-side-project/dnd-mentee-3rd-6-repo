package org.dnd3.udongsa.neighborcats.util;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;


public class NumberGeneratorTest {

    @Test
    public void Given_MinAndMax_When_Random_Then_Returned_RandomNumber(){
        int min = 1000;
        int max = 9999;
        NumberGenerater gen = new NumberGenerater();
        int result = gen.random(min, max);
        assertTrue(result >= min);
        assertTrue(result <= max);
    }
    
}