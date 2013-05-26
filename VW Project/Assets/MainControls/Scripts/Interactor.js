#pragma strict

//==============================================RAYCAST===========================================================//
private var hit:RaycastHit;
public var hitDistance:float = 20;
public var myCamera:Camera;

private var interact:boolean = false;

function Update () 
{
	InteractAttempt();
}

function InteractAttempt()
{
	var ray:Ray = myCamera.ScreenPointToRay(Input.mousePosition);
	var hitInfo:RaycastHit;
	if(Physics.Raycast(ray, hitInfo, hitDistance))
	{
		if(hitInfo.collider.gameObject.tag == "Interactable")
		{
			interact = true;
		}		
		else interact = false;		
	}
}

function OnGUI()
{
	if(interact)
	{
		GUI.Label(new Rect(Screen.width/2 + 10,Screen.height/2 + 10, 100, 100), "Press E to interact");
	}
}