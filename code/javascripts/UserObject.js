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
	this.isEditable = false;
	
	var Object = this;
	Object.filename = "";

	this.Initialize = function(Index, Left , Top , Parent , Width , Height , Opacity, UserData, isEditable)
	{
		this.Index = Index;
		this.Left = Left;
		this.Top = Top;
		this.Parent = Parent;
		this.Width = Width;
		this.Height = Height;
		this.Opacity = Opacity;
		this.UserData = UserData;
		this.isEditable = isEditable;

		this.Render();
	}

	this.Render = function()
	{
		Object.UserDiv = "<div id='User_Div"+Object.Index+"' style='position: absolute; top: "+Object.Top+"%; left: "+Object.Left+"%; height: "+Object.Height+"%; width: "+Object.Width+"%; opacity: "+Object.Opacity+"; border: 0px solid #000000;background-color:#b3b3b3; border-radius: 20px 20px 20px 20px; overflow: hidden;box-shadow: 2px 2px 20px #333333;'></div>";

		$( "#"+Object.Parent+"" ).append(Object.UserDiv);

		Object.TitleText = "<div id='titletext"+Object.Index+"' style='color:#4d004d;font-size:1.5em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:40%;top:2%;width:40%;height:7%;line-height:300%'>" + this.UserData.profile.name +" </div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.PPText);		

		$.get(Object.UserData.profile.pic_link,
			function(data, status){
				console.log("Data: " + data + "\nStatus: " + status);

				Object.PPText = "<img id='Image"+Object.Index+"' src="+ Object.UserData.profile.pic_link +">";
				$( "#User_Div"+Object.Index+"" ).append(Object.PPText);

				$( "#Image" + Object.Index).attr("src",data);
				$( "#Image" + Object.Index).css({"visibility":"visible", "position":"absolute", "top":"2%", "left":"5%", "width":"30%", "height":"25%"});

			});


		Object.DobText = "<div id='Dobtext"+Object.Index+"' style='color:#4d004d;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:40%;top:9%;width:40%;height:7%;line-height:300%'> " + this.UserData.profile.dob +" </div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.DobText);

		Object.GenderText = "<div id='Gendertext"+Object.Index+"' style='color:#4d004d;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:40%;top:16%;width:40%;height:7%;line-height:300%'> " + this.UserData.profile.gender +" </div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.GenderText);

		Object.EmailIdText = "<div id='EmailIdtext"+Object.Index+"' style='color:#4d004d;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:40%;top:23%;width:40%;height:7%;line-height:300%'> " + this.UserData.user_name +" </div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.EmailIdText);

		Object.PostsText = "<div id='Poststext"+Object.Index+"' style='color:#4d004d;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:4%;top:30%;width:40%;height:7%;line-height:300%'> Posts </div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.PostsText);

		Object.PostsListText = "<div id='PostsListtext"+Object.Index+"' style='position: absolute; text-align:left; left:6%;top:40%;width:80%;height:22%,overflow: scroll'></div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.PostsListText);

		var totalStr1 = "";
		for (var i = 0; i < this.UserData.posts.length; i++) {
			var p = this.UserData.posts[i];
			console.log(p);
			if (p.text != ""){
				var str = "<b>"+p.date+"</b> : "+p.text+" <br/>";
				totalStr1 +=  str;
			}
		}
		console.log(totalStr1);
		$( "#PostsListtext"+Object.Index+"" ).append(totalStr1);

		Object.UploadsText = "<div id='Uploadstext"+Object.Index+"' style='color:#4d004d;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:4%;top:65%;width:40%;height:7%;line-height:300%'> Uploads </div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.UploadsText);

		Object.UploadsListText = "<div id='UploadsListtext"+Object.Index+"' style='position: absolute; left:4%;top:75%;width:40%;height:22%,overflow: scroll'></div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.UploadsListText);

		var totalStr = "";;
		for (var i = 0; i < this.UserData.posts.length; i++) {
			var p = this.UserData.posts[i];
			if (p.text == ""){
				var str = "<td><img src = '"+p.file+"'></td>";
				totalStr +=  str;
			}
		}
		Object.UnorderedList = "<table class='images'>" + totalStr + "</table>";
		$( "#UploadsListtext"+Object.Index+"" ).append(Object.UnorderedList);

		
		function encodeImageFileAsURL(element) {
			var file = element.files[0];
			var reader = new FileReader();
			reader.onloadend = function() {
				console.log(reader.result);
				Object.filename = reader.result;
				// return reader.result;
			}
			reader.readAsDataURL(file);	  
		}
		
		if (Object.isEditable){
			Object.AddPostText = "<input type='text' id='PostTextInput' spellcheck='false' placeholder='Add post'/>";
			$( "#User_Div"+Object.Index+"" ).append(Object.AddPostText);
			$( "#PostTextInput" ).css( {"position":"absolute","top":"33%","left":"30%", "width":"40%" , "height":"5%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});
			
			Object.PostButton = "<input type='button' id='PostButton' value='Post' />";
			$( "#User_Div"+Object.Index+"" ).append(Object.PostButton);
			$( "#PostButton" ).css( {"position":"absolute","top":"33%","left":"75%", "width":"20%" , "height":"5%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#800080","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});	

			$( "#PostButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#4d004d","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
			$( "#PostButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "#800080","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

			$( "#PostButton" ).on('click',function()  //edit
			{ 
				console.log("called post button");
				var post = $("#PostTextInput").val();
				var today = new Date();
				var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
				if (post != "")
				{
					//Pass the input to the server here
					$.post(server_url+"/add_post",
					{
						token: Object.UserData.token,
						user_name: Object.UserData.user_name,
						new_post: {
									"date": date,
									"text": post
								  }
					},
					function(data, status){
					
						(Object.UserData.posts).push(
									{
										date: date,
										text: post,
										file: ""
									}
								);
						alert("Posted successfully!");

					});
				}
				else
				{
					alert("Write a post to be posted!");
					$("#PostTextInput").focus();
				}
			});
			
			Object.AddUploadText = "<input type='file' id='UploadTextInput' spellcheck='false' placeholder='Add upload link'/>";
			$( "#User_Div"+Object.Index+"" ).append(Object.AddUploadText);
			$( "#UploadTextInput" ).css( {"position":"absolute","top":"68%","left":"30%", "width":"40%" , "height":"5%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});
			
			Object.UploadButton = "<input type='button' id='UploadButton' value='Upload' />";
			$( "#User_Div"+Object.Index+"" ).append(Object.UploadButton);
			$( "#UploadButton" ).css( {"position":"absolute","top":"68%","left":"75%", "width":"20%" , "height":"5%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#800080","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});	

			$( "#UploadButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#4d004d","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
			$( "#UploadButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "#800080","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

			$( "#UploadButton" ).on('click',function()  //edit
			{ 
				var today = new Date();
				var upload = Object.filename;
				var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
				if (upload != "")
				{
					//Pass the input to the server here
					$.post(server_url+"/upload_file",
				    {
						token: Object.UserData.token,
						user_name: Object.UserData.user_name,
						count: Object.UserData.posts.length,
						new_post: {
								"date": date,
								"file": upload
							      }
				    },
				    function(data, status){
				        
				        if (data.success === true)
						{
							token = data.token;
							(Object.UserData.posts).push(data.new_post);
							alert("Uploaded successfully!");

						}
						else
							alert(data.message);

				    });
				}
				else
				{
					alert("Upload something!");
				}
			});
			
			
			$( "#UploadTextInput").on('change',function(){
				var elt = document.getElementById("UploadTextInput");
				encodeImageFileAsURL(elt);
				console.log(Object.filename);
			});
		}
		else{
			Object.AddMessageText = "<input type='text' id='MessageTextInput' spellcheck='false' placeholder='Type Message'/>";
			$( "#User_Div"+Object.Index+"" ).append(Object.AddMessageText);
			$( "#MessageTextInput" ).css( {"position":"absolute","top":"33%","left":"30%", "width":"40%" , "height":"5%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});
			
			Object.MessageButton = "<input type='button' id='MessageButton' value='Send' />";
			$( "#User_Div"+Object.Index+"" ).append(Object.MessageButton);
			$( "#MessageButton" ).css( {"position":"absolute","top":"33%","left":"75%", "width":"20%" , "height":"5%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#800080","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});	

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
					$.message(server_url+"/send_message",
					{
						token: Object.UserData.token,
						user_name: Object.UserData.user_name,
						name: Object.UserData.profile.name,
						date: date1,
						text: message
					},
					function(data, status){

						alert("message sent successfully!");

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
}