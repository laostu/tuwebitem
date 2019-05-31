// JavaScript Document
function loding(){ 
     var img=document.getElementById("ip");
     var c=document.getElementById("canvas1");
	 c.width=img.width
	 c.height=img.height
	// var img=document.getElementById("ip");
     var c2=document.getElementById("canvas2");
	 c2.width=img.width
	 c2.height=img.height
	 var c3=document.getElementById("canvas3");
	 c3.width=img.width
	 c3.height=img.height
	 var c4=document.getElementById("canvas4");
	 c4.width=img.width
	 c4.height=img.height
	 var c5=document.getElementById("canvas5");
	 c5.width=img.width
	 c5.height=img.height
     var ctx=c.getContext("2d");
     ctx.drawImage(img, 0,0);//(c.width - img.width) / 2, (c.height - img.height) / 2
  }  
  <!--  彩色图像灰度化 -->
function ProcessToGrayImage(){ 
   var c=document.getElementById("canvas1");
   var ctx=c.getContext("2d");
   var canvasData = ctx.getImageData(0,0, c.width, c.height);
    for (var x = 0; x < canvasData.width; x++){      
    for (var y = 0; y < canvasData.height; y++){
            var idx = (x + y * c.width) * 4;
            var r = canvasData.data[idx + 0];
            var g = canvasData.data[idx + 1];
            var b = canvasData.data[idx + 2];
            //更新图像数据
            var gray = CalculateGrayValue(r , g , b);
            canvasData.data[idx + 0] = gray;
            canvasData.data[idx + 1] = gray;
            canvasData.data[idx + 2] = gray;
        }
    }	
            ctx.putImageData(canvasData, 0, 0);	
			//alert("灰度化完成")
			//alert("nijha")
			var c2=document.getElementById("canvas2");
            var ctx2=c2.getContext("2d");
			ctx2.putImageData(canvasData, 0, 0);
    }
  //计算图像的灰度值
function CalculateGrayValue(rValue,gValue,bValue){
     return parseInt(rValue * 0.30 + gValue * 0.59 + bValue * 0.11);
  }
  <!--二值化--> 
  //OTSU图像处理算法
