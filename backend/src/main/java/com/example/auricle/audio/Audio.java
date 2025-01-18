package com.example.auricle.audio;

import java.io.File;


public class Audio {
    private String filename;
    private File file;

    public Audio() {}

    public Audio(String filename, File file) {
        this.filename = filename;
        this.file = file;
    }

    public String getFilename() {
        return this.filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public File getFile() {
        return this.file;
    }

    public void setFile(File file) {
        this.file = file;
    }
}