package com.example.auricle.audio;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

public class AudioService {
    @PostMapping
    public String receiveAudio(@RequestBody MultipartFile file) {
        System.out.println("Data : " + file);
        return "Received audio file";
    }
    
}
