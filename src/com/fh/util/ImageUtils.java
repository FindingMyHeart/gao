package com.fh.util;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class ImageUtils {
	private Image srcImage=null;  
	private File srcFile=null;  
	//private File destFile=null;  
	//private String fileSuffix=null;  
     
	private int imageWidth = 0;  
	private int imageHeight = 0; 
	
	public ImageUtils(String fileName) throws IOException {  
        this(new File(fileName));  
    } 
	
	public ImageUtils(File fileName) throws IOException {  
        File _file = fileName;  
        _file.setReadOnly();  
        this.srcFile = _file;  
        srcImage = javax.imageio.ImageIO.read(_file);  
        //得到图片的原始大小， 以便按比例压缩。  
        imageWidth = srcImage.getWidth(null);  
        imageHeight = srcImage.getHeight(null);  
        System.out.println("width: " + imageWidth);  
        System.out.println("height: " + imageHeight);         
    }  
	public byte[] getOriginalFile() throws IOException{
		long fileSize = srcFile.length();
		byte[] buffer = FileUtil.toByteArray(srcFile.getAbsolutePath());
		
		return buffer;
	}
	/** 
     * 强制压缩/放大图片到固定的大小 
     * @param w int 新宽度 
     * @param h int 新高度 
     * @throws IOException 
     */  
    public BufferedImage resize(int w, int h) throws IOException {  
        //得到合适的压缩大小，按比例。  
        if ( imageWidth >= imageHeight)  
        {  
            w = w;  
            h = (int)Math.round((imageHeight * w * 1.0 / imageWidth));  
        }  
        else   
        {  
            h = h;  
            w = (int)Math.round((imageWidth * h * 1.0 / imageHeight));  
        }  
        //构建图片对象  
        BufferedImage _image = new BufferedImage(w, h,  
                BufferedImage.TYPE_INT_RGB);  
        //绘制缩小后的图  
        _image.getGraphics().drawImage(srcImage, 0, 0, w, h, null);  
        //输出到文件流  
        
        
        return _image;
          
    }  
}