function OTSUAlgorithm(){
   var c2=document.getElementById("canvas2");
   var ctx2=c2.getContext("2d");
   var canvasData = ctx2.getImageData(0,0, c2.width, c2.height);
   var m_pFstdHistogram = new Array();//表示灰度值的分布点概率
   var m_pFGrayAccu = new Array();//其中每一个值等于m_pFstdHistogram中从0到当前下标值的和
   var m_pFGrayAve = new Array();//其中每一值等于m_pFstdHistogram中从0到当前指定下标值*对应的下标之和
   var m_pAverage=0;//值为m_pFstdHistogram【256】中每一点的分布概率*当前下标之和
   var m_pHistogram = new Array();//灰度直方图
   var i,j;
   var temp=0,fMax=0;//定义一个临时变量和一个最大类间方差的值
   var nThresh = 0;//最优阀值
   //初始化各项参数
   for(i=0; i<256; i++)
   {
     m_pFstdHistogram[i] = 0;
     m_pFGrayAccu[i] = 0;
     m_pFGrayAve[i] = 0;
     m_pHistogram[i] = 0;
   }
   //获取图像的像素
   var pixels = canvasData.data;
   //下面统计图像的灰度分布信息
   for(i=0; i<pixels.length; i+=4)
   {
      //获取r的像素值，因为灰度图像，r=g=b，所以取第一个即可
      var r = pixels[i];
      m_pHistogram[r]++;
   }
   //下面计算每一个灰度点在图像中出现的概率
   var size = canvasData.width * canvasData.height;
   for(i=0; i<256; i++)
   {
      m_pFstdHistogram[i] = m_pHistogram[i] / size;
   }
   //下面开始计算m_pFGrayAccu和m_pFGrayAve和m_pAverage的值
   for(i=0; i<256; i++){
   for(j=0; j<=i; j++){
        //计算m_pFGaryAccu[256]
    m_pFGrayAccu[i] += m_pFstdHistogram[j];
    //计算m_pFGrayAve[256]
    m_pFGrayAve[i] += j * m_pFstdHistogram[j];
   }
      //计算平均值
    m_pAverage += i * m_pFstdHistogram[i];
   }
   //下面开始就算OSTU的值，从0-255个值中分别计算ostu并寻找出最大值作为分割阀值
   for (i = 0 ; i < 256 ; i++)
   {
    temp = (m_pAverage * m_pFGrayAccu[i] - m_pFGrayAve[i]) * (m_pAverage * m_pFGrayAccu[i] - m_pFGrayAve[i]) / (m_pFGrayAccu[i] * (1 - m_pFGrayAccu[i]));
    if (temp > fMax)
    {
      fMax = temp;
      nThresh = i;
    }
   }
   //下面执行二值化过程 
   for(i=0; i<canvasData.width; i++){
   for(j=0; j<canvasData.height; j++){
         //取得每一点的位置
         var ids = (i + j*canvasData.width)*4;
         //取得像素的R分量的值
         var r = canvasData.data[ids];
         //与阀值进行比较，如果小于阀值，那么将改点置为0，否则置为255
         var gray = r>nThresh?255:0;
         canvasData.data[ids+0] = gray;
         canvasData.data[ids+1] = gray;
         canvasData.data[ids+2] = gray;		
   }
   }
    ctx2.putImageData(canvasData, 0, 0);
	//alert("二值化完成")
	var c3=document.getElementById("canvas3");
    var ctx3=c3.getContext("2d");
	//c3.width=canvasData.width
	//cs.height=canvasData.height
	ctx3.putImageData(canvasData, 0, 0);
 } 
 /******轮廓提取*********/
     
  function ContourExtraction(){ 
   var c3=document.getElementById("canvas3");
   var ctx3=c3.getContext("2d");
   var canvasData = ctx3.getImageData(0,0, c3.width, c3.height);
   var internalpoint=new Array();
   var k=0;
   var falg=0;
   //先四邻域处理内部点
   for(i=0; i<canvasData.width; i++){
   for(j=0; j<canvasData.height; j++){
      var ids = (i + j*canvasData.width)*4;
      var r = canvasData.data[ids];		
      if((canvasData.data[ids]==0)&&(canvasData.data[ids+4]==0)&&(canvasData.data[ids-4]==0)&&(canvasData.data[(i+(j-1)*canvasData.width)*4]==0)
	  &&(canvasData.data[(i+(j+1)*canvasData.width)*4]==0)&&(canvasData.data[(i+(j-1)*canvasData.width)*4]==0))
      internalpoint[k++]=ids;
	}
	}
	for(var q=0;q<k;q++)
   {       
         canvasData.data[internalpoint[q]] = 255;
         canvasData.data[internalpoint[q]+1] = 255;
         canvasData.data[internalpoint[q]+2] = 255; 
   } 
   //三邻域处理边缘点
     for(i=0; i<canvasData.width; i++){
    for(j=0; j<canvasData.height; j++){
      var ids = (i + j*canvasData.width)*4;
	  if((canvasData.data[ids]==0)&&(canvasData.data[ids+4]==0)&&(canvasData.data[ids-4]==0)
	  &&(canvasData.data[(i+(j-1)*canvasData.width)*4]==0))
	  {
		 canvasData.data[ids] = 255;
         canvasData.data[ids+1] = 255;
         canvasData.data[ids+2] = 255; 
	 }
	  if((canvasData.data[ids]==0)&&(canvasData.data[ids+4]==0)&&(canvasData.data[ids-4]==0)
	  &&(canvasData.data[(i+(j+1)*canvasData.width)*4]==0))
	  {
		 canvasData.data[ids] = 255;
         canvasData.data[ids+1] = 255;
         canvasData.data[ids+2] = 255; 
	 }
	  if((canvasData.data[ids]==0)&&(canvasData.data[(i+(j-1)*canvasData.width)*4]==0)
	  &&(canvasData.data[ids-4]==0)&&(canvasData.data[(i+(j+1)*canvasData.width)*4]==0))
	  {
		 canvasData.data[ids] = 255;
         canvasData.data[ids+1] = 255;
         canvasData.data[ids+2] = 255; 
	 }
	   if((canvasData.data[ids]==0)&&(canvasData.data[(i+(j-1)*canvasData.width)*4]==0)
	   &&(canvasData.data[ids+4]==0)&&(canvasData.data[(i+(j+1)*canvasData.width)*4]==0))
	  {
		 canvasData.data[ids] = 255;
         canvasData.data[ids+1] = 255;
         canvasData.data[ids+2] = 255; 
	 }
   }}//消除孤立点
	for(i=0; i<canvasData.width; i++){
    for(j=0; j<canvasData.height; j++){
      var ids = (i + j*canvasData.width)*4;
	  var count=0;
	  if((canvasData.data[ids]==0)&&(canvasData.data[(i+1 + j*canvasData.width)*4]==0))
	  count++;
	  if((canvasData.data[ids]==0)&&(canvasData.data[(i-1 + j*canvasData.width)*4]==0))
	  count++;
	  if((canvasData.data[ids]==0)&&(canvasData.data[(i+(j-1)*canvasData.width)*4]==0))
	  count++;
	  if((canvasData.data[ids]==0)&&(canvasData.data[(i+(j+1)*canvasData.width)*4]==0))
	  count++;
	  if((canvasData.data[ids]==0)&&(canvasData.data[(i+1+(j-1)*canvasData.width)*4]==0))
	  count++;
	   if((canvasData.data[ids]==0)&&(canvasData.data[(i-1+(j-1)*canvasData.width)*4]==0))
	  count++;
	  if((canvasData.data[ids]==0)&&(canvasData.data[(i+1+(j+1)*canvasData.width)*4]==0))
	  count++;
	  if((canvasData.data[ids]==0)&&(canvasData.data[(i-1+(j+1)*canvasData.width)*4]==0))
	  count++;
	  if(count==1){
		 canvasData.data[ids] = 255;
         canvasData.data[ids+1] = 255;
         canvasData.data[ids+2] = 255;}
	}}
	 ctx3.putImageData(canvasData, 0, 0);
	//alert("轮廓提取完成")
	var c4=document.getElementById("canvas4");
    var ctx4=c4.getContext("2d");
	//c3.width=canvasData.width
	//cs.height=canvasData.height
	ctx4.putImageData(canvasData, 0, 0);
	 }	
