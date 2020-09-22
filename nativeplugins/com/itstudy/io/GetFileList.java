package com.itstudy.io;

import java.io.*;

/**
 * @Title: FileList
 * @author: 康雷  e-mail: 1014295211@qq.com
 * @date: 2020/9/22 16:51
 * @ClassName: FileList
 * @Description:
 */
public class GetFileList {
	public List<list> getFiles(File file) {
        try {
            File[] files = file.listFiles();
			List<GetFileList> folder = new List<GetFileList>();
			List<GetFileList> fileList = new List<GetFileList>();
			for (int i = 0; i < files.length; i++) {
			    if (files[i].isDirectory()) {
			        folder.add(new GetFileList(files[i].getName(), files[i].getPath(), this.getFileType(files[i]), this.GetFileTime(files[i]), files[i].lastModified()));
			    }
			    if (tempList[i].isFile()) {
			        fileList.add(new GetFileList(files[i].getName(), files[i].getPath(), this.getFileType(files[i]), this.getFileSize(files[i]), this.GetFileTime(files[i]), files[i].lastModified()));
			    }
			}
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }
	
	private String getFileType (File file) {
		String fileName=file.getName();    
		String fileType=fileName.substring(fileName.lastIndexOf("."),fileName.length());
		return fileType;
	}
	private String getFileSize (File file) {
		FileInputStream fileSize = new FileInputStream(file);
		Int size = fileSize.available() == 'null' ? 0 : fileSize.available();
		String fileSizeString;
		if(size == 0){
			fileSizeString = "0B";
		} else if (size < 1024){
			fileSizeString = size + "B";
		} else if (size < 1048576){
			fileSizeString = (size/1024).toFixed(2) + "KB";
		} else if (size < 1073741824){
			fileSizeString = (size/1048576).toFixed(2) + "MB";
		} else{
			fileSizeString = (size/1073741824).toFixed(2) + "GB";
		}
		return fileSizeString;
	},
	private String GetFileTime ( File file ) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MMM-dd HH:mm:ss:SSS");
		return formatter.format(file.lastModified());
	}
}

private class GetFileList {
	String name;
	String path;
	String type;
	String size;
	String time;
	String creatime;
	public GetFileList (String name, String path, String type, String time, String creatime) {
		this.name = name;
		this.path = path;
		this.type = type;
		this.creatime = creatime;
	}
	public GetFileList (String name, String path, String type, String size, String time, String creatime) {
		this.name = name;
		this.path = path;
		this.type = type;
		this.size = size;
		this.creatime = creatime;
	}
}
