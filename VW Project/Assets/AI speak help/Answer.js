#pragma strict

public class Answer {
	
	public var text:String; //text that this answer defines
	public var follow:String; //title of next question

	public function Answer(sText:String, sFollow:String){
		text = sText;
		follow = sFollow;
	}
}