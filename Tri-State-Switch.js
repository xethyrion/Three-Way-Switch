let tswitch = document.getElementById("tri-switch-background");	//Background of the button.
let tcircle = document.getElementById("tri-switch-circle");		//Circle of the button.
var state = 0;	 //State of the button 0 - 1 - 2
var cpos = 3;	 //Initial position of the button
var cpx = [3,16,30]; //Positions of the button (left, mid, right)
var c = [204, 204, 204]; //RGB
var color_state = [[204,204,204],[218,195,20],[186,15,0]]; //Colors of [state0, state2, state3]
var timeout = false; //Needed for visual animations in pure js.
/* colorlogic(param)
	* param: Array containing the desired color such as [218, 195, 20]
	* returns true if the colors are the same as the desired ones, false otherwise.
*/function colorlogic(dc)
{
	var dif = 10;//Must be higher than speed of color change I sugest leaving it at 10 and speeds could vary between 1-10
					//This is the diference between the desired color and the color to know what numbers we can add/substract
	var spdf = 6;//This could count as speed of color change higher is faster.
	for(var i=0;i<3;i++)
	{
		if(c[i]<dc[i]){if((dc[i]-c[i])>dif){c[i] = c[i] + spdf;}else{c[i]++;}} //RGB INCREASE
		if(c[i]>dc[i]){if((c[i]-dc[i])>dif){c[i] = c[i] - spdf;}else{c[i]--;}} //RGB DECREASE
	}
	if(c[0] == dc[0] && c[1] == dc[1] && c[2] == dc[2])
	{
		return true;
	}
	return false;
}
/* movecircle(param)
	* param: desired position of the circle such as 3,16,30 (left,mid,right)
	* returns true if the position is the same as the desired one false otherwise.
*/function movecircle(dp)
{
	if(cpos<dp){cpos++}if(cpos>dp){cpos--};
	if(cpos==dp){return true;}
	return false;
}
/*Main loop adjusted for javascript's setinterval
*/tswitch.onclick = function()
{
	clearInterval(timeout);
	if(state==2){ state = 0; }else{ state++; }
	var perfect = false;
	timeout = setInterval(function()
	{
		var ok1 = colorlogic(color_state[state]);
		var ok2 = movecircle(cpx[state]);
		tcircle.style.marginLeft = cpos;
		tswitch.style.backgroundColor = "rgb("+c[0]+","+c[1]+","+c[2];
		if(ok1 && ok2)
		{
			perfect = true; 
			clearInterval(timeout)
		}
	},1);
}