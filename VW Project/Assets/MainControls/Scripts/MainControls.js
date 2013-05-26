#pragma strict

public var rotationSpeed:float = 10.0;
private var walkSpeed:float = 0.0;
private var strafeSpeed:float = 0.0;
private var jumpSpeed:float = 275.0;

private var jumpTimer:float = 5;

private var gravity:float = 20.0;
private var moveDirection:Vector3 = Vector3.zero;
private var gVelocity:float = 0;

public var myCamera:GameObject;


function Start () {
	
}

function Jump(){
	rigidbody.AddForce(Vector3.up * jumpSpeed);
}


function Update () {

	this.gameObject.transform.rotation.eulerAngles.y += Input.GetAxis("Mouse X") * rotationSpeed;
	myCamera.gameObject.transform.rotation.eulerAngles.x -= Input.GetAxis("Mouse Y") * rotationSpeed;
	
	if (Input.GetKey("w")){
		walkSpeed ++;
	}
	
	if (Input.GetKey("a")){
		strafeSpeed --;
	}
	
	if (Input.GetKey("d")){
		strafeSpeed ++;
	}
	
	if (Input.GetKey("s")){
		walkSpeed --;
	}
	//if(OnGround()){
		//if (Input.GetKeyDown("space")){
			//Jump();
		//}
	 //}

	
	if (Input.GetKeyDown("l")){
		 Screen.lockCursor = !Screen.lockCursor;
	}	
	
	//Apply gravity
	gVelocity += gravity * Time.deltaTime;
    moveDirection.y -= gVelocity;
	
	//Going forward and backwards
	var forward:Vector3 = this.gameObject.transform.TransformDirection(strafeSpeed, 0, walkSpeed);
	this.gameObject.rigidbody.velocity.z = forward.z;
	this.gameObject.rigidbody.velocity.x = forward.x;
	
	walkSpeed *= 0.9; //<----------------------
	strafeSpeed *= 0.9;
	
}

public function OnGUI(){
	
}
private function OnGround():boolean
{
 	if(Physics.Raycast(gameObject.rigidbody.transform.position,-Vector3.up, 1))
 	{
  	return true;
 	}
	 else return false;
}


//Filestream for save and load