/*******轮廓拟合********/
    var cdata
	var	dir_index=new Array();
	var	pointstack=new Array();
	var	controlpoint=new Array();
	var m=0;
	var n=0;
function Contourfitting(){
	var turn=2;
	var l=0;
	var c4=document.getElementById("canvas4");
    var ctx4=c4.getContext("2d");	
	cdata = ctx4.getImageData(0,0, c4.width, c4.height); 
	//cdata=canvasData; 
	ctx4.clearRect(0,0,c4.width,c4.height);
    ctx4.strokeStyle ="black";
       // 设置线条的宽度
    ctx4.lineWidth =1;
	//ctx4.beginPath();
    for( i=0;i< c4.width;i++){
	for( j=0;j< c4.height;j++){	
    ids = (i + j*c4.width)*4;
	if(cdata.data[ids]==0)
	{  
		FindNeb(i,j,i,j);
		for(var p=0;p<dir_index.length-1;p++)
		{   
			var flag=Math.abs(dir_index[p]-dir_index[p+1]);
			if(flag<=6&&flag>=1){
				 controlpoint[l++]=pointstack[p];
				}
		} 
			if(turn%2==0)				 	
		for(var cp=0;cp<controlpoint.length;cp++)
		{    cc=controlpoint[cp]/4%cdata.width;
	         dd=controlpoint[cp]/(4*cdata.width);
	         aa=controlpoint[controlpoint.length-1]/4%cdata.width;
		     bb=controlpoint[controlpoint.length-1]/(4*cdata.width);			
			if(cp==0)
			{		
	        ctx4.moveTo(aa,bb);
			}
            ctx4.lineTo(cc, dd);				          
	    }
		 if(turn%2!=0)
	   {    for(var cp=controlpoint.length-1;cp>=0;cp--)
		{    cc=controlpoint[cp]/4%cdata.width;
	         dd=controlpoint[cp]/(4*cdata.width);
	         aa=controlpoint[0]/4%cdata.width;
		     bb=controlpoint[0]/(4*cdata.width);
			if(cp==controlpoint.length-1)
			{		
	        ctx4.moveTo(aa,bb);
			}
            ctx4.lineTo(cc, dd);				          
	    }
		 	  
	}	 		      	
	}    
		l=0;
		m=0;
		n=0;	
		dir_index=[];
		dir_index.length=0;
		pointstack=[];
		pointstack.length=0;
		controlpoint=[];
		controlpoint.length=0;	
	}
	}	
	   ctx4.closePath();
	   ctx4.stroke(); 
	  // alert("轮廓拟合完成")
	  cdata = ctx4.getImageData(0,0, c4.width, c4.height);
	  var c5=document.getElementById("canvas5");
      var ctx5=c5.getContext("2d");
	  ctx5.putImageData(cdata, 0, 0);
	}
	function FindNeb(c,d,a,b){
	var mark=(c + d*cdata.width)*4;	
	//如果越界或访问过则直接返回
	if(c<0||d<0||c>=cdata.width||d>=cdata.height||cdata.data[mark]==1||cdata.data[mark]==255) {return;}
	cdata.data[mark]=1;	
    if(a==c+1&&b==d)
	dir_index[m++]=4;
	if(a==c+1&&b==d-1)
	dir_index[m++]=5;
	if(a==c&&b==d-1)
	dir_index[m++]=6;
	if(a==c-1&&b==d-1)
	dir_index[m++]=7;
	if(a==c-1&&b==d)
	dir_index[m++]=0;
	if(a==c-1&&b==d+1)
	dir_index[m++]=1;
	if(a==c&&b==d+1)
	dir_index[m++]=2;
	if(a==c+1&&b==d+1)
	dir_index[m++]=3;	
	pointstack[n++]=mark;
	if(cdata.data[(c-1+d*cdata.width)*4]==0)
	FindNeb(c-1,d,c,d);
	if(cdata.data[(c-1+d*cdata.width+cdata.width)*4]==0)
    FindNeb(c-1,d+1,c,d);
	if(cdata.data[(c+d*cdata.width+cdata.width)*4]==0)
    FindNeb(c,d+1,c,d);
	if(cdata.data[(c+1+d*cdata.width+cdata.width)*4]==0)
    FindNeb(c+1,d+1,c,d);
	if(cdata.data[(c+1+d*cdata.width)*4]==0)
    FindNeb(c+1,d,c,d);
	if(cdata.data[(c+1+d*cdata.width-cdata.width)*4]==0)
    FindNeb(c+1,d-1,c,d);
	if(cdata.data[(c+d*cdata.width-cdata.width)*4]==0)
    FindNeb(c,d-1,c,d);
	if(cdata.data[(c-1+d*cdata.width-cdata.width)*4]==0)
    FindNeb(c-1,d-1,c,d);
	}
	/**********轮廓填充************/
