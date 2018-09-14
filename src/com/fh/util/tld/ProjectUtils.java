package com.fh.util.tld;

import com.fh.service.material.MaterialService;
import com.fh.service.project.ProjectInfoService;
import com.fh.util.PageData;
import com.fh.util.SpringContextHolder;

import java.util.List;

/**
 * Created by 11029 on 2018/5/21.
 */
public class ProjectUtils {
    //引入项目信息service
    private static ProjectInfoService projectInfoService = SpringContextHolder.getBean(ProjectInfoService.class);

    //获取所有的项目的列表（下拉列表）
    public static List<PageData> getAllProjectList(){
        PageData pd = new PageData();
        List<PageData> list = projectInfoService.getAllProjectList(pd);
        return list;
    }

}
