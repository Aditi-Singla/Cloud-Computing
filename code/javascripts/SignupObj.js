function SignupObj()
{
	this.Index = "";
	this.Left = "";
	this.Top = "";
	this.Parent = "";
	this.Width = "";
	this.Height = "";
	this.Opacity = "";

	var Object = this;
	Object.filename = "";
	// Initialization

	this.Initialize = function(Index, Left , Top , Parent , Width , Height , Opacity)
	{
		this.Index = Index;
		this.Left = Left;
		this.Top = Top;
		this.Parent = Parent;
		this.Width = Width;
		this.Height = Height;
		this.Opacity = Opacity;
		
		this.Render();

	}

	this.Render = function()
	{
	// Begin User Interface

		Object.SignupPageDiv = 	
					"<div id='Signup_Div"+Object.Index+"' style='position: absolute; top: "+Object.Top+"%; left: "+Object.Left+"%; height: "+Object.Height+"%; width: "+Object.Width+"%; opacity: "+Object.Opacity+"; border: 0px solid #000000;background-color:#b3b3b3; border-radius: 20px 20px 20px 20px; overflow: hidden;box-shadow: 2px 2px 20px #333333;'></div>";

		$( "#"+Object.Parent+"" ).append(Object.SignupPageDiv);
		
		Object.SignupText = "<div id='signuptext' style='color:#4d004d;font-size:1em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:15%;top:10%;width:20%;height:10%;line-height:300%'>Name :</div>";

		$( "#Signup_Div"+Object.Index+"" ).append(Object.SignupText);

		Object.DobText = "<div id='dobtext' style='color:#4d004d;font-size:1em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:15%;top:20%;width:20%;height:10%;line-height:300%'>Date of Birth :</div>";

		$( "#Signup_Div"+Object.Index+"" ).append(Object.DobText);

		Object.GenderText = "<div id='signuptext' style='color:#4d004d;font-size:1em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:15%;top:30%;width:20%;height:10%;line-height:300%'>Gender :</div>";

		$( "#Signup_Div"+Object.Index+"" ).append(Object.GenderText);

		Object.EmailIdText = "<div id='signuptext' style='color:#4d004d;font-size:1em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:15%;top:40%;width:20%;height:10%;line-height:300%'>Email Id :</div>";

		$( "#Signup_Div"+Object.Index+"" ).append(Object.EmailIdText);

		Object.PasswordText = "<div id='passwordtext' style='color:#4d004d;font-size:1em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:15%;top:50%;width:20%;height:10%;line-height:300%'>Password :</div>";

		$( "#Signup_Div"+Object.Index+"" ).append(Object.PasswordText);

		Object.ProfilePicText = "<div id='signuptext' style='color:#4d004d;font-size:1em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:15%;top:60%;width:22%;height:10%;line-height:300%'>Profile Picture :</div>";

		$( "#Signup_Div"+Object.Index+"" ).append(Object.ProfilePicText);

		Object.UserNameInput = "<input type='text' id='UserNameInput' spellcheck='false' placeholder='Enter name'/>";
		$( "#Signup_Div"+Object.Index+"" ).append(Object.UserNameInput);
		$( "#UserNameInput" ).css( {"position":"absolute","top":"10%","left":"45%", "width":"40%" , "height":"8%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		$( "#UserNameInput" ).focus();

		Object.DobInput = "<input type='date' id='DobInput' placeholder='Enter Date of Birth'/>";
		$( "#Signup_Div"+Object.Index+"" ).append(Object.DobInput);
		$( "#DobInput" ).css( {"position":"absolute","top":"20%","left":"45%", "width":"40%" , "height":"8%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		Object.GenderInput = "<input type='text' id='GenderInput' spellcheck='false' placeholder='F/M'/>";
		$( "#Signup_Div"+Object.Index+"" ).append(Object.GenderInput);
		$( "#GenderInput" ).css( {"position":"absolute","top":"30%","left":"45%", "width":"40%" , "height":"8%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		Object.EmailIdInput = "<input type='email' id='EmailIdInput' spellcheck='false' placeholder='Enter email id'/>";
		$( "#Signup_Div"+Object.Index+"" ).append(Object.EmailIdInput);
		$( "#EmailIdInput" ).css( {"position":"absolute","top":"40%","left":"45%", "width":"40%" , "height":"8%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		Object.PasswordInput = "<input type='password' id='PasswordInput' spellcheck='false' placeholder='Enter Password'/>";
		$( "#Signup_Div"+Object.Index+"" ).append(Object.PasswordInput);
		$( "#PasswordInput" ).css( {"position":"absolute","top":"50%","left":"45%", "width":"40%" , "height":"8%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		Object.ProfilePicInput = "<input type='file' id='ProfilePicInput'/>";
		$( "#Signup_Div"+Object.Index+"" ).append(Object.ProfilePicInput);
		$( "#ProfilePicInput" ).css( {"position":"absolute","top":"60%","left":"45%", "width":"40%" , "height":"8%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});
		
		// $( "#ProfilePicInput").on('change',function(){
		// 	var elt = document.getElementById("ProfilePicInput");
		// 	encodeImageFileAsURL(elt);
		// });

		Object.GoButton = "<input type='button' id='GoButton' value='Signup'/>";
		$( "#Signup_Div"+Object.Index+"" ).append(Object.GoButton);
		$( "#GoButton" ).css( {"position":"absolute","top":"75%","left":"35%","height":"10%","width":"30%","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","color":"#FFFFFF","font-size":"1em","border-radius":"5px", "box-shadow":"2px 2px 5px #000000"});

		
	// Begin Event Handlers

		$( "#GoButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#0B197D","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
		$( "#GoButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

		$( "#GoButton" ).on('click',function()  //edit
		{ 
			var uname = $("#UserNameInput").val();
			var dob1 = $("#DobInput").val();
			var gender1 = $("#GenderInput").val();
			var emailid = $("#EmailIdInput").val();
			var passw = $("#PasswordInput").val();
			// var pp = $("#ProfilePicInput").val();
			var pp = Object.filename;
			console.log(pp);
			if (uname != "" && passw != "" && dob1 != "" && gender1 != "" && emailid != "" && pp != "")
			{
				//Pass the input to the server here
				$.post(server_url+"/register",
			    {
			        name : uname,
			        dob : dob1,
			        gender : gender1,
			        user_name : emailid,
			        password : passw,
			        image_b64 : pp
			    },
			    function(data, status){
			        console.log("Data: " + data + "\nStatus: " + status);

			        if (data.success === true)
			        {
				        token = data.token;

				        $("#LoginDiv").empty();
				        acctPage.Initialize("acctpage1", 0 , 0 , "LoginDiv" , 100 , 100 , 1, data);
				    }
				    else
				    	alert(data.message);
			    });
			}

			else if (uname == "")
			{
				alert("Username Cannot be Left Blank");
				$("#UserNameInput").focus();
			}
			else if (dob1 == "")
			{
				alert("Date of Birth Cannot be Left Blank");
				$("#DobInput").focus();
			}
			else if (gender1 == "")
			{
				alert("Gender Cannot be Left Blank");
				$("#GenderInput").focus();
			}
			else if (emailid == "")
			{
				alert("EmailId Cannot be Left Blank");
				$("#EmailIdInput").focus();
			}
			else if (pp == "")
			{
				alert("Profile Pic Link Cannot be Left Blank");
				$("#ProfilePicInput").focus();
			}
			else
			{
				alert("Password cannot be left blank");
				$("#PasswordInput").focus();
			}
		});

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
		
		$( "#ProfilePicInput").on('change',function(){
			var elt = document.getElementById("ProfilePicInput");
			encodeImageFileAsURL(elt);
			console.log(Object.filename);
		});
	}
}