function Contourfilling(){	
    var turn=0;
	var cl_count=0;
	var l=0;
	var left=new Array();
    var right=new Array();
    var up=new Array();
    var bottom=new Array();
	var c4=document.getElementById("canvas5");
    var ctx4=c4.getContext("2d");
	var c3=document.getElementById("canvas3");
    var ctx3=c3.getContext("2d");	
	cdata = ctx3.getImageData(0,0, c3.width, c3.height); 
	//cdata=canvasData; 
	ctx4.clearRect(0,0,c4.width,c4.height);
    ctx4.strokeStyle ="black";
       // 设置线条的宽度
    ctx4.lineWidth =1;
	//ctx4.beginPath();
    for( i=0;i< c4.width;i++){
	for( j=0;j< c4.height;j++){	
    ids = (i + j*c4.width)*4;
	if(cdata.data[ids]==0)
	{  
		FindNeb(i,j,i,j);
		for(var p=0;p<dir_index.length-1;p++)
		{   
			var flag=Math.abs(dir_index[p]-dir_index[p+1]);
			if(flag<=6&&flag>=1){
				 controlpoint[l++]=pointstack[p];
				}
		} 
		left[cl_count]=controlpoint[0]/4%cdata.width;
             right[cl_count]=controlpoint[0]/4%cdata.width;
             up[cl_count]=controlpoint[0]/(4*cdata.width);
             bottom[cl_count]=controlpoint[0]/(4*cdata.width);
             for(var size=1;size< controlpoint.length;size++)
			{			
			 if(controlpoint[size]/4%cdata.width<left[cl_count])
			 left[cl_count]=controlpoint[size]/4%cdata.width;
			 if(controlpoint[size]/4%cdata.width>right[cl_count])
			 right[cl_count]=controlpoint[size]/4%cdata.width;
			 if(up[cl_count]<controlpoint[size]/(4*cdata.width))
			 up[cl_count]=controlpoint[size]/(4*cdata.width);
			  if( bottom[cl_count]>controlpoint[size]/(4*cdata.width))
			 bottom[cl_count]=controlpoint[size]/(4*cdata.width);
			}	
			cl_count++; 	 
		for(var lp=0;lp<left.length;lp++){
	if(left[cl_count-1]>left[lp]&&right[cl_count-1]<right[lp]&&bottom[cl_count-1]>bottom[lp]&&up[cl_count-1]<up[lp])
		turn++;
			}			
			if(turn%2==0)				 	
		for(var cp=0;cp<controlpoint.length;cp++)
		{    cc=controlpoint[cp]/4%cdata.width;
	         dd=controlpoint[cp]/(4*cdata.width);
	         aa=controlpoint[controlpoint.length-1]/4%cdata.width;
		     bb=controlpoint[controlpoint.length-1]/(4*cdata.width);			
			if(cp==0)
			{		
	        ctx4.moveTo(aa,bb);
			}
            ctx4.lineTo(cc, dd);				          
	    }
		 if(turn%2!=0)
	   {    for(var cp=controlpoint.length-1;cp>=0;cp--)
		{    cc=controlpoint[cp]/4%cdata.width;
	         dd=controlpoint[cp]/(4*cdata.width);
	         aa=controlpoint[0]/4%cdata.width;
		     bb=controlpoint[0]/(4*cdata.width);
			if(cp==controlpoint.length-1)
			{		
	        ctx4.moveTo(aa,bb);
			}
            ctx4.lineTo(cc, dd);				          
	    }
		 turn=0;	  
	}	 		      	
	}    
		l=0;
		m=0;
		n=0;	
		dir_index=[];
		dir_index.length=0;
		pointstack=[];
		pointstack.length=0;
		controlpoint=[];
		controlpoint.length=0;	
	}
	}	
	   ctx4.closePath();
	 
	 // context.fillStyle="canvasGra";
	 // context.fill();
	   ctx4.stroke(); 
	  ctx4.fillStyle="black";
		 ctx4.fill(); 		 
	}
	function shasd(){
	var c4=document.getElementById("canvas5");
	var context = c4.getContext('2d');
	    context.shadowOffsetX=5;
        context.shadowOffsetY=5;		
        context.shadowBlur=5;
        context.shadowColor="rgba(0,0,0,0.5)";
		context.fill();}
function Cing(){	
	var c4=document.getElementById("canvas5");
	var context = c4.getContext('2d');
	var canvasGra = context.createLinearGradient(0,0,500,500);
	var fillcolor=document.getElementById( 'Fillc' );
    var index=fillcolor.selectedIndex;  //序号，取当前选中选项的序号
    var val = fillcolor.options[index].text;
	context.fillStyle=val;
    context.fill(); 		 
	}


 /*
 ******
 ******
 **
 *******
 ***
 *******
 *
 *******
 *
 **/
 
 