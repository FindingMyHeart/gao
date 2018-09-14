package com.fh.service.adm;

import com.fh.entity.Page;
import com.fh.service.adm.admassetinfo.AdmAssetInfoService;
import com.fh.service.xtgl.ResourceService;
import com.fh.util.DateUtil;
import com.fh.util.ExceptionStr;
import com.fh.util.PageData;
import com.fh.util.UuidUtil;
import com.fh.util.Xhh.XhhJudgeUtil;
import com.fh.utilmy.CurrentStaff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 *  资产的service
 * Created by 11029 on 2018/6/23.
 */
@Service("assetService")
public class AssetService {
    @Autowired
    private AdmAssetInfoService admAssetInfoService;

    @Autowired
    private ResourceService resourceService;

    /**
     * 1、新增
     */
    public PageData save(PageData pd) throws Exception {
        PageData result = new PageData();
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        String ASSET_ID = UuidUtil.get32UUID();
        String asset_code = admAssetInfoService.getAssetCode();
        pd.put("ASSET_ID",ASSET_ID);//放入主键ID
        pd.put("ASSET_CODE",asset_code);
        pd.put("STATUS","1");
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        admAssetInfoService.save(pd);
        result.put("ASSET_CODE",asset_code);
        return result;
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"ASSET_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        admAssetInfoService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        String ASSET_ID = "";
        if(pd.get("ASSET_ID") == null || pd.getString("ASSET_ID") == null || pd.getString("ASSET_ID").equals("")){
            throw new Exception("没有可修改的记录");
        }
        ASSET_ID = pd.getString("ASSET_ID");
        admAssetInfoService.edit(pd);
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        PageData result = new PageData();
        result = admAssetInfoService.findById(pd);
        List<PageData> resourceList = new ArrayList<PageData>();
        //获取文件列表
        if(result != null && result.get("RESOURCEIDS") != null && !result.get("RESOURCEIDS").toString().equals("")){
            String resourceIds = result.get("RESOURCEIDS").toString();
            PageData params = new PageData();
            params.put("RESOURCE_IDS",resourceIds);
            resourceList = resourceService.listAll(params);
            result.put("resourceList",resourceList);
         }
        return result;
    }

    /**
     *  5、列表（分页）
     */
    public List<PageData> list(Page page) throws Exception {
        return admAssetInfoService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return admAssetInfoService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"ASSET_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("ASSET_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        admAssetInfoService.deleteAll(ArrayDATA_IDS);
    }
    /**
     *  8、修改状态
     */
    public void updateStatus(PageData pd) throws Exception {
        admAssetInfoService.updateStatus(pd);
    }

}