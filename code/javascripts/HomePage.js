function HomePageOne()
{
	this.Index = "";
	this.Left = "";
	this.Top = "";
	this.Parent = "";
	this.Width = "";
	this.Height = "";
	this.Opacity = "";
	this.AssociatedData = {};
	this.uo = new UserObject();
	this.co = new ComplaintObject();


	var Object = this;

	this.edit = function()
	{
		document.getElementById( "WelcomeName_Div"+Object.Index + "").innerHTML = "Welcome: "+Object.AssociatedData.profile.name+" ";
	}

	// Initialization

	this.Initialize = function(Index, Left , Top , Parent , Width , Height , Opacity, AssociatedData)
	{
		this.Index = Index;
		this.Left = Left;
		this.Top = Top;
		this.Parent = Parent;
		this.Width = Width;
		this.Height = Height;
		this.Opacity = Opacity;
		this.AssociatedData = AssociatedData;
		this.Render();

	}

	this.Render = function()
	{

	// Begin User Interface

		Object.AccountPageDiv = 	
					"<div id='AccountPage"+Object.Index+"' style='position: absolute; top: "+Object.Top+"%; left: "+Object.Left+"%; height: "+Object.Height+"%; width: "+Object.Width+"%; opacity: "+Object.Opacity+"; border: 0px solid #000000; border-radius: 0px 0px 0px 0px; overflow: hidden;'></div>";
	
		$( "#"+Object.Parent+"" ).append(Object.AccountPageDiv);
		
		Object.FunctionDiv = 	
					"<div id='Function_Div"+Object.Index+"' style='position: absolute; top: 40px; left: 0px; bottom: 0px; width: 25%; opacity: "+Object.Opacity+"; border: 2px solid rgb(0,0,255);background-color:#b3b3b3; border-radius: 0px 0px 0px 0px; overflow: hidden;'></div>";

		$( "#AccountPage"+Object.Index+"" ).append(Object.FunctionDiv);

		Object.WelcomeDiv =
					"<div id='Welcome_Div"+Object.Index+"' style='position: absolute; top: 0px; left: 0px; height: 40px; width: 100%; opacity: "+Object.Opacity+"; border: 2px solid #4d004d;background-color:#4d004d; border-radius: 0px 0px 0px 0px; overflow: hidden;'></div>"; 

		$( "#AccountPage"+Object.Index+"" ).append(Object.WelcomeDiv);

		Object.WorkAreaDiv = 	
					"<div id='WorkArea_Div"+Object.Index+"' style='position: absolute; top: 43px; left: 25%; bottom: 0px; width: 75%; opacity: "+Object.Opacity+"; border: 2px solid rgb(0,0,255);background-color:transparent; border-radius: 0px 0px 0px 0px; overflow: scroll;'></div>";

		$( "#AccountPage"+Object.Index+"" ).append(Object.WorkAreaDiv);
		Object.uo.Initialize("ViewDO", 10 , 10 , "WorkArea_Div" + Object.Index , 80 , 80 , 1.0, Object.AssociatedData);

		Object.WelcomeNameDiv =
					"<div id='WelcomeName_Div"+Object.Index+"' style='position: absolute; top: 0px; left: 0px; height: 40px; width: 45%; opacity: "+Object.Opacity+"; border: 0px solid #4d004d;background-color:transparent; border-radius: 0px 0px 0px 0px; overflow: hidden; text-align: left; line-height: 40px; color: #FFFFFF; padding-left:10px;'>Welcome: "+Object.AssociatedData.name+" "+"</div>"; 

		$( "#Welcome_Div"+Object.Index+"" ).append(Object.WelcomeNameDiv);

		Object.LogoutButton = "<input type='button' id='LogoutButton' value='Logout' />";
		$( "#Welcome_Div"+Object.Index+"" ).append(Object.LogoutButton);
		$( "#LogoutButton" ).css( {"position":"absolute","top":"5%","right":"20%", "width":"10%" , "height":"90%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"transparent","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"0px 0px 0px #888888", "text-align":"center"});
		
		Object.MyProfileButton = "<input type='button' id='MyProfileButton' value='My Profile' />";
		$( "#Function_Div"+Object.Index+"" ).append(Object.MyProfileButton);
		$( "#MyProfileButton" ).css( {"position":"absolute","top":"10%","left":"20%", "width":"60%" , "height":"15%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});

		Object.FollowButton = "<input type='button' id='FollowButton' value='Follow' />";
		$( "#Function_Div"+Object.Index+"" ).append(Object.FollowButton);
		$( "#FollowButton" ).css( {"position":"absolute","top":"30%","left":"20%", "width":"60%" , "height":"15%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});

		Object.FollowersButton = "<input type='button' id='FollowersButton' value='Followers' />";
		$( "#Function_Div"+Object.Index+"" ).append(Object.FollowersButton);
		$( "#FollowersButton" ).css( {"position":"absolute","top":"50%","left":"20%", "width":"60%" , "height":"15%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});

		Object.FollowingButton = "<input type='button' id='FollowingButton' value='Following' />";
		$( "#Function_Div"+Object.Index+"" ).append(Object.FollowingButton);
		$( "#FollowingButton" ).css( {"position":"absolute","top":"70%","left":"20%", "width":"60%" , "height":"15%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});
		
		// Event Handlers
	
		$( "#MyProfileButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#4d004d","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
		$( "#MyProfileButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

		$( "#FollowButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#4d004d","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
		$( "#FollowButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

		$( "#FollowersButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#4d004d","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
		$( "#FollowersButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

		$( "#FollowingButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#4d004d","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
		$( "#FollowingButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

		$( "#LogoutButton" ).on('mouseover',function(){ $( this ).css( {"background-color": "#276FF5","border":"1px solid rgb(10,10,200)", "color": "#4d004d","box-shadow":"0px 0px 10px #333333"}); });
		$( "#LogoutButton" ).on('mouseout',function(){ $( this ).css( {"background-color": "transparent","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 0px #999999"}); });

		$( "#MyProfileButton" ).on('click',function()  //edit
		{ 
			//List followers
			$.get(server_url+"/get_user_info?token="+Object.AssociatedData.token,
			    function(data, status){
			        console.log("Data: " + data + "\nStatus: " + status);

				        $("#WorkArea_Div"+Object.Index).empty();
						Object.uo.Initialize("ViewDO", 10 , 10 , "WorkArea_Div" + Object.Index , 80 , 80 , 1.0, Object.AssociatedData);			
			    });	
		});

		$( "#FollowButton" ).on('click',function()  //edit
		{ 
			var d = dict();
			var list = Object.AssociatedData.followers;
			list.forEach(function(x) {d[x["user_name"]] = "0"});

			$.get(server_url+"/get_user_list",
				{
					token: Object.AssociatedData.token,
					user_name: uname,
					current_following: d
				},
			    function(data, status){
			        console.log("Data: " + data + "\nStatus: " + status);

				        $("#WorkArea_Div"+Object.Index).empty();
						for (var i = 0; i < data.user_list; i++) {
							var p = data.user_list[i];
							Object.FollowButton1 = "<input type='button' id='FollowButton"+i+"' value='"+ p.user_name +"' />";
							$( "#WorkArea_Div"+Object.Index+"" ).append(Object.FollowButton);
							$( "#FollowButton"+i ).css( {"width":"60%" , "height":"15%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});
							$( "#FollowButton"+i ).on('mouseover',function(){ $( this ).css( {"background-color": "#4d004d","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
							$( "#FollowButton"+i ).on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });
							$( "#FollowButton" ).on('click',function()  //edit
							{
								$.post(server_url+"/follow_user",
									{
										token: Object.AssociatedData.token,
										new_follow: {
														user_name: p.user_name,
														name: p.name,
														pic_link: p.pic_link
													},
										user_name: Object.AssociatedData.profile.user_name,
										name: Object.AssociatedData.profile.name,
										pic_link: Object.AssociatedData.profile.pic_link,
									},
								    function(data, status){
								        console.log("Data: " + data + "\nStatus: " + status);
											Object.AssociatedData.following.append(
													{
														user_name: p.user_name,
														name: p.name,
														pic_link: p.pic_link
													}
												);
											alert("User followed");
								    });	
							});

						}			
			    });
		});
		
		$( "#FollowersButton" ).on('click',function()  //edit
		{ 
			Object.FollowersText = "<div id='Followerstext"+Object.Index+"' style='position: absolute; left:15%;top:20%;width:70%;height:40%'></div>";
			$("#WorkArea_Div"+Object.Index).empty();
			$("#WorkArea_Div"+Object.Index+"" ).append(Object.FollowersText);

			var totalStr1 = "";;
			for (var i = 0; i < Object.AssociatedData.followers.length; i++) {
				var p = Object.AssociatedData.followers[i];
				var str = p.name+"\n";
				totalStr1 +=  str;
			}
			$( "Followerstext"+Object.Index+"" ).append(totalStr1);
		});

		$( "#FollowingButton" ).on('click',function()  //edit
		{ 
			$("#WorkArea_Div"+Object.Index).empty();
		
			for (var i = 0; i < Object.AssociatedData.following.length; i++) {
				var p = Object.AssociatedData.following[i];
				Object.FollowingButton1 = "<input type='button' id='FollowingButton"+i+"' value='"+ p.user_name +"' />";
				$( "#WorkArea_Div"+Object.Index+"" ).append(Object.FollowingButton);
				$( "#FollowingButton"+i ).css( {"width":"60%" , "height":"15%", "font-size":"1.2em", "font-weight": "semibold","color":"#FFFFFF","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","border-radius":"10px","padding":"0px", "padding-left":"0px", "padding-right":"0px", "box-shadow":"2px 2px 5px #888888", "text-align":"center"});
				$( "#FollowingButton"+i ).on('mouseover',function(){ $( this ).css( {"background-color": "#4d004d","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
				$( "#FollowingButton"+i ).on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });
				$( "#FollowingButton" ).on('click',function()  //edit
				{
					var uname = $("#FollowingButton"+i).val();
					$.post(server_url+"/get_user_info",
						{
							token: Object.AssociatedData.token,
							user_name: uname
						},
					    function(data, status){
					        console.log("Data: " + data + "\nStatus: " + status);

						        $("#WorkArea_Div"+Object.Index).empty();
								Object.uo.Initialize("ViewDO", 10 , 10 , "WorkArea_Div" + Object.Index , 80 , 80 , 1.0, data);			
					    });	
				});

			}
		});
		

		$( "#LogoutButton" ).on('click',function()  //edit
		{ 
			document.getElementById("AccountPage"+Object.Index).remove();
			login.Initialize( "LoginObj1", 30 , 30 , "LoginDiv" , 40 , 40 , 0.8);
		});

	}
}