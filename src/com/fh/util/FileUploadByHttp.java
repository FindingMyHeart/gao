package com.fh.util;

import com.alibaba.fastjson.JSON;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class FileUploadByHttp {




    /**
     *   正常方式上传文件
     * @param file
     * @return
     * @throws IOException
     */
    public static HashMap<String,String> uploadFile(MultipartFile file) throws Exception{
        HashMap<String,String> result = new HashMap<String, String>();
        InputStream inputStream = file.getInputStream();

        String orStr = file.getOriginalFilename();
        result = upload(inputStream,orStr);
        return result;
    }

    /**
     *   正常方式上传文件（字节）
     */
    public static  HashMap<String,String> uploadByBytes(byte[] bytes,String orStr) throws Exception{
        HashMap<String,String> result = new HashMap<String, String>();
        String url = "";
        InputStream inputStream = new ByteArrayInputStream(bytes);
        result = upload(inputStream,orStr);
        return result;
    }


    /**
     *   上传文件（百度编辑器）
     * @param bytes
     * @param orStr
     * @return
     */
    public static String uploadFileForUe(byte[] bytes,String orStr) throws Exception{
        HashMap<String,String> result = new HashMap<String, String>();
        String url = "";
        InputStream inputStream = new ByteArrayInputStream(bytes);
        result = upload(inputStream,orStr);
        if(result.get("url") != null && !result.get("url").toString().equals("")){
            url = result.get("url").toString();
        }
        return url;
    }


    /**
     *   上传文件到文件服务器
     *      返回的参数：resourceId  文件的RESOURCE_ID
     *                  resourceName  文件名称
     *                  url  全路径
     *                  oldUrl 相对路径
     * @param inputStream
     * @param orStr
     * @return
     */
    public static HashMap<String,String> upload( InputStream inputStream,String orStr) throws Exception {
        HashMap<String,String> result = new HashMap<String, String>();
        try {
            String ss = (String) MiceConfig.getContextProperty("filePathUrl") + "web/uploadImg";
            // 换行符
            final String newLine = "\r\n";
            final String boundaryPrefix = "--";
            // 定义数据分隔线
            String BOUNDARY = "========7d4a6d158c9";
            // 服务器的域名
            URL url = new URL(ss);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //发送post请求需要下面两行
            conn.setDoInput(true);
            conn.setDoOutput(true);
            conn.setUseCaches(false);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Connection", "Keep-Alive");
            conn.setRequestProperty("user-agent", "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0");
            conn.setRequestProperty("Charset", "UTF-8");
            conn.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + BOUNDARY);
            conn.setRequestProperty("Accept-Charset", "utf-8");

            OutputStream out = new DataOutputStream(conn.getOutputStream());

            // 上传文件
            StringBuilder sb = new StringBuilder();
            sb.append(boundaryPrefix);
            sb.append(BOUNDARY);
            sb.append(newLine);

            String oFilename=new String(orStr.getBytes("UTF-8"), "ISO-8859-1");
            sb.append("--"); // 必须多两道线
            sb.append(BOUNDARY);
            sb.append("\r\n");
            sb.append("Content-Disposition: form-data;name=\"file\";filename=\""+  oFilename+ "\"\r\n");
            sb.append("Content-Type:application/octet-stream\r\n\r\n");

            // 将参数头的数据写入到输出流中
            out.write(sb.toString().getBytes("ISO8859-1"));

            // 数据输入流,用于读取文件数据
            DataInputStream in = new DataInputStream(inputStream);
            byte[] bufferOut = new byte[1024];
            int bytes = 0;
            // 每次读1KB数据,并且将文件数据写入到输出流中
            while ((bytes = in.read(bufferOut)) != -1) {
                out.write(bufferOut, 0, bytes);
            }
            // 最后添加换行
            out.write(newLine.getBytes());
            in.close();

            // 结尾部分
            byte[] foot = ("\r\n--" + BOUNDARY + "--\r\n").getBytes("utf-8");// 定义最后数据分隔线
            out.write(foot);

            //设置请求数据内容
            String response = "";

            //使用write(requestContent.getBytes())是为了防止中文出现乱码
            out.flush();
            try{
                //获取URL的响应
                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
                String s = "";
                String temp = "";
                while((temp = reader.readLine()) != null){
                    s += temp;
                }
                response = s;
                Map mapTypes = JSON.parseObject(response);
                for (Object obj : mapTypes.keySet()){
                    result.put(obj.toString(),mapTypes.get(obj).toString());
                }
                reader.close();

            }catch(IOException e){
                e.printStackTrace();
                System.out.println("No response get!!!");
            }
            out.close();

        } catch (Exception e) {
            System.out.println("发送POST请求出现异常！" + e);
            e.printStackTrace();
        }

        if(result.get("returnCode") != null && !result.get("returnCode").equals("")
                &&result.get("returnCode").equals("01")&&result.get("messageInfo") != null){
            throw new Exception(result.get("messageInfo"));
        }
        return result;
    }

}






