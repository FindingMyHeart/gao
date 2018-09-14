package com.fh.service.store;

import com.fh.entity.Page;
import com.fh.service.store.storeapplydetail.StoreApplyDetailService;
import com.fh.service.store.storeapplymaster.StoreApplyMasterService;
import com.fh.service.store.storeiotype.StoreIoTypeService;
import com.fh.service.store.storestatusinfo.StoreStatusInfoService;
import com.fh.util.DateUtil;
import com.fh.util.ExceptionStr;
import com.fh.util.PageData;
import com.fh.util.UuidUtil;
import com.fh.utilmy.CurrentStaff;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 仓储订单
 * Created by 11029 on 2018/5/28.
 */
@Service("ccddService")
public class CcddService {

    @Autowired
    private StoreApplyMasterService storeApplyMasterService;//主表

    @Autowired
    private StoreApplyDetailService storeApplyDetailService;

    @Autowired
    private StoreIoTypeService storeIoTypeService;

    @Autowired
    private StoreStatusInfoService storeStatusInfoService;


    /**
     * 1、新增一条仓储订单
     */
    public synchronized PageData save(PageData pd) throws Exception{
        CurrentStaff staff = (CurrentStaff) pd.get("session_user");
        if(staff == null){
            throw new Exception(ExceptionStr.NO_USER);
        }
        PageData result = new PageData();
        PageData main = new PageData();//主表map
        PageData params = new PageData();
        System.out.println(pd);
        String apply_master_id = UuidUtil.get32UUID();//主表的主键ID
        String order_no = storeApplyMasterService.getOrderNo();

        //操作状态

        if(pd.get("IO_FLAG") == null || pd.getString("IO_FLAG") == null || pd.getString("IO_FLAG").equals("")){
            throw new Exception("错误的状态类型！");
        }
        String IO_FLAG = pd.getString("IO_FLAG");
        String IO_TYPE = storeIoTypeService.findByIdForStr(IO_FLAG);

        //新增一条主表记录
        main.put("APPLY_MASTER_ID",apply_master_id);
        main.put("IO_FLAG",pd.get("IO_FLAG"));
        main.put("ORDER_NO",order_no);
        main.put("ORDER_STATUS",'0');
        main.put("JIEHUO_PERSON",pd.get("JIEHUO_PERSON"));
        main.put("SHENHE_PERSON",pd.get("SHENHE_PERSON"));
        main.put("JINGSHOU_PERSON",pd.get("JINGSHOU_PERSON"));
        main.put("PROJECT_ID",pd.get("PROJECT_ID"));
        main.put("CREATE_TIME", DateUtil.getTime());
        main.put("CREATE_USERID",staff.getSTAFF_ID());
        main.put("IF_DELETED",'0');
        storeApplyMasterService.save(main);

        //插入子表信息
        JSONArray item = JSONArray.fromObject(pd.getString("itemList"));
        for (int i = 0; i < item.size(); i++) {
            JSONObject jo = (JSONObject) item.get(i);
            params = new PageData();
            params.put("APPLY_DETAIL_ID",UuidUtil.get32UUID());
            params.put("APPLY_MASTER_ID",apply_master_id);
            params.put("SUB_NO",jo.get("SUB_NO"));
            params.put("SYSTEM_NAME",jo.get("SYSTEM_NAME"));
            params.put("SUPPLIER_ID",jo.get("SUPPLIER_ID"));
            params.put("LOCATION_ID",jo.get("LOCATION_ID"));
            params.put("MATERIAL_ID",jo.get("MATERIAL_ID"));
            params.put("MATERIAL_NUM",jo.get("MATERIAL_NUM"));
            params.put("MEMO",jo.get("MEMO"));
            storeApplyDetailService.save(params);

            if(jo.get("MATERIAL_ID") == null || jo.get("MATERIAL_ID").toString().equals("")){
                throw new Exception("请选择名称！");
            }
            if(jo.get("LOCATION_ID") == null || jo.get("LOCATION_ID").toString().equals("")){
                throw new Exception("请选择库位！");
            }
            if(jo.get("MATERIAL_NUM") == null || jo.get("MATERIAL_NUM").toString().equals("")){
                throw new Exception("请填写数量！");
            }

            String MATERIAL_ID = jo.getString("MATERIAL_ID").toString();
            Integer MATERIAL_NUM = Integer.valueOf(jo.getString("MATERIAL_NUM").toString());
            String LOCATION_ID = jo.getString("LOCATION_ID").toString();

            storeStatusInfoService.editKc(MATERIAL_ID,MATERIAL_NUM,LOCATION_ID,IO_TYPE);
        }




        result.put("ORDER_NO",order_no);
        return result;
    }

    /**
     * 2、订单查询
     */
    public List<PageData> list(Page page) throws Exception{
        List<PageData> list = new ArrayList<PageData>();
        list = storeApplyDetailService.list(page);
        return list;
    }







}
