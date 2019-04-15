 //点击船舶监控隐藏wide盒子
        $('#monitor').on('click',function(){   
   			$('.layui-tab-title').css('display','none')
   			$('#Allwide').css('display','none')
   			$('#wrap').css('display','block')
   			$('.layui-card').css('display','none')
   			$('.layui-body-header').css('display','none')
			map.fresh();
   		})
        $("#navigationBarBtnList li").on('click',function(){
        	if(this.id != "monitor" && this.id!="refreshBtn" && this.id != "sideBtn"){
				$('.layui-tab-title').css('display','block')
				$('#Allwide').css('display','block')
				$('#wrap').css('display','none')
				$('.layui-card').css('display','block')
				$('.layui-body-header').css('display','block')
			}
        });
        $('#sysSetting').on('click',function(){
   			$('.layui-tab-title').css('display','block')
   			$('#Allwide').css('display','block')
   			$('#wrap').css('display','none')
   			$('.layui-card').css('display','block')
   			$('.layui-body-header').css('display','block')
   		})
//z_tree
	
	    function zTreeOnClick(event, treeId, treeNode){
			$('.ship_details_box').show()
			$('.ztree_main').hide();
			//详情渲染
				    	$('#tables').html(`
				    		<tbody>
							    <tr>
							      <th>船名</th>
							      <td>测试船舶</td>
							    </tr>
							    <tr>
							      <th>公司</th>
							      <td>远洋渔业有限公司</td>
							    </tr>
							    <tr>
							      <th>船龄</th>
							      <td>10年</td>
							    </tr>
							    <tr>
							      <th>船长</th>
							      <td>捷克</td>
							    </tr>
							    <tr>
							      <th>渔船编码</th>
							      <td>xb9752352894</td>
							    </tr>
							    <tr>
							      <th>作业类型</th>
							      <td>灯光敷网</td>
							    </tr>
							    <tr>
							      <th>呼号</th>
							      <td>xb9752352894</td>
							    </tr>
							    <tr>
							      <th>作业区域</th>
							      <td>太平洋区域</td>
							    </tr>
							    <tr>
							      <th>船籍港</th>
							      <td>香港</td>
							    </tr>
							    <tr>
							      <th>总吨</th>
							      <td>800吨</td>
							    </tr>
							    <tr>
							      <th>功率</th>
							      <td>500KW</td>
							    </tr>
							    <tr>
							      <th>型深</th>
							      <td>200M</td>
							    </tr>
							    <tr>
							      <th>型宽</th>
							      <td>500M</td>
							    </tr>
		  						</tbody>	
				    	`);
				    	//最新位置
				    	$('.position_list_m').html(`
				    		<ul>
					            <li><span>报位类型：</span>海事卫星C</li>
					            <li><span>报位时间：</span>10.30</li>
					            <li><span>维度：</span>44</li>
					            <li><span>经度：</span>34</li>
					            <li><span>航速(节)：</span>0节</li>
					            <li><span>航向：</span>185°</li>
					          </ul>
				    		`)
				    	//点击渔捞日志
				    	$(".ship_details_foot_btn2").click(function(){
							  $(".fishing_log").show();
							  $(".fishing_date").show();
							  $(".ship_details_foot_btn3").removeClass('on');
							  $(".history_time").hide();
							  $(".history_track").hide();
						});
						//点击渔捞日志中返回
						$('.fishing_log_tit .back').on('click',function() {
							$('.fishing_log').hide();
							$('.fishing_date').hide();
							$('.ship_details_box').show();
						})
						//点击历史轨迹
				    	$('.ship_details_foot_btn3').on('click',function() {
				    		if($(this).hasClass('on')){
								$(this).removeClass('on');
								$(".history_time").hide();
							  }else {
								$(this).addClass('on');
								$(".history_time").show();							
							  }
				    	})
				    	//点击历史轨迹中的查询
				    	$('.btn').on('click',function(){
				    		$(".history_track").toggle();
				    		var startTime = $('#Beginning').val() + ' ' + '00:00:00'
				    		var endTime = $('#Terminal').val() + ' ' + '00:00:00'
//				    		admin.req('/MapOfOcean/getShipByTimeById',{shipId:shipId,statsTime:'2019-03-27 0:0:0',lastTime:'2019-03-29 0:0:0'},function(data) {
//									console.log(data)
//							},'GET')
				    	})
				    	
				    	//点击历史轨迹中X
				    	$(".history_track .history_track_t .clo").click(function(){
							  $(".ship_details_foot_btn3").removeClass('on');
//							  $(".history_time").hide();
							  $(".history_track").hide();
						  });
		}
	

