<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<!DOCTYPE >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>书法字查询</title>
<link href="css/index.css" rel="stylesheet" type="text/css">
<script src="js/jquery.js"></script>
<script src="js/html.js"></script>
<script src="js/jquery-1.11.1.min.js"></script>
</head>
<body>
<div id="header">
<div class="top">
 <h1>基于WebGL的书法匾额生成</h1>
     <div class="nav">
       <a href="main.html" class="hover";>首页</a><a style="color:BLUE;">书法字查询</a>     
       <a href="vectorization.asp">书法字矢量化</a>
       <a href="adjust.html">书法字调整</a><a href="3Dmodel.html">三维模型设计</a>
       <a href="preview.html">匾额预览</a><a href="create.html">匾额合成</a>
       
     </div>
  </div>
</div>
<div class="xyz">
<form method="post" action="query.asp"> 
请输入汉字:<input type="text" name="lab" />
请输入字体:1、行书，2、楷书<input type="text" name="type" />
<input type="submit" value="查询" />
</form>
</div>
</br>
</br>
<div style="font-size:18px;font-family:"楷体"">
&nbsp;<label>为您找到以下字体：</label>
</div>
<div></div>
<%
'向把login.html传过来的两个信息用变量保存起来
label=Request.Form("lab")
typet=Request.Form("type")
%>
<%
Dim conn ,rs,total,qw,fso,fp
Set fso = Server.CreateObject("Scripting.FileSystemObject")
fp=Server.MapPath("/")
Set conn=Server.CreateObject("Adodb.Connection")
conn.open "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" & Server.MapPath("data.mdb")
%>
<%
Set rs = Server.CreateObject( "ADODB.Recordset" )
sql = "select * from Word where label='"+label+"'and type='"+typet+"';"
rs.open sql,conn,1,3
total=rs.RecordCount
'如果什么都查不到，弹窗，弹回login.html
if (total=0) then
response.write("系统尚未收录此字")
%>
<%
else
for i=1 to total
'set file_P(i)=rs("file_path")
If fso.FileExists(fp&"/picture/"&rs("file_path")) then
qw="picture/"&rs("file_path") 
%>
<div style="display:inline-block;margin-left:5px;margin-top:5px;border:2px dashed green;width:320px;height:100px;">
<IMG src="<%=qw%>"style="width:90;height:90;" ><label>字体路径:</label>
<input type ="text" value = <%=qw%> style:"width:100px">
</div>
<%
end if
rs.movenext  
next
%>
<%
end if
'用完数据关
rs.close
set rs=nothing
conn.close
set conn=nothing
%>
<div class="buttin">   
       <div class="butt"><img src="images/more.png"><p>到底啦！</p></div>
       <div class="butt"><img src="images/more.png"><p>到底啦！</p></div>
       <div class="butt"><img src="images/more.png"><p>到底啦！</p></div>
       <div class="butt"><img src="images/more.png"><p>到底啦！</p></div>
       <div class="butt"><img src="images/more.png"><p>到底啦！</p></div>
</div>
</body>
</html>
