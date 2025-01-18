package com.example.auricle.audio;

import com.example.auricle.response.Response;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path="api/audio")
public class AudioController {
    private final AudioService audioService;

    public AudioController(AudioService audioService) {
        this.audioService = audioService;
    }

    @PostMapping("receive")
    public Response receiveAudio(@RequestBody MultipartFile file) {
        return audioService.receiveAudio(file);
    }

    @PostMapping("send")
    public Response sendAudio(@RequestBody MultipartFile file) {
        return audioService.sendAudio(file);
    }
}
