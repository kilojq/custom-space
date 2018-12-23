/*
 * 装饰元素对象
 * */
import App from './main';

const Item = function(data, option){
	this.url = data.url;
	this.width = this.sourceWidth = data.width;
	this.height = this.sourceHeight = data.height;
	// this.id = data.id;
	this.scalable = option.scalable
	this.rotatable = option.rotatable
	
	this.init()
	return this.$itemElement;
}
//初始化数据
Item.prototype.init = function(){
	this.scale = 1;
	this.createElement();
	this.bindRemoveHandle();
	this.bindMoveHandle();
	this.bindResizeHandle();
	this.bindRotateHandle();
	this.$itemElement.itemDate = this;
}
//创建dom元素
Item.prototype.createElement = function(){
	const winWidth = $(window).width();
	const winHeight = $(window).height();
	this.left = winWidth/2;
	this.top = (winHeight - this.height)/2;
	this.isRotate = false;
	const newItem = $(`<div class="cs-item active">
    					<img src="" alt="" class="cs-body" />
    					<div class="cs-btn-remove"></div>
    				</div>`);
    newItem.width(this.width);
    newItem.height(this.height);
    newItem.css({
    	"left": this.left + rdmFn(-15,15),
    	"top": this.top + rdmFn(-15,15),
    	"marginLeft": -this.width/2,
    	"marginTop": -this.height/2
    });
    newItem.data('id',this.id);
    newItem.children(".cs-body").attr('src',this.url);
	newItem.appendTo($("#room"));
    this.$itemElement = newItem;
}
//调整元素大小
Item.prototype.bindResizeHandle = function(){
	if (!this.scalable) return;
	this.$itemElement.append('<div class="cs-btn-resize"></div>');
	const _this = this;
	let tx,ty,cx,cy;
	this.$itemElement.children(".cs-btn-resize").on("touchstart",function(e){
		tx = e.touches[0].clientX;
		ty = e.touches[0].clientY;
		cx = _this.$itemElement.offset().left + _this.width/2;
		cy = _this.$itemElement.offset().top + _this.height/2;
		e.stopPropagation()
	}).on("touchmove",function(e){
		const x = e.touches[0].clientX - cx;
		const y = e.touches[0].clientY - cy;
		const l1 = Math.sqrt(Math.pow(x,2),Math.pow(y,2));
		const l2 = Math.sqrt(Math.pow(_this.sourceWidth/2,2),Math.pow(_this.sourceHeight/2,2));
		_this.scale = l1/l2;
		_this.width = _this.sourceWidth * _this.scale;
		_this.height = _this.sourceHeight * _this.scale;
		_this.$itemElement.css({
			"width": _this.width,
			"height": _this.height,
			"marginLeft": -_this.width/2,
    		"marginTop": -_this.height/2
		})
		e.stopPropagation()
		e.preventDefault()
	}).on("touchend",function(e){
		e.stopPropagation()
	});
}
//移除元素
Item.prototype.bindRemoveHandle = function(){
	let _this = this;
	this.$itemElement.children(".cs-btn-remove").on("touchend",function(e){	
		_this.$itemElement.off("touchstart");
		_this.$itemElement.off("touchmove");
		_this.$itemElement.off("touchend");
		_this.url = _this.width = _this.height = _this.sourceWidth = _this.sourceHeight = _this.left = _this.top = _this.id = _this.scale = _this.$itemElement.itemDate = null;
		_this.$itemElement.remove();
		App.setCamera();
		_this.$itemElement = null;
		_this = null;
		e.stopPropagation()
	})
}
//移动元素
Item.prototype.bindMoveHandle = function(){
	const _this = this;
	let tx,ty;
	this.$itemElement.on("touchstart",function(e){
		App.currentItem && App.currentItem.removeClass("active");
		App.currentItem = _this.$itemElement;
		App.currentItem.addClass("active").appendTo($("#room"));
		tx = e.touches[0].clientX - _this.$itemElement.offset().left - _this.width/2;
		ty = e.touches[0].clientY - _this.$itemElement.offset().top - _this.height/2;
		// const s = _this.scale + 0.1;
		e.stopPropagation()
		e.preventDefault()
	}).on("touchmove",function(e){		
		if(!_this.isRotate)	{

			const x = e.touches[0].clientX - tx;
			const y = e.touches[0].clientY - ty;
			App.currentItem.css({
				"left": x,
				"top": y
			})
		}
		e.stopPropagation()
		e.preventDefault()
	}).on("touchend",function(e){		
		e.stopPropagation()
		e.preventDefault()
	})
}
//旋转元素
Item.prototype.bindRotateHandle = function(){
	if (!this.rotatable) return;
	const _this = this;
	let ax,ay;
	const rotateBtn = $('<div class="cs-btn-rotate"></div>');
	this.$itemElement.append(rotateBtn)
	rotateBtn.on("touchstart",function(e){
		_this.isRotate = true;
		ax = _this.$itemElement.offset().left + _this.width/2;
		ay = _this.$itemElement.offset().top + _this.height/2; 
		e.stopPropagation()
	}).on("touchmove",function(e){
		if(_this.isRotate)	{
			const bx = e.touches[0].clientX;
			const by = e.touches[0].clientY;
			const ox = bx - ax;
			const oy = by - ay;
			let angle = Math.atan( Math.abs( ox/oy ) )/( 2 * Math.PI ) * 360;
			if( ox < 0 && oy < 0)
			{
				angle = -angle;
			}else if( ox < 0 && oy > 0)
			{
				angle = -( 180 - angle )
			}else if( ox > 0 && oy < 0)
			{
				angle = angle;
			}else if( ox > 0 && oy > 0)
			{
				angle = 180 - angle;
			}
			_this.$itemElement.css({
				"webkitTransform": "rotate("+ angle +"deg)",
				"transform": "rotate("+ angle +"deg)",
			})
			// console.log(angle)
		}
		e.stopPropagation()
		e.preventDefault()
	}).on("touchend",function(){
		_this.isRotate = false;
	})
}




function rdmFn(min,max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}


export default Item;



















