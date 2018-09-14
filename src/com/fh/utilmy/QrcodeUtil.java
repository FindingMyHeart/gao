package com.fh.utilmy;

public class QrcodeUtil {

//	public static void createBarcode128(String code, String filepath) throws Exception{
//		Barcode128 code128 = new Barcode128();
//		code128.setCode(code);
//		Image barcode=code128.createAwtImage(Color.black, Color.white);
//		BufferedImage img = new BufferedImage((int)barcode.getWidth(null), (int)barcode.getHeight(null), BufferedImage.TYPE_INT_RGB);
//		ByteArrayOutputStream bout = new ByteArrayOutputStream(4096);
//	    Graphics g = img.getGraphics();
//		g.setColor(Color.white);
//	    g.drawImage(barcode, 0, 0,(int)barcode.getWidth(null), (int)barcode.getHeight(null), Color.white, null);
//	    //g.drawImage(barcode, 0, 0, Color.white, null);
//	    g.dispose();
//
//
//	}
//	public static void createPDF417(String code, String filepath) throws Exception{
//		Image barcode = null;
//	    BarcodePDF417 pdf417 = new BarcodePDF417();
//	    byte[] contentBytes = code.getBytes("gb2312");
//	    pdf417.setText(contentBytes);
//	    pdf417.setCodeColumns(8);
//	    pdf417.setCodeRows(3);
//	    pdf417.setErrorLevel(3);
//	    pdf417.setYHeight(5);//设置宽窄比
//	    barcode = pdf417.createAwtImage(Color.black, Color.white);
//	    BufferedImage img = new BufferedImage((int)barcode.getWidth(null), (int)barcode.getHeight(null), BufferedImage.TYPE_INT_RGB);
//
//	    Graphics g = img.getGraphics();
//		g.setColor(Color.white);
//	    g.drawImage(barcode, 0, 0,(int)barcode.getWidth(null), (int)barcode.getHeight(null), Color.white, null);
//	    //g.drawImage(barcode, 0, 0, Color.white, null);
//	    g.dispose();
//
//	   /*** 将bout输出到jsp页面，这里不用
//	    ByteArrayOutputStream bout = new ByteArrayOutputStream(4096);
// 		ImageIO.write(img, "jpeg", bout);
//	    response.setContentType("image/jpeg");
//	    response.setContentLength(bout.size());
//	    response.getOutputStream().write(bout.toByteArray());
//	    response.getOutputStream().flush();
//
//	    */
//
//	    try {
//			ImageIO.write(img, "jpg",new File(filepath));
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//
//	}
}
