#pragma strict

import System.Xml;

var question:Question;
var follow:String;
var choice:int = 0; //choose first answer

function Start () {
	var filename:String = Application.dataPath + "/dialog.xml";
	var reader:XmlReader = XmlReader.Create(filename);
	
	var firstQuestion:Question;
	
	while (reader.Read()) {
		if(reader.IsStartElement("question")){
			var name:String = (reader.GetAttribute("name")); // return question name
			var text:String = (reader.ReadInnerXml()); // return question text
			question = new Question(name, text); //create new question
			if(firstQuestion == null) firstQuestion = question; // remember firstQuestion
		}
		if(reader.IsStartElement("answer")){
			follow = reader.GetAttribute("follow"); //return answer followup
			text = reader.ReadInnerXml(); //return answer text
			question.AddAnswer(text, follow); // create a new answer, and add to previous question
		}
	}
	
	reader.Close(); //close XML file
	
	//get first question
	question = firstQuestion;
//	print(question.text);
//	
//	//get answers
//	print("ANSWERS");
	for(var i=0; i<question.answers.Count; i++){
		var answer:Answer = question.answers[i];
		print(i + ": " + answer.text);
	}
}

function OnGUI () {
    //GUI.Box (Rect (Screen.width/2 -200, 50, 500, 40), question.text);
    

	if (GUI.Button (Rect (Screen.width/2 - 250,Screen.height/2 - 100,600,100), question.answers[0].text)){
    		follow = question.answers[0].follow; //get follow up
    		if(follow == "ENDING") return;
			question = Question.Find(follow);
    }
}