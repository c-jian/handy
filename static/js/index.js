var apiAddress='/handy/public/index.php',
	classArr=['oneRecordItem','twoRecordItem','threeRecordItem'],
	total=1;\
$('.uname-txt').html($.cookie('handyuname'));
$(window).load(function(){

	$('.reload-animate').show();
	//渲染数据
	$.ajax({
		url:apiAddress+'/Index/Index/getData',
		dataType:'json',
		success:function(data){
			if(data.code!=0)return false;
			total=data.total;
			render(data);
			$('.reload-animate').hide();
		}
	})


	//添加数据
	$('.save').click(function(){
		var title=$('.title-ipt').val(),
			user=$('.user-ipt').val(),
			pwd=$('.pwd-ipt').val(),
			url=$('.url-ipt').val(),
			email=$('.email-ipt').val()
			other=$('.other-ipt').val()

		if(title==''){
			alert('标题不能为空');
			return;
		}
		if(user==''){
			alert('用户名不能为空');
			return;
		}
		if(pwd==''){
			alert('密码不能为空');
			return;
		}

		$.ajax({
			url:apiAddress+'/Index/Index/addAccount',
			data:{title:title,username:user,password:pwd,url:url,email:email,other:other},
			dataType:'json',
			success:function(data){
				if(data.code===0){
					alert(data.msg);
					$('.addPanelBg').hide();
					window.location.reload();
				}else{
					alert(data.msg);
				}
			}
		})


	})


	//隐藏添加面板
	$('.cancel').click(function(){
		$('.addPanelBg').hide();
	})

	$('.close').click(function(){
		$('.addPanelBg').hide();
	})

	//显示面板
	$('.add-btn').click(function(){
		$('.addPanelBg').show();
	})


	/*上一页*/
	var curPage=1;
	$('.pre').click(function(){
		
		if (curPage>1) {
			curPage--;
		}else{
			return;
		}
		

		if(curPage>0){
			$('.reload-animate').show();
			$.ajax({
				url:apiAddress+'/Index/Index/getData',
				data:{page:curPage},
				dataType:'json',
				success:function(data){
					if(data.data.length==0){
						return;
					}
					if(data.code!=0)return false;
					render(data);
					$('.reload-animate').hide();
				}
			})
		}


	})

	//下一页
	$('.next').click(function(){
		
		if(curPage<total){
			curPage++;
		}else{
			return;
		}


		if(curPage>0){
			$('.reload-animate').show();
			$.ajax({
				url:apiAddress+'/Index/Index/getData',
				data:{page:curPage},
				dataType:'json',
				success:function(data){
					if(data.data.length==0){
						return;
					}
					if(data.code!=0)return false;
					render(data);
					$('.reload-animate').hide();
				}
			})
		}

	})


	function render(data){
		var items=data.data;
		var str='';
		for(var i=0,len=items.length;i<len;i++){
		
			str+='<div class="recordItem '+classArr[(i%classArr.length)]+'">'+
				'<div class="btns">'+
					'<span class="share" data-id="'+items[i].id+'"><i class="handyicons-share"></i></span>'+
					'<span class="edit" data-id="'+items[i].id+'"><i class="handyicons-edit"></i></span>'+
					'<span class="del" data-id="'+items[i].id+'"><i class="handyicons-del"></i></span>'+
				'</div>'+
				'<div class="info"></div>'+
				'<div class="title ellipsis">'+items[i].title+'</div>'+
				'<div class="con">'+
					'<ul class="con-list">'+
						'<li class="list-item ellipsis"><i class="icons handyicons-user"></i>'+items[i].username+'</li>'+
						'<li class="list-item ellipsis"><i class="icons handyicons-pwd"></i>'+items[i].password+'</li>'+
						'<li class="list-item ellipsis"><i class="icons handyicons-email"></i>'+items[i].email+'</li>'+
						'<li class="list-item ellipsis"><i class="icons handyicons-link"></i><a href="'+items[i].url+'" target="_blank">'+items[i].url+'</a></li>'+
						'<li class="list-item ellipsis">'+(items[i].other || '')+'</li>'+
					'</ul>'+
					'<span class="link-more" data-id="'+items[i].id+'">查看详情</span>'+
				'</div>'+
			'</div>'

		}
		$('.itemarea').html(str);
		//删除
		$('.del').click(delRecordItem)
		//查看详情
		$('.link-more').click(detail)

	}

})

//删除记录
function delRecordItem(){
	if(!window.confirm('你确定删除此记录吗？'))return;
	var id=$(this).data('id');
	$.ajax({
		url:apiAddress+'/Index/Index/del',
		dataType:'json',
		data:{id:id},
		success:function(data){
			if(data.code==0){
				alert(data.msg);
				location.reload();
			}
		}
	})
}
//查看详情
function detail(){
	$('.reload-animate').show();
	var id=$(this).data('id');
	$.ajax({
		url:apiAddress+'/Index/Index/getDataById',
		dataType:'json',
		data:{id:id},
		success:function(data){
			if(data.code==0){
				var rows=data.data;
				$('.detail-bg').show();
				$('.detail-title').html(rows.title)
				$('.d-user-txt').html(rows.username)
				$('.d-pwd-txt').html(rows.password)
				$('.d-email-txt').html(rows.email)
				$('.d-link-txt').html('<a href="'+rows.url+'" target="_blank">'+rows.url+'</a>')
				$('.d-other-txt').html(rows.other)
				$('.reload-animate').hide();
			}
		}
	})
}

//隐藏查看详情
$('.d-close').click(function(){
	$('.detail-bg').hide();
})

//退出登录
$('.logout').click(function(){
	$.cookie('handyuname',null,{expires:-1,path:'/'})
	$.cookie('handytoken',null,{expires:-1,path:'/'})
	$.cookie('handysign',null,{expires:-1,path:'/'})
	location.href='/handy/static/login.html'
})