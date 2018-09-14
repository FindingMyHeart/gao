package com.fh.util.Xhh;

import com.fh.util.PageData;

/**
 *
 *  判断的Utils
 * Created by 11029 on 2018/5/1.
 */
public class XhhJudgeUtil {


    /**
     *  判断某个字段是否为空，基于PageData
     *  如果包含且不为空，则返回 false    否则为true
     */
    public static boolean judgeKeyIsNull(PageData pd, String key){
        if(pd == null || key == null || key.equals("")){
            return true;
        }
        if(pd.get(key) == null || pd.getString(key) == null || pd.getString(key).equals("")){
            return true;
        }
        return false;
    }


}
