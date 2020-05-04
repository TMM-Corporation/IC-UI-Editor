function test(code) {
    Widgets.context.runOnUiThread(function () {
        try {
            code();
        }
        catch (e) {
            android.widget.Toast.makeText(Widgets.ctx, e + " (#" + e.lineNumber + ")", android.widget.Toast.LENGTH_LONG).show();
        }
    });
}
