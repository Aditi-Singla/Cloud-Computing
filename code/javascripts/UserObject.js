function UserObject()
{
	this.Index = "";
	this.Left = "";
	this.Top = "";
	this.Parent = "";
	this.Width = "";
	this.Height = "";
	this.Opacity = "";
	this.UserData = {};
	
	var Object = this;

	this.Initialize = function(Index, Left , Top , Parent , Width , Height , Opacity, UserData)
	{
		this.Index = Index;
		this.Left = Left;
		this.Top = Top;
		this.Parent = Parent;
		this.Width = Width;
		this.Height = Height;
		this.Opacity = Opacity;
		this.UserData = UserData;

		this.Render();
	}

	this.Render = function()
	{
		Object.UserDiv = "<div id='User_Div"+Object.Index+"' style='position: absolute; top: "+Object.Top+"%; left: "+Object.Left+"%; height: "+Object.Height+"%; width: "+Object.Width+"%; opacity: "+Object.Opacity+"; border: 0px solid #000000;background-color:#b3b3b3; border-radius: 50px 0px 50px 0px; overflow: hidden;box-shadow: 2px 2px 20px #333333;'></div>";

		$( "#"+Object.Parent+"" ).append(Object.UserDiv);

		Object.TitleText = "<div id='titletext"+Object.Index+"' style='color:#4d004d;font-size:1.5em;font-family:Garamond;font-weight:bold;text-align:center;position: absolute; left:35%;top:2%;width:30%;height:7%;line-height:200%'>" + this.UserData.profile.name +" </div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.TitleText);

		Object.PPText = "<div  id='pptext"+Object.Index + "'style='background-image:url('"+this.UserData.profile.pic_link+"') ; background color:#FFFFFF;position: absolute; left:5%;top:2%;width:30%;height:7%;line-height:200%; height:75px;width:20%;float:left;margin:0px 25px 0px 5px;'></div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.PPText);		

		Object.DobText = "<div id='Dobtext"+Object.Index+"' style='color:#4d004d;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:40%;top:10%;width:40%;height:7%;line-height:300%'> " + this.UserData.profile.dob +" </div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.DobText);

		Object.GenderText = "<div id='Gendertext"+Object.Index+"' style='color:#4d004d;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:40%;top:20%;width:40%;height:7%;line-height:300%'> " + this.UserData.profile.gender +" </div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.GenderText);

		Object.EmailIdText = "<div id='EmailIdtext"+Object.Index+"' style='color:#4d004d;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:40%;top:30%;width:40%;height:7%;line-height:300%'> " + this.UserData.user_name +" </div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.EmailIdText);

		Object.PostsText = "<div id='Poststext"+Object.Index+"' style='color:#4d004d;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:4%;top:40%;width:40%;height:7%;line-height:300%'> Posts </div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.PostsText);

		Object.PostsListText = "<div id='PostsListtext"+Object.Index+"' style='position: absolute; left:4%;top:50%;width:40%;height:17%'></div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.PostsListText);

		var totalStr1 = "";;
		for (var i = 0; i < this.UserData.posts.length; i++) {
			var p = this.UserData.posts[i];
			if (p.text != ""){
				var str = "<b>"+p.date+"</b> : "+p.text+"\n";
				totalStr1 +=  str;
			}
		}
		Object.l = "<p>" + totalStr1 + "</p>";
		$( "PostsListtext"+Object.Index+"" ).append(Object.l);

		
		Object.UploadsText = "<div id='Uploadstext"+Object.Index+"' style='color:#4d004d;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:4%;top:70%;width:40%;height:7%;line-height:300%'> Uploads </div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.UploadsText);

		Object.UploadsListText = "<div id='UploadsListtext"+Object.Index+"' style='position: absolute; left:4%;top:80%;width:40%;height:17%'></div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.UploadsListText);

		var totalStr = "";;
		for (var i = 0; i < this.UserData.posts.length; i++) {
			var p = this.UserData.posts[i];
			if (p.text == ""){
				var str = "<li><img src = '"+p.file+"'></li>";
				totalStr +=  str;
			}
		}
		Object.UnorderedList = "<ul class='images'>" + totalStr + "</ul>";
		$( "#UploadsListtext"+Object.Index+"" ).append(Object.UnorderedList);
	}
}