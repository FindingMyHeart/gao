package com.fh.util.Xhh;

/**
 *
 *  组装 字符串  的util
 * Created by 11029 on 2018/5/13.
 */
public class XhhCreateStrUtil {

    /**
     * 拼装空字符串
     * @param add_str  要拼装的字符串
     * @param len 要拼接的空字符串的长度
     * @param single_len 频度
     */
    public static String createAddStr(String add_str,int len,int single_len){
        String str = "";
        for(int i = 0 ; i < len ; i ++){
            for(int j = 0 ; j < single_len ; j ++){
                str += add_str;
            }
        }
        return str;
    }

}
