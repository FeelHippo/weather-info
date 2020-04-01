// big shout out to Tiffany Rayside for this
// https://codepen.io/tmrDevelops/pen/VYKyge/?editors=0010

export default async function updateTime(curr_time) {
    
    var c = document.getElementById('canv');
    var $ = c.getContext('2d'); 
    var ang = 0;
    var secondsColor = '#ff9900';
    var minutesColor = '#dc3912';
    var hoursColor = '#4684ee';

    var currentDate = curr_time;
    var currentSec = currentDate.getSeconds();
    var currentMillisec = currentDate.getMilliseconds();
    var currentMin = currentDate.getMinutes();
    var currentHr = currentDate.getHours(); 
    
    var g = $.createRadialGradient(250,250,.5,250,250,250);  
    g.addColorStop(0, 'blue');  
    g.addColorStop(1, '#0164C4');  
    $.fillStyle = g;
    $.fillRect( 0, 0, c.width, c.height );
    
    if(currentHr === 0){  //if midnight (00 hours) hour = 12
    currentHr=12;
    }
    else if (currentHr >= 13 ){  //convert military hours at and over 1300 (1pm) to regular hours by subtracting 12. 
        currentHr -=12;
    }
    drawSeconds();
    drawMinutes();
    drawHours();
    var realTime = currentHr + ':' + numPad0( currentMin ) + ':' + numPad0( currentSec );

    /*Here is the selected option of creating the text within the pie canvas elemenet */

    var textPosX = 250 - ( $.measureText(realTime).width / 2 );
    $.shadowColor = 'hsla(180, 100%, 5%, 1)';
    $.shadowBlur = 100;
    $.shadowOffsetX = 12;
    $.shadowOffsetY = 0;
    $.fillStyle =  'hsla(255,255%,255%,.7)';
    $.font = "bold 1.6em 'Noto Serif', serif";
    $.fillText( realTime, textPosX, c.height/2+50);
    
   

    function drawSeconds(){  
        ang = 0.006 * ( ( currentSec * 1000 ) + currentMillisec );
        $.fillStyle = secondsColor;
        $.beginPath();
        $.moveTo( 250, 250 ); 
        $.lineTo( 250, 50 );
        $.arc( 250, 250, 200, calcDeg( 0 ), calcDeg( ang ), false );
        $.lineTo( 250, 250 );
        $.shadowColor = 'hsla(180, 45%, 5%, .4)';
        $.shadowBlur =15;
        $.shadowOffsetX = 15;
        $.shadowOffsetY = 15;
        $.fill();
    } 

    function drawMinutes(){  
        ang = 0.0001 * ( ( currentMin * 60 * 1000 ) + ( currentSec * 1000 ) + currentMillisec );
        $.fillStyle = minutesColor;
        $.beginPath();
        $.moveTo( 250, 250 ); 
        $.lineTo( 250, 100 );
        $.arc( 250, 250, 150, calcDeg( 0 ), calcDeg( ang ), false );
        $.lineTo( 250, 250 );
        $.shadowColor = 'hsla(180, 25%, 5%, .4)';
        $.shadowBlur =15;
        $.shadowOffsetX = 15;
        $.shadowOffsetY = 15;
        $.fill();
    }  

    function drawHours(){  
        ang = 0.000008333 * ( ( currentHr * 60 * 60 * 1000 ) + ( currentMin * 60 * 1000 ) + ( currentSec * 1000 ) + currentMillisec );
        if( ang > 360 ){
            ang -= 360;
        }
        $.fillStyle = hoursColor;
        $.beginPath();
        $.moveTo( 250, 250 ); 
        $.lineTo( 250, 150 );
        $.arc( 250, 250, 100, calcDeg( 0 ), calcDeg( ang ), false );
        $.lineTo( 250, 250 );
        $.shadowColor = 'hsla(180, 45%, 5%, .4)';
        $.shadowBlur =15;
        $.shadowOffsetX = 15;
        $.shadowOffsetY = 15;
        $.fill();
    }  


    function calcDeg( deg ){
        return (Math.PI/180) * (deg - 90);
    }
    //handle zeros for minutes and seconds
    function numPad0( str ){
        var cStr = str.toString();
        if( cStr.length < 2 ){
            str = 0 + cStr;
        }
        return str;
    }
    window.addEventListener('resize', function(){
        c.width = 500;
        c.height = 500;
    });
}

