// JavaScript Document
var myImage;
var ctx;
var img;
window.onload = function () {
    myImage = document.getElementById("myCanvas");
    ctx = myImage.getContext("2d");
    img = new Image();
    $("#scale-range").mousemove(function () {
        var scaleInput = $("#scale-range").val();
        ctx.clearRect(0, 0, myImage.width, myImage.height);
        ctx.save();
        ctx.translate(myImage.width / 2 - img.width / 2 * scaleInput, myImage.height / 2 - img.height / 2 * scaleInput);
        ctx.scale(scaleInput, scaleInput);
        ctx.drawImage(img, 0, 0);
        ctx.restore();
    });
};
