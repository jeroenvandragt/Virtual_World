#pragma strict

import System.IO;
import System.Runtime.Serialization;

private var inventoryHeight:float = 90.0;
private var inventoryPlace1:float = 299;
private var inventoryPlace2:float = inventoryPlace1 + 128;
private var inventoryPlace3:float = inventoryPlace2 + 128;
private var inventoryPlace4:float = inventoryPlace3 + 128;
private var inventoryPlace5:float = inventoryPlace4 + 128;
private var inventoryPlace6:float = inventoryPlace5 + 128;

var pickUpArray=["Key", "Bed", "pCube6", "Candle"];


//==============================================TEXTURES==========================================================//
public var keyTexture:Texture;
public var boxTexture:Texture;


//==============================================RAYCAST===========================================================//
private var hit:RaycastHit;
public var hitDistance:float = 20;
public var myCamera:Camera;


//==============================================PICKUPS===========================================================//
public var Key:GameObject;
public var Bed:GameObject;
public var Door:GameObject;
public var Candle:GameObject;

public var WallDoor:GameObject;


//==============================================PICKUP BOOLEANS===================================================//
private var pickUpKey:boolean = false;
private var pickUpBox:boolean = false;

function Start () {
	WallDoor.animation.Stop();
}

function Update () {
	if(Input.GetKey("e"))
	{
		PickUp();
	}
	
}

function OnGUI()
{
	if(pickUpKey == true)
	{
		 GUI.DrawTexture(Rect(inventoryPlace1, Screen.height - inventoryHeight, 128,128), keyTexture, ScaleMode.ScaleToFit, true, 1.0f);
	}
  	GUI.Box(new Rect(inventoryPlace1,Screen.height - inventoryHeight,128,inventoryHeight), "");
	if(pickUpBox == true)
	{
		 GUI.DrawTexture(Rect(inventoryPlace2, Screen.height - inventoryHeight, 128,128), boxTexture, ScaleMode.ScaleToFit, true, 1.0f);
	}
		
	GUI.Box(new Rect(inventoryPlace2,Screen.height - inventoryHeight,128,inventoryHeight), "");

		
	GUI.Box(new Rect(inventoryPlace3,Screen.height - inventoryHeight,128,inventoryHeight), "");

		
	GUI.Box(new Rect(inventoryPlace4,Screen.height - inventoryHeight,128,inventoryHeight), "");
	
		
	GUI.Box(new Rect(inventoryPlace5,Screen.height - inventoryHeight,128,inventoryHeight), "");

		
	GUI.Box(new Rect(inventoryPlace6,Screen.height - inventoryHeight,128,inventoryHeight), "");
	
}

function PickUp(){
	var ray:Ray = myCamera.ScreenPointToRay(Input.mousePosition);
	var hitInfo:RaycastHit;
	if(Physics.Raycast(ray, hitInfo, hitDistance)){
		if(hitInfo.collider.gameObject.name == pickUpArray[0]){
			print("Destroy key");
			Destroy(Key);
			pickUpKey = true;
		}
		if(hitInfo.collider.gameObject.name == pickUpArray[1]){
			print("Destroy bed");
			Destroy(Bed);
			pickUpBox = true;
		}
		if(hitInfo.collider.gameObject == Door){
			print("Open door");
			if(pickUpKey)
			{
				WallDoor.animation.Play();
				print("test door");
				pickUpKey = false;
			}	
		}
		if(hitInfo.collider.gameObject.name == pickUpArray[3]){
			Destroy(Candle);
		}										
		
		

	}
}
