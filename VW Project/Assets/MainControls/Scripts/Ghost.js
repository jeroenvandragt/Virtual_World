#pragma strict

var target : Transform; //the enemy's target
var moveSpeed = 3; //move speed
var rotationSpeed = 3; //speed of turning
var distance:float = 10;
var moveAble:boolean = true;
//var distanceVec3:Vector3 = Vector3(5,5,5); 
 
var myTransform : Transform; //current transform data of this enemy
 
function Awake()
{
    myTransform = transform ; //cache transform data for easy access/preformance
}
 
function Start()
{
 
}
 
function Update () {
    //rotate to look at the player
    myTransform.rotation = Quaternion.Slerp(myTransform.rotation, //Rotation and speed are important here
    Quaternion.LookRotation(target.position - myTransform.position), rotationSpeed*Time.deltaTime);
  
  	if(Vector3.Distance(myTransform.position,target.position) > distance){
  		moveAble = true;
  		if(moveAble == true){
 			myTransform.position += myTransform.forward * moveSpeed * Time.deltaTime;
 		}
 	}else moveAble = false;
}