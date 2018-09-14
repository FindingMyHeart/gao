package com.fh.utilmy;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;

public class StackTraceUtils {
	/**
	 * 将异常堆栈转换为字符串
	 * 
	 * @param aThrowable
	 *            异常
	 * @return String
	 */
	public static String getStackTrace(Throwable aThrowable) {
        final Writer result = new StringWriter();
        final PrintWriter printWriter = new PrintWriter(result);
        aThrowable.printStackTrace(printWriter);
        return result.toString();
    }

	public static String getMessage(Throwable aThrowable) {

		return aThrowable.getMessage();
	}
}
