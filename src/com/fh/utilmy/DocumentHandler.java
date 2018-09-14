package com.fh.utilmy;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

public class DocumentHandler {
    private Configuration configuration = null;

    public DocumentHandler() {
        configuration = new Configuration();
        configuration.setDefaultEncoding("utf-8");
    }

    public void createDoc(Map map) {
        Map<String,Object> dataMap=new HashMap<String,Object>();
        getData(dataMap);
        Template t = getDefaultTemplate();
        //杈撳嚭鏂囨�?璺緞鍙婂悕绉�

        File outFile = new File("D:/outFile.doc");
        Writer out = null;
        try {
            out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(outFile), "utf-8"));
        } catch (FileNotFoundException e1) {
            e1.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        try {
            t.process(map, out);
        } catch (TemplateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            out.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public Template getDefaultTemplate() {
        configuration.setClassForTemplateLoading(this.getClass(), "/gdzj/form/print/template");
        Template t=null;

        try {
            //test.ftl涓鸿瑁呰浇鐨勬ā鏉�
            t = configuration.getTemplate("jia.ftl", "utf-8");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return t;
    }

    public Template getTemplate(String templateName) {
        configuration.setClassForTemplateLoading(this.getClass(), "/com/fh/utilmy/template");
        Template t=null;

        try {

            t = configuration.getTemplate(templateName+".ftl", "utf-8");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return t;
    }


    private void getData(Map<String,Object> dataMap)
    {
        //dataMap.put("author", "sss");
        //dataMap.put("remark", "sss");
/*		  List<Table1> _table1=new ArrayList<Table1>();

		  Table1 t1=new Table1();
		  t1.setDate("2010-10-1");
		  t1.setText("sss");
		  _table1.add(t1);

		  Table1 t2=new Table1();
		  t2.setDate("2010-10-2");
		  t2.setText("s");
		  _table1.add(t2);

		  dataMap.put("table1", _table1);


		  List<Table2> _table2=new ArrayList<Table2>();
		  for(int i=0;i<5;i++)
		  {
			  Table2 _t2=new Table2();
			  _t2.setDetail("s");
			  _t2.setPerson("s"+i);
			  _t2.setBegindate("2010-10-1");
			  _t2.setFinishdate("2010-10-31");
			  _t2.setRemark("remark");
			  _table2.add(_t2);
		  }
		  dataMap.put("table2", _table2);*/

    }



}
