function ComplaintObject()
{
	this.Index = "";
	this.Left = "";
	this.Top = "";
	this.Parent = "";
	this.Width = "";
	this.Height = "";
	this.Opacity = "";
	this.ComplaintJSON = {};
	this.ParentObj = null;

	var Object = this;

	this.Initialize = function(Index, Left , Top , Parent , Width , Height , Opacity, ComplaintJSON, IsEditable, parent)
	{
		this.Index = Index;
		this.Left = Left;
		this.Top = Top;
		this.Parent = Parent;
		this.Width = Width;
		this.Height = Height;
		this.Opacity = Opacity;
		this.IsEditable = IsEditable;
		this.ComplaintJSON = ComplaintJSON;
		this.ParentObj = parent;

		this.Render();
	}

	this.Render = function()
	{
		Object.ComplaintDiv = 
			"<div id='Complaint_Div"+Object.Index+"' style='position: absolute; top: "+Object.Top+"%; left: "+Object.Left+"%; height: "+Object.Height+"%; width: "+Object.Width+"%; opacity: "+Object.Opacity+"; border: 0px solid #000000;background-color:#AFC9FA; border-radius: 50px 0px 50px 0px; overflow: hidden;box-shadow: 2px 2px 20px #333333;'></div>";

		$( "#"+Object.Parent+"" ).append(Object.ComplaintDiv);

		Object.TitleText = "<div id='titletext"+Object.Index+"' style='color:blue;font-size:1.5em;font-family:Garamond;font-weight:bold;text-align:center;position: absolute; left:35%;top:2%;width:30%;height:7%;line-height:200%'>Complaint Details</div>";

		$( "#Complaint_Div"+Object.Index+"" ).append(Object.TitleText);

		Object.ComplaintTitleText = "<div id='ComplaintTitletext"+Object.Index+"' style='color:blue;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:5%;top:11%;width:40%;height:7%;line-height:300%'>Title :</div>";

		$( "#Complaint_Div"+Object.Index+"" ).append(Object.ComplaintTitleText);

		Object.ComplaintDescriptionText = "<div id='ComplaintDescriptiontext"+Object.Index+"' style='color:blue;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:5%;top:21%;width:40%;height:7%;line-height:300%'>Description :</div>";

		$( "#Complaint_Div"+Object.Index+"" ).append(Object.ComplaintDescriptionText);

		Object.LodgerNameText = "<div id='LodgerNametext"+Object.Index+"' style='color:blue;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:5%;top:31%;width:40%;height:7%;line-height:300%'>Lodger By :</div>";

		$( "#Complaint_Div"+Object.Index+"" ).append(Object.LodgerNameText);

		Object.DomainText = "<div id='Domaintext"+Object.Index+"' style='color:blue;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:5%;top:41%;width:40%;height:7%;line-height:300%'>Domain :</div>";

		$( "#Complaint_Div"+Object.Index+"" ).append(Object.DomainText);

		Object.TypeText = "<div id='Contact_Info_text"+Object.Index+"' style='color:blue;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:5%;top:51%;width:40%;height:7%;line-height:300%'>Complaint Type :</div>";

		$( "#Complaint_Div"+Object.Index+"" ).append(Object.TypeText);

		Object.CurrentLevelText = "<div id='CurrentLeveltext"+Object.Index+"' style='color:blue;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:5%;top:61%;width:40%;height:7%;line-height:300%'>Current Authority :</div>";

		$( "#Complaint_Div"+Object.Index+"" ).append(Object.CurrentLevelText);

		Object.CurrentStatusText = "<div id='CurrentStatustext"+Object.Index+"' style='color:blue;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:5%;top:71%;width:40%;height:7%;line-height:300%'>Current Status :</div>";

		$( "#Complaint_Div"+Object.Index+"" ).append(Object.CurrentStatusText);

		Object.VotesText = "<div id='Votestext"+Object.Index+"' style='color:blue;font-size:1.2em;font-family:Garamond;font-weight:bold;text-align:left;position: absolute; left:5%;top:81%;width:40%;height:7%;line-height:300%'>Votes :</div>";

		$( "#Complaint_Div"+Object.Index+"" ).append(Object.VotesText);

		//Input Text Boxes HERE

		Object.ComplaintTitleInput = "<input type='text' id='ComplaintTitleInput"+Object.Index+"' spellcheck='false' placeholder='' required/>";

		$( "#Complaint_Div"+Object.Index+"" ).append(Object.ComplaintTitleInput);

		if (!this.IsEditable && this.DetailsJSON != {})
		{
			$( "#ComplaintTitleInput"+Object.Index+"" ).attr("readonly", true);
			$( "#ComplaintTitleInput"+Object.Index+"" ).attr("value", Object.ComplaintJSON.title+"");
		}

		$( "#ComplaintTitleInput"+Object.Index+"" ).css( {"position":"absolute","top":"11%","left":"30%", "width":"65%" , "height":"7%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"60px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		//

		Object.DescriptionInput = "<input type='text' id='DescriptionInput"+Object.Index+"' spellcheck='false' placeholder='' required/>";

		$( "#Complaint_Div"+Object.Index+"" ).append(Object.DescriptionInput);

		if (!this.IsEditable && this.DetailsJSON != {})
		{
			$( "#DescriptionInput"+Object.Index+"" ).attr("readonly", true);
			$( "#DescriptionInput"+Object.Index+"" ).attr("value", Object.ComplaintJSON.description+"");
		}

		$( "#DescriptionInput"+Object.Index+"" ).css( {"position":"absolute","top":"21%","left":"30%", "width":"65%" , "height":"7%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"60px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		//

		Object.LodgerNameInput = "<input type='text' id='LodgerNameInput"+Object.Index+"' spellcheck='false' placeholder='' required/>";

		$( "#Complaint_Div"+Object.Index+"" ).append(Object.LodgerNameInput);

		if (!this.IsEditable && this.DetailsJSON != {})
		{
			$( "#LodgerNameInput"+Object.Index+"" ).attr("readonly", true);
			$( "#LodgerNameInput"+Object.Index+"" ).attr("value", Object.ComplaintJSON.lodger_name+"");
		}

		$( "#LodgerNameInput"+Object.Index+"" ).css( {"position":"absolute","top":"31%","left":"30%", "width":"65%" , "height":"7%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"60px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		//

		Object.DomainInput = "<input type='text' id='DomainInput"+Object.Index+"' spellcheck='false' placeholder='' required/>";

		$( "#Complaint_Div"+Object.Index+"" ).append(Object.DomainInput);

		if (!this.IsEditable && this.DetailsJSON != {})
		{
			$( "#DomainInput"+Object.Index+"" ).attr("readonly", true);
			$( "#DomainInput"+Object.Index+"" ).attr("value", Object.ComplaintJSON.is_community+"");
		}

		$( "#DomainInput"+Object.Index+"" ).css( {"position":"absolute","top":"41%","left":"30%", "width":"65%" , "height":"7%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"60px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		//

		Object.TypeInput = "<input type='text' id='TypeInput"+Object.Index+"' spellcheck='false' placeholder='' required/>";

		$( "#Complaint_Div"+Object.Index+"" ).append(Object.TypeInput);

		if (!this.IsEditable && this.DetailsJSON != {})
		{
			$( "#TypeInput"+Object.Index+"" ).attr("readonly", true);
			$( "#TypeInput" +Object.Index+"").attr("value", Object.ComplaintJSON.type+"");
		}

		$( "#TypeInput"+Object.Index+"" ).css( {"position":"absolute","top":"51%","left":"30%", "width":"65%" , "height":"7%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"60px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		//

		Object.CurrentLevelInput = "<input type='text' id='CurrentLevelInput"+Object.Index+"' spellcheck='false' placeholder='' required/>";

		$( "#Complaint_Div"+Object.Index+"" ).append(Object.CurrentLevelInput);

		if (!this.IsEditable && this.DetailsJSON != {})
		{
			$( "#CurrentLevelInput"+Object.Index+"" ).attr("readonly", true);
			$( "#CurrentLevelInput"+Object.Index+"" ).attr("value", Object.ComplaintJSON.current_level+"");
		}

		$( "#CurrentLevelInput"+Object.Index+"" ).css( {"position":"absolute","top":"61%","left":"30%", "width":"65%" , "height":"7%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"60px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		//

		Object.CurrentStatusInput = "<input type='text' id='CurrentStatusInput"+Object.Index+"' spellcheck='false' placeholder='' required/>";

		$( "#Complaint_Div"+Object.Index+"" ).append(Object.CurrentStatusInput);

		if (!this.IsEditable && this.DetailsJSON != {})
		{
			$( "#CurrentStatusInput"+Object.Index+"" ).attr("readonly", true);
			$( "#CurrentStatusInput"+Object.Index+"" ).attr("value", Object.ComplaintJSON.current_status+"");
		}

		$( "#CurrentStatusInput"+Object.Index+"" ).css( {"position":"absolute","top":"71%","left":"30%", "width":"65%" , "height":"7%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"60px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		//

		Object.VotesInput = "<input type='text' id='VotesInput"+Object.Index+"' spellcheck='false' placeholder='' required/>";

		$( "#Complaint_Div"+Object.Index+"" ).append(Object.VotesInput);

		if (!this.IsEditable && this.DetailsJSON != {})
		{
			$( "#VotesInput" +Object.Index+"").attr("readonly", true);
			if (Object.ComplaintJSON.is_community === true)
			$( "#VotesInput"+Object.Index+"" ).attr("value", "Upvotes: "+Object.ComplaintJSON.votes.upvotes+", Downvotes: "+Object.ComplaintJSON.votes.downvotes+"");
			else
				$( "#VotesInput"+Object.Index+"" ).attr("value","");
		}

		$( "#VotesInput"+Object.Index+"" ).css( {"position":"absolute","top":"81%","left":"30%", "width":"65%" , "height":"7%", "font-size":"1em", "font-weight": "none","color":"#000000","background-color":"rgb(258,258,255)","border":"0px solid rgb(88,151,19)","border-radius":"60px","padding":"0px", "padding-left":"10px", "padding-right":"0px", "box-shadow":"0px 0px 15px #888888"});

		//

		Object.DeleteButton = "<input type='button' id='DeleteButton"+Object.Index+"' value='Delete'/>";
		
			$( "#Complaint_Div"+Object.Index+"" ).append(Object.DeleteButton);
			$( "#DeleteButton"+Object.Index+"" ).css( {"position":"absolute","bottom":"2%","left":"60%","height":"7%","width":"20%","background-color":"#276FF5","border":"0px solid rgb(88,151,19)","color":"#FFFFFF","font-size":"1em","border-radius":"5px", "box-shadow":"2px 2px 5px #000000"});			

		$( "#DeleteButton"+Object.Index+"" ).on('mouseover',function(){ $( this ).css( {"background-color": "#0B197D","border":"1px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #333333"}); });
		$( "#DeleteButton" +Object.Index+"").on('mouseout',function(){ $( this ).css( {"background-color": "#276FF5","border":"0px solid rgb(145,141,2)", "color": "#FFFFFF","box-shadow":"0px 0px 10px #999999"}); });

		$( "#DeleteButton" +Object.Index+"").on('click',function()
		{
			//Add delete functionality here

			console.log(Object.ComplaintJSON.complaint_id);

			$.post(server_url+"/delete_complaint",
		    {
		        complaint_id: Object.ComplaintJSON.complaint_id+"",
		        token: token
		    },
		    function(data, status){
		        console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);

		        if (data.success === true)
		        {
			        alert("Complaint deleted successfully");
			        $("#ListComplaintsButton").click();
			    }
			    else
			    	alert("Could not delete Complaint from database");
		    });
		});
	}
}