package com.fh.service.store;

/**
 * Created by 11029 on 2018/5/28.
 */

import com.fh.entity.Page;
import com.fh.service.store.storestatusinfo.StoreStatusInfoService;
import com.fh.util.PageData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 仓储管理
 * Created by 11029 on 2018/5/28.
 */
@Service("ccglService")
public class CcglService {

    @Autowired
    private StoreStatusInfoService storeStatusInfoService;

    /**
     * 2、列表
     */
    public List<PageData> list(Page page) throws Exception{
        List<PageData> list = new ArrayList<PageData>();
        list = storeStatusInfoService.list(page);
        return list;
    }
}
