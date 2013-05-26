#pragma strict

private var startTime : float;
var textTime : String;

//First define two variables. One private and one public variable. Set the first variable to be a float. 
//Use for textTime a string. 
function Start() {
startTime = Time.time;
}

function OnGUI () {
var guiTime = Time.time - startTime; 

//The gui-Time is the difference between the actual time and the start time.
var minutes : int = guiTime / 60;
var seconds : int = guiTime % 60;
var fraction : int = (guiTime * 100) % 100;

 textTime = String.Format ("{0:00}:{1:00}:{2:00}", minutes, seconds, fraction); 
//text.Time is the time that will be displayed.
 GetComponent(GUIText).text = textTime;

}
	
	


//public var pauseGame:boolean = false;

//if(pauseGame == false){
	//this.gameObject.transform.rotation.eulerAngles.y += Input.GetAxis("Mouse X") * rotationSpeed;
	//myCamera.gameObject.transform.rotation.eulerAngles.x -= Input.GetAxis("Mouse Y") * rotationSpeed;
	
	//if(Input.GetKeyDown("e") && !pauseGame){
	//	pauseGame = true;
	//}else if(Input.GetKeyDown("e") && pauseGame){
	//	pauseGame = false;
	//}