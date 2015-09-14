/* global P, Java*/
var CaptchaGeneratorClass = Java.type("com.github.cage.YCage");
var SkewImageSimpleClass = Java.type("com.temesoft.security.image.SkewImageSimple");
var ByteArrayOutputStreamClass = Java.type("java.io.ByteArrayOutputStream");
var JPEGCodecClass = Java.type("com.sun.image.codec.jpeg.JPEGCodec");
/**
 * 
 * @author mg
 * @public 
 * @constructor
 */
function Reciever() {
    var self = this, model = P.loadModel(this.constructor.name);

    /**
     */
    self.addDownload = function (eMail, aNick, aType, aCaptcha, aOnSuccess, aOnFailure) {
        if (aCaptcha === token) {
            if (aType) {
                if (eMail) {
                    if (aNick) {
                        model.downloads.params.id = P.ID.generate();
                        model.downloads.params.ctype = aType;
                        model.downloads.params.email = eMail;
                        model.downloads.params.nick = aNick;
                        model.downloads.executeUpdate();
                        model.save(aOnSuccess, aOnFailure);
                        aOnSuccess();
                    } else
                        aOnFailure('Обращение должно быть указано');
                } else
                    aOnFailure('Адрес электронной почты должен быть указан');
            } else
                aOnFailure('Способ использования должен быть указан');
        } else
            aOnFailure('Неправильные символы с картинки');
    };

    var token;

    self.getCaptcha = function () {
        var http = new P.HttpContext();
        var cage = new CaptchaGeneratorClass();
        token = cage.getTokenGenerator().next();
        var os = new ByteArrayOutputStreamClass();
        token = token.substring(0, 6);
        var generator = new SkewImageSimpleClass();
        var image = generator.skewImage(token);
        var jpeg = JPEGCodecClass.createJPEGEncoder(os);
        jpeg.encode(image);
        //cage.draw(token, os);
        var captcha = os.toByteArray();
        http.response.contentType = "image/" + cage.getFormat();
        http.response.headers.add("Cache-Control", "no-cache, no-store");
        http.response.headers.add("Pragma", "no-cache");
        var time = new Date();
        http.response.headers.add("Last-Modified", time);
        http.response.headers.add("Date", time);
        http.response.headers.add("Expires", time);
        http.response.bodyBuffer = captcha;// send the response
    };
}
