function Search(){
	let url = encodeURI($("#toSearch").val());
	$.ajax({
		type: "POST",
		url: "/getFeed/",
		async: false,
		data: {'url': JSON.stringify(url)},
		success:function(response){
			$("#loaderDiv").hide();
			Display(JSON.parse(response));
		},
		error: function(response){
			$("#loaderDiv").hide();
			swal("Something Went Wrong", "Please check the url again", "error");
		}
	});
}

function Display(data){
	console.log(data)
	str = "";
	str += "<div class='row' id='feedsInfo'>";
	str += "<div class='col-md-6'><h1>" + data['title'] + "</h1>";
	str += "<h4>" + data['date'] + "</h4><br/>";
	str += "For this feed, <a href = '" + data['url'] + "'>click here</a><br/></div>";
	str += "<div class='col-md-6'><img src = " + data['image'] + " alt='Feeds Image here' style='float:right;'></img></div>";
	str += "</div>";
	
	str += '<hr/>'
	
	console.log(data['feeds']);
	
	str += "<div id='feedsDet'>"
	let n = data['feeds'].length;
	for(let i=0; i<n; i++){
		let link = data['feeds'][i]['link'];
		let summary = data['feeds'][i]['summary'];
		let title = data['feeds'][i]['title'];
		let value = data['feeds'][i]['value'];
		str += "<div class='feed' style='border:2px solid grey; padding: 20px 20px 20px 20px;'>"
		str += "<a href=" + link + ">" + title + "</a>";
		str += "<br/>"
		str += value;
		str += "</div>";
		str += "<br/><br/>";
	}
	str += "</div>"
	$("#infoDiv").html("");
	$("#showFeeds").html(str);
	$("#feedsDet").css({'height':'500px', 'overflow-y':'scroll'});
}