package com.fh.service.exportExcel;

import com.fh.dao.DaoSupport;
import com.fh.util.FileUtil;
import com.fh.util.PageData;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

/**
 * 导出EXCEL
 */

@Service("exportExcelService")
public class ExportExcelService {

    @Resource(name = "daoSupport")
    private DaoSupport dao;


    /***
     *     导出EXCEL
     * @param title   标题
     * @param titleList  标题字符串数组     例：new String[]{"编码", "名称", "所属编号", "类型", "规格", "单位", "级别", "备注"}
     * @param titleColumnList 标题对应的字段标识   new String[]{ "BIANMA", "MINGCHENG", "SSHBH", "LEIXING", "GUIGE", "DANWEI", "JIBIE","BEIZHU"}
     * @param listProduct   数据
     * @param response  返回类型
     */
    public void exportExcel(String title, List<String> titleList, List<String> titleColumnList, List<PageData> listProduct, HttpServletResponse response,HttpServletRequest request) {


        HSSFWorkbook wb = new HSSFWorkbook();//创建webbook对象
        HSSFSheet sheet = wb.createSheet("sheet1"); //创建sheet
        HSSFRow headerRow = sheet.createRow((short) 0);//在sheet第1行中添加表头
        HSSFCellStyle style = getExcelStyle(wb);
        HSSFCellStyle contextstyle =wb.createCellStyle();

        int cellNumber = 0;//表头长度

        cellNumber = titleList.size();

        //遍历表头
        HSSFCell headerCell = null;//创建表头单元格
        for (int i = 0; i < cellNumber; i++) {
            headerCell = headerRow.createCell((short) i); //单元格titleList[i].
            headerCell.setCellValue(titleList.get(i));//给单元格赋值
            headerCell.setCellStyle(style);//单元格样式
            sheet.setColumnWidth((short) i, (short) 4766);//设置单元格宽度
        }

        for (int i = 0; i < listProduct.size(); i++) {
            PageData single = listProduct.get(i);
            HSSFRow dataRow = sheet.createRow((short) i + 1);//创建行
            HSSFCell contentCell = null;//创建单元格
            for (int j = 0; j < cellNumber; j++) {
                String TABLE_COLUMN = titleColumnList.get(j);
                String VALUE = "";
                if (single.containsKey(TABLE_COLUMN) && single.get(TABLE_COLUMN) != null && !single.get(TABLE_COLUMN).toString().equals("")) {//判断map中是否存在key,并且判断key的值是否为空

                    VALUE = single.get(TABLE_COLUMN).toString();
                }

                contentCell = dataRow.createCell((short) j);//单元格
                /**----------------------判断值的类型后进行强制类型转换--jintian 2018-03-13----------------------**/
                Boolean isNum = false;//数据是否为数值型
                Boolean isInteger=false;//数据是否为整数
                Boolean isPercent=false;//数据是否为百分数
                Boolean isqihao=false;//数据是否为期号
                if (VALUE != null || "".equals(VALUE)) {
                    //判断数据是否为数值型
                    isNum = VALUE.toString().matches("^(-?\\d+)(\\.\\d+)?$");
                    //判断数据是否为整数（小数部分是否为0）
                    isInteger=VALUE.toString().matches("^[-\\+]?[\\d]*$");
                    //判断数据是否为百分数（是否包含“%”）
                    isPercent=VALUE.toString().contains("%");
                }
                //如果是期号那一列，就是文本类型，不是数值类型和不是整数
                isNum = false;
                isInteger = false;
                isqihao = false;

                //如果单元格内容是数值类型，涉及到金钱（金额、本、利），则设置cell的类型为数值型，设置数据的类型为数值类型
                if (isNum && !isPercent) {
                    HSSFDataFormat df = wb.createDataFormat(); // 此处设置数据格式
                    if (isInteger) {
                        contextstyle.setDataFormat(df.getBuiltinFormat("#,#0"));//数据格式只显示整数
                    }else{
                        contextstyle.setDataFormat(df.getBuiltinFormat("#,##0.00"));//保留两位小数点
                    }
                    // 设置单元格内容为double类型
                    contentCell.setCellValue(Double.parseDouble(VALUE));
                    // 设置单元格格式
                    contentCell.setCellStyle(contextstyle);
                } else {
                	if(isqihao) {
                		VALUE = "第"+VALUE+"期";
                	}
                    // 设置单元格内容为字符型
                    contentCell.setCellValue(VALUE);
                    contentCell.setCellStyle(contextstyle);
                }
                /**------------------------------------------------------------------------------------**/
//                contentCell.setCellValue(VALUE);//单元格赋值

            }
            //contentCell.setCellStyle(style);//行添加样式  update by zrr 20180516 解决最后一列样式变成常规
        }


        //浏览器下载
        OutputStream os = null;
        title= FileUtil.processFileName(request, title);
        try {
//            response.reset();// 清空输出流
//            response.setHeader("Content-disposition", "attachment; filename=" + new String((title + ".xls").getBytes("UTF-8"), "ISO8859-1"));
//            response.setContentType("text/html;charset=UTF-8");
//            response.setContentType("application/x-excel");
            response.reset();
            response.setContentType("application/vnd.ms-excel;charset=utf-8");
            // response.setHeader("Content-disposition", "attachment; filename=" + new String((title+".xls").getBytes("UTF-8"), "ISO8859-1"));
            response.setHeader("Content-disposition", "attachment; filename=" + title+".xls");//update add by zrr 20180426
            os = response.getOutputStream();// 取得输出流
            wb.write(os);
            //            wb.close();
            os.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (os != null) {
                    os.close();
                }

            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }


    /**
     * method:getExcelStyle设置excel单元格样式
     */

    public static HSSFCellStyle getExcelStyle(HSSFWorkbook wb) {
        HSSFCellStyle style = wb.createCellStyle();
//        style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
//        style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
//        style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
//        style.setBorderRight(HSSFCellStyle.BORDER_THIN);
//        style.setBorderTop(HSSFCellStyle.BORDER_THIN);
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);//居中
        HSSFFont font = wb.createFont();
        font.setColor(HSSFColor.BLACK.index);
        font.setFontHeightInPoints((short) 10);
        font.setFontName("宋体");
        //      font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
        style.setFont(font);
        style.setWrapText(true);
        return style;
    }


}
