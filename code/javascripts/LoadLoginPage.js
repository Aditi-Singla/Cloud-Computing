var login = new LoginObj();

var acctPage = new AccountPageOne(); 

var server_url = "http://instabooks.azurewebsites.net/api";

var toaken = "";

function LoadLoginPage()
{
	login.Initialize( "LoginObj1", 25 , 30 , "LoginDiv" , 50 , 40 , 1.0);
	// acctPage.Initialize("acctpage1", 0 , 0 , "HomeDiv" , 100 , 100 , 1, {});
	
	// var uo = new UserObject();
	// uo.Initialize("ViewDO", 10 , 10 , "HomeDiv" , 60 , 60 , 1.0, {}, true, "");

	// var co = new ComplaintObject();
	// co.Initialize("ViewDO", 10 , 10 , "HomeDiv" , 60 , 60 , 1.0, {}, false, "");
}