//var sunCenterY = 

var sunCenterX = 450;
var sunCenterY = 250;
var angle1 = 0;
var angle2 = 0;
var angle3 = 0;


function setup() { 
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var m4 = twgl.m4;
                  
  function moveToTx(x,y,z,Tx) {  
    var loc = [x,y,z]; 
    var locTx = m4.transformPoint(Tx,loc);
    context.moveTo(locTx[0]+sunCenterX,-locTx[1]+sunCenterY);
  }

  function lineToTx(x,y,z,Tx) {
    var loc = [x,y,z];
    var locTx = m4.transformPoint(Tx,loc);
    context.lineTo(locTx[0]+sunCenterX,-locTx[1]+sunCenterY);
  }
                
  function drawAxes(Tx) {
      
    // A little cross on the front face, for identification
    moveToTx(0,0,0,Tx);lineToTx(100,0,0,Tx);context.stroke();
    moveToTx(0,0,0,Tx);lineToTx(0,200,0,Tx);context.stroke();
    moveToTx(0,0,0,Tx);lineToTx(0,0,200,Tx);context.stroke();
  }

  function drawCube(Tx) {
    
    // A little cross on the front face, for identification
    moveToTx(180,200,100,Tx);lineToTx(220,200,100,Tx);context.stroke();
    moveToTx(200,180,100,Tx);lineToTx(200,220,100,Tx);context.stroke();
    // Twelve edges of a cube
    moveToTx(100,100,100,Tx);lineToTx(300,100,100,Tx);
    lineToTx(300,300,100,Tx);lineToTx(100,300,100,Tx);context.stroke();
    moveToTx(300,100,100,Tx);lineToTx(300,100,300,Tx);
    lineToTx(300,300,300,Tx);lineToTx(300,300,100,Tx);context.stroke();
    moveToTx(300,100,300,Tx);lineToTx(100,100,300,Tx);
    lineToTx(100,300,300,Tx);lineToTx(300,300,300,Tx);context.stroke();
    moveToTx(100,100,300,Tx);lineToTx(100,100,100,Tx);
    lineToTx(100,300,100,Tx);lineToTx(100,300,300,Tx);context.stroke();
  }
                  
                  
    function drawEarth(Tx){
       //context.strokeStyle = "blue";
      moveToTx(0,0,0,Tx);lineToTx(0,200,0,Tx);context.stroke();        
      moveToTx(0,0,0,Tx);lineToTx(0,-200,0,Tx);context.stroke();
      
      moveToTx(0,200,0,Tx);lineToTx(0,200,50,Tx);context.stroke();
      
      var constant = 80;
      var xc=0,yc=0,zc=0;
      var rx=constant,ry=constant,rz=constant;
      var theta=0,phi=0;

      for(phi=0;phi<2.001*Math.PI;phi=phi+(1/8)*Math.PI){
        theta=0;
          moveToTx(xc+rx*Math.sin(theta)*Math.cos(phi),yc+ry*Math.cos(theta),zc+rz*Math.sin(theta)*Math.sin(phi),Tx);
          for(theta=(1/32)*Math.PI;theta<1.001*Math.PI;theta=theta+(1/32)*Math.PI)
              lineToTx(xc+rx*Math.sin(theta)*Math.cos(phi),yc+ry*Math.cos(theta),zc+rz*Math.sin(theta)*Math.sin(phi),Tx);
   
          context.stroke();
      }
      
      for(theta=(1/8)*Math.PI;theta<0.999*Math.PI;theta=theta+(1/8)*Math.PI){
          phi=0;
          moveToTx(xc+rx*Math.sin(theta)*Math.cos(phi),yc+ry*Math.cos(theta),zc+rz*Math.sin(theta)*Math.sin(phi),Tx);
          for(phi=(1/64)*Math.PI;phi<2.001*Math.PI;phi=phi+(1/64)*Math.PI)
              lineToTx(xc+rx*Math.sin(theta)*Math.cos(phi),yc+ry*Math.cos(theta),zc+rz*Math.sin(theta)*Math.sin(phi),Tx);
        //context.strokeStyle = "red";
          context.stroke();
      }         
    } 
                  
      function drawSun(Tx){
      var constant = 150;
      var xc=0,yc=0,zc=0;
      var rx=constant,ry=constant,rz=constant;
      var theta=0,phi=0;

      for(phi=0;phi<2.001*Math.PI;phi=phi+(1/6)*Math.PI){
        theta=0;
          moveToTx(xc+rx*Math.sin(theta)*Math.cos(phi),yc+ry*Math.cos(theta),zc+rz*Math.sin(theta)*Math.sin(phi),Tx);
          for(theta=(1/32)*Math.PI;theta<1.001*Math.PI;theta=theta+(1/32)*Math.PI)
              lineToTx(xc+rx*Math.sin(theta)*Math.cos(phi),yc+ry*Math.cos(theta),zc+rz*Math.sin(theta)*Math.sin(phi),Tx);
     //   context.strokeStyle = 'blue';
          context.stroke();
      }
      
      for(theta=(1/8)*Math.PI;theta<0.999*Math.PI;theta=theta+(1/6)*Math.PI){
          phi=0;
          moveToTx(xc+rx*Math.sin(theta)*Math.cos(phi),yc+ry*Math.cos(theta),zc+rz*Math.sin(theta)*Math.sin(phi),Tx);
          for(phi=(1/64)*Math.PI;phi<2.001*Math.PI;phi=phi+(1/64)*Math.PI)
              lineToTx(xc+rx*Math.sin(theta)*Math.cos(phi),yc+ry*Math.cos(theta),zc+rz*Math.sin(theta)*Math.sin(phi),Tx);
      //  context.strokeStyle = 'red';
          context.stroke();
      }   
      
    } 

  function draw() {
    // hack to clear the canvas fast
    canvas.width = canvas.width;
    
    var angle4 = 15*0.01*Math.PI;    
    var axis = [0,1,0.5095]; // this is an axis, a 3D vector
    
    var orbitTranslation = m4.translation([300*Math.cos(angle3),canvas.height-500,300*Math.sin(angle3)]); 
    var selfRotation = m4.multiply(m4.axisRotation(axis,angle2),orbitTranslation);
    
    var rotationX = m4.rotateX(selfRotation, angle4);//this makes the earth a little bit tilted
    
    var earthTranslation = m4.multiply(rotationX,m4.translation([0,canvas.height-500,0]));  

    // create a matrix, that if you want an object to rotate an 
    //"angle2" about this axis, you need this fucking matrix
  
    var visionAngle = 30*0.01*Math.PI;
    var eye=[500*Math.cos(visionAngle),250,500*Math.sin(visionAngle)];
    var target=[0,0,0];
    var up=[0,1,0];
    var Tcamera=m4.inverse(m4.lookAt(eye,target,up));   
    
    var Tmodelview=m4.multiply(earthTranslation,Tcamera);    
     drawEarth(Tmodelview);
    drawAxes(Tcamera);　  
    
    if(1){
      angle1 += 5*0.0001*Math.PI;
      angle2 += 15*0.0001*Math.PI;
      angle3 += 10*0.0001*Math.PI;
    }
    
    
    var eye2=[500*Math.cos(angle1),250,500*Math.sin(angle1)];  
    var target2=[0,0,0];
    var up2=[0,1,0];
    var Tcamera2=m4.inverse(m4.lookAt(eye2,target2,up2));   
    drawSun(Tcamera2);
    
    window.requestAnimationFrame(draw);   
  
  }         
  draw();  

}


