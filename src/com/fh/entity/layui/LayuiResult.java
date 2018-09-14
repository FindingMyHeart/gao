package com.fh.entity.layui;

import java.util.List;

/**
 * layui 返回结果的实体类
 *  @author xiangyunifei 2018-01-23
 */
public class LayuiResult {
    public int code;
    public String msg;
    public int count;
    public List data;

    public LayuiResult(){
        this.code = 0;
        this.count = 0;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public List getData() {
        return data;
    }

    public void setData(List data) {
        this.data = data;
    }
}
