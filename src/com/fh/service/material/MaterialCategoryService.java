package com.fh.service.material;

import com.fh.entity.Page;
import com.fh.service.material.basematerialtype.BaseMaterialTypeService;
import com.fh.util.DateUtil;
import com.fh.util.ExceptionStr;
import com.fh.util.PageData;
import com.fh.util.UuidUtil;
import com.fh.util.Xhh.XhhCreateStrUtil;
import com.fh.util.Xhh.XhhJudgeUtil;
import com.fh.utilmy.CurrentStaff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by 11029 on 2018/5/7.
 */
@Service("materialCategoryService")
public class MaterialCategoryService {
    @Autowired
    private BaseMaterialTypeService baseMaterialTypeService;

    /**
     * 1、新增
     */
    public void save(PageData pd) throws Exception {
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        pd.put("TYPE_ID", UuidUtil.get32UUID());//放入主键ID
        pd.put("CREATE_TIME", DateUtil.getTime());
        pd.put("CREATE_USERID", staff.getSTAFF_ID());
        pd.put("IF_DELETED", "0");
        baseMaterialTypeService.save(pd);
    }

    /**
     * 2、删除
     */
    public void delete(PageData pd) throws Exception {
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"TYPE_ID")){
            throw new Exception("没有发现可删除的记录！");
        }
        baseMaterialTypeService.delete(pd);
    }

    /**
     * 3、修改
     */
    public void edit(PageData pd) throws Exception {
        baseMaterialTypeService.edit(pd);
    }

    /**
     * 4、查询一条记录
     */
    public PageData findById(PageData pd) throws Exception {
        return baseMaterialTypeService.findById(pd);
    }

    /**
     *  5、列表（分页）
     */
    public List<PageData> list(Page page) throws Exception {
        return baseMaterialTypeService.list(page);
    }

    /**
     *  6、列表(所有)
     */
    public List<PageData> listAll(PageData pd) throws Exception {
        return baseMaterialTypeService.listAll(pd);
    }

    /**
     *  7、批量删除
     */
    public void deleteBatch(PageData pd) throws Exception {
        String clientIds = "";
        if(XhhJudgeUtil.judgeKeyIsNull(pd,"TYPE_IDS")){
            throw new Exception("没有发现可删除的记录！");
        }
        clientIds = pd.getString("TYPE_IDS");
        String[] ArrayDATA_IDS = clientIds.split(",");
        baseMaterialTypeService.deleteAll(ArrayDATA_IDS);
    }

    /**
     *  8、查询所有（树形）
     */
    public List<PageData> listAllForTree(PageData pd) throws Exception {
        PageData params = new PageData();
        List<PageData> list = new ArrayList<PageData>();
        List<PageData> resultList = baseMaterialTypeService.listAll(pd);
        for(PageData temp : resultList){
            if(temp == null){
                continue;
            }
            params = new PageData();
            params.put("id",temp.get("TYPE_ID"));
            params.put("name",temp.get("TYPE_NAME"));
            params.put("pId",temp.get("PID"));
            list.add(params);
        }

        params = new PageData();
        params.put("id","-1");
        params.put("name","全部");
        params.put("pId","-999");
        list.add(params);
        return list;
    }

    /**
     *  9、根据编号查询当前改编号是否已经存在
     */
    public PageData findCodeIsExist(PageData pd) throws Exception {
        PageData result = new PageData();
        String TYPE_ID = baseMaterialTypeService.findCodeIsExist(pd);
        if(TYPE_ID == null || TYPE_ID.equals("")){
            result.put("IS_EXIST",false);
        }else {
            result.put("IS_EXIST",true);
        }
        return result;
    }



    /**
     * 获取下拉树
     * @param pd
     * @return
     */
    public List<PageData> getForSelectTree(PageData pd){
        PageData params = new PageData();
        List<PageData> list = new ArrayList<PageData>();
        params = new PageData();
        params.put("id","-1");
        params.put("name","顶级类别");
        list.add(params);
        try {
            List<PageData> dataList = baseMaterialTypeService.listAll(pd);
            list = createSelectTree(list,"-1",dataList,1);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    /**
     * 组装下拉树
     * @param list              结果list
     * @param pid               父ID
     * @param dataList         查询的数据list
     * @param level            级别
     * @return
     */
    private List<PageData> createSelectTree(List<PageData> list, String pid, List<PageData> dataList, int level) {
        PageData params = new PageData();
        for(PageData temp : dataList){
            if(temp.getString("TYPE_ID") == null || temp.getString("TYPE_ID").equals("")
                    ||temp.getString("PID") == null || temp.getString("PID").equals("")){
                continue;
            }
            String TYPE_ID = temp.getString("TYPE_ID");
            String TYPE_NAME = "";
            String PID = temp.getString("PID");
            //如果循环的数据不为当前的下属数据，就跳过
            if(!PID.equals(pid)){
                continue;
            }
            if(temp.getString("TYPE_NAME") != null && !temp.getString("TYPE_NAME").equals("")){
                TYPE_NAME = temp.getString("TYPE_NAME");
            }
            TYPE_NAME = XhhCreateStrUtil.createAddStr("&nbsp;",level-1,1) + "--" + TYPE_NAME;
            params = new PageData();
            params.put("id",TYPE_ID);
            params.put("name",TYPE_NAME);
            list.add(params);
            list = createSelectTree(list,TYPE_ID,dataList,level+1);
        }
        return list;
    }
}
