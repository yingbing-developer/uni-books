package com.itstudy.view;

import android.graphics.Paint;
import android.graphics.Paint.FontMetrics;
import android.widget.TextView;

public class GetTextViewHeight {
	
    public static int getFontHeight(TextView view) {
        Paint paint = new Paint();
        paint.setTextSize(view.getTextSize());
        FontMetrics fm = paint.getFontMetrics();
        return (int) (Math.ceil(fm.descent - fm.ascent));
    }
	
}