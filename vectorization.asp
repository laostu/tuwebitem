<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<!DOCTYPE  >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>三维模型设计</title>
<link href="css/index.css" rel="stylesheet" type="text/css">
<script src="js/html.js"></script>
<script src="js/vect.js"></script>
</head>
<body style="overflow:-Scroll;overflow-x:hidden">

<!--头部-->
<div id="header">
<div class="top">
 <h1>基于WebGL的书法匾额生成</h1>
     <div class="nav">
     <a href="main.html" class="hover";>首页</a><a href="query.asp">书法字查询</a>     
       <a style="color:BLUE;">书法字矢量化</a>
       <a href="adjust.html">书法字调整</a><a href="3Dmodel.html">三维模型设计</a>
       <a href="preview.html">匾额预览</a><a href="create.html">匾额合成</a>
     </div>
  </div>
</div>
 <div class="xyz">
<form method="post" action="vectorization.asp"> 
请输入路径:<input type="text" name="w_path" />
         <input type="submit" value="确定" />
</form>
</div>
<div class="mimg">
<div class="vla">
<label>您选择的字体：</label>
</div>
<div class="vim">
<img id="ip" alt="文字图像"  />
</div>
<div class="vbut">
<input type="button" value="加载入画布" onClick="loding()">
</div>
</div>
</br>
<div class="bbody">
<div class="allcan"><div><label>灰度图像</label></div>
    <canvas id="canvas1" width="230" height="230" style="background-color: rgba(255,255,255,255)"></canvas>
    <div class="cbut">
<input type="button" value="灰度化" onClick="ProcessToGrayImage()"> 
</div>
</div>

<div class="allcan"><div><label>二值图像</label></div>
    <canvas id="canvas2" width="230" height="230" style="background-color: rgba(255,255,255,255)"></canvas>
    <div class="cbut">
<input type="button" value="二值化" onClick="OTSUAlgorithm()">
</div>
</div>

<div class="allcan"><div><label>图像轮廓</label></div>
    <canvas id="canvas3" width="230" height="230" style="background-color: rgba(255,255,255,255)"></canvas>
    <div class="cbut">
<input type="button" value="轮廓提取" onClick="ContourExtraction()">
</div>
</div>
<div class="allcan"><div><label>拟合轮廓</label></div>
    <canvas id="canvas4" width="230" height="230" style="background-color: rgba(255,255,255,255)">></canvas>
    <div class="cbut">
<input type="button" value="轮廓拟合" onClick="Contourfitting()">
</div>
</div>
<div class="allcan"><div><label>矢量化字</label></div>
    <canvas id="canvas5" width="230" height="230" style="background-color: rgba(255,255,255,255)">></canvas>
    <div class="cbut">
<input type="button" value="轮廓填充" onClick="Contourfilling()">
</div>
</div>
<div class="xr">
<div>
<label>渲染</label>
</div>    
 <div><input  type = "button"  value = "立体文字"  onclick = "shasd()"/> </div> 
      <label>渲染颜色:</label>
      <select id="Fillc"> 
      <option value ="red" selected="selected">red</option>  
      <option value ="blue">blue</option> 
      <option value ="yellow" >yellow</option>  
      <option value ="green">green</option>  
      <option value ="silver">silver</option>
      <option value ="lime">lime</option>     	 
      <option value ="olive">olive</option> 
      <option value ="maroon">maroon</option>  
      <option value ="navy">navy</option> 
	  <option value ="purple">purple</option>  
      <option value ="teal">teal</option> 
      <option value ="fuchsia" >fuchsia</option>  
      <option value ="bian" >bian</option>  
      </select>
      <input type="button" value="确定" onClick="Cing()"><div> <a href="" id="download" download="矢量化图片.png">点我下载</a></div>
</div>


</div>
<%
path=Request.Form("w_path")
%>
<%
Dim fso,fp
Set fso = Server.CreateObject("Scripting.FileSystemObject")
fp=Server.MapPath("/")
if path="" then
path=path
else
'"picture/00000050(81,871,146,928).jpg" 

if fso.FileExists(fp&"/"&path) then
%>
<script>
ip.src="<%=path%>" 
</script>
<%
else
%>
<script>
alert("路径无效")
</script>
<%
end if
end if
%>
<script > 
   download.onclick = function(){
        var img =  convertCanvasToImage(canvas5)
        var arr = img.src.split(',')
        download.href = img.src
      }
      function convertCanvasToImage(canvas) {
	      var image = new Image();
	      image.src = canvas.toDataURL("image/png");
	      return image;
      }	  
</script>
<div class="buttin">   
       <div class="butt"><img src="images/more.png"><p>到底啦！</p></div>
       <div class="butt"><img src="images/more.png"><p>到底啦！</p></div>
       <div class="butt"><img src="images/more.png"><p>到底啦！</p></div>
       <div class="butt"><img src="images/more.png"><p>到底啦！</p></div>
       <div class="butt"><img src="images/more.png"><p>到底啦！</p></div>
       <div class="butt"><img src="images/more.png"><p>到底啦！</p></div>
</div>
</body>
</html>
