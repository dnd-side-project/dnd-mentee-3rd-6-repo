package org.dnd3.udongsa.neighborcats.util;

public class NumberGenerater {

    public int random(int min, int max){
        int range = max - min + 1;
        int rand = (int)(Math.random()*range) + min;
        return rand;
    }
    
}