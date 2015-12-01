/* global P */

/**
 * 
 * @author mg
 * {global P}
 */
function DownloadView() {
    var self = this
            , form = P.loadForm(this.constructor.name);

    self.show = function () {
        form.show();
        updateCaptcha();
    };

    form.lblCaptcha.onMouseClicked = function (event) {
        updateCaptcha();
    };

    function updateCaptcha() {
        var location = window.location + '';
        var slashIdx = location.lastIndexOf('/');
        var context = location.substring(0, slashIdx + 1);
        var captchaUrl = context + 'application?__type=14&__moduleName=Reciever&__methodName=getCaptcha';//&' + P.ID.generate();
        P.Icon.load(captchaUrl, function (aIcon) {
            form.lblCaptcha.icon = aIcon;
        }, function (e) {
            P.Logger.severe(e);
        });
    }

    form.btnDownload.onActionPerformed = function (event) {
        form.btnDownload.enabled = false;
        var reciever = new P.ServerModule('Reciever');
        //10 - физ. лицо
        //20 - уч. заведение
        //30 - оргинизация
        reciever.addDownload(form.edEMail.text, form.edNick.text, form.rbOwn.selected ? 10 : form.rbAcademic ? 20 : 30, form.edCaptcha.text, function (message) {
            form.btnDownload.enabled = true;
            P.Logger.info('download granted.');
        }, function (e) {
            form.btnDownload.enabled = true;
            alert(e);
        });
    };
}
