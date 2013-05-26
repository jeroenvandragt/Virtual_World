#pragma strict

import System.Collections.Generic;

public class Question {

	public var name:String;
	public var text:String;
	public var answers:List.<Answer> = new List.<Answer>();
	
	static var table:Hashtable = new Hashtable();
	
	public function Question(sName:String, sText:String){
		name = sName;
		text = sText;
		table[name] = this; //*
	}
	
	public function AddAnswer(sText:String, sFollow:String){
		var answer:Answer = new Answer(sText, sFollow);
		answers.Add(answer);
	}
	
	static public function Find(sName:String):Question{
		return table[sName] as Question;
	}
}