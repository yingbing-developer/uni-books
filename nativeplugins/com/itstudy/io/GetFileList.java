package com.itstudy.io;

import android.os.Build;
import android.support.annotation.RequiresApi;

import java.io.*;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @Title: FileList
 * @author: 康雷  e-mail: 1014295211@qq.com
 * @date: 2020/9/22 16:51
 * @ClassName: FileList
 * @Description:
 */
public class GetFileList {


    @RequiresApi(api = Build.VERSION_CODES.N)
    public List<List<FileList>> getFiles(File file) throws IOException {
        File[] files = file.listFiles();
        List<FileList> folder = new ArrayList<>();
        List<FileList> fileList = new ArrayList<>();
        for (File value : files) {
            if (value.isDirectory()) {
                folder.add(new FileList(value.getName(), value.getPath(), "folder", this.getFileTime(value), value.lastModified()));
            }
            if (value.isFile()) {
                if ("txt".equals(this.getFileType(value))) {
                    fileList.add(new FileList(value.getName(), value.getPath(), this.getFileType(value), this.getFileSize(value), this.getFileTime(value), value.lastModified()));
                }
            }
        }
        List<List<FileList>> list = new ArrayList<>();
        list.add(folder);
        Collections.sort(fileList);
        list.add(fileList);
        return list;
    }

    private String getFileType(File file) {
        String fileName = file.getName();
        if (!fileName.contains(".")) {
            return "file";
        }
        return fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length());
    }

    private String getFileSize(File file) throws IOException {
        FileInputStream fs = new FileInputStream(file);
        DecimalFormat df = new DecimalFormat("#.00");
        int size = fs.available();
        String fileSizeString;
        if (size == 0) {
            fileSizeString = "0B";
        } else if (size < 1024) {
            fileSizeString = size + "B";
        } else if (size < 1048576) {
            fileSizeString = df.format(size / 1024) + "KB";
        } else if (size < 1073741824) {
            fileSizeString = df.format(size / 1048576) + "MB";
        } else {
            fileSizeString = df.format(size / 1073741824) + "GB";
        }
        return fileSizeString;
    }

    private String getFileTime(File file) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        return formatter.format(file.lastModified());
    }
}

class FileList implements Comparable<FileList> {
    private String name;
    private String path;
    private String type;
    private String time;
    private String size;
    private Long createTime;

    FileList(String name, String path, String type, String time, Long createTime) {
        this.name = name;
        this.path = path;
        this.type = type;
        this.size = "0B";
        this.time = time;
        this.createTime = createTime;
    }

    FileList(String name, String path, String type, String size, String time, Long createTime) {
        this.name = name;
        this.path = path;
        this.type = type;
        this.size = size;
        this.time = time;
        this.createTime = createTime;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "FileList{" +
                "name='" + name + '\'' +
                ", path='" + path + '\'' +
                ", type='" + type + '\'' +
                ", time='" + time + '\'' +
                ", size='" + size + '\'' +
                ", createTime=" + createTime +
                '}';
    }


    @Override
    public int compareTo(FileList o) {
        return o.getCreateTime().intValue() - this.createTime.intValue();
    }
}
