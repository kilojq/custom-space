import Item from './item'
import html2canvas from './html2canvas.min'
import mp3 from '../media/bgm.mp3'
import assets_data from '../data'
const default_config = {
	tabBtnNames: {},
	rotatable: true,
    scalable: true
}
const App = {
	init: function(option){
		this.option = Object.assign({}, default_config, option);
		this.currentItem = null;
		this.isProducePic = false;
		this.tabBtnNames = this.option.tabBtnNames;
		// console.log(assets_data)
		this.preload.init();
		
		$("#view").on("touchmove",function(e){
			e.preventDefault();
		})

	},
	ready: function(){
		// console.log(App)
		var _this = this;
		
		//生成菜单
		for(var k in assets_data){
			if(k !== "_res"){
				var name = this.tabBtnNames[k] || k;
				$(".cs-tab-tools").append('<div class="cs-tab-btn">'+ name +'</div>')
				_this.setMenuItem(assets_data[k]);
			}
		}
		$(".cs-tab-btn").eq(0).addClass("active");
		$(".cs-tab-con").eq(0).addClass("active");
		//关闭元素添加菜单
		$(".cs-btn-close").on("touchend",function(e){
			$(".cs-tab-layer").addClass("close");
			$(".cs-tab-btn").removeClass("active");
		});


		$(".btn-start").on("touchend",function(e){
			App.music.init();
			$('.load').fadeOut(500);
			$(".main").fadeIn(500);
			e.preventDefault();
		})
		
		
		//菜单选项
		$(".cs-tab-btn").on("touchend",function(e){
			var index = $(this).index(".cs-tab-btn");
			$(".cs-tab-layer").removeClass("close");
			$(".cs-tab-btn").removeClass("active").eq(index).addClass("active");
			$(".cs-tab-con").removeClass("active").eq(index).addClass("active");
		});
		
		//合成图片
		$(".cs-btn-camera").on("touchstart",function(){
			App.loading.show();
			$(".cs-item").removeClass("active");
			$(".cs-tab-layer,.footer").hide();
			$(".bottom").fadeIn(500);
			if(!App.isProducePic){
				App.isProducePic = true;
				html2canvas($("#view").get(0)).then(function(canvas) {
					timeout(500).then(function(){
						$("<img>").attr("src",canvas.toDataURL()).addClass("cs-pic").appendTo($("body")).fadeIn(300);
						App.loading.hide();
						return timeout(1000)
					}).then(function(){
						$(".tip-layer").addClass("show");
						return timeout(3000)
					}).then(function(){
						$(".tip-layer").removeClass("show");
					})
				});				
			}
		})
		
		function timeout(time){
			return new Promise(function(resolve,reject){
				setTimeout(resolve,time)
			})
		}
		
	},
	//相机显示隐藏判断，当画面元素数量大于或等于2时显示相机
	setCamera: function(){
		var itemCount = $("#room .cs-item").length;
		if(itemCount>=2){
			$(".cs-btn-camera").fadeIn(300);
		}else{
			$(".cs-btn-camera").hide();
		}
	},
	//生成元素菜单
	setMenuItem: function(dataList){
		var _this = this;
		// console.log(dataList)
		var ul = $("<ul>",{
			class: "cs-tab-con"
		}).appendTo(".cs-tab-contents")
		for(var i = 0;i < dataList.length;i++){
			var data = dataList[i];
			$('<li>').css({
				"backgroundImage": "url("+ data.url +")",
				"backgroundSize": data.width > data.height?"contain" : "auto 92%",
			}).data("index",i).appendTo(ul);
		}
		
		ul.on("touchstart",">li",function(){
			_this.itemLastLeft = $(this).offset().left;
			_this.itemLastTop = $(this).offset().top;
		}).on("touchend",">li",function(){
			if(Math.abs(_this.itemLastLeft - $(this).offset().left)<15 && Math.abs(_this.itemLastTop - $(this).offset().top)<15){
				var index = $(this).data("index");
				_this.currentItem && _this.currentItem.removeClass("active");
				_this.currentItem = new Item(dataList[index], _this.option);
//				_this.currentItem.addClass("active");
				App.setCamera();
			}
			return false;
		})
	},
	//预加载
	preload: {
		res: [...assets_data["_res"], {id:"audio", src: mp3}],
		init: function (){
			this.target = new createjs.LoadQueue();
    		this.target.installPlugin(createjs.Sound);
			this.target.loadManifest(this.res);
	        this.target.on("progress", this.progress);
	        this.target.on("complete", this.complete);
		},
		progress: function(e) {
			var percent = (App.preload.target.progress*100|0) + "%";
			$(".progress").text(percent);
		},
		complete: function(){
			$(".progress").hide();
			$(".btn-start").fadeIn(400);
			// App.music.init();
			App.ready();
		}
	},
	//	背景音乐控制
	music: {
		oBGM: null,
		init: function(){
			App.music.oBGM = createjs.Sound.play('audio');
			App.music.oBGM.loop = -1;
			$("#music_ctrl").on("touchend",function(){
				if(!App.music.oBGM.paused){
					App.music.pause();
					console.log("pause")
				}else{
					App.music.play();
				}
			})
		},
		pause: function(){
			App.music.oBGM.pause();
			$('#music_ctrl').addClass("stop");
		},
		play: function(){
			App.music.oBGM.play();
			$('#music_ctrl').removeClass("stop");
		},
	},
	loading: {
		show: function(){
			$(".loading-layer").fadeIn(300);
		},
		hide: function(){
			$(".loading-layer").fadeOut(300);
		}
	}
}



export default App;