//点击返回
		$('.ship_details_tit .back').on('click',function(){
			$('.ship_details_box').hide()
			$('.ztree_main').show()
		})
		//点击展开船舶详情
		$('.info_open').on('click',function(){
			$('.info').css('height','auto')
			$('.info_clo').show();
			$('.info_open').hide()
		})
		//关闭详情
		$('.info_clo').on('click',function(){
			$('.info').css('height','200px')
			$('.info_clo').hide()
			$('.info_open').show()
		})
//拖动添加框
//		drag(Usersign)
		//添加框中的取消
		$('#Flagbox').on('click',function () {
			$('#user_sign_edit').hide();
		})
		//点击标记管理的关闭
		$('.poup_delete').on('click',function() {
			$('#addboxs').hide()
		})
		//点击标注管理中的取消
		$('#call').on('click',function() {
			$('#addboxs').hide()
		})
//渔捞日志
 var options = {
	      showLunarCalendar: false, //阴历
	      showHoliday: false, //休假
	      showFestival: false, //节日
	      showLunarFestival: false, //农历节日
	      showSolarTerm: false, //节气
	      showMark: true, //标记
	      mark: {
	        '2019-4-5': '提交2',
	        '2019-4-8': '提交2',
	        '2019-4-10': '提交2',
	        '2019-4-15': '提交2',
	        '2019-4-20': '提交2',
	        '2019-4-22': '提交2',
	        '2019-4-26': '提交2'
	      },
		  marktype: {
	        '2019-4-5': 'green',
	        '2019-4-8': 'green',
	        '2019-4-10': 'orange',
	        '2019-4-15': 'gray',
	        '2019-4-20': 'orange',
	        '2019-4-22': 'gray',
	        '2019-4-26': 'gray'
	      }
    };
		//marktype里面 green：已上报 orange：未上报 gray：未填写
    	var myCalendar = new SimpleCalendar('#calendar_container',options);
	
		$(".sc-item").click(function() {
	        var year = $(".sc-select-year").val();
	        var month = $(".sc-select-month").val();
	        if ($(this).hasClass("sc-othermenth")) {
	            if ($(this).children(".day").html() > 20) {
	                month = parseInt(month) - 1;
	            }
	            if ($(this).children(".day").html() < 10) {
	                month = parseInt(month) + 1;
	            }
	        }
	        var day = $(this).children(".day").html();
	        var date = year + "-" + month + "-" + day;
	        alert(date); //点击日期后进行的操作
	    });
	//封装的盒子拖拽
		function drag(obj){
				obj .onmousedown = function(ev){
				var ev = ev||event;
				var disX = ev.clientX-this.offsetLeft;
				var disY = ev.clientY-this.offsetTop;
				if(obj.setCapture){
					obj.setCapture();  //可以将鼠标事件锁定在指定的元素上，当元素捕获了鼠标事件后，该事件只能作用在当前元素上
				}
				document.onmousemove= function(ev){
					var ev = ev||event;
					var L = ev.clientX-disX;
					var T = ev.clientY-disY;
					if(L<0 ){
						L = 0;
					}else if(L>document.documentElement.clientWidth-obj.offsetWidth){
						L = document.documentElement.clientWidth-obj.offsetWidth;
					}
					if(T<0 ){
						T= 0;
					}else if(T>document.documentElement.clientHeight-obj.offsetHeight){
						T = document.documentElement.clientHeight-obj.offsetHeight;
					}//先判断并设置L和T的值，再设置left和top 值为有更好的用户体验效果。
					obj.style.left = L +"px";
					obj.style.top= T +"px";
				}
				document.onmouseup = function(){
					document.onmousemove = null;
					if(obj.releaseCapture){
						obj.releaseCapture();
					}
				}
				return true;//取消事件的默认行为
			}
		}	
		