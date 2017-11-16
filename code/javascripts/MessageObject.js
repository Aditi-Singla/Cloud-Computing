function MessageObject()
{
	this.Index = "";
	this.Left = "";
	this.Top = "";
	this.Parent = "";
	this.Width = "";
	this.Height = "";
	this.Opacity = "";
	this.UserData = {};
	this.UserName = "";
	this.Name = "";
	
	var Object = this;
	
	this.Initialize = function(Index, Left , Top , Parent , Width , Height , Opacity, UserData, Username, Name)
	{
		this.Index = Index;
		this.Left = Left;
		this.Top = Top;
		this.Parent = Parent;
		this.Width = Width;
		this.Height = Height;
		this.Opacity = Opacity;
		this.UserData = UserData;
		this.UserName = Username;
		this.Name = Name;
		this.Render();
	}

	this.Render = function()
	{
		Object.UserDiv = "<div id='User_Div"+Object.Index+"' style='position: absolute; top: "+Object.Top+"%; left: "+Object.Left+"%; height: "+Object.Height+"%; width: "+Object.Width+"%; opacity: "+Object.Opacity+"; border: 0px solid #000000;background-color:#b3b3b3; border-radius: 20px 20px 20px 20px; overflow: hidden;box-shadow: 2px 2px 20px #333333;'></div>";

		$( "#"+Object.Parent+"" ).append(Object.UserDiv);

		Object.NameText = "<div id='NameText"+Object.Index+"' style='position: absolute; text-align:left; left:6%;top:2%;width:80%;height:10%'>"+this.Name+"</div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.NameText);
		
		Object.MessagesText = "<div id='MessagesText"+Object.Index+"' style='position: absolute; text-align:left; left:6%;top:15%;width:80%;height:60%;overflow: scroll'></div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.MessagesText);

		var totalStr1 = "";
		for (var i = 0; (this.UserName+"" in this.UserData.chats) && i < this.UserData.chats[this.UserName+""].length; i++) {
			var p = (this.UserData.chats[this.UserName+""])[i];
			console.log(p);
			var str = "<b>"+p.date+"</b> : "+"<b>"+p.sender_uname+"</b> : "+p.text+" <br/>";
			totalStr1 +=  str;
		}
		console.log(totalStr1);
		$( "#MessagesText"+Object.Index+"" ).append(totalStr1);

		Object.AddMessageText = "<input type='text' id='MessageTextInput' spellcheck='false' placeholder='Type Message here'/>";
		$( "#User_Div"+Object.Index+"" ).append(Object.AddMessageText);
		$( "#MessageTextInput" ).css( {"position":"absolute","top":"75%","left":"10%", "width":"70%" , "height":"20%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});
		
		Object.MessageButton = "<input type='button' id='MessageButton' value='Send' />";
		$( "#User_Div"+Object.Index+"" ).append(Object.MessageButton);
		$( "#MessageButton" ).css( {"position":"absolute","top":"75%","left":"85%", "width":"10%" , "height":"20%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#800080","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});	

		$( "#MessageButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#4d004d","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
		$( "#MessageButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "#800080","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

		$( "#MessageButton" ).on('click',function()  //edit
		{ 
			var message = $("#MessageTextInput").val();
			var today = new Date();
			var date1 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			if (message != "")
			{
				//Pass the input to the server here
				$.post(server_url+"/send_message",
				{
					token: Object.UserData.token,
					sender_uname: Object.UserData.user_name,
					sender_name: Object.UserData.profile.name,
					receiver_uname: Object.UserName,
					receiver_name: Object.Name,
					date: date1,
					text: message
				},
				function(data, status){

					if (data.success === true)
			        {
				        token = data.token;
				        Object.UserData.chats = data.sender_chats;
						alert("message sent successfully!");
						var totalStr1 = "";
						for (var i = 0; (Object.UserName+"" in Object.UserData.chats) && i < Object.UserData.chats[Object.UserName+""].length; i++) {
							var p = (Object.UserData.chats[Object.UserName+""])[i];
							console.log(p);
							var str = "<b>"+p.date+"</b> : "+"<b>"+p.sender_uname+"</b> : "+p.text+" <br/>";
							totalStr1 +=  str;
						}
						$( "#MessagesText"+Object.Index+"" ).empty();
						// console.log(totalStr1 + " : NEW ");
						$( "#MessagesText"+Object.Index+"" ).append(totalStr1);
						$( "#MessageTextInput" ).val("");
				    }
				    else
				   	{
				   		alert("message send failed!");
				   	}
				});
			}
			else
			{
				alert("Write a message to be sent!");
				$("#MessageTextInput").focus();
			}
		});
	}
}