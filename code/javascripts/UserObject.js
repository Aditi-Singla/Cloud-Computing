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
		Object.UserDiv = "<div id='User_Div"+Object.Index+"' style='position: absolute; top: "+Object.Top+"%; left: "+Object.Left+"%; height: "+Object.Height+"%; width: "+Object.Width+"%; opacity: "+Object.Opacity+"; border: 0px solid #000000;background-color:#b3b3b3; border-radius: 50px 0px 50px 0px; overflow: hidden;box-shadow: 2px 2px 20px #333333;'></div>";

		$( "#"+Object.Parent+"" ).append(Object.UserDiv);

		Object.TitleText = "<div id='titletext"+Object.Index+"' style='color:#4d004d;font-size:1.5em;font-family:Garamond;font-weight:bold;text-align:center;position: absolute; left:35%;top:2%;width:30%;height:7%;line-height:200%'>" + this.UserData.profile.name +" </div>";

		$( "#User_Div"+Object.Index+"" ).append(Object.PPText);		

		$.get(Object.UserData.profile.pic_link,
		    function(data, status){
		        console.log("Data: " + data + "\nStatus: " + status);

		        Object.PPText = "<img id='Image"+Object.Index+"' src="+ Object.UserData.profile.pic_link +">";
		        $( "#User_Div"+Object.Index+"" ).append(Object.PPText);
		        
			    $( "#Image" + Object.Index).attr("src",data);
				$( "#Image" + Object.Index).css({"visibility":"visible", "position":"absolute", "top":"2%", "left":"5%", "width":"30%", "height":"7%"});
			    
		    });


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

		
		function encodeImageFileAsURL(element) {
		  var file = element.files[0];
		  var reader = new FileReader();
		  reader.onloadend = function() {
		    // $.post(server_url+"/upload",
		    // {
		    //     content: reader.result
		    //     // path: $( "#UploadFile" +Object.Index+"").val()
		    //     // path: element.files[0]
		    // },
		    // function(data, status){
		    //     console.log("Data: " + data + "\nStatus: " + status);
		    // });
		    console.log(reader.result);
		    Object.filename = reader.result;
		    // return reader.result;
		  }
		  reader.readAsDataURL(file);	  
		}
		
		if (isEditable){
			Object.AddPostText = "<input type='text' id='PostTextInput' spellcheck='false' placeholder='Add post'/>";
			$( "#User_Div"+Object.Index+"" ).append(Object.AddPostText);
			$( "#PostTextInput" ).css( {"position":"absolute","top":"40%","left":"20%", "width":"40%" , "height":"10%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});
			
			Object.PostButton = "<input type='button' id='PostButton' value='Post' />";
			$( "#User_Div"+Object.Index+"" ).append(Object.PostButton);
			$( "#PostButton" ).css( {"position":"absolute","top":"40%","left":"70%", "width":"20%" , "height":"10%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#800080","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});	

			$( "#PostButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#4d004d","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
			$( "#PostButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "#800080","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

			$( "#PostButton" ).on('click',function()  //edit
			{ 
				var post = $("#PostTextInput").val();
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
				        
				        (Object.UserData.posts).append(
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
			$( "#UploadTextInput" ).css( {"position":"absolute","top":"70%","left":"20%", "width":"40%" , "height":"10%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});
			
			Object.UploadButton = "<input type='button' id='UploadButton' value='Upload' />";
			$( "#User_Div"+Object.Index+"" ).append(Object.UploadButton);
			$( "#UploadButton" ).css( {"position":"absolute","top":"70%","left":"70%", "width":"20%" , "height":"10%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#800080","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});	

			$( "#UploadButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#4d004d","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
			$( "#UploadButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "#800080","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

			$( "#UploadButton" ).on('click',function()  //edit
			{ 
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
							(Object.UserData.posts).append(data.new_post);
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
	}
}