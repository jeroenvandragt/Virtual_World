#pragma strict

var minFlickerSpeed:float = 0.01;
var maxFlickerSpeed:float = 4; 

var minLightIntensity:float = 0.7; 
var maxLightIntensity:float = 1.0;

var flickerLight:Light;


function Update () 
{
	Flicker();
}

function Flicker()
{
	//while (true) 
	//{
		//flickerLight.enabled = true; 
		
		yield WaitForSeconds (Random.Range(minFlickerSpeed, maxFlickerSpeed )); 
		//flickerLight.enabled = false; 
		flickerLight.intensity = Random.Range(minLightIntensity, maxLightIntensity);
		yield WaitForSeconds (Random.Range(minFlickerSpeed, maxFlickerSpeed )); 
	//}
}