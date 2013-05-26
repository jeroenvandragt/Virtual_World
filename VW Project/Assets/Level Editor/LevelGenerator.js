import System.IO;

var candle:GameObject;
var table:GameObject;
var wallZ:GameObject;
var wallX:GameObject;

function Start () {

	var streamReader:StreamReader = new StreamReader(Application.dataPath + "/LevelEditorScript.txt");
	var script:String = streamReader.ReadToEnd();
	
	//eval(script); //if want to create code from string
	//resource load
	
	var scriptLine:String[] = script.Split("\n"[0]);
	for (var i=0; i<scriptLine.Length; i++) {
		var line:String = scriptLine[i];
		if (line == "") continue;
		var words:String[] = line.Split(" "[0]);
		
		var item:String = words[0];
		var x:int = int.Parse(words[1]);
		var y:int = int.Parse(words[2]);
		var z:int = int.Parse(words[3]);
		
		if (item != "") CreatePrefab(item, x, y, z);
	}
}
function CreatePrefab(item:String, x:float, y:float, z:float) {
	var pos:Vector3 = new Vector3(x, y, z);
	var instance : GameObject = Instantiate(Resources.Load(item, GameObject));
	instance.transform.position = pos;
}